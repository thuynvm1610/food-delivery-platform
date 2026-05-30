import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type AddressValue = {
  streetAddress: string;
  city: string;
  district: string;
  latitude?: number;
  longitude?: number;
};

type SelectedAddress = AddressValue & {
  label: string;
  placeId: string;
};

interface GoongAddressPickerProps {
  value: AddressValue;
  onChange: (value: AddressValue) => void;
}

interface GoongPrediction {
  description: string;
  place_id: string;
  structured_formatting?: {
    main_text?: string;
    secondary_text?: string;
  };
}

interface GoongAutocompleteResponse {
  predictions?: GoongPrediction[];
  status?: string;
}

interface GoongPlaceDetailResponse {
  result?: {
    place_id?: string;
    formatted_address?: string;
    geometry?: {
      location?: {
        lat?: number;
        lng?: number;
      };
    };
    name?: string;
  };
  status?: string;
}

interface GoongMapInstance {
  resize: () => void;
  flyTo: (options: { center: [number, number]; zoom?: number }) => void;
  remove: () => void;
  getZoom: () => number;
  setZoom: (zoom: number) => void;
  zoomIn: () => void;
  zoomOut: () => void;
  getBearing: () => number;
  setBearing: (bearing: number) => void;
  getCenter: () => { lng: number; lat: number };
}

interface GoongMarkerInstance {
  setLngLat: (lngLat: [number, number]) => GoongMarkerInstance;
  addTo: (map: GoongMapInstance) => GoongMarkerInstance;
  remove: () => void;
}

type GoongJs = {
  accessToken: string;
  Map: new (options: {
    container: HTMLElement | string;
    style: string;
    center?: [number, number];
    zoom?: number;
    minZoom?: number;
    maxZoom?: number;
  }) => GoongMapInstance;
  Marker: new (options?: { color?: string }) => GoongMarkerInstance;
};

declare global {
  interface Window {
    goongjs?: GoongJs;
  }
}

const GOONG_SCRIPT_ID = 'goong-js-script';
const GOONG_STYLE_ID = 'goong-js-style';
const GOONG_STYLE_URL = 'https://tiles.goong.io/assets/goong_map_web.json';
const DEFAULT_CENTER: [number, number] = [105.8544441, 21.028511];

let goongAssetsPromise: Promise<GoongJs> | null = null;

const getGoongApiKey = () =>
  import.meta.env.VITE_GOONG_API_KEY ||
  import.meta.env.VITE_GOONG_PLACE_API_KEY ||
  '';

const getGoongMapTilesKey = () =>
  import.meta.env.VITE_GOONG_MAP_TILES_KEY ||
  import.meta.env.VITE_GOONG_MAPTILES_KEY ||
  import.meta.env.VITE_GOONG_MAP_TILE_KEY ||
  '';

const getGoongJs = async () => {
  if (window.goongjs) {
    return window.goongjs;
  }

  if (!goongAssetsPromise) {
    goongAssetsPromise = new Promise<GoongJs>((resolve, reject) => {
      const existingStyle = document.getElementById(GOONG_STYLE_ID) as HTMLLinkElement | null;
      if (!existingStyle) {
        const link = document.createElement('link');
        link.id = GOONG_STYLE_ID;
        link.rel = 'stylesheet';
        link.href = 'https://cdn.jsdelivr.net/npm/@goongmaps/goong-js@1.0.9/dist/goong-js.css';
        document.head.appendChild(link);
      }

      const existingScript = document.getElementById(GOONG_SCRIPT_ID) as HTMLScriptElement | null;
      if (existingScript && window.goongjs) {
        resolve(window.goongjs);
        return;
      }

      const script = existingScript || document.createElement('script');
      script.id = GOONG_SCRIPT_ID;
      script.src = 'https://cdn.jsdelivr.net/npm/@goongmaps/goong-js@1.0.9/dist/goong-js.js';
      script.async = true;
      script.onload = () => {
        if (window.goongjs) {
          resolve(window.goongjs);
          return;
        }

        reject(new Error('Goong JS loaded but global object is unavailable.'));
      };
      script.onerror = () => reject(new Error('Failed to load Goong JS assets.'));

      if (!existingScript) {
        document.head.appendChild(script);
      }
    });
  }

  return goongAssetsPromise;
};

const uuid = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const normalizePart = (part: string) => part.replace(/\s+/g, ' ').trim();

const stripAdminPrefix = (value: string) =>
  normalizePart(
    value
      .replace(/^(Thành phố trực thuộc trung ương|Thành phố|Tỉnh|Quận|Huyện|Thị xã|Thị trấn|Phường|Xã)\s+/i, '')
      .trim()
  );

const parseAddressParts = (formattedAddress: string | undefined, placeName?: string) => {
  const parts = (formattedAddress || '')
    .split(',')
    .map(normalizePart)
    .filter(Boolean);

  const city = parts.length ? stripAdminPrefix(parts[parts.length - 1]) : '';
  const district = parts.length > 1 ? stripAdminPrefix(parts[parts.length - 2]) : '';
  const streetAddress =
    [normalizePart(placeName || ''), ...parts.slice(0, Math.max(0, parts.length - 2))].filter(Boolean).join(', ') ||
    normalizePart(formattedAddress || '') ||
    '';

  return {
    streetAddress,
    city,
    district,
  };
};

export const GoongAddressPicker: React.FC<GoongAddressPickerProps> = ({ value, onChange }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<GoongMapInstance | null>(null);
  const markerRef = useRef<GoongMarkerInstance | null>(null);
  const debounceRef = useRef<number | null>(null);
  const blurTimerRef = useRef<number | null>(null);
  const sessionTokenRef = useRef<string>(uuid());
  const didInitRef = useRef(false);
  const syncingFromValueRef = useRef(false);

  const [query, setQuery] = useState('');
  const [selectedAddress, setSelectedAddress] = useState<SelectedAddress | null>(null);
  const [suggestions, setSuggestions] = useState<GoongPrediction[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [loadingMap, setLoadingMap] = useState(true);
  const [pickerError, setPickerError] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [bearing, setBearing] = useState(0);

  const apiKey = useMemo(() => getGoongApiKey(), []);
  const mapTilesKey = useMemo(() => getGoongMapTilesKey(), []);

  const updateMapLocation = (lat: number, lng: number) => {
    const map = mapInstanceRef.current;
    if (!map) {
      return;
    }

    const marker = markerRef.current;
    if (marker) {
      marker.setLngLat([lng, lat]);
    } else if (window.goongjs) {
      markerRef.current = new window.goongjs.Marker({ color: '#e85d04' })
        .setLngLat([lng, lat])
        .addTo(map);
    }

    map.flyTo({ center: [lng, lat], zoom: 16 });
  };

  useEffect(() => {
    const label = [value.streetAddress, value.district, value.city].filter(Boolean).join(', ');
    syncingFromValueRef.current = true;
    setQuery(label);

    if (label || value.latitude != null || value.longitude != null) {
      setSelectedAddress({
        streetAddress: value.streetAddress,
        district: value.district,
        city: value.city,
        latitude: value.latitude,
        longitude: value.longitude,
        label: label || value.streetAddress || value.district || value.city,
        placeId: label || 'initial-value',
      });
    } else {
      setSelectedAddress(null);
    }

    window.setTimeout(() => {
      syncingFromValueRef.current = false;
    }, 0);
  }, [value.city, value.district, value.latitude, value.longitude, value.streetAddress]);

  useEffect(() => {
    let cancelled = false;

    const initMap = async () => {
      if (!mapRef.current || didInitRef.current) {
        return;
      }

      if (!mapTilesKey) {
        setPickerError('Thiếu map tiles key của Goong.');
        setLoadingMap(false);
        return;
      }

      try {
        const goongjs = await getGoongJs();
        if (cancelled || !mapRef.current) {
          return;
        }

        goongjs.accessToken = mapTilesKey;
        window.goongjs = goongjs;

        const center: [number, number] =
          value.latitude != null && value.longitude != null ? [value.longitude, value.latitude] : DEFAULT_CENTER;

        const map = new goongjs.Map({
          container: mapRef.current,
          style: GOONG_STYLE_URL,
          center,
          zoom: value.latitude != null && value.longitude != null ? 15 : 11,
          minZoom: 3,
          maxZoom: 20,
        });

        mapInstanceRef.current = map;
        didInitRef.current = true;

        if (value.latitude != null && value.longitude != null) {
          markerRef.current = new goongjs.Marker({ color: '#e85d04' })
            .setLngLat([value.longitude, value.latitude])
            .addTo(map);
        }

        (map as any).on('rotate', () => {
          setBearing(map.getBearing());
        });

        map.resize();
        setPickerError(null);
      } catch (error) {
        setPickerError(error instanceof Error ? error.message : 'Không tải được bản đồ Goong.');
      } finally {
        if (!cancelled) {
          setLoadingMap(false);
        }
      }
    };

    initMap().catch(() => { });

    return () => {
      cancelled = true;
    };
  }, [mapTilesKey, value.latitude, value.longitude]);

  useEffect(() => {
    if (!mapInstanceRef.current) {
      return;
    }

    if (value.latitude == null || value.longitude == null) {
      markerRef.current?.remove();
      markerRef.current = null;
      return;
    }

    updateMapLocation(value.latitude, value.longitude);
  }, [value.latitude, value.longitude]);

  useEffect(() => {
    const onResize = () => {
      mapInstanceRef.current?.resize();
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const trimmedQuery = query.trim();

    if (syncingFromValueRef.current) {
      return;
    }

    if (!trimmedQuery) {
      setSuggestions([]);
      setLoadingSuggestions(false);
      sessionTokenRef.current = uuid();
      return;
    }

    if (!apiKey) {
      setPickerError('Thiếu Goong API key để tìm kiếm địa chỉ.');
      return;
    }

    setPickerError(null);

    if (debounceRef.current) {
      window.clearTimeout(debounceRef.current);
    }

    debounceRef.current = window.setTimeout(async () => {
      try {
        setLoadingSuggestions(true);

        const locationBias =
          value.latitude != null && value.longitude != null ? `&location=${value.latitude},${value.longitude}` : '';
        const response = await fetch(
          `https://rsapi.goong.io/Place/AutoComplete?api_key=${encodeURIComponent(apiKey)}&input=${encodeURIComponent(trimmedQuery)}&limit=6&more_compound=true&sessiontoken=${encodeURIComponent(sessionTokenRef.current)}${locationBias}`
        );
        const data = (await response.json()) as GoongAutocompleteResponse;

        setSuggestions(data.predictions || []);
      } catch (error) {
        setPickerError(error instanceof Error ? error.message : 'Không tải được gợi ý địa chỉ.');
        setSuggestions([]);
      } finally {
        setLoadingSuggestions(false);
      }
    }, 300);

    return () => {
      if (debounceRef.current) {
        window.clearTimeout(debounceRef.current);
      }
    };
  }, [apiKey, query, value.latitude, value.longitude]);

  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        window.clearTimeout(debounceRef.current);
      }
      if (blurTimerRef.current) {
        window.clearTimeout(blurTimerRef.current);
      }
      mapInstanceRef.current?.remove();
      markerRef.current?.remove();
    };
  }, []);

  const applySelectedPlace = async (prediction: GoongPrediction) => {
    if (!apiKey) {
      setPickerError('Thiếu Goong API key để lấy chi tiết địa chỉ.');
      return;
    }

    try {
      setPickerError(null);
      setLoadingSuggestions(true);

      const response = await fetch(
        `https://rsapi.goong.io/Place/Detail?place_id=${encodeURIComponent(prediction.place_id)}&api_key=${encodeURIComponent(apiKey)}&sessiontoken=${encodeURIComponent(sessionTokenRef.current)}`
      );
      const data = (await response.json()) as GoongPlaceDetailResponse;
      const result = data.result;

      if (result?.geometry?.location?.lat == null || result.geometry.location.lng == null) {
        throw new Error('Địa chỉ được chọn không có tọa độ hợp lệ.');
      }

      const parsed = parseAddressParts(result.formatted_address, result.name || prediction.structured_formatting?.main_text);
      const latitude = result.geometry.location.lat;
      const longitude = result.geometry.location.lng;
      const nextValue: AddressValue = {
        streetAddress: parsed.streetAddress,
        city: parsed.city,
        district: parsed.district,
        latitude,
        longitude,
      };

      setQuery(result.formatted_address || prediction.description);
      setSelectedAddress({
        ...nextValue,
        label: result.formatted_address || prediction.description,
        placeId: prediction.place_id,
      });
      setSuggestions([]);
      sessionTokenRef.current = uuid();
      onChange(nextValue);
      updateMapLocation(latitude, longitude);
      setIsInputFocused(false);
    } catch (error) {
      setPickerError(error instanceof Error ? error.message : 'Không lấy được chi tiết địa chỉ.');
    } finally {
      setLoadingSuggestions(false);
    }
  };

  const handleZoomIn = useCallback(() => {
    mapInstanceRef.current?.zoomIn();
  }, []);

  const handleZoomOut = useCallback(() => {
    mapInstanceRef.current?.zoomOut();
  }, []);

  const handleResetBearing = useCallback(() => {
    const map = mapInstanceRef.current;
    if (!map) return;
    const center = map.getCenter();
    map.flyTo({ center: [center.lng, center.lat], zoom: map.getZoom() });
    map.setBearing(0);
  }, []);

  const handleToggleFullscreen = useCallback(() => {
    setIsFullscreen(prev => {
      const next = !prev;
      window.setTimeout(() => mapInstanceRef.current?.resize(), 100);
      return next;
    });
  }, []);

  // Compass drag-to-rotate (giống mapboxgl-ctrl-compass)
  const compassRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const btn = compassRef.current;
    if (!btn) return;

    let startX = 0;
    let startBearing = 0;
    let isDragging = false;

    const onMouseMove = (e: MouseEvent) => {
      const map = mapInstanceRef.current;
      if (!map) return;
      const dx = e.clientX - startX;
      map.setBearing(startBearing + dx * 0.5);
      setBearing(map.getBearing());
    };

    const onMouseUp = (e: MouseEvent) => {
      isDragging = false;
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      btn.style.cursor = 'pointer';
      // Nếu chỉ click (không drag) thì reset về Bắc
      if (Math.abs(e.clientX - startX) < 3) {
        const map = mapInstanceRef.current;
        if (!map) return;
        const center = map.getCenter();
        map.flyTo({ center: [center.lng, center.lat], zoom: map.getZoom() });
        map.setBearing(0);
        setBearing(0);
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      isDragging = true;
      startX = e.clientX;
      startBearing = mapInstanceRef.current?.getBearing() ?? 0;
      btn.style.cursor = 'ew-resize';
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    };

    btn.addEventListener('mousedown', onMouseDown);
    return () => {
      btn.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  const openSuggestion = selectedAddress ? selectedAddress.label : '';
  const showSuggestions = isInputFocused && (loadingSuggestions || suggestions.length > 0);

  return (
    <div className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50/70 p-4">
      {/* Search input */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-700">Tìm địa chỉ quán</label>
        <input
          type="text"
          value={query}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => {
            if (blurTimerRef.current) {
              window.clearTimeout(blurTimerRef.current);
            }
            blurTimerRef.current = window.setTimeout(() => {
              setIsInputFocused(false);
            }, 150);
          }}
          onChange={e => {
            setQuery(e.target.value);
            setSelectedAddress(null);
            setIsInputFocused(true);
          }}
          placeholder="Nhập tên đường, số nhà, phường/xã..."
          className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
        />
      </div>

      {showSuggestions && (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {loadingSuggestions && (
            <div className="px-4 py-3 text-sm text-slate-500">Đang tải gợi ý địa chỉ...</div>
          )}
          {!loadingSuggestions &&
            suggestions.map(item => (
              <button
                key={item.place_id}
                type="button"
                onMouseDown={e => {
                  e.preventDefault();
                  if (blurTimerRef.current) {
                    window.clearTimeout(blurTimerRef.current);
                  }
                }}
                onClick={() => applySelectedPlace(item)}
                className="flex w-full flex-col gap-1 border-t border-slate-100 px-4 py-3 text-left transition hover:bg-orange-50 first:border-t-0"
              >
                <span className="text-sm font-semibold text-slate-900">
                  {item.structured_formatting?.main_text || item.description}
                </span>
                <span className="text-xs text-slate-500">
                  {item.structured_formatting?.secondary_text || item.description}
                </span>
              </button>
            ))}
        </div>
      )}

      {/* 50/50 split: map | info panel */}
      <div className="grid gap-4 lg:grid-cols-2">

        {/* ── LEFT: Map với controls overlay bên trong ── */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          {/* Map wrapper – khi fullscreen chỉ phần này expand */}
          <div
            className={
              isFullscreen
                ? 'fixed inset-0 z-50 overflow-hidden rounded-none'
                : 'relative'
            }
          >
            <div
              ref={mapRef}
              className={`w-full bg-slate-100 ${isFullscreen ? 'h-full' : 'h-[420px]'}`}
            />

            {/* Loading / error overlay */}
            {(loadingMap || pickerError) && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-950/10 px-4 text-center">
                <div className="max-w-sm rounded-2xl border border-white/50 bg-white/90 p-4 shadow-xl backdrop-blur">
                  <p className="text-sm font-semibold text-slate-900">
                    {loadingMap ? 'Đang tải bản đồ Goong...' : 'Không thể hiển thị bản đồ'}
                  </p>
                  {pickerError && <p className="mt-1 text-sm text-slate-600">{pickerError}</p>}
                  {!pickerError && !mapTilesKey && (
                    <p className="mt-1 text-sm text-slate-600">Cần cấu hình `VITE_GOONG_MAP_TILES_KEY`.</p>
                  )}
                </div>
              </div>
            )}

            {/* Map controls – overlay góc phải trên */}
            <div className="absolute right-3 top-3 flex flex-col gap-1.5">
              {/* Fullscreen toggle */}
              <button
                type="button"
                onClick={handleToggleFullscreen}
                title={isFullscreen ? 'Thu nhỏ' : 'Toàn màn hình'}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-xl bg-white/95 text-slate-600 shadow-md backdrop-blur transition hover:bg-orange-50 hover:text-orange-600"
              >
                {isFullscreen ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="4 14 10 14 10 20" /><polyline points="20 10 14 10 14 4" />
                    <line x1="10" y1="14" x2="3" y2="21" /><line x1="21" y1="3" x2="14" y2="10" />
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" />
                    <line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" />
                  </svg>
                )}
              </button>

              {/* Divider */}
              <div className="h-px w-8 bg-slate-200/60" />

              {/* Zoom in */}
              <button
                type="button"
                onClick={handleZoomIn}
                title="Phóng to"
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-xl bg-white/95 text-slate-600 shadow-md backdrop-blur transition hover:bg-orange-50 hover:text-orange-600"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </button>

              {/* Zoom out */}
              <button
                type="button"
                onClick={handleZoomOut}
                title="Thu nhỏ"
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-xl bg-white/95 text-slate-600 shadow-md backdrop-blur transition hover:bg-orange-50 hover:text-orange-600"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </button>

              {/* Divider */}
              <div className="h-px w-8 bg-slate-200/60" />

              {/* Compass – drag để xoay bản đồ, click để reset về Bắc */}
              <button
                ref={compassRef}
                type="button"
                title="Kéo để xoay · Click để về hướng Bắc"
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-xl bg-white/95 text-slate-600 shadow-md backdrop-blur transition hover:bg-orange-50 hover:text-orange-600"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  style={{ transform: `rotate(${-bearing}deg)`, transition: 'transform 0.05s linear' }}
                >
                  {/* North needle – orange */}
                  <path d="M12 3L14 11H10L12 3Z" fill="#f97316" />
                  {/* South needle – slate */}
                  <path d="M12 21L10 13H14L12 21Z" fill="#94a3b8" />
                  {/* Center dot */}
                  <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Thông tin địa chỉ đã chọn ── */}
        <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="space-y-1">
            <p className="text-sm font-medium text-slate-700">Thông tin đã chọn</p>
            <p className="text-xs text-slate-500">
              Các ô bên dưới được khóa, đồng bộ tự động từ Goong.
            </p>
          </div>

          <label className="block space-y-1.5">
            <span className="text-sm font-medium text-slate-700">Địa chỉ</span>
            <input
              type="text"
              value={value.streetAddress}
              readOnly
              className="w-full cursor-not-allowed rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-700 outline-none"
              placeholder="Chọn địa chỉ từ Goong"
            />
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label className="block space-y-1.5">
              <span className="text-sm font-medium text-slate-700">Thành phố</span>
              <input
                type="text"
                value={value.city}
                readOnly
                className="w-full cursor-not-allowed rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-700 outline-none"
                placeholder="Tự động điền"
              />
            </label>

            <label className="block space-y-1.5">
              <span className="text-sm font-medium text-slate-700">Quận/Huyện</span>
              <input
                type="text"
                value={value.district}
                readOnly
                className="w-full cursor-not-allowed rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-700 outline-none"
                placeholder="Tự động điền"
              />
            </label>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <label className="block space-y-1.5">
              <span className="text-sm font-medium text-slate-700">Latitude</span>
              <input
                type="text"
                value={value.latitude ?? ''}
                readOnly
                className="w-full cursor-not-allowed rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-700 outline-none"
                placeholder="Tự động điền"
              />
            </label>
            <label className="block space-y-1.5">
              <span className="text-sm font-medium text-slate-700">Longitude</span>
              <input
                type="text"
                value={value.longitude ?? ''}
                readOnly
                className="w-full cursor-not-allowed rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-700 outline-none"
                placeholder="Tự động điền"
              />
            </label>
          </div>

          {openSuggestion && (
            <div className="rounded-2xl border border-orange-100 bg-orange-50 px-4 py-3 text-sm text-orange-900">
              Địa chỉ đang chọn: {openSuggestion}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
package com.fooddelivery.restaurant.infrastructure.cloud;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class CloudinaryServiceImpl implements CloudinaryService {

    private final Cloudinary cloudinary;

    @Override
    public String upload(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new RuntimeException("Cannot upload an empty file");
        }

        try {
            Map<?, ?> result = cloudinary.uploader().upload(
                    file.getBytes(),
                    ObjectUtils.asMap("resource_type", "image")
            );

            Object secureUrl = result.get("secure_url");
            if (secureUrl instanceof String url && !url.isBlank()) {
                return url;
            }

            Object url = result.get("url");
            if (url instanceof String fallbackUrl && !fallbackUrl.isBlank()) {
                return fallbackUrl;
            }

            throw new RuntimeException("Cloudinary upload response did not include a usable URL");
        } catch (Exception ex) {
            throw new RuntimeException("Failed to upload image to Cloudinary", ex);
        }
    }
}

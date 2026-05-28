package com.fooddelivery.restaurant.infrastructure.cloud;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.time.Instant;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CloudinaryServiceImpl implements CloudinaryService {

    private final CloudinaryProperties properties;
    private final ObjectMapper objectMapper;
    private final RestTemplate restTemplate = new RestTemplate();

    @Override
    public String upload(MultipartFile file) {
        try {
            String uploadUrl = String.format("https://api.cloudinary.com/v1_1/%s/image/upload", properties.getCloudName());
            long timestamp = Instant.now().getEpochSecond();
            String signature = sign(String.format("timestamp=%d", timestamp));

            ByteArrayResource fileResource = new ByteArrayResource(file.getBytes()) {
                @Override
                public String getFilename() {
                    return file.getOriginalFilename() != null ? file.getOriginalFilename() : UUID.randomUUID().toString();
                }
            };

            MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
            body.add("file", fileResource);
            body.add("api_key", properties.getApiKey());
            body.add("timestamp", String.valueOf(timestamp));
            body.add("signature", signature);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.MULTIPART_FORM_DATA);

            HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);
            ResponseEntity<String> response = restTemplate.postForEntity(uploadUrl, requestEntity, String.class);

            Map<String, Object> result = objectMapper.readValue(response.getBody(), new TypeReference<>() {});
            Object secureUrl = result.get("secure_url");
            if (secureUrl instanceof String) {
                return (String) secureUrl;
            }

            Object url = result.get("url");
            if (url instanceof String) {
                return (String) url;
            }

            throw new RuntimeException("Cloudinary upload response did not include a usable URL");
        } catch (Exception ex) {
            throw new RuntimeException("Failed to upload image to Cloudinary", ex);
        }
    }

    private String sign(String payload) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-1");
            byte[] hashed = digest.digest((payload + properties.getApiSecret()).getBytes(StandardCharsets.UTF_8));
            StringBuilder hex = new StringBuilder();
            for (byte b : hashed) {
                hex.append(String.format("%02x", b));
            }
            return hex.toString();
        } catch (Exception ex) {
            throw new RuntimeException("Unable to calculate Cloudinary signature", ex);
        }
    }
}

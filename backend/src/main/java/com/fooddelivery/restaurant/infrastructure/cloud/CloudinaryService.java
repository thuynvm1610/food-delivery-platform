package com.fooddelivery.restaurant.infrastructure.cloud;

import org.springframework.web.multipart.MultipartFile;

public interface CloudinaryService {
    String upload(MultipartFile file);
}

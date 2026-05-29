-- =========================================================================
-- 1. ROLES
-- =========================================================================
INSERT INTO
        roles (id, name)
VALUES
        (
                '709a6506-a62a-4bfe-8da2-d510475419a0',
                'ROLE_CUSTOMER'
        ),
        (
                'd9a0aaa8-8f16-4e9c-a504-43cece6bbd36',
                'ROLE_DRIVER'
        ),
        (
                '9956eeaa-1adc-4519-902e-0fe9f2383913',
                'ROLE_RESTAURANT'
        ),
        (
                '19a07884-eb78-45a4-a99c-a49e132c284c',
                'ROLE_ADMIN'
        );

-- =========================================================================
-- 2. USERS  (1 admin + 5 customers + 3 drivers + 3 owners = 12)
-- =========================================================================
INSERT INTO
        users (
                id,
                email,
                password_hash,
                first_name,
                last_name,
                avatar_url,
                role_id,
                created_at
        )
VALUES
        (
                'b52dfc2e-c948-45bf-a9ec-654b2211cbb4',
                'admin@foody.vn',
                '$2a$10$LMiZg/7VBcYV8RC2yHezpO8OmR79nCFpc3a5z9YdbNtdSx40mGPjm',
                NULL,
                NULL,
                NULL,
                '19a07884-eb78-45a4-a99c-a49e132c284c',
                '2024-01-01 07:00:00'
        ),
        (
                '8774fcd7-84c1-4eda-afbf-7cc56902c662',
                'nguyenminhtuanhn@gmail.com',
                '$2a$10$LMiZg/7VBcYV8RC2yHezpO8OmR79nCFpc3a5z9YdbNtdSx40mGPjm',
                N'Nguyễn Minh',
                N'Tuấn',
                NULL,
                '709a6506-a62a-4bfe-8da2-d510475419a0',
                '2024-02-10 08:30:00'
        ),
        (
                'a226b988-abaf-42f5-b79f-90a6d79efc18',
                'tranthilan.hcm@gmail.com',
                '$2a$10$LMiZg/7VBcYV8RC2yHezpO8OmR79nCFpc3a5z9YdbNtdSx40mGPjm',
                N'Trần Thị',
                N'Lan',
                NULL,
                '709a6506-a62a-4bfe-8da2-d510475419a0',
                '2024-02-14 09:00:00'
        ),
        (
                '50298a1c-7586-407c-a079-e9091d47e698',
                'lehoangphuc97@gmail.com',
                '$2a$10$LMiZg/7VBcYV8RC2yHezpO8OmR79nCFpc3a5z9YdbNtdSx40mGPjm',
                N'Lê Hoàng',
                N'Phúc',
                NULL,
                '709a6506-a62a-4bfe-8da2-d510475419a0',
                '2024-02-20 10:15:00'
        ),
        (
                '39548e8b-7022-46df-a028-f83e5778830a',
                'phamthuydung.hn@gmail.com',
                '$2a$10$LMiZg/7VBcYV8RC2yHezpO8OmR79nCFpc3a5z9YdbNtdSx40mGPjm',
                N'Phạm Thùy',
                N'Dung',
                NULL,
                '709a6506-a62a-4bfe-8da2-d510475419a0',
                '2024-03-01 11:00:00'
        ),
        (
                '3f9c05ba-6bd9-4ad8-93da-41586a58971c',
                'vuducanh.bk@gmail.com',
                '$2a$10$LMiZg/7VBcYV8RC2yHezpO8OmR79nCFpc3a5z9YdbNtdSx40mGPjm',
                N'Vũ Đức',
                N'Anh',
                NULL,
                '709a6506-a62a-4bfe-8da2-d510475419a0',
                '2024-03-05 08:00:00'
        ),
        (
                '11b65227-8ea6-44c4-b3bd-1f76439aa67e',
                'tranvanbinh.xe@gmail.com',
                '$2a$10$LMiZg/7VBcYV8RC2yHezpO8OmR79nCFpc3a5z9YdbNtdSx40mGPjm',
                N'Trần Văn',
                N'Bình',
                NULL,
                'd9a0aaa8-8f16-4e9c-a504-43cece6bbd36',
                '2024-01-15 06:00:00'
        ),
        (
                '4d9078cb-dcf6-475c-b043-ef1e3475fb6f',
                'nguyenthanhlong.ship@gmail.com',
                '$2a$10$LMiZg/7VBcYV8RC2yHezpO8OmR79nCFpc3a5z9YdbNtdSx40mGPjm',
                N'Nguyễn Thành',
                N'Long',
                NULL,
                'd9a0aaa8-8f16-4e9c-a504-43cece6bbd36',
                '2024-01-20 06:30:00'
        ),
        (
                '93ebceb4-8402-4c08-ae7f-b73ca366a315',
                'lequanghai.rider@gmail.com',
                '$2a$10$LMiZg/7VBcYV8RC2yHezpO8OmR79nCFpc3a5z9YdbNtdSx40mGPjm',
                N'Lê Quang',
                N'Hải',
                NULL,
                'd9a0aaa8-8f16-4e9c-a504-43cece6bbd36',
                '2024-01-25 07:00:00'
        ),
        (
                '8dde8a6d-16e4-4bee-a211-94625d05d98f',
                'quanphothinhloduchn@gmail.com',
                '$2a$10$LMiZg/7VBcYV8RC2yHezpO8OmR79nCFpc3a5z9YdbNtdSx40mGPjm',
                NULL,
                NULL,
                NULL,
                '9956eeaa-1adc-4519-902e-0fe9f2383913',
                '2024-01-05 06:00:00'
        ),
        (
                '1156b32c-fb62-4721-931a-efd7ab467485',
                'buncharestaurant.hn@gmail.com',
                '$2a$10$LMiZg/7VBcYV8RC2yHezpO8OmR79nCFpc3a5z9YdbNtdSx40mGPjm',
                NULL,
                NULL,
                NULL,
                '9956eeaa-1adc-4519-902e-0fe9f2383913',
                '2024-01-06 06:00:00'
        ),
        (
                'd1cf8b00-a37d-4434-973e-b09f1ec05202',
                'pizzasaigonhouse.hcm@gmail.com',
                '$2a$10$LMiZg/7VBcYV8RC2yHezpO8OmR79nCFpc3a5z9YdbNtdSx40mGPjm',
                NULL,
                NULL,
                NULL,
                '9956eeaa-1adc-4519-902e-0fe9f2383913',
                '2024-01-07 06:00:00'
        );

-- =========================================================================
-- 3. DRIVER_PROFILES
-- =========================================================================
INSERT INTO
        driver_profiles (
                user_id,
                license_plate,
                vehicle_type,
                latitude,
                longitude,
                is_online
        )
VALUES
        (
                '11b65227-8ea6-44c4-b3bd-1f76439aa67e',
                '29B1-23456',
                N'Xe máy Honda Wave',
                21.0285,
                105.8542,
                FALSE
        ),
        (
                '4d9078cb-dcf6-475c-b043-ef1e3475fb6f',
                '29A3-87654',
                N'Xe máy Yamaha Exciter',
                21.021,
                105.839,
                FALSE
        ),
        (
                '93ebceb4-8402-4c08-ae7f-b73ca366a315',
                '51F9-33445',
                N'Xe máy Honda Air Blade',
                10.7769,
                106.6952,
                FALSE
        );

-- =========================================================================
-- 4. CUSTOMER_PROFILES
-- =========================================================================
INSERT INTO
        customer_profiles (user_id, loyalty_points)
VALUES
        ('8774fcd7-84c1-4eda-afbf-7cc56902c662', 320),
        ('a226b988-abaf-42f5-b79f-90a6d79efc18', 180),
        ('50298a1c-7586-407c-a079-e9091d47e698', 90),
        ('39548e8b-7022-46df-a028-f83e5778830a', 450),
        ('3f9c05ba-6bd9-4ad8-93da-41586a58971c', 210);

-- =========================================================================
-- 5. CUSTOMER_ADDRESSES  (2 địa chỉ mỗi khách, 1 mặc định)
-- =========================================================================
INSERT INTO
        customer_addresses (
                id,
                user_id,
                label,
                street_address,
                city,
                district,
                latitude,
                longitude,
                is_default,
                created_at
        )
VALUES
        (
                'feb28a1f-ff5d-49ad-a923-8f0473380c45',
                '8774fcd7-84c1-4eda-afbf-7cc56902c662',
                N'Nhà riêng',
                N'12 Lý Thường Kiệt',
                N'TP. Hà Nội',
                N'Hoàn Kiếm',
                21.0245,
                105.851,
                TRUE,
                '2024-03-01 00:00:00'
        ),
        (
                '3facfbd4-198b-4a13-9196-73ffe1320d25',
                '8774fcd7-84c1-4eda-afbf-7cc56902c662',
                N'Công ty',
                N'18 Trần Hưng Đạo',
                N'TP. Hà Nội',
                N'Hai Bà Trưng',
                21.0195,
                105.8513,
                FALSE,
                '2024-03-01 00:00:00'
        ),
        (
                '96095814-5778-42f0-b4e2-9ebf9df0efb7',
                'a226b988-abaf-42f5-b79f-90a6d79efc18',
                N'Nhà riêng',
                N'45 Nguyễn Thị Minh Khai',
                N'TP. Hồ Chí Minh',
                N'Quận 1',
                10.7769,
                106.6952,
                TRUE,
                '2024-03-01 00:00:00'
        ),
        (
                '592bdee2-e5a0-492d-b79a-2f0c7fe0ec05',
                'a226b988-abaf-42f5-b79f-90a6d79efc18',
                N'Nhà bạn',
                N'88 Lê Văn Sỹ',
                N'TP. Hồ Chí Minh',
                N'Phú Nhuận',
                10.8012,
                106.6798,
                FALSE,
                '2024-03-01 00:00:00'
        ),
        (
                '25c0e633-a928-44c6-bd16-75c2a9eccc41',
                '50298a1c-7586-407c-a079-e9091d47e698',
                N'Nhà riêng',
                N'23 Bạch Đằng',
                N'TP. Hà Nội',
                N'Hai Bà Trưng',
                21.0195,
                105.8513,
                TRUE,
                '2024-03-01 00:00:00'
        ),
        (
                '2e12ca56-56a0-443d-9d61-2f5db514d837',
                '50298a1c-7586-407c-a079-e9091d47e698',
                N'Phòng trọ',
                N'67 Tạ Quang Bửu',
                N'TP. Hà Nội',
                N'Hai Bà Trưng',
                21.018,
                105.843,
                FALSE,
                '2024-03-01 00:00:00'
        ),
        (
                'aed9c0f6-29c0-4c07-963b-1a400880b722',
                '39548e8b-7022-46df-a028-f83e5778830a',
                N'Nhà riêng',
                N'34 Xuân Thủy',
                N'TP. Hà Nội',
                N'Cầu Giấy',
                21.038,
                105.784,
                TRUE,
                '2024-03-01 00:00:00'
        ),
        (
                '73c0c7be-56d3-423c-91e6-2a1a5e1d90e4',
                '39548e8b-7022-46df-a028-f83e5778830a',
                N'Công ty',
                N'14 Láng Hạ',
                N'TP. Hà Nội',
                N'Đống Đa',
                21.026,
                105.823,
                FALSE,
                '2024-03-01 00:00:00'
        ),
        (
                '28998205-3ce6-4ff3-999e-299f8c924e80',
                '3f9c05ba-6bd9-4ad8-93da-41586a58971c',
                N'Nhà riêng',
                N'99 Đinh Tiên Hoàng',
                N'TP. Hồ Chí Minh',
                N'Bình Thạnh',
                10.8036,
                106.7197,
                TRUE,
                '2024-03-01 00:00:00'
        ),
        (
                '4cc27d51-acf6-41a6-8004-d431e96176b9',
                '3f9c05ba-6bd9-4ad8-93da-41586a58971c',
                N'Ký túc xá',
                N'1 Võ Văn Ngân',
                N'TP. Hồ Chí Minh',
                N'Thành phố Thủ Đức',
                10.85,
                106.771,
                FALSE,
                '2024-03-01 00:00:00'
        );

-- =========================================================================
-- 6. RESTAURANTS
-- =========================================================================
INSERT INTO
        restaurants (
                id,
                owner_id,
                name,
                description,
                street_address,
                city,
                district,
                latitude,
                longitude,
                cover_image_url,
                status,
                created_at
        )
VALUES
        (
                'f09f2191-2088-4087-a52f-c181152af535',
                '8dde8a6d-16e4-4bee-a211-94625d05d98f',
                N'Phở Thìn Lò Đúc',
                N'Phở bò truyền thống Hà Nội hơn 40 năm, nổi tiếng với nước dùng trong veo và thịt bò tái xào sả ớt',
                N'13 Lò Đúc',
                N'TP. Hà Nội',
                N'Hai Bà Trưng',
                21.0181,
                105.851,
                NULL,
                'OPEN',
                '2024-01-15 06:00:00'
        ),
        (
                '62689fdc-2062-4964-b429-e64db59d07b1',
                '1156b32c-fb62-4721-931a-efd7ab467485',
                N'Bún Chả Hương Liên',
                N'Quán bún chả nổi tiếng nhất Hà Nội, từng đón tiếp Tổng thống Mỹ Barack Obama năm 2016',
                N'24 Lê Văn Hưu',
                N'TP. Hà Nội',
                N'Hai Bà Trưng',
                21.0245,
                105.8513,
                NULL,
                'OPEN',
                '2024-01-16 06:00:00'
        ),
        (
                '8589221b-9ebe-430d-a475-65a1f2ef5825',
                'd1cf8b00-a37d-4434-973e-b09f1ec05202',
                N'Pizza Sài Gòn House',
                N'Pizza phong cách Ý kết hợp topping đặc trưng Việt Nam, không gian trẻ trung hiện đại',
                N'88 Hoàng Diệu 2',
                N'TP. Hồ Chí Minh',
                N'Thành phố Thủ Đức',
                10.8415,
                106.751,
                NULL,
                'OPEN',
                '2024-01-17 08:00:00'
        );

-- =========================================================================
-- 7. RESTAURANT_OPERATING_HOURS
-- day_of_week: 2=Thứ Hai, 3=Thứ Ba, 4=Thứ Tư, 5=Thứ Năm,
--              6=Thứ Sáu, 7=Thứ Bảy, 8=Chủ Nhật
-- =========================================================================
INSERT INTO
        restaurant_operating_hours (
                id,
                restaurant_id,
                day_of_week,
                open_hour,
                close_hour
        )
VALUES
        -- Phở Thìn Lò Đúc: Thứ Hai → Chủ Nhật (2–8)
        (
                '3e220f6f-65bb-4a2c-ba50-7bacbe062333',
                'f09f2191-2088-4087-a52f-c181152af535',
                2,
                6,
                22
        ),
        (
                '38f0297c-2870-4da3-9e60-45a48016b6f4',
                'f09f2191-2088-4087-a52f-c181152af535',
                3,
                6,
                22
        ),
        (
                '1cb75a0b-a812-4284-b5de-ef4b3de10ec8',
                'f09f2191-2088-4087-a52f-c181152af535',
                4,
                6,
                22
        ),
        (
                '9dfce036-9a17-40ca-aa36-4083fa270c3f',
                'f09f2191-2088-4087-a52f-c181152af535',
                5,
                6,
                22
        ),
        (
                '39ab6fb7-4ccf-4af1-aee9-2259a18f91dc',
                'f09f2191-2088-4087-a52f-c181152af535',
                6,
                6,
                22
        ),
        (
                '31694725-f84b-478f-8e7d-28ff4337cab6',
                'f09f2191-2088-4087-a52f-c181152af535',
                7,
                6,
                22
        ),
        (
                'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
                'f09f2191-2088-4087-a52f-c181152af535',
                8,
                9,
                21
        ),
        -- Bún Chả Hương Liên: Thứ Hai → Thứ Bảy (2–7), Chủ Nhật (8) đóng cửa
        (
                '6440b0f0-457b-4ee8-9c00-f957909c4e92',
                '62689fdc-2062-4964-b429-e64db59d07b1',
                2,
                10,
                21
        ),
        (
                '36ef4473-0e7a-4d32-892c-84cc626bb674',
                '62689fdc-2062-4964-b429-e64db59d07b1',
                3,
                10,
                21
        ),
        (
                '3248a36b-59dd-433b-a856-14cb0758e8a4',
                '62689fdc-2062-4964-b429-e64db59d07b1',
                4,
                10,
                21
        ),
        (
                'e3a9ca00-a367-4e95-ba85-6051c2ee713d',
                '62689fdc-2062-4964-b429-e64db59d07b1',
                5,
                10,
                21
        ),
        (
                'be8d2379-3152-4782-b3cf-b5a94edb05d6',
                '62689fdc-2062-4964-b429-e64db59d07b1',
                6,
                10,
                21
        ),
        (
                'e65caae9-3643-417b-8972-76b5856a81a7',
                '62689fdc-2062-4964-b429-e64db59d07b1',
                7,
                10,
                22
        ),
        -- Pizza Sài Gòn House: Thứ Ba → Chủ Nhật (3–8)
        (
                'fb443f56-d861-49d4-9c9b-314b2560d112',
                '8589221b-9ebe-430d-a475-65a1f2ef5825',
                3,
                11,
                22
        ),
        (
                '44408339-2e04-4dc4-981f-7f6d9a22a4fe',
                '8589221b-9ebe-430d-a475-65a1f2ef5825',
                4,
                11,
                22
        ),
        (
                '0cf0490e-e21e-4bff-801b-4ee34e676c48',
                '8589221b-9ebe-430d-a475-65a1f2ef5825',
                5,
                11,
                22
        ),
        (
                'edebe052-11b9-4383-809f-9ee5f212352a',
                '8589221b-9ebe-430d-a475-65a1f2ef5825',
                6,
                11,
                23
        ),
        (
                '36c04fe8-69a3-4ae9-9b71-49d654b19cf5',
                '8589221b-9ebe-430d-a475-65a1f2ef5825',
                7,
                11,
                23
        ),
        (
                'b2c3d4e5-f6a7-8901-bcde-f12345678901',
                '8589221b-9ebe-430d-a475-65a1f2ef5825',
                8,
                12,
                22
        );

-- =========================================================================
-- 8. DISH_CATEGORIES  (platform-wide)
-- =========================================================================
INSERT INTO
        dish_categories (id, name, description)
VALUES
        (
                'f69dcaac-f5b1-4378-9af9-ccb3d320289e',
                N'Đồ ăn',
                N'Các món ăn mặn, ăn no'
        ),
        (
                '5900f6e0-f3ea-4a8f-9212-e9cedb060d94',
                N'Đồ uống',
                N'Nước giải khát, trà, cà phê, sinh tố'
        ),
        (
                '0daba25c-0867-4180-b092-ed40962a41a8',
                N'Đồ chay',
                N'Món ăn thuần chay, không thịt cá'
        ),
        (
                'd52abdb1-3e12-4026-96e9-be2efafa2fcf',
                N'Bánh kem',
                N'Bánh kem, bánh ngọt các loại'
        ),
        (
                '509679de-1d76-4ca9-91ac-c102b59881b3',
                N'Tráng miệng',
                N'Chè, kem, bánh flan và các món tráng miệng'
        ),
        (
                'aa14c18d-06c8-43db-ab91-581d4c9e4277',
                N'Pizza/Burger',
                N'Pizza, burger, đồ ăn phong cách phương Tây'
        ),
        (
                'd2311021-6a3f-4a2e-82fc-27ade0bbdd65',
                N'Món lẩu',
                N'Lẩu các loại'
        ),
        (
                '1a2d329a-27ab-4d99-96bd-21bdae4dea72',
                N'Sushi',
                N'Sushi, sashimi, món Nhật'
        ),
        (
                '80f767a2-cd16-453d-8b3b-c61f3103bfeb',
                N'Mì phở',
                N'Phở, bún, mì, hủ tiếu và các món nước'
        ),
        (
                '1f3a37e8-6e77-4ca2-8ed5-26c01a3afad2',
                N'Cơm hộp',
                N'Cơm văn phòng, cơm hộp tiện lợi'
        );

-- =========================================================================
-- 9. DISHES  (6 món mỗi quán = 18 tổng)
-- =========================================================================
INSERT INTO
        dishes (
                id,
                restaurant_id,
                name,
                description,
                price_amount,
                price_currency,
                is_available,
                created_at
        )
VALUES
        (
                '04c815b5-9ec5-424d-a6fe-1bf3779687f0',
                'f09f2191-2088-4087-a52f-c181152af535',
                N'Phở bò tái đặc biệt',
                N'Phở bò tái chín combo: tái, gầu, gân, sách – nước dùng hầm 12 tiếng',
                85000.00,
                'VND',
                TRUE,
                '2024-01-15 07:00:00'
        ),
        (
                '1e50aab7-a160-46e4-bfa4-3505a482dac8',
                'f09f2191-2088-4087-a52f-c181152af535',
                N'Phở bò tái',
                N'Phở bò tái chín chuẩn vị Hà Nội, nước trong ngọt tự nhiên',
                65000.00,
                'VND',
                TRUE,
                '2024-01-15 07:05:00'
        ),
        (
                '3f80d47c-d991-4a22-b97d-6c2de91af2f5',
                'f09f2191-2088-4087-a52f-c181152af535',
                N'Phở bò tái lăn',
                N'Bò tái xào sả ớt thơm lừng – đặc sản riêng của Phở Thìn',
                75000.00,
                'VND',
                TRUE,
                '2024-01-15 07:10:00'
        ),
        (
                '112e5723-bb99-4e04-8e16-e46cc786927c',
                'f09f2191-2088-4087-a52f-c181152af535',
                N'Phở gà ta',
                N'Phở gà ta luộc xé, nước dùng thanh ngọt không béo',
                55000.00,
                'VND',
                TRUE,
                '2024-01-15 07:15:00'
        ),
        (
                '525c5597-2e98-4a62-95ea-125f7e53ebca',
                'f09f2191-2088-4087-a52f-c181152af535',
                N'Quẩy nóng',
                N'Quẩy chiên giòn ăn kèm phở (2 cái)',
                10000.00,
                'VND',
                TRUE,
                '2024-01-15 07:20:00'
        ),
        (
                '0d7e393e-0560-4eb0-ba88-9d4c8406fe5e',
                'f09f2191-2088-4087-a52f-c181152af535',
                N'Trà đá Thái Nguyên',
                N'Trà mạn Thái Nguyên pha đá mát lạnh',
                5000.00,
                'VND',
                TRUE,
                '2024-01-15 07:25:00'
        ),
        (
                'a04c1797-6435-4805-ba02-225d1af8f410',
                '62689fdc-2062-4964-b429-e64db59d07b1',
                N'Bún chả Obama',
                N'Suất bún chả đặc biệt như Obama thưởng thức: chả miếng + chả viên nướng than',
                80000.00,
                'VND',
                TRUE,
                '2024-01-16 07:00:00'
        ),
        (
                'c83db4d2-79b9-4d02-a4ed-beac07ef87aa',
                '62689fdc-2062-4964-b429-e64db59d07b1',
                N'Bún chả thường',
                N'Bún chả nướng than hoa truyền thống, kèm rau sống và nước mắm chua ngọt',
                65000.00,
                'VND',
                TRUE,
                '2024-01-16 07:05:00'
        ),
        (
                '0d3df7bc-d38d-4ad6-a6f8-5167c9c3599f',
                '62689fdc-2062-4964-b429-e64db59d07b1',
                N'Bún chả sườn',
                N'Bún chả kèm sườn sụn nướng mật ong thơm lừng',
                90000.00,
                'VND',
                TRUE,
                '2024-01-16 07:10:00'
        ),
        (
                'dd86f01f-5f03-4ab7-9fab-afe4208bdd35',
                '62689fdc-2062-4964-b429-e64db59d07b1',
                N'Nem cuốn tôm thịt',
                N'Nem cuốn tươi tôm thịt rau sống chấm tương hoisin (3 cuốn)',
                35000.00,
                'VND',
                TRUE,
                '2024-01-16 07:15:00'
        ),
        (
                '54035a4f-ed38-411f-b295-9f1cb4b2b40f',
                '62689fdc-2062-4964-b429-e64db59d07b1',
                N'Chả giò rán',
                N'Chả giò nhân thịt cua bể chiên giòn (5 cái)',
                45000.00,
                'VND',
                TRUE,
                '2024-01-16 07:20:00'
        ),
        (
                'd5686a1b-012a-464b-b7c8-954907d7cc65',
                '62689fdc-2062-4964-b429-e64db59d07b1',
                N'Bia Hà Nội lon',
                N'Bia Hà Nội lon 330ml ướp lạnh',
                20000.00,
                'VND',
                TRUE,
                '2024-01-16 07:25:00'
        ),
        (
                '13af6215-39d8-4b1a-9ab9-86710a386f28',
                '8589221b-9ebe-430d-a475-65a1f2ef5825',
                N'Pizza Sài Gòn đặc biệt',
                N'Pizza đế mỏng giòn: xúc xích, thịt nguội, ớt chuông, phô mai mozzarella (size M)',
                145000.00,
                'VND',
                TRUE,
                '2024-01-17 09:00:00'
        ),
        (
                '8ef1701d-e929-443a-ba71-a292b7252961',
                '8589221b-9ebe-430d-a475-65a1f2ef5825',
                N'Pizza hải sản',
                N'Pizza tôm mực cà chua bi rau arugula phô mai tan chảy (size M)',
                155000.00,
                'VND',
                TRUE,
                '2024-01-17 09:05:00'
        ),
        (
                'fbd30f00-03d7-4076-875b-7ed936025aa1',
                '8589221b-9ebe-430d-a475-65a1f2ef5825',
                N'Pizza chay nấm',
                N'Pizza chay: nấm hương, nấm rơm, phô mai, sốt pesto (size M)',
                125000.00,
                'VND',
                TRUE,
                '2024-01-17 09:10:00'
        ),
        (
                'd4c49b36-cc5d-4484-96ad-0eaa6ef9873d',
                '8589221b-9ebe-430d-a475-65a1f2ef5825',
                N'Burger bò Wagyu',
                N'Burger bò Wagyu 150g, phô mai cheddar, dưa chua, sốt BBQ khói',
                95000.00,
                'VND',
                TRUE,
                '2024-01-17 09:15:00'
        ),
        (
                'dccc6688-a910-4fe0-b503-5c6fa1f64e6e',
                '8589221b-9ebe-430d-a475-65a1f2ef5825',
                N'Khoai tây chiên',
                N'Khoai tây chiên vàng giòn, muối hạt, sốt phô mai (phần lớn)',
                45000.00,
                'VND',
                TRUE,
                '2024-01-17 09:20:00'
        ),
        (
                '4fe92ce8-070b-4767-8d2f-55f96837ad98',
                '8589221b-9ebe-430d-a475-65a1f2ef5825',
                N'Pepsi lon',
                N'Pepsi lon 330ml',
                20000.00,
                'VND',
                TRUE,
                '2024-01-17 09:25:00'
        );

-- =========================================================================
-- 10. DISH_IMAGES
-- =========================================================================
INSERT INTO
        dish_images (id, dish_id, image_url, display_order)
VALUES
        -- Phở Thìn
        (
                'b1a00001-0000-0000-0000-000000000001',
                '04c815b5-9ec5-424d-a6fe-1bf3779687f0',
                'https://res.cloudinary.com/drity7uew/image/upload/v1780067704/phoBoTaiDB_v3qpov.jpg',
                0
        ),
        (
                'b1a00001-0000-0000-0000-000000000002',
                '1e50aab7-a160-46e4-bfa4-3505a482dac8',
                'https://res.cloudinary.com/drity7uew/image/upload/v1780067846/phoBoTai_vsgovw.jpg',
                0
        ),
        (
                'b1a00001-0000-0000-0000-000000000003',
                '3f80d47c-d991-4a22-b97d-6c2de91af2f5',
                'https://res.cloudinary.com/drity7uew/image/upload/v1780067906/phoBoTaiLan_shdtm2.jpg',
                0
        ),
        (
                'b1a00001-0000-0000-0000-000000000004',
                '112e5723-bb99-4e04-8e16-e46cc786927c',
                'https://res.cloudinary.com/drity7uew/image/upload/v1780067970/phoGaTa_n7qw49.jpg',
                0
        ),
        (
                'b1a00001-0000-0000-0000-000000000005',
                '525c5597-2e98-4a62-95ea-125f7e53ebca',
                'https://res.cloudinary.com/drity7uew/image/upload/v1780068043/quayNong_z6jxar.jpg',
                0
        ),
        (
                'b1a00001-0000-0000-0000-000000000006',
                '0d7e393e-0560-4eb0-ba88-9d4c8406fe5e',
                'https://res.cloudinary.com/drity7uew/image/upload/v1780068097/traDaThaiNguyen_inokdp.jpg',
                0
        ),
        -- Bún chả Hương Liên
        (
                'b1a00001-0000-0000-0000-000000000007',
                'a04c1797-6435-4805-ba02-225d1af8f410',
                'https://res.cloudinary.com/drity7uew/image/upload/v1780068186/bunChaObama_gzp7jv.jpg',
                0
        ),
        (
                'b1a00001-0000-0000-0000-000000000008',
                'c83db4d2-79b9-4d02-a4ed-beac07ef87aa',
                'https://res.cloudinary.com/drity7uew/image/upload/v1780068251/bunChaThuong_fbs9pk.jpg',
                0
        ),
        (
                'b1a00001-0000-0000-0000-000000000009',
                '0d3df7bc-d38d-4ad6-a6f8-5167c9c3599f',
                'https://res.cloudinary.com/drity7uew/image/upload/v1780068302/bunChaSuon_fq0cci.jpg',
                0
        ),
        (
                'b1a00001-0000-0000-0000-000000000010',
                'dd86f01f-5f03-4ab7-9fab-afe4208bdd35',
                'https://res.cloudinary.com/drity7uew/image/upload/v1780068371/nemCuonTomThit_kvmld4.jpg',
                0
        ),
        (
                'b1a00001-0000-0000-0000-000000000011',
                '54035a4f-ed38-411f-b295-9f1cb4b2b40f',
                'https://res.cloudinary.com/drity7uew/image/upload/v1780068448/chaGioRan_dhhwyn.jpg',
                0
        ),
        (
                'b1a00001-0000-0000-0000-000000000012',
                'd5686a1b-012a-464b-b7c8-954907d7cc65',
                'https://res.cloudinary.com/drity7uew/image/upload/v1780068519/biaHaNoiLon_xuhhpa.png',
                0
        ),
        -- Pizza/Burger
        (
                'b1a00001-0000-0000-0000-000000000013',
                '13af6215-39d8-4b1a-9ab9-86710a386f28',
                'https://res.cloudinary.com/drity7uew/image/upload/v1780068584/pizzaSaiGonDacBit_gl178k.jpg',
                0
        ),
        (
                'b1a00001-0000-0000-0000-000000000014',
                '8ef1701d-e929-443a-ba71-a292b7252961',
                'https://res.cloudinary.com/drity7uew/image/upload/v1780068603/pizzaHaiSan_pzwhrn.jpg',
                0
        ),
        (
                'b1a00001-0000-0000-0000-000000000015',
                'fbd30f00-03d7-4076-875b-7ed936025aa1',
                'https://res.cloudinary.com/drity7uew/image/upload/v1780068708/pizzaChayNam_cxwjl4.jpg',
                0
        ),
        (
                'b1a00001-0000-0000-0000-000000000016',
                'd4c49b36-cc5d-4484-96ad-0eaa6ef9873d',
                'https://res.cloudinary.com/drity7uew/image/upload/v1780068721/burgerBoWagyu_tuz8ji.jpg',
                0
        ),
        (
                'b1a00001-0000-0000-0000-000000000017',
                'dccc6688-a910-4fe0-b503-5c6fa1f64e6e',
                'https://res.cloudinary.com/drity7uew/image/upload/v1780068781/khoaiTayChien_pfsmli.jpg',
                0
        ),
        (
                'b1a00001-0000-0000-0000-000000000018',
                '4fe92ce8-070b-4767-8d2f-55f96837ad98',
                'https://res.cloudinary.com/drity7uew/image/upload/v1780068852/pepsiLon_exqff9.jpg',
                0
        );

-- =========================================================================
-- 10. DISH_CATEGORY_MAPPINGS
-- =========================================================================
INSERT INTO
        dish_category_mappings (dish_id, category_id)
VALUES
        (
                '04c815b5-9ec5-424d-a6fe-1bf3779687f0',
                '80f767a2-cd16-453d-8b3b-c61f3103bfeb'
        ),
        (
                '04c815b5-9ec5-424d-a6fe-1bf3779687f0',
                'f69dcaac-f5b1-4378-9af9-ccb3d320289e'
        ),
        (
                '1e50aab7-a160-46e4-bfa4-3505a482dac8',
                '80f767a2-cd16-453d-8b3b-c61f3103bfeb'
        ),
        (
                '1e50aab7-a160-46e4-bfa4-3505a482dac8',
                'f69dcaac-f5b1-4378-9af9-ccb3d320289e'
        ),
        (
                '3f80d47c-d991-4a22-b97d-6c2de91af2f5',
                '80f767a2-cd16-453d-8b3b-c61f3103bfeb'
        ),
        (
                '3f80d47c-d991-4a22-b97d-6c2de91af2f5',
                'f69dcaac-f5b1-4378-9af9-ccb3d320289e'
        ),
        (
                '112e5723-bb99-4e04-8e16-e46cc786927c',
                '80f767a2-cd16-453d-8b3b-c61f3103bfeb'
        ),
        (
                '112e5723-bb99-4e04-8e16-e46cc786927c',
                'f69dcaac-f5b1-4378-9af9-ccb3d320289e'
        ),
        (
                '525c5597-2e98-4a62-95ea-125f7e53ebca',
                'f69dcaac-f5b1-4378-9af9-ccb3d320289e'
        ),
        (
                '0d7e393e-0560-4eb0-ba88-9d4c8406fe5e',
                '5900f6e0-f3ea-4a8f-9212-e9cedb060d94'
        ),
        (
                'a04c1797-6435-4805-ba02-225d1af8f410',
                'f69dcaac-f5b1-4378-9af9-ccb3d320289e'
        ),
        (
                'c83db4d2-79b9-4d02-a4ed-beac07ef87aa',
                'f69dcaac-f5b1-4378-9af9-ccb3d320289e'
        ),
        (
                '0d3df7bc-d38d-4ad6-a6f8-5167c9c3599f',
                'f69dcaac-f5b1-4378-9af9-ccb3d320289e'
        ),
        (
                'dd86f01f-5f03-4ab7-9fab-afe4208bdd35',
                'f69dcaac-f5b1-4378-9af9-ccb3d320289e'
        ),
        (
                '54035a4f-ed38-411f-b295-9f1cb4b2b40f',
                'f69dcaac-f5b1-4378-9af9-ccb3d320289e'
        ),
        (
                'd5686a1b-012a-464b-b7c8-954907d7cc65',
                '5900f6e0-f3ea-4a8f-9212-e9cedb060d94'
        ),
        (
                '13af6215-39d8-4b1a-9ab9-86710a386f28',
                'aa14c18d-06c8-43db-ab91-581d4c9e4277'
        ),
        (
                '13af6215-39d8-4b1a-9ab9-86710a386f28',
                'f69dcaac-f5b1-4378-9af9-ccb3d320289e'
        ),
        (
                '8ef1701d-e929-443a-ba71-a292b7252961',
                'aa14c18d-06c8-43db-ab91-581d4c9e4277'
        ),
        (
                '8ef1701d-e929-443a-ba71-a292b7252961',
                'f69dcaac-f5b1-4378-9af9-ccb3d320289e'
        ),
        (
                'fbd30f00-03d7-4076-875b-7ed936025aa1',
                'aa14c18d-06c8-43db-ab91-581d4c9e4277'
        ),
        (
                'fbd30f00-03d7-4076-875b-7ed936025aa1',
                '0daba25c-0867-4180-b092-ed40962a41a8'
        ),
        (
                'd4c49b36-cc5d-4484-96ad-0eaa6ef9873d',
                'aa14c18d-06c8-43db-ab91-581d4c9e4277'
        ),
        (
                'd4c49b36-cc5d-4484-96ad-0eaa6ef9873d',
                'f69dcaac-f5b1-4378-9af9-ccb3d320289e'
        ),
        (
                'dccc6688-a910-4fe0-b503-5c6fa1f64e6e',
                'f69dcaac-f5b1-4378-9af9-ccb3d320289e'
        ),
        (
                '4fe92ce8-070b-4767-8d2f-55f96837ad98',
                '5900f6e0-f3ea-4a8f-9212-e9cedb060d94'
        );

-- =========================================================================
-- 11. VOUCHERS
-- FIX: used_count đồng bộ với số lần thực sự dùng trong orders
--   NEWUSER30K   : dùng 1 lần (008f5677)
--   PLATFORM15PCT: dùng 3 lần (6427466c, d1a7cc5e, 0074446d)
--   PHOTHINHVIP  : dùng 0 lần hợp lệ (907c3abb subtotal < min_order → xóa link, xem section 13)
--   PIZZA50K     : dùng 2 lần (f48bc76a subtotal < min_order → xóa link; a2e7c33e hợp lệ → 1 lần)
-- =========================================================================
INSERT INTO
        vouchers (
                id,
                code,
                issuer_type,
                restaurant_id,
                title,
                discount_type,
                discount_value,
                min_order_amount,
                max_discount_amount,
                valid_from,
                valid_to,
                usage_limit,
                used_count
        )
VALUES
        (
                'c1cbf058-bfce-4448-bbc6-93f73c93cd2e',
                'NEWUSER30K',
                'PLATFORM',
                NULL,
                N'Chào mừng thành viên mới – Giảm 30.000đ',
                'FIXED_AMOUNT',
                30000.00,
                60000.00,
                30000.00,
                '2024-01-01 00:00:00',
                '2026-12-31 23:59:59',
                5000,
                1 -- FIX: was 3, actual usage = 1 (order 008f5677)
        ),
        (
                'a7374d0e-0ca8-47e0-a6f4-a9a005514e6b',
                'PLATFORM15PCT',
                'PLATFORM',
                NULL,
                N'Giảm 15% tối đa 50k cho tất cả nhà hàng',
                'PERCENTAGE',
                15.00,
                100000.00,
                50000.00,
                '2024-01-01 00:00:00',
                '2026-12-31 23:59:59',
                2000,
                3 -- FIX: was 5, actual usage = 3 (6427466c, d1a7cc5e, 0074446d)
        ),
        (
                'a0847d10-6cd2-46e5-b26f-cc13a545c648',
                'PHOTHINHVIP',
                'RESTAURANT',
                'f09f2191-2088-4087-a52f-c181152af535',
                N'Phở Thìn – Giảm 10% cho khách quen',
                'PERCENTAGE',
                10.00,
                130000.00,
                20000.00,
                '2024-01-15 00:00:00',
                '2026-12-31 23:59:59',
                500,
                0 -- FIX: was 4; order 907c3abb subtotal(105k) < min_order(130k) → link bị xóa → 0 lần hợp lệ
        ),
        (
                'cefec9ea-4021-4f6e-8f4e-5ace2421e5e3',
                'PIZZA50K',
                'RESTAURANT',
                '8589221b-9ebe-430d-a475-65a1f2ef5825',
                N'Pizza Sài Gòn – Giảm 50k cuối tuần',
                'FIXED_AMOUNT',
                50000.00,
                300000.00,
                50000.00,
                '2024-01-17 00:00:00',
                '2026-12-31 23:59:59',
                200,
                1 -- FIX: was 2; f48bc76a subtotal(230k) < min_order(300k) → link bị xóa; chỉ còn a2e7c33e(340k) hợp lệ
        );

-- =========================================================================
-- 12. WALLETS
-- =========================================================================
INSERT INTO
        wallets (id, user_id, balance_amount, currency)
VALUES
        (
                '0ab2ddfb-a719-48a7-86dc-46dca0959f5f',
                '11b65227-8ea6-44c4-b3bd-1f76439aa67e',
                0.00,
                'VND'
        ),
        (
                '9daf3a0c-1c2b-408c-a988-cc6776437479',
                '4d9078cb-dcf6-475c-b043-ef1e3475fb6f',
                0.00,
                'VND'
        ),
        (
                'b06f898e-3e51-4879-b941-16c7a218a1ba',
                '93ebceb4-8402-4c08-ae7f-b73ca366a315',
                0.00,
                'VND'
        ),
        (
                '94afc3f3-f767-4c12-b9ec-c70feef77538',
                '8dde8a6d-16e4-4bee-a211-94625d05d98f',
                0.00,
                'VND'
        ),
        (
                '5483bef5-6604-4313-a467-bcbe76db8bd4',
                '1156b32c-fb62-4721-931a-efd7ab467485',
                0.00,
                'VND'
        ),
        (
                '2538ad91-a1b5-48eb-b894-670e2b3ea1ff',
                'd1cf8b00-a37d-4434-973e-b09f1ec05202',
                0.00,
                'VND'
        ),
        (
                '3d3eace5-bc5c-47af-bb81-d8860f2322bb',
                'b52dfc2e-c948-45bf-a9ec-654b2211cbb4',
                0.00,
                'VND'
        );

-- =========================================================================
-- 13. ORDERS  (20 đơn)
-- FIX:
--   907c3abb: voucher PHOTHINHVIP subtotal(105k) < min(130k) → voucher_id = NULL, discount = 0
--   f48bc76a: voucher PIZZA50K    subtotal(230k) < min(300k) → voucher_id = NULL, discount = 0
-- =========================================================================
INSERT INTO
        orders (
                id,
                customer_id,
                restaurant_id,
                voucher_id,
                delivery_address,
                delivery_city,
                delivery_district,
                delivery_latitude,
                delivery_longitude,
                status,
                subtotal_amount,
                delivery_fee_amount,
                discount_amount,
                total_amount,
                currency,
                created_at
        )
VALUES
        -- FIX: voucher_id NULL (subtotal 105k < min_order 130k của PHOTHINHVIP)
        (
                '907c3abb-4cca-49de-ae95-d534353797c0',
                '8774fcd7-84c1-4eda-afbf-7cc56902c662',
                'f09f2191-2088-4087-a52f-c181152af535',
                NULL,
                N'12 Lý Thường Kiệt',
                N'TP. Hà Nội',
                N'Hoàn Kiếm',
                21.0245,
                105.851,
                'CUSTOMER_CONFIRMED',
                105000.00,
                15000.00,
                0.00,
                120000.00,
                'VND',
                '2025-01-05 07:30:00'
        ),
        (
                '124a71f3-a9c2-4ebb-8bc2-626181133460',
                'a226b988-abaf-42f5-b79f-90a6d79efc18',
                'f09f2191-2088-4087-a52f-c181152af535',
                NULL,
                N'45 Nguyễn Thị Minh Khai',
                N'TP. Hồ Chí Minh',
                N'Quận 1',
                10.7769,
                106.6952,
                'CUSTOMER_CONFIRMED',
                140000.00,
                15000.00,
                0.00,
                155000.00,
                'VND',
                '2025-01-08 07:15:00'
        ),
        (
                '008f5677-e23e-49b0-af1f-5a0eb242404d',
                '50298a1c-7586-407c-a079-e9091d47e698',
                'f09f2191-2088-4087-a52f-c181152af535',
                'c1cbf058-bfce-4448-bbc6-93f73c93cd2e',
                N'23 Bạch Đằng',
                N'TP. Hà Nội',
                N'Hai Bà Trưng',
                21.0195,
                105.8513,
                'CUSTOMER_CONFIRMED',
                160000.00,
                15000.00,
                30000.00,
                145000.00,
                'VND',
                '2025-01-12 07:45:00'
        ),
        (
                '56b4b755-007c-4e07-b62c-59f356368988',
                '39548e8b-7022-46df-a028-f83e5778830a',
                'f09f2191-2088-4087-a52f-c181152af535',
                NULL,
                N'34 Xuân Thủy',
                N'TP. Hà Nội',
                N'Cầu Giấy',
                21.038,
                105.784,
                'CUSTOMER_CONFIRMED',
                165000.00,
                15000.00,
                0.00,
                180000.00,
                'VND',
                '2025-01-18 08:00:00'
        ),
        (
                'add00ef6-8323-4108-9c73-e15310958d6b',
                '3f9c05ba-6bd9-4ad8-93da-41586a58971c',
                'f09f2191-2088-4087-a52f-c181152af535',
                NULL,
                N'99 Đinh Tiên Hoàng',
                N'TP. Hồ Chí Minh',
                N'Bình Thạnh',
                10.8036,
                106.7197,
                'CANCELLED_BY_CUSTOMER',
                75000.00,
                15000.00,
                0.00,
                90000.00,
                'VND',
                '2025-01-22 07:30:00'
        ),
        (
                '0ed0e9ff-5ac9-4a64-aa50-4acf80c29aa0',
                '8774fcd7-84c1-4eda-afbf-7cc56902c662',
                'f09f2191-2088-4087-a52f-c181152af535',
                NULL,
                N'12 Lý Thường Kiệt',
                N'TP. Hà Nội',
                N'Hoàn Kiếm',
                21.0245,
                105.851,
                'CUSTOMER_CONFIRMED',
                140000.00,
                15000.00,
                0.00,
                155000.00,
                'VND',
                '2025-01-28 07:20:00'
        ),
        (
                'dea6534e-e889-4895-a55e-383978c515f1',
                'a226b988-abaf-42f5-b79f-90a6d79efc18',
                '62689fdc-2062-4964-b429-e64db59d07b1',
                NULL,
                N'45 Nguyễn Thị Minh Khai',
                N'TP. Hồ Chí Minh',
                N'Quận 1',
                10.7769,
                106.6952,
                'CUSTOMER_CONFIRMED',
                170000.00,
                18000.00,
                0.00,
                188000.00,
                'VND',
                '2025-02-01 11:00:00'
        ),
        (
                '6427466c-745c-4770-aeb0-ad542418617f',
                '39548e8b-7022-46df-a028-f83e5778830a',
                '62689fdc-2062-4964-b429-e64db59d07b1',
                'a7374d0e-0ca8-47e0-a6f4-a9a005514e6b',
                N'34 Xuân Thủy',
                N'TP. Hà Nội',
                N'Cầu Giấy',
                21.038,
                105.784,
                'CUSTOMER_CONFIRMED',
                150000.00,
                18000.00,
                22500.00,
                145500.00,
                'VND',
                '2025-02-05 11:30:00'
        ),
        (
                '5b7b8dd7-785c-4a60-a778-b97ebf0f500b',
                '50298a1c-7586-407c-a079-e9091d47e698',
                '62689fdc-2062-4964-b429-e64db59d07b1',
                NULL,
                N'23 Bạch Đằng',
                N'TP. Hà Nội',
                N'Hai Bà Trưng',
                21.0195,
                105.8513,
                'CUSTOMER_CONFIRMED',
                125000.00,
                18000.00,
                0.00,
                143000.00,
                'VND',
                '2025-02-09 12:00:00'
        ),
        (
                '219ba0b0-a63e-4e78-ba9b-f95f2def2be4',
                '3f9c05ba-6bd9-4ad8-93da-41586a58971c',
                '62689fdc-2062-4964-b429-e64db59d07b1',
                NULL,
                N'99 Đinh Tiên Hoàng',
                N'TP. Hồ Chí Minh',
                N'Bình Thạnh',
                10.8036,
                106.7197,
                'CUSTOMER_CONFIRMED',
                165000.00,
                18000.00,
                0.00,
                183000.00,
                'VND',
                '2025-02-13 11:15:00'
        ),
        (
                'c7f1509e-3397-4a3d-8a97-7138988c9b3c',
                '8774fcd7-84c1-4eda-afbf-7cc56902c662',
                '62689fdc-2062-4964-b429-e64db59d07b1',
                NULL,
                N'12 Lý Thường Kiệt',
                N'TP. Hà Nội',
                N'Hoàn Kiếm',
                21.0245,
                105.851,
                'CANCELLED_BY_RESTAURANT',
                135000.00,
                18000.00,
                0.00,
                153000.00,
                'VND',
                '2025-02-17 11:45:00'
        ),
        (
                'd1a7cc5e-0d93-4f21-a18a-6ec3eb674760',
                'a226b988-abaf-42f5-b79f-90a6d79efc18',
                '62689fdc-2062-4964-b429-e64db59d07b1',
                'a7374d0e-0ca8-47e0-a6f4-a9a005514e6b',
                N'45 Nguyễn Thị Minh Khai',
                N'TP. Hồ Chí Minh',
                N'Quận 1',
                10.7769,
                106.6952,
                'CUSTOMER_CONFIRMED',
                165000.00,
                18000.00,
                24750.00,
                158250.00,
                'VND',
                '2025-02-21 12:00:00'
        ),
        (
                'c8c85e84-35f5-4176-bc6b-12a153cc2afc',
                '39548e8b-7022-46df-a028-f83e5778830a',
                '62689fdc-2062-4964-b429-e64db59d07b1',
                NULL,
                N'34 Xuân Thủy',
                N'TP. Hà Nội',
                N'Cầu Giấy',
                21.038,
                105.784,
                'NO_DRIVER_AVAILABLE',
                210000.00,
                18000.00,
                0.00,
                228000.00,
                'VND',
                '2025-02-25 11:30:00'
        ),
        -- FIX: voucher_id NULL (subtotal 230k < min_order 300k của PIZZA50K)
        (
                'f48bc76a-92be-4d9b-a7cc-cdde89e9f141',
                '50298a1c-7586-407c-a079-e9091d47e698',
                '8589221b-9ebe-430d-a475-65a1f2ef5825',
                NULL,
                N'23 Bạch Đằng',
                N'TP. Hà Nội',
                N'Hai Bà Trưng',
                21.0195,
                105.8513,
                'CUSTOMER_CONFIRMED',
                230000.00,
                20000.00,
                0.00,
                250000.00,
                'VND',
                '2025-03-01 18:00:00'
        ),
        (
                'b2d0f65c-4c61-47da-bcc3-b91f2e23bfa1',
                '3f9c05ba-6bd9-4ad8-93da-41586a58971c',
                '8589221b-9ebe-430d-a475-65a1f2ef5825',
                NULL,
                N'99 Đinh Tiên Hoàng',
                N'TP. Hồ Chí Minh',
                N'Bình Thạnh',
                10.8036,
                106.7197,
                'CUSTOMER_CONFIRMED',
                250000.00,
                20000.00,
                0.00,
                270000.00,
                'VND',
                '2025-03-05 18:30:00'
        ),
        (
                'a79fef2a-9a4a-4f77-afce-d8d5ac01083a',
                'a226b988-abaf-42f5-b79f-90a6d79efc18',
                '8589221b-9ebe-430d-a475-65a1f2ef5825',
                NULL,
                N'45 Nguyễn Thị Minh Khai',
                N'TP. Hồ Chí Minh',
                N'Quận 1',
                10.7769,
                106.6952,
                'CUSTOMER_CONFIRMED',
                235000.00,
                20000.00,
                0.00,
                255000.00,
                'VND',
                '2025-03-09 19:00:00'
        ),
        (
                '0074446d-3875-421b-8231-d93704d799c7',
                '39548e8b-7022-46df-a028-f83e5778830a',
                '8589221b-9ebe-430d-a475-65a1f2ef5825',
                'a7374d0e-0ca8-47e0-a6f4-a9a005514e6b',
                N'34 Xuân Thủy',
                N'TP. Hà Nội',
                N'Cầu Giấy',
                21.038,
                105.784,
                'CUSTOMER_CONFIRMED',
                300000.00,
                20000.00,
                45000.00,
                275000.00,
                'VND',
                '2025-03-13 18:15:00'
        ),
        (
                'bd0cebc9-7c4f-4a23-8809-9d8d3922e068',
                '8774fcd7-84c1-4eda-afbf-7cc56902c662',
                '8589221b-9ebe-430d-a475-65a1f2ef5825',
                NULL,
                N'12 Lý Thường Kiệt',
                N'TP. Hà Nội',
                N'Hoàn Kiếm',
                21.0245,
                105.851,
                'CUSTOMER_CONFIRMED',
                180000.00,
                20000.00,
                0.00,
                200000.00,
                'VND',
                '2025-03-17 18:45:00'
        ),
        (
                '6f413118-0ae7-44d2-bf94-56bb4326b35f',
                '50298a1c-7586-407c-a079-e9091d47e698',
                '8589221b-9ebe-430d-a475-65a1f2ef5825',
                NULL,
                N'23 Bạch Đằng',
                N'TP. Hà Nội',
                N'Hai Bà Trưng',
                21.0195,
                105.8513,
                'CANCELLED_BY_CUSTOMER',
                220000.00,
                20000.00,
                0.00,
                240000.00,
                'VND',
                '2025-03-21 19:00:00'
        ),
        -- PIZZA50K hợp lệ: subtotal 340k >= min_order 300k, discount 50k
        (
                'a2e7c33e-5372-4eef-abfa-b070f35d29ad',
                '3f9c05ba-6bd9-4ad8-93da-41586a58971c',
                '8589221b-9ebe-430d-a475-65a1f2ef5825',
                'cefec9ea-4021-4f6e-8f4e-5ace2421e5e3',
                N'99 Đinh Tiên Hoàng',
                N'TP. Hồ Chí Minh',
                N'Bình Thạnh',
                10.8036,
                106.7197,
                'CUSTOMER_CONFIRMED',
                340000.00,
                20000.00,
                50000.00,
                310000.00,
                'VND',
                '2025-03-25 18:30:00'
        );

-- =========================================================================
-- 14. ORDER_ITEMS
-- =========================================================================
INSERT INTO
        order_items (
                id,
                order_id,
                dish_id,
                quantity,
                unit_price_amount,
                unit_price_currency
        )
VALUES
        (
                'f8b20c6e-a19e-4bef-90e8-85e9eaa03181',
                '907c3abb-4cca-49de-ae95-d534353797c0',
                '04c815b5-9ec5-424d-a6fe-1bf3779687f0',
                1,
                85000.00,
                'VND'
        ),
        (
                'ec49b27a-1122-44eb-9b09-0d78f4bae26c',
                '907c3abb-4cca-49de-ae95-d534353797c0',
                '525c5597-2e98-4a62-95ea-125f7e53ebca',
                1,
                10000.00,
                'VND'
        ),
        (
                '5167ce97-563d-4e24-8a29-70597f00ce90',
                '907c3abb-4cca-49de-ae95-d534353797c0',
                '0d7e393e-0560-4eb0-ba88-9d4c8406fe5e',
                2,
                5000.00,
                'VND'
        ),
        (
                '1591edd1-ba57-4bb0-9441-aad71df9cb89',
                '124a71f3-a9c2-4ebb-8bc2-626181133460',
                '1e50aab7-a160-46e4-bfa4-3505a482dac8',
                1,
                65000.00,
                'VND'
        ),
        (
                '8addd8d5-1ed8-444b-a2e8-d1f3b46176c3',
                '124a71f3-a9c2-4ebb-8bc2-626181133460',
                '3f80d47c-d991-4a22-b97d-6c2de91af2f5',
                1,
                75000.00,
                'VND'
        ),
        (
                '2c594de9-a646-438d-a15c-d4221a0f9286',
                '008f5677-e23e-49b0-af1f-5a0eb242404d',
                '04c815b5-9ec5-424d-a6fe-1bf3779687f0',
                1,
                85000.00,
                'VND'
        ),
        (
                'b86d4afb-fdba-416f-8ce3-b01d6dd086e5',
                '008f5677-e23e-49b0-af1f-5a0eb242404d',
                '112e5723-bb99-4e04-8e16-e46cc786927c',
                1,
                55000.00,
                'VND'
        ),
        (
                '5b594b25-3850-4af0-8be2-ad335c81c8f1',
                '008f5677-e23e-49b0-af1f-5a0eb242404d',
                '525c5597-2e98-4a62-95ea-125f7e53ebca',
                2,
                10000.00,
                'VND'
        ),
        (
                '83679501-d845-43d6-b198-317d07263d07',
                '56b4b755-007c-4e07-b62c-59f356368988',
                '3f80d47c-d991-4a22-b97d-6c2de91af2f5',
                2,
                75000.00,
                'VND'
        ),
        (
                'fdee4091-9531-469f-b9f3-04cb8e9f040e',
                '56b4b755-007c-4e07-b62c-59f356368988',
                '0d7e393e-0560-4eb0-ba88-9d4c8406fe5e',
                3,
                5000.00,
                'VND'
        ),
        (
                'd152a6dc-4647-4684-9018-42ebb0641b4b',
                'add00ef6-8323-4108-9c73-e15310958d6b',
                '1e50aab7-a160-46e4-bfa4-3505a482dac8',
                1,
                65000.00,
                'VND'
        ),
        (
                'e9125a3f-1121-4746-80c0-116599b69b0b',
                'add00ef6-8323-4108-9c73-e15310958d6b',
                '525c5597-2e98-4a62-95ea-125f7e53ebca',
                1,
                10000.00,
                'VND'
        ),
        (
                'ab617ce9-dc06-48cc-bdca-a8850cdb4864',
                '0ed0e9ff-5ac9-4a64-aa50-4acf80c29aa0',
                '04c815b5-9ec5-424d-a6fe-1bf3779687f0',
                1,
                85000.00,
                'VND'
        ),
        (
                '442ee79a-5a61-47a0-bfc1-32cc6ec2679d',
                '0ed0e9ff-5ac9-4a64-aa50-4acf80c29aa0',
                '112e5723-bb99-4e04-8e16-e46cc786927c',
                1,
                55000.00,
                'VND'
        ),
        (
                'fce9f1af-9273-43a4-92c8-ca48d4fee9dc',
                'dea6534e-e889-4895-a55e-383978c515f1',
                'a04c1797-6435-4805-ba02-225d1af8f410',
                1,
                80000.00,
                'VND'
        ),
        (
                '3ada0872-4635-4402-87de-20202dc1b0eb',
                'dea6534e-e889-4895-a55e-383978c515f1',
                'dd86f01f-5f03-4ab7-9fab-afe4208bdd35',
                2,
                35000.00,
                'VND'
        ),
        (
                '3bb45524-f146-410c-9f0d-428ecd061b2f',
                'dea6534e-e889-4895-a55e-383978c515f1',
                'd5686a1b-012a-464b-b7c8-954907d7cc65',
                1,
                20000.00,
                'VND'
        ),
        (
                'ad28680b-3913-4017-9894-c3058eccfdcd',
                '6427466c-745c-4770-aeb0-ad542418617f',
                'c83db4d2-79b9-4d02-a4ed-beac07ef87aa',
                1,
                65000.00,
                'VND'
        ),
        (
                '3cbad278-1e3e-42e4-815f-634a30002b27',
                '6427466c-745c-4770-aeb0-ad542418617f',
                '54035a4f-ed38-411f-b295-9f1cb4b2b40f',
                1,
                45000.00,
                'VND'
        ),
        (
                'f81817f3-6389-41c9-9433-f99bdb225cb9',
                '6427466c-745c-4770-aeb0-ad542418617f',
                'd5686a1b-012a-464b-b7c8-954907d7cc65',
                2,
                20000.00,
                'VND'
        ),
        (
                '0e277859-06a1-4fe7-a2bc-0fd4af0fa790',
                '5b7b8dd7-785c-4a60-a778-b97ebf0f500b',
                '0d3df7bc-d38d-4ad6-a6f8-5167c9c3599f',
                1,
                90000.00,
                'VND'
        ),
        (
                '93457a38-d29e-447a-b975-c8be66a488fe',
                '5b7b8dd7-785c-4a60-a778-b97ebf0f500b',
                'dd86f01f-5f03-4ab7-9fab-afe4208bdd35',
                1,
                35000.00,
                'VND'
        ),
        (
                '4a5c6efd-5475-4732-954e-5ad59d1e338d',
                '219ba0b0-a63e-4e78-ba9b-f95f2def2be4',
                'a04c1797-6435-4805-ba02-225d1af8f410',
                1,
                80000.00,
                'VND'
        ),
        (
                'a7d420c2-ea4d-4279-82b2-5db16638946c',
                '219ba0b0-a63e-4e78-ba9b-f95f2def2be4',
                'c83db4d2-79b9-4d02-a4ed-beac07ef87aa',
                1,
                65000.00,
                'VND'
        ),
        (
                'fc1e6cee-5c39-4694-845c-12869156c048',
                '219ba0b0-a63e-4e78-ba9b-f95f2def2be4',
                'd5686a1b-012a-464b-b7c8-954907d7cc65',
                1,
                20000.00,
                'VND'
        ),
        (
                '3b470790-3e20-4c07-b54f-f79a6daec82d',
                'c7f1509e-3397-4a3d-8a97-7138988c9b3c',
                '0d3df7bc-d38d-4ad6-a6f8-5167c9c3599f',
                1,
                90000.00,
                'VND'
        ),
        (
                '58e9de6a-2cb5-4d33-9f65-e7e0e895ed16',
                'c7f1509e-3397-4a3d-8a97-7138988c9b3c',
                '54035a4f-ed38-411f-b295-9f1cb4b2b40f',
                1,
                45000.00,
                'VND'
        ),
        (
                '32ff8632-37c8-4e76-bfcb-c59e5649676e',
                'd1a7cc5e-0d93-4f21-a18a-6ec3eb674760',
                'c83db4d2-79b9-4d02-a4ed-beac07ef87aa',
                2,
                65000.00,
                'VND'
        ),
        (
                '3c0907f0-ea21-41c3-b520-bd23bae2982e',
                'd1a7cc5e-0d93-4f21-a18a-6ec3eb674760',
                'dd86f01f-5f03-4ab7-9fab-afe4208bdd35',
                1,
                35000.00,
                'VND'
        ),
        (
                'b20d16ed-25bd-40ff-bf15-7a7567c57093',
                'c8c85e84-35f5-4176-bc6b-12a153cc2afc',
                'a04c1797-6435-4805-ba02-225d1af8f410',
                1,
                80000.00,
                'VND'
        ),
        (
                'db9201fc-8ce4-4e9d-92cc-07690aa05e49',
                'c8c85e84-35f5-4176-bc6b-12a153cc2afc',
                '0d3df7bc-d38d-4ad6-a6f8-5167c9c3599f',
                1,
                90000.00,
                'VND'
        ),
        (
                '880f5f60-215c-42b2-8eb6-9293898f43dd',
                'c8c85e84-35f5-4176-bc6b-12a153cc2afc',
                'd5686a1b-012a-464b-b7c8-954907d7cc65',
                2,
                20000.00,
                'VND'
        ),
        (
                'e50e2f1b-8cb6-4ebd-9f25-feaf9a14cc2a',
                'f48bc76a-92be-4d9b-a7cc-cdde89e9f141',
                '13af6215-39d8-4b1a-9ab9-86710a386f28',
                1,
                145000.00,
                'VND'
        ),
        (
                '97bdbebc-72b3-4bcf-a8f3-9f978027fbed',
                'f48bc76a-92be-4d9b-a7cc-cdde89e9f141',
                'dccc6688-a910-4fe0-b503-5c6fa1f64e6e',
                1,
                45000.00,
                'VND'
        ),
        (
                'c6734f3e-057e-4d4b-915e-1f08cd58847d',
                'f48bc76a-92be-4d9b-a7cc-cdde89e9f141',
                '4fe92ce8-070b-4767-8d2f-55f96837ad98',
                2,
                20000.00,
                'VND'
        ),
        (
                '2b927402-cc62-49d2-bc32-abc6ba3aeb6e',
                'b2d0f65c-4c61-47da-bcc3-b91f2e23bfa1',
                '8ef1701d-e929-443a-ba71-a292b7252961',
                1,
                155000.00,
                'VND'
        ),
        (
                '77627f14-756b-4e22-976e-0842acd59e1d',
                'b2d0f65c-4c61-47da-bcc3-b91f2e23bfa1',
                'd4c49b36-cc5d-4484-96ad-0eaa6ef9873d',
                1,
                95000.00,
                'VND'
        ),
        (
                '4204c8dd-3819-42e8-81a7-4256bbdcdb10',
                'a79fef2a-9a4a-4f77-afce-d8d5ac01083a',
                'fbd30f00-03d7-4076-875b-7ed936025aa1',
                1,
                125000.00,
                'VND'
        ),
        (
                'c91c4944-6a5a-418b-b62c-e86b11ea833f',
                'a79fef2a-9a4a-4f77-afce-d8d5ac01083a',
                'dccc6688-a910-4fe0-b503-5c6fa1f64e6e',
                2,
                45000.00,
                'VND'
        ),
        (
                'bcef5aa0-9689-42d8-b8c7-7eb9102282a0',
                'a79fef2a-9a4a-4f77-afce-d8d5ac01083a',
                '4fe92ce8-070b-4767-8d2f-55f96837ad98',
                1,
                20000.00,
                'VND'
        ),
        (
                '0a094e8b-b344-4528-bc16-f1716c951021',
                '0074446d-3875-421b-8231-d93704d799c7',
                '13af6215-39d8-4b1a-9ab9-86710a386f28',
                1,
                145000.00,
                'VND'
        ),
        (
                '9fefcdb7-ef05-4fb9-8aab-70ed0a720f51',
                '0074446d-3875-421b-8231-d93704d799c7',
                '8ef1701d-e929-443a-ba71-a292b7252961',
                1,
                155000.00,
                'VND'
        ),
        (
                'af7104db-f39c-4c6e-9331-d7d89e2effb5',
                'bd0cebc9-7c4f-4a23-8809-9d8d3922e068',
                'd4c49b36-cc5d-4484-96ad-0eaa6ef9873d',
                1,
                95000.00,
                'VND'
        ),
        (
                'd21d7112-1b99-451a-ae5b-80229e071c40',
                'bd0cebc9-7c4f-4a23-8809-9d8d3922e068',
                'dccc6688-a910-4fe0-b503-5c6fa1f64e6e',
                1,
                45000.00,
                'VND'
        ),
        (
                'eb344dc5-5fa5-46ae-9daa-c81a332d1084',
                'bd0cebc9-7c4f-4a23-8809-9d8d3922e068',
                '4fe92ce8-070b-4767-8d2f-55f96837ad98',
                2,
                20000.00,
                'VND'
        ),
        (
                '24a15da2-0240-47f5-82dd-42ed6b15ca03',
                '6f413118-0ae7-44d2-bf94-56bb4326b35f',
                'fbd30f00-03d7-4076-875b-7ed936025aa1',
                1,
                125000.00,
                'VND'
        ),
        (
                '93467fef-0466-4105-9ce8-c140229a45ec',
                '6f413118-0ae7-44d2-bf94-56bb4326b35f',
                'd4c49b36-cc5d-4484-96ad-0eaa6ef9873d',
                1,
                95000.00,
                'VND'
        ),
        (
                '8cb19122-b8d9-45f1-bdc4-3129a00c8d0e',
                'a2e7c33e-5372-4eef-abfa-b070f35d29ad',
                '13af6215-39d8-4b1a-9ab9-86710a386f28',
                1,
                145000.00,
                'VND'
        ),
        (
                '5c8eb881-0d9d-4515-af93-bf266fbd5304',
                'a2e7c33e-5372-4eef-abfa-b070f35d29ad',
                '8ef1701d-e929-443a-ba71-a292b7252961',
                1,
                155000.00,
                'VND'
        ),
        (
                '1d4b3547-4850-4ac9-ae8a-2d6cbfe762ed',
                'a2e7c33e-5372-4eef-abfa-b070f35d29ad',
                '4fe92ce8-070b-4767-8d2f-55f96837ad98',
                2,
                20000.00,
                'VND'
        );

-- =========================================================================
-- 15. ORDER_STATUS_HISTORY
-- =========================================================================
INSERT INTO
        order_status_history (id, order_id, status, note, created_at)
VALUES
        (
                '609ac09c-57b3-4ac2-8454-ea016873985d',
                '907c3abb-4cca-49de-ae95-d534353797c0',
                'PENDING',
                N'Đơn hàng được tạo',
                '2025-01-05 07:30:00'
        ),
        (
                'fd92da8f-6bdd-4fe0-99fa-50253e004a33',
                '907c3abb-4cca-49de-ae95-d534353797c0',
                'CONFIRMED',
                N'Nhà hàng xác nhận đơn',
                '2025-01-05 07:32:00'
        ),
        (
                'ae710fcc-a05c-4e4b-86d9-e82dbd17eb85',
                '907c3abb-4cca-49de-ae95-d534353797c0',
                'PREPARING',
                N'Đang chuẩn bị món ăn',
                '2025-01-05 07:34:00'
        ),
        (
                '7f9fffb8-0adc-4766-a326-f021dd3c9653',
                '907c3abb-4cca-49de-ae95-d534353797c0',
                'READY_FOR_PICKUP',
                N'Món đã sẵn sàng, chờ tài xế đến lấy',
                '2025-01-05 07:49:00'
        ),
        (
                '19a4fdbe-4e1e-4160-83de-1c3db5f01610',
                '907c3abb-4cca-49de-ae95-d534353797c0',
                'PICKED_UP',
                N'Tài xế đã lấy hàng',
                '2025-01-05 07:54:00'
        ),
        (
                '0c5786af-8040-4d7d-9c93-7464e9dae3b4',
                '907c3abb-4cca-49de-ae95-d534353797c0',
                'DELIVERING',
                N'Đang trên đường giao hàng',
                '2025-01-05 07:55:00'
        ),
        (
                'ed687fda-c526-4594-b576-3d6fd4add042',
                '907c3abb-4cca-49de-ae95-d534353797c0',
                'DELIVERED',
                N'Đã giao hàng thành công',
                '2025-01-05 08:10:00'
        ),
        (
                '01f1eb1a-dc41-4a83-b2e6-7d44d400b36f',
                '907c3abb-4cca-49de-ae95-d534353797c0',
                'CUSTOMER_CONFIRMED',
                N'Khách hàng xác nhận đã nhận hàng',
                '2025-01-05 08:15:00'
        ),
        (
                'cbf59f97-10bc-4ce6-b339-329c5a96dee9',
                '124a71f3-a9c2-4ebb-8bc2-626181133460',
                'PENDING',
                N'Đơn hàng được tạo',
                '2025-01-08 07:15:00'
        ),
        (
                '84335175-1a3f-4082-80e4-2c3869df4cf8',
                '124a71f3-a9c2-4ebb-8bc2-626181133460',
                'CONFIRMED',
                N'Nhà hàng xác nhận đơn',
                '2025-01-08 07:17:00'
        ),
        (
                'afb8747c-e2fb-42f0-b3b2-a78dddff59ea',
                '124a71f3-a9c2-4ebb-8bc2-626181133460',
                'PREPARING',
                N'Đang chuẩn bị món ăn',
                '2025-01-08 07:19:00'
        ),
        (
                '92bee10b-38d8-479a-87b4-bfe4f786732a',
                '124a71f3-a9c2-4ebb-8bc2-626181133460',
                'READY_FOR_PICKUP',
                N'Món đã sẵn sàng, chờ tài xế đến lấy',
                '2025-01-08 07:34:00'
        ),
        (
                '290f44df-8647-4f4b-ac04-a9fb65e6b613',
                '124a71f3-a9c2-4ebb-8bc2-626181133460',
                'PICKED_UP',
                N'Tài xế đã lấy hàng',
                '2025-01-08 07:39:00'
        ),
        (
                'bf740119-d0bb-4b77-9a86-596844cca5d6',
                '124a71f3-a9c2-4ebb-8bc2-626181133460',
                'DELIVERING',
                N'Đang trên đường giao hàng',
                '2025-01-08 07:40:00'
        ),
        (
                '335e9522-4b6e-4040-9c70-211c9e190794',
                '124a71f3-a9c2-4ebb-8bc2-626181133460',
                'DELIVERED',
                N'Đã giao hàng thành công',
                '2025-01-08 07:55:00'
        ),
        (
                '65256c15-ac92-421f-8663-a34d61e2b724',
                '124a71f3-a9c2-4ebb-8bc2-626181133460',
                'CUSTOMER_CONFIRMED',
                N'Khách hàng xác nhận đã nhận hàng',
                '2025-01-08 08:00:00'
        ),
        (
                '211736fe-65d3-41e9-93f0-5ceb9aeb1a9a',
                '008f5677-e23e-49b0-af1f-5a0eb242404d',
                'PENDING',
                N'Đơn hàng được tạo',
                '2025-01-12 07:45:00'
        ),
        (
                '000efa40-9954-4677-bdc9-85ffe0d3946b',
                '008f5677-e23e-49b0-af1f-5a0eb242404d',
                'CONFIRMED',
                N'Nhà hàng xác nhận đơn',
                '2025-01-12 07:47:00'
        ),
        (
                '21a794fb-92c3-41a4-8d6c-d05cbe92a97d',
                '008f5677-e23e-49b0-af1f-5a0eb242404d',
                'PREPARING',
                N'Đang chuẩn bị món ăn',
                '2025-01-12 07:49:00'
        ),
        (
                '6e9b817d-1df2-4d0a-935f-1112d8a9191f',
                '008f5677-e23e-49b0-af1f-5a0eb242404d',
                'READY_FOR_PICKUP',
                N'Món đã sẵn sàng, chờ tài xế đến lấy',
                '2025-01-12 08:04:00'
        ),
        (
                'ad1072cb-edb2-43f8-9d07-a6ffa27add9c',
                '008f5677-e23e-49b0-af1f-5a0eb242404d',
                'PICKED_UP',
                N'Tài xế đã lấy hàng',
                '2025-01-12 08:09:00'
        ),
        (
                '32b1ab5a-d1d8-47f8-94c7-245de06590f4',
                '008f5677-e23e-49b0-af1f-5a0eb242404d',
                'DELIVERING',
                N'Đang trên đường giao hàng',
                '2025-01-12 08:10:00'
        ),
        (
                '990e5e09-0fd1-4c43-9ce6-1358b75a66a9',
                '008f5677-e23e-49b0-af1f-5a0eb242404d',
                'DELIVERED',
                N'Đã giao hàng thành công',
                '2025-01-12 08:25:00'
        ),
        (
                '27c4398b-42a3-4c24-aa83-189dce9ddf45',
                '008f5677-e23e-49b0-af1f-5a0eb242404d',
                'CUSTOMER_CONFIRMED',
                N'Khách hàng xác nhận đã nhận hàng',
                '2025-01-12 08:30:00'
        ),
        (
                '46b40863-3204-429a-bcb8-120629c2ab69',
                '56b4b755-007c-4e07-b62c-59f356368988',
                'PENDING',
                N'Đơn hàng được tạo',
                '2025-01-18 08:00:00'
        ),
        (
                'af2702a9-583c-4a82-9140-7003409fb087',
                '56b4b755-007c-4e07-b62c-59f356368988',
                'CONFIRMED',
                N'Nhà hàng xác nhận đơn',
                '2025-01-18 08:02:00'
        ),
        (
                'fde87c10-2abb-46e3-be8d-aa0901d0b8f8',
                '56b4b755-007c-4e07-b62c-59f356368988',
                'PREPARING',
                N'Đang chuẩn bị món ăn',
                '2025-01-18 08:04:00'
        ),
        (
                '9ab7e166-8b5b-456b-a54e-3006bec1f41c',
                '56b4b755-007c-4e07-b62c-59f356368988',
                'READY_FOR_PICKUP',
                N'Món đã sẵn sàng, chờ tài xế đến lấy',
                '2025-01-18 08:19:00'
        ),
        (
                '2fee849e-9cd6-4cfd-83de-0f0e94179318',
                '56b4b755-007c-4e07-b62c-59f356368988',
                'PICKED_UP',
                N'Tài xế đã lấy hàng',
                '2025-01-18 08:24:00'
        ),
        (
                '4a6c877c-0d23-4a09-b5fa-05fb9d4efd9a',
                '56b4b755-007c-4e07-b62c-59f356368988',
                'DELIVERING',
                N'Đang trên đường giao hàng',
                '2025-01-18 08:25:00'
        ),
        (
                'f32b0d4f-9532-4f7d-9893-e858cb55521b',
                '56b4b755-007c-4e07-b62c-59f356368988',
                'DELIVERED',
                N'Đã giao hàng thành công',
                '2025-01-18 08:40:00'
        ),
        (
                'ebfc8a26-ba6e-4941-8d9c-3cac149adbd6',
                '56b4b755-007c-4e07-b62c-59f356368988',
                'CUSTOMER_CONFIRMED',
                N'Khách hàng xác nhận đã nhận hàng',
                '2025-01-18 08:45:00'
        ),
        (
                '47a36bf6-1223-446e-bd53-218709c45d06',
                'add00ef6-8323-4108-9c73-e15310958d6b',
                'PENDING',
                N'Đơn hàng được tạo',
                '2025-01-22 07:30:00'
        ),
        (
                '72fd7556-aa3a-4a42-8a24-0575fb25c89a',
                'add00ef6-8323-4108-9c73-e15310958d6b',
                'CONFIRMED',
                N'Nhà hàng xác nhận đơn',
                '2025-01-22 07:32:00'
        ),
        (
                '3d879161-93f4-403d-8716-9718a883ae95',
                'add00ef6-8323-4108-9c73-e15310958d6b',
                'PREPARING',
                N'Đang chuẩn bị món ăn',
                '2025-01-22 07:34:00'
        ),
        (
                '9c92405f-1d9e-4117-823b-80abf16c13d1',
                'add00ef6-8323-4108-9c73-e15310958d6b',
                'CANCELLED_BY_CUSTOMER',
                N'Khách hàng hủy đơn',
                '2025-01-22 07:38:00'
        ),
        (
                '77fbcc8b-972c-4cf0-8c5b-18f943fbc2a8',
                '0ed0e9ff-5ac9-4a64-aa50-4acf80c29aa0',
                'PENDING',
                N'Đơn hàng được tạo',
                '2025-01-28 07:20:00'
        ),
        (
                'f26db26d-e421-4321-832f-dcf74422dd11',
                '0ed0e9ff-5ac9-4a64-aa50-4acf80c29aa0',
                'CONFIRMED',
                N'Nhà hàng xác nhận đơn',
                '2025-01-28 07:22:00'
        ),
        (
                'ef11722a-76e5-4cfb-9001-eaec774a0d34',
                '0ed0e9ff-5ac9-4a64-aa50-4acf80c29aa0',
                'PREPARING',
                N'Đang chuẩn bị món ăn',
                '2025-01-28 07:24:00'
        ),
        (
                '7c80c075-323d-4a2e-8b06-2f5f5d562b34',
                '0ed0e9ff-5ac9-4a64-aa50-4acf80c29aa0',
                'READY_FOR_PICKUP',
                N'Món đã sẵn sàng, chờ tài xế đến lấy',
                '2025-01-28 07:39:00'
        ),
        (
                '0538cd3b-ad6d-4fca-8490-1cf0dd98c085',
                '0ed0e9ff-5ac9-4a64-aa50-4acf80c29aa0',
                'PICKED_UP',
                N'Tài xế đã lấy hàng',
                '2025-01-28 07:44:00'
        ),
        (
                '8deeb928-c6d6-4e15-b8eb-0eb1e1b33120',
                '0ed0e9ff-5ac9-4a64-aa50-4acf80c29aa0',
                'DELIVERING',
                N'Đang trên đường giao hàng',
                '2025-01-28 07:45:00'
        ),
        (
                '2b246e38-a725-4698-b3bd-51b11f588550',
                '0ed0e9ff-5ac9-4a64-aa50-4acf80c29aa0',
                'DELIVERED',
                N'Đã giao hàng thành công',
                '2025-01-28 08:00:00'
        ),
        (
                '5276f0db-f29c-417a-8c5d-2e6adaa50dc7',
                '0ed0e9ff-5ac9-4a64-aa50-4acf80c29aa0',
                'CUSTOMER_CONFIRMED',
                N'Khách hàng xác nhận đã nhận hàng',
                '2025-01-28 08:05:00'
        ),
        (
                '49c95752-a3f5-4eb6-aa44-c1f52e3a7369',
                'dea6534e-e889-4895-a55e-383978c515f1',
                'PENDING',
                N'Đơn hàng được tạo',
                '2025-02-01 11:00:00'
        ),
        (
                '4a7653cf-6fda-4d32-91ce-fc7e1da45a7d',
                'dea6534e-e889-4895-a55e-383978c515f1',
                'CONFIRMED',
                N'Nhà hàng xác nhận đơn',
                '2025-02-01 11:02:00'
        ),
        (
                'c7c4076e-6b8b-4eb6-9b93-75cf639a1cd7',
                'dea6534e-e889-4895-a55e-383978c515f1',
                'PREPARING',
                N'Đang chuẩn bị món ăn',
                '2025-02-01 11:04:00'
        ),
        (
                '99ebe004-ae5c-4cdf-b0e7-36729d6da2fd',
                'dea6534e-e889-4895-a55e-383978c515f1',
                'READY_FOR_PICKUP',
                N'Món đã sẵn sàng, chờ tài xế đến lấy',
                '2025-02-01 11:19:00'
        ),
        (
                'c4701c37-ee4b-4332-8693-822277a6012e',
                'dea6534e-e889-4895-a55e-383978c515f1',
                'PICKED_UP',
                N'Tài xế đã lấy hàng',
                '2025-02-01 11:24:00'
        ),
        (
                'e88315d6-b24a-4d0e-b07c-64953a2d482c',
                'dea6534e-e889-4895-a55e-383978c515f1',
                'DELIVERING',
                N'Đang trên đường giao hàng',
                '2025-02-01 11:25:00'
        ),
        (
                '4d5fddbf-f554-487b-bd26-0da4f9ea98bf',
                'dea6534e-e889-4895-a55e-383978c515f1',
                'DELIVERED',
                N'Đã giao hàng thành công',
                '2025-02-01 11:40:00'
        ),
        (
                '058095c9-4bff-4961-8aee-0a2308d1c0b4',
                'dea6534e-e889-4895-a55e-383978c515f1',
                'CUSTOMER_CONFIRMED',
                N'Khách hàng xác nhận đã nhận hàng',
                '2025-02-01 11:45:00'
        ),
        (
                '81e0bb25-c15f-4a6e-9f6a-8e3cf0a3303e',
                '6427466c-745c-4770-aeb0-ad542418617f',
                'PENDING',
                N'Đơn hàng được tạo',
                '2025-02-05 11:30:00'
        ),
        (
                'aed7e7f2-3aef-434d-8916-6564f318137f',
                '6427466c-745c-4770-aeb0-ad542418617f',
                'CONFIRMED',
                N'Nhà hàng xác nhận đơn',
                '2025-02-05 11:32:00'
        ),
        (
                'bee744b1-8ba0-44f4-8a6f-48b3d84e3280',
                '6427466c-745c-4770-aeb0-ad542418617f',
                'PREPARING',
                N'Đang chuẩn bị món ăn',
                '2025-02-05 11:34:00'
        ),
        (
                'd755e672-adf1-4f45-be10-1f6618b6e96c',
                '6427466c-745c-4770-aeb0-ad542418617f',
                'READY_FOR_PICKUP',
                N'Món đã sẵn sàng, chờ tài xế đến lấy',
                '2025-02-05 11:49:00'
        ),
        (
                '972568e7-b6d4-49db-9a42-bf32cd9c2028',
                '6427466c-745c-4770-aeb0-ad542418617f',
                'PICKED_UP',
                N'Tài xế đã lấy hàng',
                '2025-02-05 11:54:00'
        ),
        (
                '1e44899b-9677-40da-97b8-9e1e619bb68c',
                '6427466c-745c-4770-aeb0-ad542418617f',
                'DELIVERING',
                N'Đang trên đường giao hàng',
                '2025-02-05 11:55:00'
        ),
        (
                '4c7222ab-299d-412d-9624-222a2c15ceb1',
                '6427466c-745c-4770-aeb0-ad542418617f',
                'DELIVERED',
                N'Đã giao hàng thành công',
                '2025-02-05 12:10:00'
        ),
        (
                '8ea24c34-4cfa-4e4d-ab02-a4361d0bbc6d',
                '6427466c-745c-4770-aeb0-ad542418617f',
                'CUSTOMER_CONFIRMED',
                N'Khách hàng xác nhận đã nhận hàng',
                '2025-02-05 12:15:00'
        ),
        (
                '2fc636fc-8467-4890-91a9-baa583e591d4',
                '5b7b8dd7-785c-4a60-a778-b97ebf0f500b',
                'PENDING',
                N'Đơn hàng được tạo',
                '2025-02-09 12:00:00'
        ),
        (
                '8eb6b267-89dc-4eea-a4ee-542a67c71af5',
                '5b7b8dd7-785c-4a60-a778-b97ebf0f500b',
                'CONFIRMED',
                N'Nhà hàng xác nhận đơn',
                '2025-02-09 12:02:00'
        ),
        (
                '36a7b78c-9399-42d7-b894-46d89b949363',
                '5b7b8dd7-785c-4a60-a778-b97ebf0f500b',
                'PREPARING',
                N'Đang chuẩn bị món ăn',
                '2025-02-09 12:04:00'
        ),
        (
                'c1caac0e-69a8-4d09-bc6e-bf93033a47d7',
                '5b7b8dd7-785c-4a60-a778-b97ebf0f500b',
                'READY_FOR_PICKUP',
                N'Món đã sẵn sàng, chờ tài xế đến lấy',
                '2025-02-09 12:19:00'
        ),
        (
                '3c7c890e-aadd-45d6-b101-98c4eb95acf6',
                '5b7b8dd7-785c-4a60-a778-b97ebf0f500b',
                'PICKED_UP',
                N'Tài xế đã lấy hàng',
                '2025-02-09 12:24:00'
        ),
        (
                '31592d84-2fdd-4f80-8f81-f5209caef2c9',
                '5b7b8dd7-785c-4a60-a778-b97ebf0f500b',
                'DELIVERING',
                N'Đang trên đường giao hàng',
                '2025-02-09 12:25:00'
        ),
        (
                '54e2c472-eb61-4234-8496-67b301d3ac96',
                '5b7b8dd7-785c-4a60-a778-b97ebf0f500b',
                'DELIVERED',
                N'Đã giao hàng thành công',
                '2025-02-09 12:40:00'
        ),
        (
                '05593494-514f-43f5-a06a-719111ce93d5',
                '5b7b8dd7-785c-4a60-a778-b97ebf0f500b',
                'CUSTOMER_CONFIRMED',
                N'Khách hàng xác nhận đã nhận hàng',
                '2025-02-09 12:45:00'
        ),
        (
                'dc5b22ad-90a4-4ce1-9a8e-8b5ddb98bcce',
                '219ba0b0-a63e-4e78-ba9b-f95f2def2be4',
                'PENDING',
                N'Đơn hàng được tạo',
                '2025-02-13 11:15:00'
        ),
        (
                '37d8e7df-7fb4-4026-b810-1ec4c7b12f33',
                '219ba0b0-a63e-4e78-ba9b-f95f2def2be4',
                'CONFIRMED',
                N'Nhà hàng xác nhận đơn',
                '2025-02-13 11:17:00'
        ),
        (
                '2933f6a8-cdc1-496a-8888-ba5482ffb018',
                '219ba0b0-a63e-4e78-ba9b-f95f2def2be4',
                'PREPARING',
                N'Đang chuẩn bị món ăn',
                '2025-02-13 11:19:00'
        ),
        (
                'cb3bf1b3-9ed8-4210-b89b-8f1fc67c1fdc',
                '219ba0b0-a63e-4e78-ba9b-f95f2def2be4',
                'READY_FOR_PICKUP',
                N'Món đã sẵn sàng, chờ tài xế đến lấy',
                '2025-02-13 11:34:00'
        ),
        (
                '6c480160-89f1-4908-9556-f9cf391db5ed',
                '219ba0b0-a63e-4e78-ba9b-f95f2def2be4',
                'PICKED_UP',
                N'Tài xế đã lấy hàng',
                '2025-02-13 11:39:00'
        ),
        (
                '7b2b0c5b-cd98-4b2a-9e29-cdd44aee9094',
                '219ba0b0-a63e-4e78-ba9b-f95f2def2be4',
                'DELIVERING',
                N'Đang trên đường giao hàng',
                '2025-02-13 11:40:00'
        ),
        (
                '6a4b8e22-3693-4709-b25c-3156d0d6e275',
                '219ba0b0-a63e-4e78-ba9b-f95f2def2be4',
                'DELIVERED',
                N'Đã giao hàng thành công',
                '2025-02-13 11:55:00'
        ),
        (
                'fc66f380-4eb7-49b9-9522-fa94f4151e89',
                '219ba0b0-a63e-4e78-ba9b-f95f2def2be4',
                'CUSTOMER_CONFIRMED',
                N'Khách hàng xác nhận đã nhận hàng',
                '2025-02-13 12:00:00'
        ),
        (
                'b34f76d5-ecc9-4c43-8e65-64a32d3c1065',
                'c7f1509e-3397-4a3d-8a97-7138988c9b3c',
                'PENDING',
                N'Đơn hàng được tạo',
                '2025-02-17 11:45:00'
        ),
        (
                '9fab31fd-fa17-4232-87da-2121e64caede',
                'c7f1509e-3397-4a3d-8a97-7138988c9b3c',
                'CONFIRMED',
                N'Nhà hàng xác nhận đơn',
                '2025-02-17 11:47:00'
        ),
        (
                '0ee10933-499b-404e-88d4-8487bc1838f9',
                'c7f1509e-3397-4a3d-8a97-7138988c9b3c',
                'CANCELLED_BY_RESTAURANT',
                N'Nhà hàng hết nguyên liệu',
                '2025-02-17 11:51:00'
        ),
        (
                '4fc64bba-da23-4fe1-8b49-01ad2c279c3c',
                'd1a7cc5e-0d93-4f21-a18a-6ec3eb674760',
                'PENDING',
                N'Đơn hàng được tạo',
                '2025-02-21 12:00:00'
        ),
        (
                '7eb73914-9800-494a-8dca-6b2bc18ed798',
                'd1a7cc5e-0d93-4f21-a18a-6ec3eb674760',
                'CONFIRMED',
                N'Nhà hàng xác nhận đơn',
                '2025-02-21 12:02:00'
        ),
        (
                '4f2bd717-c430-4812-9784-c0bf3f7f1d64',
                'd1a7cc5e-0d93-4f21-a18a-6ec3eb674760',
                'PREPARING',
                N'Đang chuẩn bị món ăn',
                '2025-02-21 12:04:00'
        ),
        (
                'e5212607-03fa-4967-a466-2a3a20f9010b',
                'd1a7cc5e-0d93-4f21-a18a-6ec3eb674760',
                'READY_FOR_PICKUP',
                N'Món đã sẵn sàng, chờ tài xế đến lấy',
                '2025-02-21 12:19:00'
        ),
        (
                '46096a2f-c642-492b-ba54-5dd8214294ed',
                'd1a7cc5e-0d93-4f21-a18a-6ec3eb674760',
                'PICKED_UP',
                N'Tài xế đã lấy hàng',
                '2025-02-21 12:24:00'
        ),
        (
                'ef3f3105-ddf8-4bf1-979e-1ebaf403ff42',
                'd1a7cc5e-0d93-4f21-a18a-6ec3eb674760',
                'DELIVERING',
                N'Đang trên đường giao hàng',
                '2025-02-21 12:25:00'
        ),
        (
                '1cce4dee-d0d3-4d4d-bf26-3fdc02239e96',
                'd1a7cc5e-0d93-4f21-a18a-6ec3eb674760',
                'DELIVERED',
                N'Đã giao hàng thành công',
                '2025-02-21 12:40:00'
        ),
        (
                '94a6ba72-4369-4e69-aae7-9c058b205281',
                'd1a7cc5e-0d93-4f21-a18a-6ec3eb674760',
                'CUSTOMER_CONFIRMED',
                N'Khách hàng xác nhận đã nhận hàng',
                '2025-02-21 12:45:00'
        ),
        (
                'a8a16e3c-ecdb-4ed4-85ca-ca7ffb0cd233',
                'c8c85e84-35f5-4176-bc6b-12a153cc2afc',
                'PENDING',
                N'Đơn hàng được tạo',
                '2025-02-25 11:30:00'
        ),
        (
                'dc8de73e-7cc3-4e44-b4c8-9fe09c8f6bbd',
                'c8c85e84-35f5-4176-bc6b-12a153cc2afc',
                'CONFIRMED',
                N'Nhà hàng xác nhận đơn',
                '2025-02-25 11:32:00'
        ),
        (
                '4d28d79b-29af-4ea6-be8d-574af4de71ea',
                'c8c85e84-35f5-4176-bc6b-12a153cc2afc',
                'PREPARING',
                N'Đang chuẩn bị món ăn',
                '2025-02-25 11:34:00'
        ),
        (
                '2fc8ed42-be2c-4947-99a8-df86ad781741',
                'c8c85e84-35f5-4176-bc6b-12a153cc2afc',
                'READY_FOR_PICKUP',
                N'Món sẵn sàng, đang tìm tài xế',
                '2025-02-25 11:50:00'
        ),
        (
                '6c978be2-0d78-461c-91f5-b3c1861f54fa',
                'c8c85e84-35f5-4176-bc6b-12a153cc2afc',
                'NO_DRIVER_AVAILABLE',
                N'Không tìm được tài xế sau 30 phút',
                '2025-02-25 12:20:00'
        ),
        (
                '23783bb6-eded-493b-bc5f-ebf040bb8c0c',
                'f48bc76a-92be-4d9b-a7cc-cdde89e9f141',
                'PENDING',
                N'Đơn hàng được tạo',
                '2025-03-01 18:00:00'
        ),
        (
                'cff3c5f7-5a1e-43c2-be66-46d5608f8816',
                'f48bc76a-92be-4d9b-a7cc-cdde89e9f141',
                'CONFIRMED',
                N'Nhà hàng xác nhận đơn',
                '2025-03-01 18:02:00'
        ),
        (
                '88b532b4-31c9-439d-a52f-ea701d693ac3',
                'f48bc76a-92be-4d9b-a7cc-cdde89e9f141',
                'PREPARING',
                N'Đang chuẩn bị món ăn',
                '2025-03-01 18:04:00'
        ),
        (
                '975f6414-e5ab-42b9-8099-ea6153cce82e',
                'f48bc76a-92be-4d9b-a7cc-cdde89e9f141',
                'READY_FOR_PICKUP',
                N'Món đã sẵn sàng, chờ tài xế đến lấy',
                '2025-03-01 18:19:00'
        ),
        (
                'e3abb904-1227-47d8-9d34-9fcfbf13328f',
                'f48bc76a-92be-4d9b-a7cc-cdde89e9f141',
                'PICKED_UP',
                N'Tài xế đã lấy hàng',
                '2025-03-01 18:24:00'
        ),
        (
                'fc3cab40-075e-45b6-b071-2a5c77572ba7',
                'f48bc76a-92be-4d9b-a7cc-cdde89e9f141',
                'DELIVERING',
                N'Đang trên đường giao hàng',
                '2025-03-01 18:25:00'
        ),
        (
                '29473f04-ee33-47c3-b57c-bb8b62f8b542',
                'f48bc76a-92be-4d9b-a7cc-cdde89e9f141',
                'DELIVERED',
                N'Đã giao hàng thành công',
                '2025-03-01 18:40:00'
        ),
        (
                '9722381e-596c-4a88-be2c-56cb33e7961a',
                'f48bc76a-92be-4d9b-a7cc-cdde89e9f141',
                'CUSTOMER_CONFIRMED',
                N'Khách hàng xác nhận đã nhận hàng',
                '2025-03-01 18:45:00'
        ),
        (
                'c1b94ab3-b7e3-432c-8f5f-18da72600ab9',
                'b2d0f65c-4c61-47da-bcc3-b91f2e23bfa1',
                'PENDING',
                N'Đơn hàng được tạo',
                '2025-03-05 18:30:00'
        ),
        (
                '161ab0b5-9998-4f66-91e9-3d9126b2e2c3',
                'b2d0f65c-4c61-47da-bcc3-b91f2e23bfa1',
                'CONFIRMED',
                N'Nhà hàng xác nhận đơn',
                '2025-03-05 18:32:00'
        ),
        (
                '8838b367-0b96-4b23-bd93-8e15835ee447',
                'b2d0f65c-4c61-47da-bcc3-b91f2e23bfa1',
                'PREPARING',
                N'Đang chuẩn bị món ăn',
                '2025-03-05 18:34:00'
        ),
        (
                '175fbe35-2ad8-4b50-afe4-40d72e514fef',
                'b2d0f65c-4c61-47da-bcc3-b91f2e23bfa1',
                'READY_FOR_PICKUP',
                N'Món đã sẵn sàng, chờ tài xế đến lấy',
                '2025-03-05 18:49:00'
        ),
        (
                '18b72e86-573d-4d5a-9b0f-af4bcccae7b6',
                'b2d0f65c-4c61-47da-bcc3-b91f2e23bfa1',
                'PICKED_UP',
                N'Tài xế đã lấy hàng',
                '2025-03-05 18:54:00'
        ),
        (
                'e5aded65-3733-429a-a89b-d4386fa44951',
                'b2d0f65c-4c61-47da-bcc3-b91f2e23bfa1',
                'DELIVERING',
                N'Đang trên đường giao hàng',
                '2025-03-05 18:55:00'
        ),
        (
                '49b5037b-0f65-440d-a7c3-27b08bd79af9',
                'b2d0f65c-4c61-47da-bcc3-b91f2e23bfa1',
                'DELIVERED',
                N'Đã giao hàng thành công',
                '2025-03-05 19:10:00'
        ),
        (
                'bd6e5dfe-9a4a-463a-aeb3-4cd32842b7be',
                'b2d0f65c-4c61-47da-bcc3-b91f2e23bfa1',
                'CUSTOMER_CONFIRMED',
                N'Khách hàng xác nhận đã nhận hàng',
                '2025-03-05 19:15:00'
        ),
        (
                '1385b686-58b3-49a2-9b1a-fe002f0d0c05',
                'a79fef2a-9a4a-4f77-afce-d8d5ac01083a',
                'PENDING',
                N'Đơn hàng được tạo',
                '2025-03-09 19:00:00'
        ),
        (
                '8ffd8a49-dca7-4e14-8e9f-56e33174e777',
                'a79fef2a-9a4a-4f77-afce-d8d5ac01083a',
                'CONFIRMED',
                N'Nhà hàng xác nhận đơn',
                '2025-03-09 19:02:00'
        ),
        (
                '7fea63e1-8505-4314-9157-1ee65c412d8d',
                'a79fef2a-9a4a-4f77-afce-d8d5ac01083a',
                'PREPARING',
                N'Đang chuẩn bị món ăn',
                '2025-03-09 19:04:00'
        ),
        (
                'e82ad50c-1abc-4748-9bae-7ab578ac3ec9',
                'a79fef2a-9a4a-4f77-afce-d8d5ac01083a',
                'READY_FOR_PICKUP',
                N'Món đã sẵn sàng, chờ tài xế đến lấy',
                '2025-03-09 19:19:00'
        ),
        (
                '512ff586-2332-4431-bb3d-48740eb93a8f',
                'a79fef2a-9a4a-4f77-afce-d8d5ac01083a',
                'PICKED_UP',
                N'Tài xế đã lấy hàng',
                '2025-03-09 19:24:00'
        ),
        (
                'bab74dc4-f25f-4f6a-bc6b-211cd59febe9',
                'a79fef2a-9a4a-4f77-afce-d8d5ac01083a',
                'DELIVERING',
                N'Đang trên đường giao hàng',
                '2025-03-09 19:25:00'
        ),
        (
                '8af6c0be-fa05-454a-91d7-3419684a9e80',
                'a79fef2a-9a4a-4f77-afce-d8d5ac01083a',
                'DELIVERED',
                N'Đã giao hàng thành công',
                '2025-03-09 19:40:00'
        ),
        (
                'b5abf8ff-3afd-429a-9449-eddc72d59990',
                'a79fef2a-9a4a-4f77-afce-d8d5ac01083a',
                'CUSTOMER_CONFIRMED',
                N'Khách hàng xác nhận đã nhận hàng',
                '2025-03-09 19:45:00'
        ),
        (
                '0b85d812-d8dc-497c-9550-22b2b682bdb9',
                '0074446d-3875-421b-8231-d93704d799c7',
                'PENDING',
                N'Đơn hàng được tạo',
                '2025-03-13 18:15:00'
        ),
        (
                '410b12c7-2593-4005-9194-f4cdee60b00d',
                '0074446d-3875-421b-8231-d93704d799c7',
                'CONFIRMED',
                N'Nhà hàng xác nhận đơn',
                '2025-03-13 18:17:00'
        ),
        (
                'f898ac06-a00a-438c-92c3-b2c6f3863a86',
                '0074446d-3875-421b-8231-d93704d799c7',
                'PREPARING',
                N'Đang chuẩn bị món ăn',
                '2025-03-13 18:19:00'
        ),
        (
                'e9748566-21ec-4c88-a846-39ea614f4760',
                '0074446d-3875-421b-8231-d93704d799c7',
                'READY_FOR_PICKUP',
                N'Món đã sẵn sàng, chờ tài xế đến lấy',
                '2025-03-13 18:34:00'
        ),
        (
                '1ef3850c-6c5a-45b0-9141-0aebd6fc3448',
                '0074446d-3875-421b-8231-d93704d799c7',
                'PICKED_UP',
                N'Tài xế đã lấy hàng',
                '2025-03-13 18:39:00'
        ),
        (
                '28907bda-f5a6-4d5d-b37d-dfcad1cada62',
                '0074446d-3875-421b-8231-d93704d799c7',
                'DELIVERING',
                N'Đang trên đường giao hàng',
                '2025-03-13 18:40:00'
        ),
        (
                'b6841d4c-2c3c-4384-b595-15b70039fb86',
                '0074446d-3875-421b-8231-d93704d799c7',
                'DELIVERED',
                N'Đã giao hàng thành công',
                '2025-03-13 18:55:00'
        ),
        (
                'ad9b9758-4ec7-4d44-9100-cbb1bdc2f832',
                '0074446d-3875-421b-8231-d93704d799c7',
                'CUSTOMER_CONFIRMED',
                N'Khách hàng xác nhận đã nhận hàng',
                '2025-03-13 19:00:00'
        ),
        (
                '840aeb56-2956-492f-bbc9-1fdfa8d0cdef',
                'bd0cebc9-7c4f-4a23-8809-9d8d3922e068',
                'PENDING',
                N'Đơn hàng được tạo',
                '2025-03-17 18:45:00'
        ),
        (
                'b19a5a3b-de97-4f72-b7af-46abc63e03a1',
                'bd0cebc9-7c4f-4a23-8809-9d8d3922e068',
                'CONFIRMED',
                N'Nhà hàng xác nhận đơn',
                '2025-03-17 18:47:00'
        ),
        (
                '84c329d6-7dde-40cd-873a-599b98688034',
                'bd0cebc9-7c4f-4a23-8809-9d8d3922e068',
                'PREPARING',
                N'Đang chuẩn bị món ăn',
                '2025-03-17 18:49:00'
        ),
        (
                'e262049d-6e71-45ac-a28c-37a918d8229e',
                'bd0cebc9-7c4f-4a23-8809-9d8d3922e068',
                'READY_FOR_PICKUP',
                N'Món đã sẵn sàng, chờ tài xế đến lấy',
                '2025-03-17 19:04:00'
        ),
        (
                '06e576d6-5591-4760-b7e3-1debe3e72201',
                'bd0cebc9-7c4f-4a23-8809-9d8d3922e068',
                'PICKED_UP',
                N'Tài xế đã lấy hàng',
                '2025-03-17 19:09:00'
        ),
        (
                'a487b202-cc91-4d3f-b0e9-416688555492',
                'bd0cebc9-7c4f-4a23-8809-9d8d3922e068',
                'DELIVERING',
                N'Đang trên đường giao hàng',
                '2025-03-17 19:10:00'
        ),
        (
                '94084c9d-8d69-4617-ae3d-179196aa9ec1',
                'bd0cebc9-7c4f-4a23-8809-9d8d3922e068',
                'DELIVERED',
                N'Đã giao hàng thành công',
                '2025-03-17 19:25:00'
        ),
        (
                '0dfbd1c3-b27f-4ad4-bf0f-155f2fc10dc7',
                'bd0cebc9-7c4f-4a23-8809-9d8d3922e068',
                'CUSTOMER_CONFIRMED',
                N'Khách hàng xác nhận đã nhận hàng',
                '2025-03-17 19:30:00'
        ),
        (
                '160cda75-c4e3-4216-afe0-2e37b2b67750',
                '6f413118-0ae7-44d2-bf94-56bb4326b35f',
                'PENDING',
                N'Đơn hàng được tạo',
                '2025-03-21 19:00:00'
        ),
        (
                'ab2948ce-74f2-401a-b39a-5cff02ed42ba',
                '6f413118-0ae7-44d2-bf94-56bb4326b35f',
                'CONFIRMED',
                N'Nhà hàng xác nhận đơn',
                '2025-03-21 19:02:00'
        ),
        (
                'cea21fce-a0f4-4f06-bc38-820ac45f8cb7',
                '6f413118-0ae7-44d2-bf94-56bb4326b35f',
                'PREPARING',
                N'Đang chuẩn bị món ăn',
                '2025-03-21 19:04:00'
        ),
        (
                '69cd7e3f-6e90-4470-8a7e-37a2e23ba559',
                '6f413118-0ae7-44d2-bf94-56bb4326b35f',
                'CANCELLED_BY_CUSTOMER',
                N'Khách hàng hủy đơn',
                '2025-03-21 19:08:00'
        ),
        (
                '366365bc-b283-4a21-a866-b4cc0b59123d',
                'a2e7c33e-5372-4eef-abfa-b070f35d29ad',
                'PENDING',
                N'Đơn hàng được tạo',
                '2025-03-25 18:30:00'
        ),
        (
                '528becf0-8234-45c5-b0c6-485ef11b9abf',
                'a2e7c33e-5372-4eef-abfa-b070f35d29ad',
                'CONFIRMED',
                N'Nhà hàng xác nhận đơn',
                '2025-03-25 18:32:00'
        ),
        (
                'dd1d4183-fe24-4d60-8c9f-fa02b90efada',
                'a2e7c33e-5372-4eef-abfa-b070f35d29ad',
                'PREPARING',
                N'Đang chuẩn bị món ăn',
                '2025-03-25 18:34:00'
        ),
        (
                'b13ce5f9-eafb-4e9f-b0e6-a9a369d70d53',
                'a2e7c33e-5372-4eef-abfa-b070f35d29ad',
                'READY_FOR_PICKUP',
                N'Món đã sẵn sàng, chờ tài xế đến lấy',
                '2025-03-25 18:49:00'
        ),
        (
                'bf3214ec-37c6-4f29-ac5e-e847ecb4ed84',
                'a2e7c33e-5372-4eef-abfa-b070f35d29ad',
                'PICKED_UP',
                N'Tài xế đã lấy hàng',
                '2025-03-25 18:54:00'
        ),
        (
                'b65f536b-71da-4cd2-b25e-b9336c0a0ad9',
                'a2e7c33e-5372-4eef-abfa-b070f35d29ad',
                'DELIVERING',
                N'Đang trên đường giao hàng',
                '2025-03-25 18:55:00'
        ),
        (
                '4e5e60ed-85b9-47e8-9e6d-e70bae9eaff2',
                'a2e7c33e-5372-4eef-abfa-b070f35d29ad',
                'DELIVERED',
                N'Đã giao hàng thành công',
                '2025-03-25 19:10:00'
        ),
        (
                'd33da5e6-6b8d-4a11-8fea-885b657683b8',
                'a2e7c33e-5372-4eef-abfa-b070f35d29ad',
                'CUSTOMER_CONFIRMED',
                N'Khách hàng xác nhận đã nhận hàng',
                '2025-03-25 19:15:00'
        );

-- =========================================================================
-- 16. DELIVERY_TASKS
-- =========================================================================
INSERT INTO
        delivery_tasks (
                id,
                order_id,
                driver_id,
                status,
                assigned_at,
                picked_up_at,
                delivered_at
        )
VALUES
        (
                '9dd06806-8735-49a9-9c76-823f8ea235ce',
                '907c3abb-4cca-49de-ae95-d534353797c0',
                '11b65227-8ea6-44c4-b3bd-1f76439aa67e',
                'DELIVERED',
                '2025-01-05 07:49:00',
                '2025-01-05 07:54:00',
                '2025-01-05 08:10:00'
        ),
        (
                '79cb1956-3cd5-4855-b04d-ecab7e7426de',
                '124a71f3-a9c2-4ebb-8bc2-626181133460',
                '4d9078cb-dcf6-475c-b043-ef1e3475fb6f',
                'DELIVERED',
                '2025-01-08 07:34:00',
                '2025-01-08 07:39:00',
                '2025-01-08 07:55:00'
        ),
        (
                'd2d22a21-fa0e-4b6b-8c7b-cbda3daef6c1',
                '008f5677-e23e-49b0-af1f-5a0eb242404d',
                '93ebceb4-8402-4c08-ae7f-b73ca366a315',
                'DELIVERED',
                '2025-01-12 08:04:00',
                '2025-01-12 08:09:00',
                '2025-01-12 08:25:00'
        ),
        (
                '45b4ac9e-5ca0-4274-9e43-b38b06b1363a',
                '56b4b755-007c-4e07-b62c-59f356368988',
                '11b65227-8ea6-44c4-b3bd-1f76439aa67e',
                'DELIVERED',
                '2025-01-18 08:19:00',
                '2025-01-18 08:24:00',
                '2025-01-18 08:40:00'
        ),
        (
                'cf0b7cfc-4875-494d-88bb-8b568c9a50f7',
                '0ed0e9ff-5ac9-4a64-aa50-4acf80c29aa0',
                '4d9078cb-dcf6-475c-b043-ef1e3475fb6f',
                'DELIVERED',
                '2025-01-28 07:39:00',
                '2025-01-28 07:44:00',
                '2025-01-28 08:00:00'
        ),
        (
                'cebe91bc-2e7a-48de-9ac8-9009aacdf53d',
                'dea6534e-e889-4895-a55e-383978c515f1',
                '93ebceb4-8402-4c08-ae7f-b73ca366a315',
                'DELIVERED',
                '2025-02-01 11:19:00',
                '2025-02-01 11:24:00',
                '2025-02-01 11:40:00'
        ),
        (
                'ceb0c63f-55d6-4349-b609-5f3d71a558de',
                '6427466c-745c-4770-aeb0-ad542418617f',
                '11b65227-8ea6-44c4-b3bd-1f76439aa67e',
                'DELIVERED',
                '2025-02-05 11:49:00',
                '2025-02-05 11:54:00',
                '2025-02-05 12:10:00'
        ),
        (
                '3f13718b-fa91-4c8b-a470-a04c74e160cb',
                '5b7b8dd7-785c-4a60-a778-b97ebf0f500b',
                '4d9078cb-dcf6-475c-b043-ef1e3475fb6f',
                'DELIVERED',
                '2025-02-09 12:19:00',
                '2025-02-09 12:24:00',
                '2025-02-09 12:40:00'
        ),
        (
                'ccc7d5ad-d9ef-49f9-9b0c-97fc7547ffa5',
                '219ba0b0-a63e-4e78-ba9b-f95f2def2be4',
                '93ebceb4-8402-4c08-ae7f-b73ca366a315',
                'DELIVERED',
                '2025-02-13 11:34:00',
                '2025-02-13 11:39:00',
                '2025-02-13 11:55:00'
        ),
        (
                'e175e75f-09fd-4845-a862-cd6c32992af3',
                'd1a7cc5e-0d93-4f21-a18a-6ec3eb674760',
                '11b65227-8ea6-44c4-b3bd-1f76439aa67e',
                'DELIVERED',
                '2025-02-21 12:19:00',
                '2025-02-21 12:24:00',
                '2025-02-21 12:40:00'
        ),
        (
                '0b9d5b5e-c358-4d86-910c-b82bd8fe975e',
                'f48bc76a-92be-4d9b-a7cc-cdde89e9f141',
                '4d9078cb-dcf6-475c-b043-ef1e3475fb6f',
                'DELIVERED',
                '2025-03-01 18:19:00',
                '2025-03-01 18:24:00',
                '2025-03-01 18:40:00'
        ),
        (
                '19231021-c066-4265-a2d1-92db2ebebdb4',
                'b2d0f65c-4c61-47da-bcc3-b91f2e23bfa1',
                '93ebceb4-8402-4c08-ae7f-b73ca366a315',
                'DELIVERED',
                '2025-03-05 18:49:00',
                '2025-03-05 18:54:00',
                '2025-03-05 19:10:00'
        ),
        (
                '30d854ea-bd0d-41a6-8d23-e3fe3e7af3ca',
                'a79fef2a-9a4a-4f77-afce-d8d5ac01083a',
                '11b65227-8ea6-44c4-b3bd-1f76439aa67e',
                'DELIVERED',
                '2025-03-09 19:19:00',
                '2025-03-09 19:24:00',
                '2025-03-09 19:40:00'
        ),
        (
                'c12c4a53-2861-41cf-a17f-18d381c7610a',
                '0074446d-3875-421b-8231-d93704d799c7',
                '4d9078cb-dcf6-475c-b043-ef1e3475fb6f',
                'DELIVERED',
                '2025-03-13 18:34:00',
                '2025-03-13 18:39:00',
                '2025-03-13 18:55:00'
        ),
        (
                'b115e887-79e3-40d6-9287-24ce7d77e711',
                'bd0cebc9-7c4f-4a23-8809-9d8d3922e068',
                '93ebceb4-8402-4c08-ae7f-b73ca366a315',
                'DELIVERED',
                '2025-03-17 19:04:00',
                '2025-03-17 19:09:00',
                '2025-03-17 19:25:00'
        ),
        (
                'a04843ad-cbcb-4bde-bf50-7e63f42852ac',
                'a2e7c33e-5372-4eef-abfa-b070f35d29ad',
                '11b65227-8ea6-44c4-b3bd-1f76439aa67e',
                'DELIVERED',
                '2025-03-25 18:49:00',
                '2025-03-25 18:54:00',
                '2025-03-25 19:10:00'
        );

-- =========================================================================
-- 17. DRIVER_ORDER_REQUESTS
-- =========================================================================
INSERT INTO
        driver_order_requests (
                id,
                order_id,
                driver_id,
                status,
                pinged_at,
                expires_at
        )
VALUES
        (
                'ba517e52-d4a6-445b-bb73-ea63084e6d1d',
                '907c3abb-4cca-49de-ae95-d534353797c0',
                '4d9078cb-dcf6-475c-b043-ef1e3475fb6f',
                'REJECTED',
                '2025-01-05 07:45:00',
                '2025-01-05 07:46:00'
        ),
        (
                'b1aa1f3b-f3d4-4430-816b-2b4302637935',
                '907c3abb-4cca-49de-ae95-d534353797c0',
                '11b65227-8ea6-44c4-b3bd-1f76439aa67e',
                'ACCEPTED',
                '2025-01-05 07:47:00',
                '2025-01-05 07:48:00'
        ),
        (
                '1c8165e2-e569-48b7-baeb-5a114d2ee80f',
                '124a71f3-a9c2-4ebb-8bc2-626181133460',
                '93ebceb4-8402-4c08-ae7f-b73ca366a315',
                'REJECTED',
                '2025-01-08 07:30:00',
                '2025-01-08 07:31:00'
        ),
        (
                'e2fe3caa-4821-4837-b26c-ed3aacce3c04',
                '124a71f3-a9c2-4ebb-8bc2-626181133460',
                '4d9078cb-dcf6-475c-b043-ef1e3475fb6f',
                'ACCEPTED',
                '2025-01-08 07:32:00',
                '2025-01-08 07:33:00'
        ),
        (
                'b7812449-b052-4b86-ac92-f7625a73b117',
                '008f5677-e23e-49b0-af1f-5a0eb242404d',
                '11b65227-8ea6-44c4-b3bd-1f76439aa67e',
                'REJECTED',
                '2025-01-12 08:00:00',
                '2025-01-12 08:01:00'
        ),
        (
                '266d2280-9a2b-4e99-8948-4fe13f3a989a',
                '008f5677-e23e-49b0-af1f-5a0eb242404d',
                '93ebceb4-8402-4c08-ae7f-b73ca366a315',
                'ACCEPTED',
                '2025-01-12 08:02:00',
                '2025-01-12 08:03:00'
        ),
        (
                '9de9fa3f-d058-4122-bfc6-7f5f6621798a',
                '56b4b755-007c-4e07-b62c-59f356368988',
                '4d9078cb-dcf6-475c-b043-ef1e3475fb6f',
                'REJECTED',
                '2025-01-18 08:15:00',
                '2025-01-18 08:16:00'
        ),
        (
                'dd8678bb-fde6-4f57-b59f-ffe2705b1540',
                '56b4b755-007c-4e07-b62c-59f356368988',
                '11b65227-8ea6-44c4-b3bd-1f76439aa67e',
                'ACCEPTED',
                '2025-01-18 08:17:00',
                '2025-01-18 08:18:00'
        ),
        (
                'ca344dff-0e6e-44ae-9bb9-a87febbe5718',
                '0ed0e9ff-5ac9-4a64-aa50-4acf80c29aa0',
                '93ebceb4-8402-4c08-ae7f-b73ca366a315',
                'REJECTED',
                '2025-01-28 07:35:00',
                '2025-01-28 07:36:00'
        ),
        (
                'c92fa040-5f60-400c-837a-d7b95bef2e5a',
                '0ed0e9ff-5ac9-4a64-aa50-4acf80c29aa0',
                '4d9078cb-dcf6-475c-b043-ef1e3475fb6f',
                'ACCEPTED',
                '2025-01-28 07:37:00',
                '2025-01-28 07:38:00'
        ),
        (
                '424c95bd-d960-4a44-ac9c-73408afe776b',
                'dea6534e-e889-4895-a55e-383978c515f1',
                '11b65227-8ea6-44c4-b3bd-1f76439aa67e',
                'REJECTED',
                '2025-02-01 11:15:00',
                '2025-02-01 11:16:00'
        ),
        (
                '22b9e4ed-641a-47b6-948a-62722bf95f3e',
                'dea6534e-e889-4895-a55e-383978c515f1',
                '93ebceb4-8402-4c08-ae7f-b73ca366a315',
                'ACCEPTED',
                '2025-02-01 11:17:00',
                '2025-02-01 11:18:00'
        ),
        (
                '66b2a033-b55f-4863-bee7-b5128d68ec2b',
                '6427466c-745c-4770-aeb0-ad542418617f',
                '4d9078cb-dcf6-475c-b043-ef1e3475fb6f',
                'REJECTED',
                '2025-02-05 11:45:00',
                '2025-02-05 11:46:00'
        ),
        (
                'fc5b50d2-a0e1-4741-9999-9c0fed2cf74f',
                '6427466c-745c-4770-aeb0-ad542418617f',
                '11b65227-8ea6-44c4-b3bd-1f76439aa67e',
                'ACCEPTED',
                '2025-02-05 11:47:00',
                '2025-02-05 11:48:00'
        ),
        (
                'b6b592f4-e346-4730-af88-83980fffeb22',
                '5b7b8dd7-785c-4a60-a778-b97ebf0f500b',
                '93ebceb4-8402-4c08-ae7f-b73ca366a315',
                'REJECTED',
                '2025-02-09 12:15:00',
                '2025-02-09 12:16:00'
        ),
        (
                '7f8efe34-fb93-4a1a-9c95-c00e0e90bfea',
                '5b7b8dd7-785c-4a60-a778-b97ebf0f500b',
                '4d9078cb-dcf6-475c-b043-ef1e3475fb6f',
                'ACCEPTED',
                '2025-02-09 12:17:00',
                '2025-02-09 12:18:00'
        ),
        (
                'cfe58b1e-1ed9-48b3-b37d-4362fb594501',
                '219ba0b0-a63e-4e78-ba9b-f95f2def2be4',
                '11b65227-8ea6-44c4-b3bd-1f76439aa67e',
                'REJECTED',
                '2025-02-13 11:30:00',
                '2025-02-13 11:31:00'
        ),
        (
                'd3f5067a-f34a-488e-ad47-5c9e409de0e7',
                '219ba0b0-a63e-4e78-ba9b-f95f2def2be4',
                '93ebceb4-8402-4c08-ae7f-b73ca366a315',
                'ACCEPTED',
                '2025-02-13 11:32:00',
                '2025-02-13 11:33:00'
        ),
        (
                '433695e8-0bab-44a0-a6e7-57ca3ee934c0',
                'd1a7cc5e-0d93-4f21-a18a-6ec3eb674760',
                '4d9078cb-dcf6-475c-b043-ef1e3475fb6f',
                'REJECTED',
                '2025-02-21 12:15:00',
                '2025-02-21 12:16:00'
        ),
        (
                'c7d36aeb-3243-497f-842d-53d1161c1c15',
                'd1a7cc5e-0d93-4f21-a18a-6ec3eb674760',
                '11b65227-8ea6-44c4-b3bd-1f76439aa67e',
                'ACCEPTED',
                '2025-02-21 12:17:00',
                '2025-02-21 12:18:00'
        ),
        (
                'a5f45b51-874f-41db-943f-025bfeddcddf',
                'c8c85e84-35f5-4176-bc6b-12a153cc2afc',
                '11b65227-8ea6-44c4-b3bd-1f76439aa67e',
                'REJECTED',
                '2025-02-25 11:50:00',
                '2025-02-25 11:55:00'
        ),
        (
                '7f94c620-6b73-4f9e-9e92-31ab9770e3c0',
                'c8c85e84-35f5-4176-bc6b-12a153cc2afc',
                '4d9078cb-dcf6-475c-b043-ef1e3475fb6f',
                'REJECTED',
                '2025-02-25 12:00:00',
                '2025-02-25 12:05:00'
        ),
        (
                'bf1a5e17-396c-4d70-a97d-700e1a3e5151',
                'c8c85e84-35f5-4176-bc6b-12a153cc2afc',
                '93ebceb4-8402-4c08-ae7f-b73ca366a315',
                'REJECTED',
                '2025-02-25 12:10:00',
                '2025-02-25 12:15:00'
        ),
        (
                '2e21050c-e825-4a32-a45b-db3cd748a6aa',
                'f48bc76a-92be-4d9b-a7cc-cdde89e9f141',
                '93ebceb4-8402-4c08-ae7f-b73ca366a315',
                'REJECTED',
                '2025-03-01 18:15:00',
                '2025-03-01 18:16:00'
        ),
        (
                '90c95abe-fafb-4e67-aa6a-234eb28f6d40',
                'f48bc76a-92be-4d9b-a7cc-cdde89e9f141',
                '4d9078cb-dcf6-475c-b043-ef1e3475fb6f',
                'ACCEPTED',
                '2025-03-01 18:17:00',
                '2025-03-01 18:18:00'
        ),
        (
                '678157f7-988d-4137-988a-b440304ea0df',
                'b2d0f65c-4c61-47da-bcc3-b91f2e23bfa1',
                '11b65227-8ea6-44c4-b3bd-1f76439aa67e',
                'REJECTED',
                '2025-03-05 18:45:00',
                '2025-03-05 18:46:00'
        ),
        (
                '709419c2-3b71-4f34-a03a-753b16546f00',
                'b2d0f65c-4c61-47da-bcc3-b91f2e23bfa1',
                '93ebceb4-8402-4c08-ae7f-b73ca366a315',
                'ACCEPTED',
                '2025-03-05 18:47:00',
                '2025-03-05 18:48:00'
        ),
        (
                '3c39dbd5-8841-4b8b-b37e-4e347313cb91',
                'a79fef2a-9a4a-4f77-afce-d8d5ac01083a',
                '4d9078cb-dcf6-475c-b043-ef1e3475fb6f',
                'REJECTED',
                '2025-03-09 19:15:00',
                '2025-03-09 19:16:00'
        ),
        (
                'a934e77a-df27-4bd8-a29a-4752dd920905',
                'a79fef2a-9a4a-4f77-afce-d8d5ac01083a',
                '11b65227-8ea6-44c4-b3bd-1f76439aa67e',
                'ACCEPTED',
                '2025-03-09 19:17:00',
                '2025-03-09 19:18:00'
        ),
        (
                '6ed1a92f-783f-4c93-8c2c-6f14cece3900',
                '0074446d-3875-421b-8231-d93704d799c7',
                '93ebceb4-8402-4c08-ae7f-b73ca366a315',
                'REJECTED',
                '2025-03-13 18:30:00',
                '2025-03-13 18:31:00'
        ),
        (
                '4c971c29-1c4b-4f41-b0f4-e1cf1c309bed',
                '0074446d-3875-421b-8231-d93704d799c7',
                '4d9078cb-dcf6-475c-b043-ef1e3475fb6f',
                'ACCEPTED',
                '2025-03-13 18:32:00',
                '2025-03-13 18:33:00'
        ),
        (
                '1bc49ab6-dbca-48cb-a3c6-585ce87eb43f',
                'bd0cebc9-7c4f-4a23-8809-9d8d3922e068',
                '11b65227-8ea6-44c4-b3bd-1f76439aa67e',
                'REJECTED',
                '2025-03-17 19:00:00',
                '2025-03-17 19:01:00'
        ),
        (
                '3ab08284-7e4b-445f-a05f-7529fe3aebe6',
                'bd0cebc9-7c4f-4a23-8809-9d8d3922e068',
                '93ebceb4-8402-4c08-ae7f-b73ca366a315',
                'ACCEPTED',
                '2025-03-17 19:02:00',
                '2025-03-17 19:03:00'
        ),
        (
                '595ddf2f-6e45-4ff9-b223-1c14a584a4fa',
                'a2e7c33e-5372-4eef-abfa-b070f35d29ad',
                '4d9078cb-dcf6-475c-b043-ef1e3475fb6f',
                'REJECTED',
                '2025-03-25 18:45:00',
                '2025-03-25 18:46:00'
        ),
        (
                '37efea27-a8ee-4513-b2e9-480f3b7b331f',
                'a2e7c33e-5372-4eef-abfa-b070f35d29ad',
                '11b65227-8ea6-44c4-b3bd-1f76439aa67e',
                'ACCEPTED',
                '2025-03-25 18:47:00',
                '2025-03-25 18:48:00'
        );

-- =========================================================================
-- 18. DISH_REVIEWS  (chỉ cho CUSTOMER_CONFIRMED)
-- =========================================================================
INSERT INTO
        dish_reviews (
                id,
                dish_id,
                customer_id,
                order_id,
                rating_stars,
                comment,
                created_at
        )
VALUES
        (
                'c86e721a-9e36-43a9-8532-c67470466856',
                '04c815b5-9ec5-424d-a6fe-1bf3779687f0',
                '8774fcd7-84c1-4eda-afbf-7cc56902c662',
                '907c3abb-4cca-49de-ae95-d534353797c0',
                5,
                N'Phở đặc biệt cực ngon, nước dùng trong veo ngọt tự nhiên, thịt bò tươi. Xứng đáng 5 sao!',
                '2025-01-05 08:20:00'
        ),
        (
                'fba5fdcb-8049-436c-87b0-18b48fc853a1',
                '525c5597-2e98-4a62-95ea-125f7e53ebca',
                '8774fcd7-84c1-4eda-afbf-7cc56902c662',
                '907c3abb-4cca-49de-ae95-d534353797c0',
                5,
                N'Bát phở bò tái chín đúng vị, thịt bò tươi mềm không bị dai.',
                '2025-01-05 08:20:00'
        ),
        (
                'd5c43a35-7979-4770-b5ad-1da53ae02d30',
                '0d7e393e-0560-4eb0-ba88-9d4c8406fe5e',
                '8774fcd7-84c1-4eda-afbf-7cc56902c662',
                '907c3abb-4cca-49de-ae95-d534353797c0',
                4,
                N'Sáng sớm xếp hàng 15 phút nhưng hoàn toàn xứng đáng. 5 sao!',
                '2025-01-05 08:20:00'
        ),
        (
                '4d1ce957-0d3e-42dd-b096-e99e5906d454',
                '1e50aab7-a160-46e4-bfa4-3505a482dac8',
                'a226b988-abaf-42f5-b79f-90a6d79efc18',
                '124a71f3-a9c2-4ebb-8bc2-626181133460',
                5,
                N'Phở tái lăn thơm mùi sả ớt, đặc sản không nơi nào có. Sẽ quay lại!',
                '2025-01-08 08:05:00'
        ),
        (
                '6d2244bc-b401-468d-973e-5ffd9322a65e',
                '3f80d47c-d991-4a22-b97d-6c2de91af2f5',
                'a226b988-abaf-42f5-b79f-90a6d79efc18',
                '124a71f3-a9c2-4ebb-8bc2-626181133460',
                4,
                N'Phở gà thanh nhẹ, phù hợp ăn sáng. Quẩy giòn ăn kèm rất hợp.',
                '2025-01-08 08:05:00'
        ),
        (
                '6e9d6615-7783-4a83-9237-3bcfde82d27a',
                '04c815b5-9ec5-424d-a6fe-1bf3779687f0',
                '50298a1c-7586-407c-a079-e9091d47e698',
                '008f5677-e23e-49b0-af1f-5a0eb242404d',
                5,
                N'Phở đặc biệt cực ngon, nước dùng trong veo ngọt tự nhiên, thịt bò tươi. Xứng đáng 5 sao!',
                '2025-01-12 08:35:00'
        ),
        (
                '5d8dddb2-4be5-401a-812c-a49d7349625c',
                '112e5723-bb99-4e04-8e16-e46cc786927c',
                '50298a1c-7586-407c-a079-e9091d47e698',
                '008f5677-e23e-49b0-af1f-5a0eb242404d',
                5,
                N'Nước dùng ngọt từ xương, không dùng bột ngọt. Chuẩn vị Hà Nội xưa.',
                '2025-01-12 08:35:00'
        ),
        (
                'f1a0f6a5-0c2c-428c-8e6b-07b92b0a57c1',
                '525c5597-2e98-4a62-95ea-125f7e53ebca',
                '50298a1c-7586-407c-a079-e9091d47e698',
                '008f5677-e23e-49b0-af1f-5a0eb242404d',
                4,
                N'Bát phở bò tái chín đúng vị, thịt bò tươi mềm không bị dai.',
                '2025-01-12 08:35:00'
        ),
        (
                'a1286ae8-94fc-458d-b4e1-bb04f4f29f2f',
                '3f80d47c-d991-4a22-b97d-6c2de91af2f5',
                '39548e8b-7022-46df-a028-f83e5778830a',
                '56b4b755-007c-4e07-b62c-59f356368988',
                5,
                N'Phở gà thanh nhẹ, phù hợp ăn sáng. Quẩy giòn ăn kèm rất hợp.',
                '2025-01-18 08:50:00'
        ),
        (
                '366e571a-09cc-478b-8cdf-278bae8fc263',
                '0d7e393e-0560-4eb0-ba88-9d4c8406fe5e',
                '39548e8b-7022-46df-a028-f83e5778830a',
                '56b4b755-007c-4e07-b62c-59f356368988',
                4,
                N'Sáng sớm xếp hàng 15 phút nhưng hoàn toàn xứng đáng. 5 sao!',
                '2025-01-18 08:50:00'
        ),
        (
                'b5c7a849-78ec-4ce3-a40b-a0ec0b8524c7',
                '04c815b5-9ec5-424d-a6fe-1bf3779687f0',
                '8774fcd7-84c1-4eda-afbf-7cc56902c662',
                '0ed0e9ff-5ac9-4a64-aa50-4acf80c29aa0',
                5,
                N'Phở đặc biệt cực ngon, nước dùng trong veo ngọt tự nhiên, thịt bò tươi. Xứng đáng 5 sao!',
                '2025-01-28 08:10:00'
        ),
        (
                '0e410129-28b4-449e-a5f6-7125e4a072a7',
                '112e5723-bb99-4e04-8e16-e46cc786927c',
                '8774fcd7-84c1-4eda-afbf-7cc56902c662',
                '0ed0e9ff-5ac9-4a64-aa50-4acf80c29aa0',
                5,
                N'Nước dùng ngọt từ xương, không dùng bột ngọt. Chuẩn vị Hà Nội xưa.',
                '2025-01-28 08:10:00'
        ),
        (
                '260d83e7-dde8-410e-83d1-8d072a536139',
                'a04c1797-6435-4805-ba02-225d1af8f410',
                'a226b988-abaf-42f5-b79f-90a6d79efc18',
                'dea6534e-e889-4895-a55e-383978c515f1',
                5,
                N'Bún chả Obama cực đỉnh! Chả miếng thơm than hoa, nước mắm chua ngọt hoàn hảo.',
                '2025-02-01 11:50:00'
        ),
        (
                'c51d3d39-fa42-4838-9fdd-bbdb57284948',
                'dd86f01f-5f03-4ab7-9fab-afe4208bdd35',
                'a226b988-abaf-42f5-b79f-90a6d79efc18',
                'dea6534e-e889-4895-a55e-383978c515f1',
                5,
                N'Quán huyền thoại Hà Nội, chất lượng không thay đổi qua nhiều năm.',
                '2025-02-01 11:50:00'
        ),
        (
                '2985d81b-95bd-40d1-ab4e-e3e65e4c3b58',
                'd5686a1b-012a-464b-b7c8-954907d7cc65',
                'a226b988-abaf-42f5-b79f-90a6d79efc18',
                'dea6534e-e889-4895-a55e-383978c515f1',
                4,
                N'Phục vụ nhanh dù đông khách. Bún chả thường giá ổn mà ngon.',
                '2025-02-01 11:50:00'
        ),
        (
                '932359ca-2a17-4f97-ace7-823fae9eff05',
                'c83db4d2-79b9-4d02-a4ed-beac07ef87aa',
                '39548e8b-7022-46df-a028-f83e5778830a',
                '6427466c-745c-4770-aeb0-ad542418617f',
                5,
                N'Nem cuốn tươi giòn, tôm thịt đầy đặn. Uống bia Hà Nội kèm là tuyệt vời.',
                '2025-02-05 12:20:00'
        ),
        (
                'ca9d8434-bdb5-4a49-a262-cd529b97d9b6',
                '54035a4f-ed38-411f-b295-9f1cb4b2b40f',
                '39548e8b-7022-46df-a028-f83e5778830a',
                '6427466c-745c-4770-aeb0-ad542418617f',
                4,
                N'Chả giò giòn rụm, nhân cua thơm. Kết hợp với bún chả là hoàn hảo.',
                '2025-02-05 12:20:00'
        ),
        (
                '6c356cf2-cd05-4fec-802f-f0866fd00c29',
                'd5686a1b-012a-464b-b7c8-954907d7cc65',
                '39548e8b-7022-46df-a028-f83e5778830a',
                '6427466c-745c-4770-aeb0-ad542418617f',
                5,
                N'Phục vụ nhanh dù đông khách. Bún chả thường giá ổn mà ngon.',
                '2025-02-05 12:20:00'
        ),
        (
                '2de30aba-732f-477d-a446-a54e32fff644',
                '0d3df7bc-d38d-4ad6-a6f8-5167c9c3599f',
                '50298a1c-7586-407c-a079-e9091d47e698',
                '5b7b8dd7-785c-4a60-a778-b97ebf0f500b',
                5,
                N'Bún chả sườn sụn nướng mật ong ngọt thơm, khác hẳn nơi khác.',
                '2025-02-09 12:50:00'
        ),
        (
                '647ff983-085f-4ffc-9d13-25a2e6da99fb',
                'dd86f01f-5f03-4ab7-9fab-afe4208bdd35',
                '50298a1c-7586-407c-a079-e9091d47e698',
                '5b7b8dd7-785c-4a60-a778-b97ebf0f500b',
                4,
                N'Quán huyền thoại Hà Nội, chất lượng không thay đổi qua nhiều năm.',
                '2025-02-09 12:50:00'
        ),
        (
                '2952733a-ae0a-4011-8c01-525bcb3ff3a8',
                'a04c1797-6435-4805-ba02-225d1af8f410',
                '3f9c05ba-6bd9-4ad8-93da-41586a58971c',
                '219ba0b0-a63e-4e78-ba9b-f95f2def2be4',
                5,
                N'Bún chả Obama cực đỉnh! Chả miếng thơm than hoa, nước mắm chua ngọt hoàn hảo.',
                '2025-02-13 12:05:00'
        ),
        (
                '7ecece36-838c-4fa4-91c8-2b36de7ac3af',
                'c83db4d2-79b9-4d02-a4ed-beac07ef87aa',
                '3f9c05ba-6bd9-4ad8-93da-41586a58971c',
                '219ba0b0-a63e-4e78-ba9b-f95f2def2be4',
                4,
                N'Nem cuốn tươi giòn, tôm thịt đầy đặn. Uống bia Hà Nội kèm là tuyệt vời.',
                '2025-02-13 12:05:00'
        ),
        (
                'b31e5b43-5116-493b-9ba6-a9729182068c',
                'd5686a1b-012a-464b-b7c8-954907d7cc65',
                '3f9c05ba-6bd9-4ad8-93da-41586a58971c',
                '219ba0b0-a63e-4e78-ba9b-f95f2def2be4',
                5,
                N'Phục vụ nhanh dù đông khách. Bún chả thường giá ổn mà ngon.',
                '2025-02-13 12:05:00'
        ),
        (
                '0a686d92-097a-45bb-847f-4aecff40b079',
                'c83db4d2-79b9-4d02-a4ed-beac07ef87aa',
                'a226b988-abaf-42f5-b79f-90a6d79efc18',
                'd1a7cc5e-0d93-4f21-a18a-6ec3eb674760',
                5,
                N'Nem cuốn tươi giòn, tôm thịt đầy đặn. Uống bia Hà Nội kèm là tuyệt vời.',
                '2025-02-21 12:50:00'
        ),
        (
                'f89c27bc-c42c-47be-92a2-2b4e06bfe9e2',
                'dd86f01f-5f03-4ab7-9fab-afe4208bdd35',
                'a226b988-abaf-42f5-b79f-90a6d79efc18',
                'd1a7cc5e-0d93-4f21-a18a-6ec3eb674760',
                5,
                N'Quán huyền thoại Hà Nội, chất lượng không thay đổi qua nhiều năm.',
                '2025-02-21 12:50:00'
        ),
        (
                '81c62110-4095-428a-858a-0cff6e99ec29',
                '13af6215-39d8-4b1a-9ab9-86710a386f28',
                '50298a1c-7586-407c-a079-e9091d47e698',
                'f48bc76a-92be-4d9b-a7cc-cdde89e9f141',
                5,
                N'Pizza Sài Gòn đặc biệt đế giòn, phô mai tan chảy hấp dẫn. Sẽ order lại!',
                '2025-03-01 18:50:00'
        ),
        (
                '950d1a3f-edb4-4fd1-a836-89384c11131d',
                'dccc6688-a910-4fe0-b503-5c6fa1f64e6e',
                '50298a1c-7586-407c-a079-e9091d47e698',
                'f48bc76a-92be-4d9b-a7cc-cdde89e9f141',
                4,
                N'Giao hàng nhanh, pizza vẫn còn nóng khi nhận. Khoai tây chiên giòn ngon.',
                '2025-03-01 18:50:00'
        ),
        (
                'ff09fc6b-e2e9-41e9-abb9-a300728a6b41',
                '4fe92ce8-070b-4767-8d2f-55f96837ad98',
                '50298a1c-7586-407c-a079-e9091d47e698',
                'f48bc76a-92be-4d9b-a7cc-cdde89e9f141',
                5,
                N'Combo pizza + burger no cả buổi tối. Giá hợp lý cho khẩu phần lớn.',
                '2025-03-01 18:50:00'
        ),
        (
                'f5b2f374-39ec-4141-bc3e-d4d3591f7527',
                '8ef1701d-e929-443a-ba71-a292b7252961',
                '3f9c05ba-6bd9-4ad8-93da-41586a58971c',
                'b2d0f65c-4c61-47da-bcc3-b91f2e23bfa1',
                4,
                N'Pizza hải sản tươi ngon, tôm mực giòn ngọt. Ngon hơn cả nhà hàng Ý.',
                '2025-03-05 19:20:00'
        ),
        (
                'd704872b-d56f-4120-aabc-2230ce93b814',
                'd4c49b36-cc5d-4484-96ad-0eaa6ef9873d',
                '3f9c05ba-6bd9-4ad8-93da-41586a58971c',
                'b2d0f65c-4c61-47da-bcc3-b91f2e23bfa1',
                5,
                N'Pizza chay nấm sốt pesto rất thơm, phù hợp người ăn chay. 5 sao!',
                '2025-03-05 19:20:00'
        ),
        (
                '5891f3e9-f1ce-431f-8198-19858cdea3ea',
                'fbd30f00-03d7-4076-875b-7ed936025aa1',
                'a226b988-abaf-42f5-b79f-90a6d79efc18',
                'a79fef2a-9a4a-4f77-afce-d8d5ac01083a',
                5,
                N'Burger bò Wagyu thịt mềm juicy, sốt BBQ khói đậm đà. Xứng đáng giá tiền.',
                '2025-03-09 19:50:00'
        ),
        (
                '42cd2e09-d3e7-456c-9121-a2fdb90517c0',
                'dccc6688-a910-4fe0-b503-5c6fa1f64e6e',
                'a226b988-abaf-42f5-b79f-90a6d79efc18',
                'a79fef2a-9a4a-4f77-afce-d8d5ac01083a',
                4,
                N'Giao hàng nhanh, pizza vẫn còn nóng khi nhận. Khoai tây chiên giòn ngon.',
                '2025-03-09 19:50:00'
        ),
        (
                'e5cd07f8-54ca-4426-a413-5f06d2cd12ba',
                '4fe92ce8-070b-4767-8d2f-55f96837ad98',
                'a226b988-abaf-42f5-b79f-90a6d79efc18',
                'a79fef2a-9a4a-4f77-afce-d8d5ac01083a',
                5,
                N'Combo pizza + burger no cả buổi tối. Giá hợp lý cho khẩu phần lớn.',
                '2025-03-09 19:50:00'
        ),
        (
                'e5e85006-881d-4842-8ba0-1864068e6fda',
                '13af6215-39d8-4b1a-9ab9-86710a386f28',
                '39548e8b-7022-46df-a028-f83e5778830a',
                '0074446d-3875-421b-8231-d93704d799c7',
                4,
                N'Pizza Sài Gòn đặc biệt đế giòn, phô mai tan chảy hấp dẫn. Sẽ order lại!',
                '2025-03-13 19:05:00'
        ),
        (
                '7f8e4c54-5f75-4c5e-bda2-08986e1917e5',
                '8ef1701d-e929-443a-ba71-a292b7252961',
                '39548e8b-7022-46df-a028-f83e5778830a',
                '0074446d-3875-421b-8231-d93704d799c7',
                5,
                N'Pizza hải sản tươi ngon, tôm mực giòn ngọt. Ngon hơn cả nhà hàng Ý.',
                '2025-03-13 19:05:00'
        ),
        (
                '4f5d8fd7-9065-4c11-97a7-3d810d21e086',
                'd4c49b36-cc5d-4484-96ad-0eaa6ef9873d',
                '8774fcd7-84c1-4eda-afbf-7cc56902c662',
                'bd0cebc9-7c4f-4a23-8809-9d8d3922e068',
                5,
                N'Pizza chay nấm sốt pesto rất thơm, phù hợp người ăn chay. 5 sao!',
                '2025-03-17 19:35:00'
        ),
        (
                'a4e5c249-c9d5-4abc-b45f-9d53d19f7565',
                'dccc6688-a910-4fe0-b503-5c6fa1f64e6e',
                '8774fcd7-84c1-4eda-afbf-7cc56902c662',
                'bd0cebc9-7c4f-4a23-8809-9d8d3922e068',
                5,
                N'Giao hàng nhanh, pizza vẫn còn nóng khi nhận. Khoai tây chiên giòn ngon.',
                '2025-03-17 19:35:00'
        ),
        (
                'fd0601c0-c1a1-41de-a241-38290c04105e',
                '4fe92ce8-070b-4767-8d2f-55f96837ad98',
                '8774fcd7-84c1-4eda-afbf-7cc56902c662',
                'bd0cebc9-7c4f-4a23-8809-9d8d3922e068',
                5,
                N'Combo pizza + burger no cả buổi tối. Giá hợp lý cho khẩu phần lớn.',
                '2025-03-17 19:35:00'
        ),
        (
                '070096f3-6fe9-42a9-8ea5-ec2d64e18d04',
                '13af6215-39d8-4b1a-9ab9-86710a386f28',
                '3f9c05ba-6bd9-4ad8-93da-41586a58971c',
                'a2e7c33e-5372-4eef-abfa-b070f35d29ad',
                4,
                N'Pizza Sài Gòn đặc biệt đế giòn, phô mai tan chảy hấp dẫn. Sẽ order lại!',
                '2025-03-25 19:20:00'
        ),
        (
                '84d7af85-a3b0-4c54-8555-286ea0da60e4',
                '8ef1701d-e929-443a-ba71-a292b7252961',
                '3f9c05ba-6bd9-4ad8-93da-41586a58971c',
                'a2e7c33e-5372-4eef-abfa-b070f35d29ad',
                5,
                N'Pizza hải sản tươi ngon, tôm mực giòn ngọt. Ngon hơn cả nhà hàng Ý.',
                '2025-03-25 19:20:00'
        ),
        (
                '913afabc-2f77-4938-8b6e-5773e4ca7fbe',
                '4fe92ce8-070b-4767-8d2f-55f96837ad98',
                '3f9c05ba-6bd9-4ad8-93da-41586a58971c',
                'a2e7c33e-5372-4eef-abfa-b070f35d29ad',
                4,
                N'Combo pizza + burger no cả buổi tối. Giá hợp lý cho khẩu phần lớn.',
                '2025-03-25 19:20:00'
        );

-- =========================================================================
-- 19. WALLET_TRANSACTIONS
-- =========================================================================
INSERT INTO
        wallet_transactions (
                id,
                wallet_id,
                amount,
                type,
                reference_order_id,
                created_at
        )
VALUES
        (
                '59b7a0dd-28cd-4850-952e-196502155b8f',
                '0ab2ddfb-a719-48a7-86dc-46dca0959f5f',
                500000.00,
                'DEPOSIT',
                NULL,
                '2024-01-25 08:00:00'
        ),
        (
                'f71beceb-24f9-489c-91ed-9a76a60575d4',
                '9daf3a0c-1c2b-408c-a988-cc6776437479',
                600000.00,
                'DEPOSIT',
                NULL,
                '2024-01-25 08:00:00'
        ),
        (
                '51036149-9fef-46f4-9b37-6d8f6f6e0b10',
                'b06f898e-3e51-4879-b941-16c7a218a1ba',
                450000.00,
                'DEPOSIT',
                NULL,
                '2024-01-25 08:00:00'
        ),
        (
                '927fe7f4-7e1c-46e6-8d80-525491cbabb4',
                '0ab2ddfb-a719-48a7-86dc-46dca0959f5f',
                15000.00,
                'DELIVERY_EARNING',
                '907c3abb-4cca-49de-ae95-d534353797c0',
                '2025-01-05 08:15:00'
        ),
        (
                '5d9de84f-c537-4748-bade-ca0ff2370c27',
                '94afc3f3-f767-4c12-b9ec-c70feef77538',
                92400.00,
                'RESTAURANT_REVENUE',
                '907c3abb-4cca-49de-ae95-d534353797c0',
                '2025-01-05 08:15:00'
        ),
        (
                '77c98e98-bc1c-4e18-aaab-657ecef18f8d',
                '3d3eace5-bc5c-47af-bb81-d8860f2322bb',
                12600.00,
                'COMMISSION_FEE',
                '907c3abb-4cca-49de-ae95-d534353797c0',
                '2025-01-05 08:15:00'
        ),
        (
                '57ba8c5a-8b28-4cab-9bf9-e4b06a56fc66',
                '9daf3a0c-1c2b-408c-a988-cc6776437479',
                15000.00,
                'DELIVERY_EARNING',
                '124a71f3-a9c2-4ebb-8bc2-626181133460',
                '2025-01-08 08:00:00'
        ),
        (
                '34dfd013-6b9a-4305-ac9a-a57ad16de077',
                '94afc3f3-f767-4c12-b9ec-c70feef77538',
                123200.00,
                'RESTAURANT_REVENUE',
                '124a71f3-a9c2-4ebb-8bc2-626181133460',
                '2025-01-08 08:00:00'
        ),
        (
                '29d48681-69ba-4bb5-977c-86c62cdc8b67',
                '3d3eace5-bc5c-47af-bb81-d8860f2322bb',
                16800.00,
                'COMMISSION_FEE',
                '124a71f3-a9c2-4ebb-8bc2-626181133460',
                '2025-01-08 08:00:00'
        ),
        (
                '6a2c9af4-9950-48cd-8ed4-72072e3b3f64',
                'b06f898e-3e51-4879-b941-16c7a218a1ba',
                15000.00,
                'DELIVERY_EARNING',
                '008f5677-e23e-49b0-af1f-5a0eb242404d',
                '2025-01-12 08:30:00'
        ),
        (
                '34ae35ae-3a1f-4d53-b14a-b6f5f095a1f1',
                '94afc3f3-f767-4c12-b9ec-c70feef77538',
                140800.00,
                'RESTAURANT_REVENUE',
                '008f5677-e23e-49b0-af1f-5a0eb242404d',
                '2025-01-12 08:30:00'
        ),
        (
                '86131d8c-6fdc-41ad-af5f-9fcf5631e774',
                '3d3eace5-bc5c-47af-bb81-d8860f2322bb',
                19200.00,
                'COMMISSION_FEE',
                '008f5677-e23e-49b0-af1f-5a0eb242404d',
                '2025-01-12 08:30:00'
        ),
        (
                'ddb561e2-0be6-4a54-9eed-6491cbe79d7c',
                '0ab2ddfb-a719-48a7-86dc-46dca0959f5f',
                15000.00,
                'DELIVERY_EARNING',
                '56b4b755-007c-4e07-b62c-59f356368988',
                '2025-01-18 08:45:00'
        ),
        (
                'e8ffc30e-4ec1-42dc-9404-e9c0b2495c8b',
                '94afc3f3-f767-4c12-b9ec-c70feef77538',
                145200.00,
                'RESTAURANT_REVENUE',
                '56b4b755-007c-4e07-b62c-59f356368988',
                '2025-01-18 08:45:00'
        ),
        (
                'ba7f095f-2288-4c2d-a25d-86ea9c63d3d5',
                '3d3eace5-bc5c-47af-bb81-d8860f2322bb',
                19800.00,
                'COMMISSION_FEE',
                '56b4b755-007c-4e07-b62c-59f356368988',
                '2025-01-18 08:45:00'
        ),
        (
                '94c22526-39bb-49d7-b74c-bcdfea35eaac',
                '9daf3a0c-1c2b-408c-a988-cc6776437479',
                15000.00,
                'DELIVERY_EARNING',
                '0ed0e9ff-5ac9-4a64-aa50-4acf80c29aa0',
                '2025-01-28 08:05:00'
        ),
        (
                'd70bca36-b5c8-40e2-81a1-84bb74c86073',
                '94afc3f3-f767-4c12-b9ec-c70feef77538',
                123200.00,
                'RESTAURANT_REVENUE',
                '0ed0e9ff-5ac9-4a64-aa50-4acf80c29aa0',
                '2025-01-28 08:05:00'
        ),
        (
                '66c3fe94-0118-43de-89fe-0b40d14a5fa9',
                '3d3eace5-bc5c-47af-bb81-d8860f2322bb',
                16800.00,
                'COMMISSION_FEE',
                '0ed0e9ff-5ac9-4a64-aa50-4acf80c29aa0',
                '2025-01-28 08:05:00'
        ),
        (
                '1eb790ad-003a-429f-a5f9-407f27e56867',
                'b06f898e-3e51-4879-b941-16c7a218a1ba',
                18000.00,
                'DELIVERY_EARNING',
                'dea6534e-e889-4895-a55e-383978c515f1',
                '2025-02-01 11:45:00'
        ),
        (
                '47abce01-9daf-40d2-91eb-e41bc2388921',
                '5483bef5-6604-4313-a467-bcbe76db8bd4',
                149600.00,
                'RESTAURANT_REVENUE',
                'dea6534e-e889-4895-a55e-383978c515f1',
                '2025-02-01 11:45:00'
        ),
        (
                'b9989cdb-3889-4ede-878d-d67b3d36ad37',
                '3d3eace5-bc5c-47af-bb81-d8860f2322bb',
                20400.00,
                'COMMISSION_FEE',
                'dea6534e-e889-4895-a55e-383978c515f1',
                '2025-02-01 11:45:00'
        ),
        (
                '50a58edd-94a7-46a5-b294-5cd397ce99fc',
                '0ab2ddfb-a719-48a7-86dc-46dca0959f5f',
                18000.00,
                'DELIVERY_EARNING',
                '6427466c-745c-4770-aeb0-ad542418617f',
                '2025-02-05 12:15:00'
        ),
        (
                '40c8ca09-a7af-448f-800b-bc0a1a2433aa',
                '5483bef5-6604-4313-a467-bcbe76db8bd4',
                132000.00,
                'RESTAURANT_REVENUE',
                '6427466c-745c-4770-aeb0-ad542418617f',
                '2025-02-05 12:15:00'
        ),
        (
                '9c2febcd-6b59-4b5c-9e99-13c494380e73',
                '3d3eace5-bc5c-47af-bb81-d8860f2322bb',
                18000.00,
                'COMMISSION_FEE',
                '6427466c-745c-4770-aeb0-ad542418617f',
                '2025-02-05 12:15:00'
        ),
        (
                '67ba5278-5fdd-487a-8f10-d53b8c8e9c9b',
                '9daf3a0c-1c2b-408c-a988-cc6776437479',
                18000.00,
                'DELIVERY_EARNING',
                '5b7b8dd7-785c-4a60-a778-b97ebf0f500b',
                '2025-02-09 12:45:00'
        ),
        (
                '9bf079c6-6953-4de1-ac23-6b663dd1cb6b',
                '5483bef5-6604-4313-a467-bcbe76db8bd4',
                110000.00,
                'RESTAURANT_REVENUE',
                '5b7b8dd7-785c-4a60-a778-b97ebf0f500b',
                '2025-02-09 12:45:00'
        ),
        (
                '1fd0e4e6-f0c9-4026-a9ae-4252d78e33be',
                '3d3eace5-bc5c-47af-bb81-d8860f2322bb',
                15000.00,
                'COMMISSION_FEE',
                '5b7b8dd7-785c-4a60-a778-b97ebf0f500b',
                '2025-02-09 12:45:00'
        ),
        (
                '2bc180c5-f3b3-4865-92df-d545d1c0409a',
                'b06f898e-3e51-4879-b941-16c7a218a1ba',
                18000.00,
                'DELIVERY_EARNING',
                '219ba0b0-a63e-4e78-ba9b-f95f2def2be4',
                '2025-02-13 12:00:00'
        ),
        (
                '465f2e14-4a24-4923-abc2-1dc8d0a6340b',
                '5483bef5-6604-4313-a467-bcbe76db8bd4',
                145200.00,
                'RESTAURANT_REVENUE',
                '219ba0b0-a63e-4e78-ba9b-f95f2def2be4',
                '2025-02-13 12:00:00'
        ),
        (
                '009c2888-423c-4d5a-9a06-6889007428e8',
                '3d3eace5-bc5c-47af-bb81-d8860f2322bb',
                19800.00,
                'COMMISSION_FEE',
                '219ba0b0-a63e-4e78-ba9b-f95f2def2be4',
                '2025-02-13 12:00:00'
        ),
        (
                'cfb365fc-e660-431b-be94-84027c37063f',
                '0ab2ddfb-a719-48a7-86dc-46dca0959f5f',
                18000.00,
                'DELIVERY_EARNING',
                'd1a7cc5e-0d93-4f21-a18a-6ec3eb674760',
                '2025-02-21 12:45:00'
        ),
        (
                'a93f66d8-835e-4fb1-a233-f2f7c62ee279',
                '5483bef5-6604-4313-a467-bcbe76db8bd4',
                145200.00,
                'RESTAURANT_REVENUE',
                'd1a7cc5e-0d93-4f21-a18a-6ec3eb674760',
                '2025-02-21 12:45:00'
        ),
        (
                '726ec9aa-159d-4f75-8f73-0ab29a6ae0a9',
                '3d3eace5-bc5c-47af-bb81-d8860f2322bb',
                19800.00,
                'COMMISSION_FEE',
                'd1a7cc5e-0d93-4f21-a18a-6ec3eb674760',
                '2025-02-21 12:45:00'
        ),
        (
                '60af6da8-ea51-43fe-a226-88dcd53f7a06',
                '9daf3a0c-1c2b-408c-a988-cc6776437479',
                20000.00,
                'DELIVERY_EARNING',
                'f48bc76a-92be-4d9b-a7cc-cdde89e9f141',
                '2025-03-01 18:45:00'
        ),
        (
                '254c09a3-6128-4211-ae2f-9042ea0870f1',
                '2538ad91-a1b5-48eb-b894-670e2b3ea1ff',
                202400.00,
                'RESTAURANT_REVENUE',
                'f48bc76a-92be-4d9b-a7cc-cdde89e9f141',
                '2025-03-01 18:45:00'
        ),
        (
                '1e452b77-811f-41f6-8cc2-92fe4148bda7',
                '3d3eace5-bc5c-47af-bb81-d8860f2322bb',
                27600.00,
                'COMMISSION_FEE',
                'f48bc76a-92be-4d9b-a7cc-cdde89e9f141',
                '2025-03-01 18:45:00'
        ),
        (
                'e1f51137-55bd-476a-9886-3a8ab5da2f6d',
                'b06f898e-3e51-4879-b941-16c7a218a1ba',
                20000.00,
                'DELIVERY_EARNING',
                'b2d0f65c-4c61-47da-bcc3-b91f2e23bfa1',
                '2025-03-05 19:15:00'
        ),
        (
                'dacb6f66-0798-4d2b-8d08-dad43842d365',
                '2538ad91-a1b5-48eb-b894-670e2b3ea1ff',
                220000.00,
                'RESTAURANT_REVENUE',
                'b2d0f65c-4c61-47da-bcc3-b91f2e23bfa1',
                '2025-03-05 19:15:00'
        ),
        (
                'd1d10e81-4e27-4dd7-9a0e-d2e58140084b',
                '3d3eace5-bc5c-47af-bb81-d8860f2322bb',
                30000.00,
                'COMMISSION_FEE',
                'b2d0f65c-4c61-47da-bcc3-b91f2e23bfa1',
                '2025-03-05 19:15:00'
        ),
        (
                '83092f76-dfa0-4976-a5cb-b68870fd7eae',
                '0ab2ddfb-a719-48a7-86dc-46dca0959f5f',
                20000.00,
                'DELIVERY_EARNING',
                'a79fef2a-9a4a-4f77-afce-d8d5ac01083a',
                '2025-03-09 19:45:00'
        ),
        (
                '69559d87-1c75-4c35-9239-0a2a55966167',
                '2538ad91-a1b5-48eb-b894-670e2b3ea1ff',
                206800.00,
                'RESTAURANT_REVENUE',
                'a79fef2a-9a4a-4f77-afce-d8d5ac01083a',
                '2025-03-09 19:45:00'
        ),
        (
                '59580a9b-b627-4a89-9994-6b564b180f1f',
                '3d3eace5-bc5c-47af-bb81-d8860f2322bb',
                28200.00,
                'COMMISSION_FEE',
                'a79fef2a-9a4a-4f77-afce-d8d5ac01083a',
                '2025-03-09 19:45:00'
        ),
        (
                '68420aa3-2c5a-4340-9fe9-916a5f68290d',
                '9daf3a0c-1c2b-408c-a988-cc6776437479',
                20000.00,
                'DELIVERY_EARNING',
                '0074446d-3875-421b-8231-d93704d799c7',
                '2025-03-13 19:00:00'
        ),
        (
                '03e542bc-86d9-46c3-a953-68bc46d93b29',
                '2538ad91-a1b5-48eb-b894-670e2b3ea1ff',
                264000.00,
                'RESTAURANT_REVENUE',
                '0074446d-3875-421b-8231-d93704d799c7',
                '2025-03-13 19:00:00'
        ),
        (
                '946d74da-a527-4834-ac75-9d26e876c89f',
                '3d3eace5-bc5c-47af-bb81-d8860f2322bb',
                36000.00,
                'COMMISSION_FEE',
                '0074446d-3875-421b-8231-d93704d799c7',
                '2025-03-13 19:00:00'
        ),
        (
                '9915545d-ce41-4992-9715-7cda8fa6178a',
                'b06f898e-3e51-4879-b941-16c7a218a1ba',
                20000.00,
                'DELIVERY_EARNING',
                'bd0cebc9-7c4f-4a23-8809-9d8d3922e068',
                '2025-03-17 19:30:00'
        ),
        (
                '1b543bcb-be04-42a6-a3e3-9ce66341ea9e',
                '2538ad91-a1b5-48eb-b894-670e2b3ea1ff',
                158400.00,
                'RESTAURANT_REVENUE',
                'bd0cebc9-7c4f-4a23-8809-9d8d3922e068',
                '2025-03-17 19:30:00'
        ),
        (
                '70e2c9bd-0cee-49d5-8941-2dddfd3b3883',
                '3d3eace5-bc5c-47af-bb81-d8860f2322bb',
                21600.00,
                'COMMISSION_FEE',
                'bd0cebc9-7c4f-4a23-8809-9d8d3922e068',
                '2025-03-17 19:30:00'
        ),
        (
                '6a933627-1b42-408a-8f0e-30cdef022997',
                '0ab2ddfb-a719-48a7-86dc-46dca0959f5f',
                20000.00,
                'DELIVERY_EARNING',
                'a2e7c33e-5372-4eef-abfa-b070f35d29ad',
                '2025-03-25 19:15:00'
        ),
        (
                '05ce0cc9-7de1-4d96-939c-4f81086bbb2e',
                '2538ad91-a1b5-48eb-b894-670e2b3ea1ff',
                299200.00,
                'RESTAURANT_REVENUE',
                'a2e7c33e-5372-4eef-abfa-b070f35d29ad',
                '2025-03-25 19:15:00'
        ),
        (
                '834ec530-2587-4041-8a0c-e6c7169f9c4b',
                '3d3eace5-bc5c-47af-bb81-d8860f2322bb',
                40800.00,
                'COMMISSION_FEE',
                'a2e7c33e-5372-4eef-abfa-b070f35d29ad',
                '2025-03-25 19:15:00'
        );

-- =========================================================================
-- 20. UPDATE wallet balances
-- =========================================================================
UPDATE wallets
SET
        balance_amount = 606000.00
WHERE
        id = '0ab2ddfb-a719-48a7-86dc-46dca0959f5f';

UPDATE wallets
SET
        balance_amount = 688000.00
WHERE
        id = '9daf3a0c-1c2b-408c-a988-cc6776437479';

UPDATE wallets
SET
        balance_amount = 541000.00
WHERE
        id = 'b06f898e-3e51-4879-b941-16c7a218a1ba';

UPDATE wallets
SET
        balance_amount = 624800.00
WHERE
        id = '94afc3f3-f767-4c12-b9ec-c70feef77538';

UPDATE wallets
SET
        balance_amount = 682000.00
WHERE
        id = '5483bef5-6604-4313-a467-bcbe76db8bd4';

UPDATE wallets
SET
        balance_amount = 1350800.00
WHERE
        id = '2538ad91-a1b5-48eb-b894-670e2b3ea1ff';

UPDATE wallets
SET
        balance_amount = 362400.00
WHERE
        id = '3d3eace5-bc5c-47af-bb81-d8860f2322bb';
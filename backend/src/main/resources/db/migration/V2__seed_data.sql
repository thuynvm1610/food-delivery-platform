-- =========================================================================
-- V2__seed_data.sql
-- Seed data theo đúng thứ tự FK và các rule nghiệp vụ
-- =========================================================================
-- =========================================================================
-- 1. ROLES
-- =========================================================================
INSERT INTO
    roles (id, name)
VALUES
    (
        'aaaaaaaa-0000-0000-0000-000000000001',
        'ROLE_CUSTOMER'
    ),
    (
        'aaaaaaaa-0000-0000-0000-000000000002',
        'ROLE_DRIVER'
    ),
    (
        'aaaaaaaa-0000-0000-0000-000000000003',
        'ROLE_RESTAURANT'
    ),
    (
        'aaaaaaaa-0000-0000-0000-000000000004',
        'ROLE_ADMIN'
    );

-- =========================================================================
-- 2. USERS
-- =========================================================================
INSERT INTO
    users (
        id,
        email,
        password_hash,
        first_name,
        last_name,
        avatar_url,
        created_at
    )
VALUES
    -- Admin (first_name/last_name nullable)
    (
        'bbbbbbbb-0000-0000-0000-000000000001',
        'admin@foodapp.vn',
        '$2b$12$admin_hash_placeholder',
        NULL,
        NULL,
        NULL,
        '2025-01-01 00:00:00'
    ),
    -- Customers
    (
        'bbbbbbbb-0000-0000-0000-000000000002',
        'customer1@gmail.com',
        '$2b$12$customer1_hash_placeholder',
        'Nguyễn',
        'Văn An',
        'https://cdn.foodapp.vn/avatars/c1.jpg',
        '2025-01-02 08:00:00'
    ),
    (
        'bbbbbbbb-0000-0000-0000-000000000003',
        'customer2@gmail.com',
        '$2b$12$customer2_hash_placeholder',
        'Trần',
        'Thị Bình',
        'https://cdn.foodapp.vn/avatars/c2.jpg',
        '2025-01-03 09:00:00'
    ),
    -- Drivers
    (
        'bbbbbbbb-0000-0000-0000-000000000004',
        'driver1@gmail.com',
        '$2b$12$driver1_hash_placeholder',
        'Lê',
        'Văn Cường',
        'https://cdn.foodapp.vn/avatars/d1.jpg',
        '2025-01-04 07:00:00'
    ),
    (
        'bbbbbbbb-0000-0000-0000-000000000005',
        'driver2@gmail.com',
        '$2b$12$driver2_hash_placeholder',
        'Phạm',
        'Minh Đức',
        'https://cdn.foodapp.vn/avatars/d2.jpg',
        '2025-01-05 07:00:00'
    ),
    -- Restaurant owners (first_name/last_name nullable)
    (
        'bbbbbbbb-0000-0000-0000-000000000006',
        'resto1@foodapp.vn',
        '$2b$12$resto1_hash_placeholder',
        NULL,
        NULL,
        NULL,
        '2025-01-06 06:00:00'
    ),
    (
        'bbbbbbbb-0000-0000-0000-000000000007',
        'resto2@foodapp.vn',
        '$2b$12$resto2_hash_placeholder',
        NULL,
        NULL,
        NULL,
        '2025-01-07 06:00:00'
    );

-- =========================================================================
-- 3. USER_ROLES
-- =========================================================================
INSERT INTO
    user_roles (user_id, role_id)
VALUES
    (
        'bbbbbbbb-0000-0000-0000-000000000001',
        'aaaaaaaa-0000-0000-0000-000000000004'
    ), -- Admin
    (
        'bbbbbbbb-0000-0000-0000-000000000002',
        'aaaaaaaa-0000-0000-0000-000000000001'
    ), -- Customer_1
    (
        'bbbbbbbb-0000-0000-0000-000000000003',
        'aaaaaaaa-0000-0000-0000-000000000001'
    ), -- Customer_2
    (
        'bbbbbbbb-0000-0000-0000-000000000004',
        'aaaaaaaa-0000-0000-0000-000000000002'
    ), -- Driver_1
    (
        'bbbbbbbb-0000-0000-0000-000000000005',
        'aaaaaaaa-0000-0000-0000-000000000002'
    ), -- Driver_2
    (
        'bbbbbbbb-0000-0000-0000-000000000006',
        'aaaaaaaa-0000-0000-0000-000000000003'
    ), -- Restaurant_User1
    (
        'bbbbbbbb-0000-0000-0000-000000000007',
        'aaaaaaaa-0000-0000-0000-000000000003'
    );

-- Restaurant_User2
-- =========================================================================
-- 4. CUSTOMER_PROFILES
-- =========================================================================
INSERT INTO
    customer_profiles (user_id, default_address, loyalty_points)
VALUES
    (
        'bbbbbbbb-0000-0000-0000-000000000002',
        '12 Lý Thường Kiệt, Hoàn Kiếm, Hà Nội',
        150
    ),
    (
        'bbbbbbbb-0000-0000-0000-000000000003',
        '45 Trần Duy Hưng, Cầu Giấy, Hà Nội',
        50
    );

-- =========================================================================
-- 5. DRIVER_PROFILES
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
    -- Driver_1: online, đang giao Order_2
    (
        'bbbbbbbb-0000-0000-0000-000000000004',
        '29B1-12345',
        'Xe máy',
        21.0245000,
        105.8412000,
        TRUE
    ),
    -- Driver_2: online, sẵn sàng nhận đơn
    (
        'bbbbbbbb-0000-0000-0000-000000000005',
        '29A2-67890',
        'Xe máy',
        21.0280000,
        105.8350000,
        TRUE
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
        latitude,
        longitude,
        cover_image_url,
        status,
        created_at
    )
VALUES
    (
        'cccccccc-0000-0000-0000-000000000001',
        'bbbbbbbb-0000-0000-0000-000000000006',
        'Bún Bò Huế Mẹ Tôi',
        'Quán bún bò Huế truyền thống, nấu theo công thức gia truyền từ Cố Đô',
        '23 Đinh Tiên Hoàng, Hoàn Kiếm',
        'Hà Nội',
        21.0320000,
        105.8520000,
        'https://cdn.foodapp.vn/restaurants/r1_cover.jpg',
        'OPEN',
        '2025-01-06 08:00:00'
    ),
    (
        'cccccccc-0000-0000-0000-000000000002',
        'bbbbbbbb-0000-0000-0000-000000000007',
        'Pizza Saigon House',
        'Pizza phong cách Ý kết hợp topping đặc trưng Việt Nam',
        '88 Nguyễn Chí Thanh, Đống Đa',
        'Hà Nội',
        21.0270000,
        105.8380000,
        'https://cdn.foodapp.vn/restaurants/r2_cover.jpg',
        'OPEN',
        '2025-01-07 08:00:00'
    );

-- =========================================================================
-- 7. RESTAURANT_IMAGES
-- =========================================================================
INSERT INTO
    restaurant_images (id, restaurant_id, image_url, display_order)
VALUES
    (
        '11111111-aaaa-0000-0000-000000000001',
        'cccccccc-0000-0000-0000-000000000001',
        'https://cdn.foodapp.vn/restaurants/r1_img1.jpg',
        1
    ),
    (
        '11111111-aaaa-0000-0000-000000000002',
        'cccccccc-0000-0000-0000-000000000001',
        'https://cdn.foodapp.vn/restaurants/r1_img2.jpg',
        2
    ),
    (
        '11111111-aaaa-0000-0000-000000000003',
        'cccccccc-0000-0000-0000-000000000002',
        'https://cdn.foodapp.vn/restaurants/r2_img1.jpg',
        1
    );

-- =========================================================================
-- 8. DISH_CATEGORIES
-- =========================================================================
INSERT INTO
    dish_categories (id, restaurant_id, name, description)
VALUES
    (
        'dddddddd-0000-0000-0000-000000000001',
        'cccccccc-0000-0000-0000-000000000001',
        'Món chính',
        'Các món bún, cơm, phở'
    ),
    (
        'dddddddd-0000-0000-0000-000000000002',
        'cccccccc-0000-0000-0000-000000000001',
        'Đồ uống',
        'Nước giải khát, trà, cà phê'
    ),
    (
        'dddddddd-0000-0000-0000-000000000003',
        'cccccccc-0000-0000-0000-000000000002',
        'Pizza',
        'Pizza các loại'
    ),
    (
        'dddddddd-0000-0000-0000-000000000004',
        'cccccccc-0000-0000-0000-000000000002',
        'Đồ uống',
        'Nước ngọt, nước ép'
    );

-- =========================================================================
-- 9. DISHES
-- Dish_1: 30k, Dish_2: 40k, Dish_3: 25k (tất cả thuộc Restaurant_1)
-- Order_1: Dish_1 x2=60k + Dish_2 x1=40k → subtotal=100k
-- Order_2: Dish_3 x3=75k → subtotal=75k (COD, cần ví driver >= 75k)
-- Order_3: Dish_1 x1=30k → subtotal=30k (bị huỷ)
-- =========================================================================
INSERT INTO
    dishes (
        id,
        restaurant_id,
        category_id,
        name,
        description,
        price_amount,
        price_currency,
        is_available
    )
VALUES
    (
        'eeeeeeee-0000-0000-0000-000000000001',
        'cccccccc-0000-0000-0000-000000000001',
        'dddddddd-0000-0000-0000-000000000001',
        'Bún Bò Huế đặc biệt',
        'Bún bò Huế đậm đà, đầy đủ chả, bò, giò heo',
        30000.00,
        'VND',
        TRUE
    ),
    (
        'eeeeeeee-0000-0000-0000-000000000002',
        'cccccccc-0000-0000-0000-000000000001',
        'dddddddd-0000-0000-0000-000000000001',
        'Bún Bò Huế thường',
        'Bún bò Huế chuẩn vị, phù hợp mọi khẩu vị',
        40000.00,
        'VND',
        TRUE
    ),
    (
        'eeeeeeee-0000-0000-0000-000000000003',
        'cccccccc-0000-0000-0000-000000000001',
        'dddddddd-0000-0000-0000-000000000002',
        'Trà đá truyền thống',
        'Trà mạn pha đá mát lạnh',
        25000.00,
        'VND',
        TRUE
    );

-- =========================================================================
-- 10. DISH_IMAGES
-- =========================================================================
INSERT INTO
    dish_images (id, dish_id, image_url, display_order)
VALUES
    (
        '22222222-bbbb-0000-0000-000000000001',
        'eeeeeeee-0000-0000-0000-000000000001',
        'https://cdn.foodapp.vn/dishes/dish1.jpg',
        1
    ),
    (
        '22222222-bbbb-0000-0000-000000000002',
        'eeeeeeee-0000-0000-0000-000000000002',
        'https://cdn.foodapp.vn/dishes/dish2.jpg',
        1
    ),
    (
        '22222222-bbbb-0000-0000-000000000003',
        'eeeeeeee-0000-0000-0000-000000000003',
        'https://cdn.foodapp.vn/dishes/dish3.jpg',
        1
    );

-- =========================================================================
-- 11. VOUCHERS
-- Voucher_Platform: FIXED_AMOUNT 20k, min_order 50k, max_discount 20k
-- Voucher_Resto:    PERCENTAGE 10%, min_order 100k, max_discount 30k
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
        'ffffffff-0000-0000-0000-000000000001',
        'PLATFORM20K',
        'PLATFORM',
        NULL,
        'Giảm 20.000đ cho đơn từ 50k',
        'FIXED_AMOUNT',
        20000.00,
        50000.00,
        20000.00,
        '2025-01-01 00:00:00',
        '2026-12-31 23:59:59',
        1000,
        1 -- đã dùng cho Order_1
    ),
    (
        'ffffffff-0000-0000-0000-000000000002',
        'RESTO10PCT',
        'RESTAURANT',
        'cccccccc-0000-0000-0000-000000000001',
        'Giảm 10% tối đa 30k cho quán Bún Bò Huế Mẹ Tôi',
        'PERCENTAGE',
        10.00,
        100000.00,
        30000.00,
        '2025-01-01 00:00:00',
        '2026-12-31 23:59:59',
        500,
        0
    );

-- =========================================================================
-- 12. WALLETS
-- Driver_1 balance: 200k (>= subtotal Order_2 COD = 75k → hợp lệ)
-- Driver_2 balance: 50k
-- Resto_1 balance: 68k  (sau khi nhận doanh thu Order_1)
-- Resto_2 balance: 0
-- Admin   balance: 12k  (hoa hồng Order_1)
-- =========================================================================
INSERT INTO
    wallets (id, user_id, balance_amount, currency)
VALUES
    (
        '00000002-0000-0000-0000-000000000001',
        'bbbbbbbb-0000-0000-0000-000000000004',
        200000.00,
        'VND'
    ), -- Driver_1
    (
        '00000002-0000-0000-0000-000000000002',
        'bbbbbbbb-0000-0000-0000-000000000005',
        50000.00,
        'VND'
    ), -- Driver_2
    (
        '00000002-0000-0000-0000-000000000003',
        'bbbbbbbb-0000-0000-0000-000000000006',
        68000.00,
        'VND'
    ), -- Resto_1
    (
        '00000002-0000-0000-0000-000000000004',
        'bbbbbbbb-0000-0000-0000-000000000007',
        0.00,
        'VND'
    ), -- Resto_2
    (
        '00000002-0000-0000-0000-000000000005',
        'bbbbbbbb-0000-0000-0000-000000000001',
        12000.00,
        'VND'
    );

-- Admin
-- =========================================================================
-- 13. ORDERS
--
-- Order_1: CUSTOMER_CONFIRMED, Prepaid, có Voucher_Platform
--   subtotal = 100k (Dish_1 x2=60k + Dish_2 x1=40k)
--   delivery_fee = 20k
--   discount = 20k (FIXED_AMOUNT voucher)
--   total = 100k (100+20-20)
--
-- Order_2: DELIVERING, COD, không voucher
--   subtotal = 75k (Dish_3 x3=25k)
--   delivery_fee = 15k
--   discount = 0
--   total = 90k
--   NOTE: Driver_1 wallet=200k >= subtotal=75k → hợp lệ nhận COD
--
-- Order_3: CANCELLED_BY_RESTAURANT, Prepaid, không voucher
--   subtotal = 30k (Dish_1 x1=30k)
--   delivery_fee = 15k
--   discount = 0
--   total = 45k
-- =========================================================================
INSERT INTO
    orders (
        id,
        customer_id,
        restaurant_id,
        voucher_id,
        status,
        subtotal_amount,
        delivery_fee_amount,
        discount_amount,
        total_amount,
        currency,
        created_at
    )
VALUES
    (
        '00000001-0000-0000-0000-000000000001',
        'bbbbbbbb-0000-0000-0000-000000000002', -- Customer_1
        'cccccccc-0000-0000-0000-000000000001', -- Restaurant_1
        'ffffffff-0000-0000-0000-000000000001', -- Voucher_Platform
        'CUSTOMER_CONFIRMED',
        100000.00,
        20000.00,
        20000.00,
        100000.00,
        'VND',
        '2025-06-01 10:00:00'
    ),
    (
        '00000001-0000-0000-0000-000000000002',
        'bbbbbbbb-0000-0000-0000-000000000002', -- Customer_1
        'cccccccc-0000-0000-0000-000000000001', -- Restaurant_1
        NULL,
        'DELIVERING',
        75000.00,
        15000.00,
        0.00,
        90000.00,
        'VND',
        '2025-06-02 12:00:00'
    ),
    (
        '00000001-0000-0000-0000-000000000003',
        'bbbbbbbb-0000-0000-0000-000000000003', -- Customer_2
        'cccccccc-0000-0000-0000-000000000001', -- Restaurant_1
        NULL,
        'CANCELLED_BY_RESTAURANT',
        30000.00,
        15000.00,
        0.00,
        45000.00,
        'VND',
        '2025-06-03 09:00:00'
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
    -- Order_1: Dish_1 x2 + Dish_2 x1
    (
        '33333333-cccc-0000-0000-000000000001',
        '00000001-0000-0000-0000-000000000001',
        'eeeeeeee-0000-0000-0000-000000000001',
        2,
        30000.00,
        'VND'
    ),
    (
        '33333333-cccc-0000-0000-000000000002',
        '00000001-0000-0000-0000-000000000001',
        'eeeeeeee-0000-0000-0000-000000000002',
        1,
        40000.00,
        'VND'
    ),
    -- Order_2: Dish_3 x3
    (
        '33333333-cccc-0000-0000-000000000003',
        '00000001-0000-0000-0000-000000000002',
        'eeeeeeee-0000-0000-0000-000000000003',
        3,
        25000.00,
        'VND'
    ),
    -- Order_3: Dish_1 x1
    (
        '33333333-cccc-0000-0000-000000000004',
        '00000001-0000-0000-0000-000000000003',
        'eeeeeeee-0000-0000-0000-000000000001',
        1,
        30000.00,
        'VND'
    );

-- =========================================================================
-- 15. ORDER_STATUS_HISTORY
-- Timeline logic (Rule 6.3):
--   PENDING(t+0) → CONFIRMED(t+2m) → PREPARING(t+2m) → READY_FOR_PICKUP(t+15m)
--   → PICKED_UP(t+20m) → DELIVERING(t+20m) → DELIVERED(t+35m) → CUSTOMER_CONFIRMED(t+40m)
--
-- Order_3 (CANCELLED_BY_RESTAURANT): PENDING → CONFIRMED → CANCELLED_BY_RESTAURANT
-- =========================================================================
INSERT INTO
    order_status_history (id, order_id, status, note, created_at)
VALUES
    -- Order_1: Luồng hoàn chỉnh
    (
        '44444444-dddd-0000-0000-000000000001',
        '00000001-0000-0000-0000-000000000001',
        'PENDING',
        'Đơn hàng được tạo',
        '2025-06-01 10:00:00'
    ),
    (
        '44444444-dddd-0000-0000-000000000002',
        '00000001-0000-0000-0000-000000000001',
        'CONFIRMED',
        'Nhà hàng xác nhận đơn',
        '2025-06-01 10:02:00'
    ),
    (
        '44444444-dddd-0000-0000-000000000003',
        '00000001-0000-0000-0000-000000000001',
        'PREPARING',
        'Đang chuẩn bị món',
        '2025-06-01 10:04:00'
    ),
    (
        '44444444-dddd-0000-0000-000000000004',
        '00000001-0000-0000-0000-000000000001',
        'READY_FOR_PICKUP',
        'Món đã sẵn sàng, chờ tài xế',
        '2025-06-01 10:19:00'
    ),
    (
        '44444444-dddd-0000-0000-000000000005',
        '00000001-0000-0000-0000-000000000001',
        'PICKED_UP',
        'Tài xế đã lấy hàng',
        '2025-06-01 10:24:00'
    ),
    (
        '44444444-dddd-0000-0000-000000000006',
        '00000001-0000-0000-0000-000000000001',
        'DELIVERING',
        'Đang giao hàng',
        '2025-06-01 10:24:30'
    ),
    (
        '44444444-dddd-0000-0000-000000000007',
        '00000001-0000-0000-0000-000000000001',
        'DELIVERED',
        'Đã giao thành công',
        '2025-06-01 10:39:00'
    ),
    (
        '44444444-dddd-0000-0000-000000000008',
        '00000001-0000-0000-0000-000000000001',
        'CUSTOMER_CONFIRMED',
        'Khách hàng xác nhận đã nhận',
        '2025-06-01 10:44:00'
    ),
    -- Order_2: Đang giao (dừng ở DELIVERING)
    (
        '44444444-dddd-0000-0000-000000000009',
        '00000001-0000-0000-0000-000000000002',
        'PENDING',
        'Đơn hàng được tạo',
        '2025-06-02 12:00:00'
    ),
    (
        '44444444-dddd-0000-0000-000000000010',
        '00000001-0000-0000-0000-000000000002',
        'CONFIRMED',
        'Nhà hàng xác nhận đơn',
        '2025-06-02 12:02:00'
    ),
    (
        '44444444-dddd-0000-0000-000000000011',
        '00000001-0000-0000-0000-000000000002',
        'PREPARING',
        'Đang chuẩn bị món',
        '2025-06-02 12:04:00'
    ),
    (
        '44444444-dddd-0000-0000-000000000012',
        '00000001-0000-0000-0000-000000000002',
        'READY_FOR_PICKUP',
        'Món đã sẵn sàng, chờ tài xế',
        '2025-06-02 12:19:00'
    ),
    (
        '44444444-dddd-0000-0000-000000000013',
        '00000001-0000-0000-0000-000000000002',
        'PICKED_UP',
        'Tài xế đã lấy hàng',
        '2025-06-02 12:24:00'
    ),
    (
        '44444444-dddd-0000-0000-000000000014',
        '00000001-0000-0000-0000-000000000002',
        'DELIVERING',
        'Đang giao hàng',
        '2025-06-02 12:24:30'
    ),
    -- Order_3: Bị huỷ bởi nhà hàng
    (
        '44444444-dddd-0000-0000-000000000015',
        '00000001-0000-0000-0000-000000000003',
        'PENDING',
        'Đơn hàng được tạo',
        '2025-06-03 09:00:00'
    ),
    (
        '44444444-dddd-0000-0000-000000000016',
        '00000001-0000-0000-0000-000000000003',
        'CONFIRMED',
        'Nhà hàng xác nhận đơn',
        '2025-06-03 09:02:00'
    ),
    (
        '44444444-dddd-0000-0000-000000000017',
        '00000001-0000-0000-0000-000000000003',
        'CANCELLED_BY_RESTAURANT',
        'Nhà hàng hết nguyên liệu',
        '2025-06-03 09:05:00'
    );

-- =========================================================================
-- 16. DELIVERY_TASKS
-- Order_1: DELIVERED, driver = Driver_1
-- Order_2: DELIVERING, driver = Driver_1
-- Order_3: không có delivery task (bị huỷ trước khi assign driver)
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
        '55555555-eeee-0000-0000-000000000001',
        '00000001-0000-0000-0000-000000000001',
        'bbbbbbbb-0000-0000-0000-000000000004', -- Driver_1
        'DELIVERED',
        '2025-06-01 10:19:30',
        '2025-06-01 10:24:00',
        '2025-06-01 10:39:00'
    ),
    (
        '55555555-eeee-0000-0000-000000000002',
        '00000001-0000-0000-0000-000000000002',
        'bbbbbbbb-0000-0000-0000-000000000004', -- Driver_1
        'DELIVERING',
        '2025-06-02 12:19:30',
        '2025-06-02 12:24:00',
        NULL
    );

-- =========================================================================
-- 17. DRIVER_ORDER_REQUESTS
-- Rule 6.4: Phải có ít nhất 1 REJECTED và 1 ACCEPTED
-- Scenario Order_1: Driver_2 REJECTED trước → hệ thống chuyển sang Driver_1 ACCEPTED
-- Scenario Order_2: Driver_2 REJECTED trước → hệ thống chuyển sang Driver_1 ACCEPTED
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
    -- Order_1: Driver_2 từ chối, Driver_1 nhận
    (
        '66666666-ffff-0000-0000-000000000001',
        '00000001-0000-0000-0000-000000000001',
        'bbbbbbbb-0000-0000-0000-000000000005', -- Driver_2
        'REJECTED',
        '2025-06-01 10:17:00',
        '2025-06-01 10:18:00'
    ),
    (
        '66666666-ffff-0000-0000-000000000002',
        '00000001-0000-0000-0000-000000000001',
        'bbbbbbbb-0000-0000-0000-000000000004', -- Driver_1
        'ACCEPTED',
        '2025-06-01 10:18:30',
        '2025-06-01 10:19:30'
    ),
    -- Order_2: Driver_2 từ chối, Driver_1 nhận
    (
        '66666666-ffff-0000-0000-000000000003',
        '00000001-0000-0000-0000-000000000002',
        'bbbbbbbb-0000-0000-0000-000000000005', -- Driver_2
        'REJECTED',
        '2025-06-02 12:17:00',
        '2025-06-02 12:18:00'
    ),
    (
        '66666666-ffff-0000-0000-000000000004',
        '00000001-0000-0000-0000-000000000002',
        'bbbbbbbb-0000-0000-0000-000000000004', -- Driver_1
        'ACCEPTED',
        '2025-06-02 12:18:30',
        '2025-06-02 12:19:30'
    );

-- =========================================================================
-- 18. DISH_REVIEWS
-- Rule 6.5: Chỉ tồn tại khi order.status = CUSTOMER_CONFIRMED
--           UNIQUE(order_id, dish_id) → mỗi món trong đơn chỉ review 1 lần
-- Order_1 (CUSTOMER_CONFIRMED): review Dish_1 và Dish_2
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
        '77777777-0000-0000-0000-000000000001',
        'eeeeeeee-0000-0000-0000-000000000001', -- Dish_1
        'bbbbbbbb-0000-0000-0000-000000000002', -- Customer_1
        '00000001-0000-0000-0000-000000000001', -- Order_1
        5,
        'Ngon tuyệt vời! Bún bò đúng vị Huế, nước dùng đậm đà, chả cua thơm. Sẽ order lại!',
        '2025-06-01 11:00:00'
    ),
    (
        '77777777-0000-0000-0000-000000000002',
        'eeeeeeee-0000-0000-0000-000000000002', -- Dish_2
        'bbbbbbbb-0000-0000-0000-000000000002', -- Customer_1
        '00000001-0000-0000-0000-000000000001', -- Order_1
        4,
        'Bún bò ngon, nhưng ít bò hơn mong đợi. Nước dùng rất đạt.',
        '2025-06-01 11:05:00'
    );

-- =========================================================================
-- 19. REVIEW_IMAGES
-- =========================================================================
INSERT INTO
    review_images (id, review_id, image_url)
VALUES
    (
        '88888888-0000-0000-0000-000000000001',
        '77777777-0000-0000-0000-000000000001',
        'https://cdn.foodapp.vn/reviews/r1_img1.jpg'
    ),
    (
        '88888888-0000-0000-0000-000000000002',
        '77777777-0000-0000-0000-000000000001',
        'https://cdn.foodapp.vn/reviews/r1_img2.jpg'
    );

-- =========================================================================
-- 20. WALLET_TRANSACTIONS
--
-- Rule 6.1: Order_1 CUSTOMER_CONFIRMED phải settle đủ 3 loại:
--   + Tiền ship (20k)  → Ví Driver_1     (DELIVERY_EARNING)
--   + Doanh thu quán   → Ví Resto_1      (RESTAURANT_REVENUE)
--     commission = 12% * subtotal = 12% * 100k = 12k
--     doanh thu quán = subtotal - commission = 100k - 12k = 88k
--     NHƯNG discount 20k do platform chịu, nên quán nhận đủ 80k (subtotal - commission sau discount)
--     Tính đơn giản: quán nhận 88k (subtotal * 88%) → Resto_1 balance = 88k ✓
--     NOTE: Để đơn giản và khớp với balance đã khai báo (68k), ta dùng:
--       quán nhận = subtotal - platform_fee = 100k - 20k (discount) - 12k (commission) = 68k
--       → RESTAURANT_REVENUE = 68k
--       → COMMISSION_FEE = 12k
--   + Hoa hồng (12k)   → Ví Admin        (COMMISSION_FEE)
--
-- Driver_1 nạp tiền ban đầu (DEPOSIT 200k) để có số dư nhận COD
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
    -- Driver_1: nạp tiền ban đầu
    (
        '99999999-0000-0000-0000-000000000001',
        '00000002-0000-0000-0000-000000000001', -- Wallet_Driver_1
        200000.00,
        'DEPOSIT',
        NULL,
        '2025-01-10 08:00:00'
    ),
    -- Order_1 settlement: Tiền ship → Driver_1
    (
        '99999999-0000-0000-0000-000000000002',
        '00000002-0000-0000-0000-000000000001', -- Wallet_Driver_1
        20000.00,
        'DELIVERY_EARNING',
        '00000001-0000-0000-0000-000000000001',
        '2025-06-01 10:44:00'
    ),
    -- Order_1 settlement: Doanh thu → Resto_1
    -- (subtotal 100k - discount 20k do platform chịu - commission 12k = 68k)
    (
        '99999999-0000-0000-0000-000000000003',
        '00000002-0000-0000-0000-000000000003', -- Wallet_Resto_1
        68000.00,
        'RESTAURANT_REVENUE',
        '00000001-0000-0000-0000-000000000001',
        '2025-06-01 10:44:00'
    ),
    -- Order_1 settlement: Hoa hồng 12% → Admin
    (
        '99999999-0000-0000-0000-000000000004',
        '00000002-0000-0000-0000-000000000005', -- Wallet_Admin
        12000.00,
        'COMMISSION_FEE',
        '00000001-0000-0000-0000-000000000001',
        '2025-06-01 10:44:00'
    ),
    -- Driver_2: nạp tiền ban đầu
    (
        '99999999-0000-0000-0000-000000000005',
        '00000002-0000-0000-0000-000000000002', -- Wallet_Driver_2
        50000.00,
        'DEPOSIT',
        NULL,
        '2025-01-11 08:00:00'
    );
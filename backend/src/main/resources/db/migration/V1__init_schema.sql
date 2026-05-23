-- =========================================================================
-- IDENTITY CONTEXT
-- =========================================================================

CREATE TABLE users (
    id UUID PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100), -- Nullable for Restaurant/Admin
    last_name VARCHAR(100),  -- Nullable for Restaurant/Admin
    avatar_url VARCHAR(500), -- Mostly used for Driver/Customer
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE roles (
    id UUID PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE -- ROLE_CUSTOMER, ROLE_RESTAURANT, ROLE_DRIVER, ROLE_ADMIN
);

CREATE TABLE user_roles (
    user_id UUID NOT NULL,
    role_id UUID NOT NULL,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE TABLE driver_profiles (
    user_id UUID PRIMARY KEY,
    license_plate VARCHAR(50),
    vehicle_type VARCHAR(100),
    latitude DECIMAL(10, 7),
    longitude DECIMAL(10, 7),
    is_online BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE customer_profiles (
    user_id UUID PRIMARY KEY,
    default_address VARCHAR(255),
    loyalty_points INT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- =========================================================================
-- RESTAURANT CONTEXT
-- =========================================================================

CREATE TABLE restaurants (
    id UUID PRIMARY KEY,
    owner_id UUID NOT NULL, -- The user who owns this restaurant
    name VARCHAR(255) NOT NULL,
    description TEXT,
    street_address VARCHAR(255),
    city VARCHAR(100),
    latitude DECIMAL(10, 7),
    longitude DECIMAL(10, 7),
    cover_image_url VARCHAR(500),
    status VARCHAR(50) NOT NULL, -- OPEN, CLOSED
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (owner_id) REFERENCES users(id)
);

CREATE TABLE restaurant_images (
    id UUID PRIMARY KEY,
    restaurant_id UUID NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    display_order INT NOT NULL DEFAULT 0,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)
);

CREATE TABLE dish_categories (
    id UUID PRIMARY KEY,
    restaurant_id UUID NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)
);

CREATE TABLE dishes (
    id UUID PRIMARY KEY,
    restaurant_id UUID NOT NULL,
    category_id UUID NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price_amount DECIMAL(10, 2) NOT NULL,
    price_currency VARCHAR(3) NOT NULL,
    is_available BOOLEAN NOT NULL DEFAULT TRUE,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id),
    FOREIGN KEY (category_id) REFERENCES dish_categories(id)
);

CREATE TABLE dish_images (
    id UUID PRIMARY KEY,
    dish_id UUID NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    display_order INT NOT NULL DEFAULT 0,
    FOREIGN KEY (dish_id) REFERENCES dishes(id)
);

-- =========================================================================
-- PROMOTION CONTEXT
-- =========================================================================

CREATE TABLE vouchers (
    id UUID PRIMARY KEY,
    code VARCHAR(50) UNIQUE, -- Optional for display/marketing
    issuer_type VARCHAR(50) NOT NULL, -- PLATFORM, RESTAURANT
    restaurant_id UUID, -- Null if issuer_type = PLATFORM
    title VARCHAR(255) NOT NULL,
    discount_type VARCHAR(20) NOT NULL, -- PERCENTAGE, FIXED_AMOUNT
    discount_value DECIMAL(10, 2) NOT NULL,
    min_order_amount DECIMAL(10, 2),
    max_discount_amount DECIMAL(10, 2),
    valid_from TIMESTAMP NOT NULL,
    valid_to TIMESTAMP NOT NULL,
    usage_limit INT,
    used_count INT DEFAULT 0,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)
);

-- =========================================================================
-- ORDERING CONTEXT
-- =========================================================================

CREATE TABLE orders (
    id UUID PRIMARY KEY,
    customer_id UUID NOT NULL,
    restaurant_id UUID NOT NULL,
    voucher_id UUID,
    status VARCHAR(50) NOT NULL,
    subtotal_amount DECIMAL(10, 2) NOT NULL,
    delivery_fee_amount DECIMAL(10, 2) NOT NULL,
    discount_amount DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    total_amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(3) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES users(id),
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id),
    FOREIGN KEY (voucher_id) REFERENCES vouchers(id)
);

CREATE TABLE order_items (
    id UUID PRIMARY KEY,
    order_id UUID NOT NULL,
    dish_id UUID NOT NULL,
    quantity INT NOT NULL,
    unit_price_amount DECIMAL(10, 2) NOT NULL,
    unit_price_currency VARCHAR(3) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (dish_id) REFERENCES dishes(id)
);

CREATE TABLE order_status_history (
    id UUID PRIMARY KEY,
    order_id UUID NOT NULL,
    status VARCHAR(50) NOT NULL,
    note TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id)
);

-- =========================================================================
-- REVIEW CONTEXT
-- =========================================================================

CREATE TABLE dish_reviews (
    id UUID PRIMARY KEY,
    dish_id UUID NOT NULL,
    customer_id UUID NOT NULL,
    order_id UUID NOT NULL,
    rating_stars INT NOT NULL CHECK (rating_stars >= 1 AND rating_stars <= 5),
    comment TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (dish_id) REFERENCES dishes(id),
    FOREIGN KEY (customer_id) REFERENCES users(id),
    FOREIGN KEY (order_id) REFERENCES orders(id),
    UNIQUE (order_id, dish_id)
);

CREATE TABLE review_images (
    id UUID PRIMARY KEY,
    review_id UUID NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    FOREIGN KEY (review_id) REFERENCES dish_reviews(id)
);

-- =========================================================================
-- DELIVERY CONTEXT
-- =========================================================================

CREATE TABLE delivery_tasks (
    id UUID PRIMARY KEY,
    order_id UUID NOT NULL UNIQUE,
    driver_id UUID,
    status VARCHAR(50) NOT NULL,
    assigned_at TIMESTAMP,
    picked_up_at TIMESTAMP,
    delivered_at TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (driver_id) REFERENCES users(id)
);

CREATE TABLE driver_order_requests (
    id UUID PRIMARY KEY,
    order_id UUID NOT NULL,
    driver_id UUID NOT NULL,
    status VARCHAR(50) NOT NULL, -- PENDING, ACCEPTED, REJECTED, EXPIRED
    pinged_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (driver_id) REFERENCES users(id)
);

-- =========================================================================
-- WALLET CONTEXT
-- =========================================================================

CREATE TABLE wallets (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL UNIQUE,
    balance_amount DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    currency VARCHAR(3) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE wallet_transactions (
    id UUID PRIMARY KEY,
    wallet_id UUID NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    type VARCHAR(50) NOT NULL, -- DEPOSIT, WITHDRAWAL, HOLD, RELEASE
    reference_order_id UUID,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (wallet_id) REFERENCES wallets(id)
);

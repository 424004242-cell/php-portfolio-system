CREATE DATABASE IF NOT EXISTS adminpanel
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE adminpanel;

--  Table: native_users

CREATE TABLE IF NOT EXISTS native_users (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,

    -- NEW PROFILE FIELDS
    full_name VARCHAR(100),
    course VARCHAR(100),
    year_level VARCHAR(20),
    email VARCHAR(100),
    profile_photo VARCHAR(255),

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--  Table: skills

CREATE TABLE IF NOT EXISTS skills (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    category VARCHAR(50) NOT NULL,
    name VARCHAR(50) NOT NULL,
    color VARCHAR(50) NOT NULL DEFAULT 'bg-secondary',
    PRIMARY KEY (id),

    CONSTRAINT fk_skills_user
    FOREIGN KEY (username)
    REFERENCES native_users(username)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--  USER: johnneo (PASSWORD = 123456)

INSERT INTO native_users 
(username, password, full_name, course, year_level, email, profile_photo)
VALUES (
    'johnneo',
    '$2y$10$wH8z8QZk3v6Gk7p9kVQpUeFv9mXyY8jZyqT3lXv0Zz8u8wz1lJ6mG', -- password: 123456
    'Johnneo Blas',
    'BSIT',
    '3rd Year',
    'johnneo@gmail.com',
    'johnneo.jpg'
);

--  SKILLS

INSERT INTO skills (username, category, name, color) VALUES

-- Frontend
('johnneo', 'Frontend', 'HTML', 'bg-danger'),
('johnneo', 'Frontend', 'CSS', 'bg-primary'),
('johnneo', 'Frontend', 'JavaScript', 'bg-warning text-dark'),
('johnneo', 'Frontend', 'Bootstrap 5', 'bg-info text-dark'),

-- Backend
('johnneo', 'Backend', 'PHP', 'bg-secondary'),
('johnneo', 'Backend', 'MySQL', 'bg-success'),

-- Libraries
('johnneo', 'Libraries', 'jQuery', 'bg-dark'),

-- Design
('johnneo', 'Design', 'Responsive Design', 'bg-primary');

--  CONFIRM

SELECT * FROM native_users;
SELECT * FROM skills;

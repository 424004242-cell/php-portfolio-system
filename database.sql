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

--  USER: yuan (PASSWORD = 123456)

INSERT INTO native_users 
(username, password, full_name, course, year_level, email, profile_photo)
VALUES (
    'Yuan',
    '$2y$10$NVj0jKax.F3WPVbl7C8i5Opb55Xs07YHhBCuhAXPePxBZH7PYWFnq', -- password: 123456
    'Yuan Paul Adrian Macaspac',
    'BSIT',
    '2rd Year',
    'yuanmacaspac@gmail.com',
    'yuanpaul.jpg'
);

--  SKILLS

INSERT INTO skills (username, category, name, color) VALUES

-- Frontend
('yuan', 'Frontend', 'HTML', 'bg-danger'),
('yuan', 'Frontend', 'CSS', 'bg-primary'),
('yuan', 'Frontend', 'JavaScript', 'bg-warning text-dark'),
('yuan', 'Frontend', 'Bootstrap 5', 'bg-info text-dark'),

-- Backend
('yuan', 'Backend', 'PHP', 'bg-secondary'),
('yuan', 'Backend', 'MySQL', 'bg-success'),

-- Libraries
('yuan', 'Libraries', 'jQuery', 'bg-dark'),

-- Design
('yuan', 'Design', 'Responsive Design', 'bg-primary');

--  CONFIRM

SELECT * FROM native_users;
SELECT * FROM skills;

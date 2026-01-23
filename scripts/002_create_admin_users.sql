-- Create admin_users table for Supabase (PostgreSQL)
CREATE TABLE IF NOT EXISTS admin_users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  firstname VARCHAR(255),
  lastname VARCHAR(255),
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  image TEXT DEFAULT '',
  user_level VARCHAR(50) DEFAULT 'Sub Admin',
  added_by INTEGER DEFAULT 0,
  user_status INTEGER DEFAULT 1,
  date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP NULL,
  date_updated TIMESTAMP NULL
);

-- Insert existing admin users data
INSERT INTO admin_users (user_id, username, firstname, lastname, email, password, image, user_level, added_by, user_status, date_created, last_login, date_updated) VALUES
(1, 'admin', 'Outdoors', '.ng', '1234@gmail.com', '$2a$10$ODk3ODEwNjA0NjMyYzkyYuYgOsfpzrH2QcVXN8GuOWIYIeN7JagdO', '', 'Super Admin', 0, 1, '2017-01-12 08:10:57', '2023-09-04 06:58:13', '2023-09-04 06:58:13'),
(3, 'daniel', 'daniel', 'dabiel', 'daniel2017@gmail.com', '$2a$10$MTI1MjAwNjExMjU5ODFiYepW8tibIEKtdg/DXU861/w76bCxbtNUG', '', 'Super Admin', 1, 1, '2017-08-02 07:42:54', NULL, '2017-08-02 07:45:30'),
(4, 'Olaide', 'Olaide ', 'Salaam', 'olaidelee@gmail.com', '$2a$10$MTc0MzEyMDQwNDU5OWQ2ZOJLb6rIxQ8Z/7If3GvVjwyCheE6qq1bu', '', 'Sub Admin', 1, 1, '2017-08-23 07:59:19', '2017-08-23 10:12:21', '2017-08-23 10:12:21'),
(5, 'Precious', 'Precious', 'George', 'loveshuga4lyf@gmail.com', '$2a$10$ODE2Mzg3OTI0NTk5ZDZlYetypLddfkkGIlTNIhDtHVA22gJqOK/Xe', '', 'Sub Admin', 1, 1, '2017-08-23 08:02:03', NULL, NULL),
(6, 'Uche', 'Uche', 'Aguguo', 'aguguocaleb@gmail.com', '$2a$10$MjExMzI2ODIwNjU5OWQ2Zezt5qlunUwy8oH9tivzM0/r3Aa2vBJkC', '', 'Sub Admin', 1, 1, '2017-08-23 08:04:56', NULL, NULL),
(7, 'tolu', 'tolu', 'tolu', 'tolu@tolu.com', '$2a$10$NjI0MzQ3Nzk3NjA0NjI2NOOcJ766n933FnFdkwXqPwjhp.cN3x3zC', '', 'Sub Admin', 1, 1, '2021-01-14 08:54:28', NULL, '2021-03-08 01:27:48'),
(8, 'success', 'success', 'success', 'success@success.com', '$2a$10$Mjc1NDM4ODYxNjA0NjI2Yenp70UR/8M4BQZzDb0wO3LpVed6wWHdq', '', 'Sub Admin', 1, 1, '2021-01-15 07:09:26', NULL, '2021-03-08 01:29:30'),
(9, 'joeseph', 'joseph', 'joseph', 'joeseph@joeseph.com', '$2a$10$MTg5NjUyMTU5MzYwMDEzZeSTmjgtRHvk3UMg/X2vpW7yJm8cD/sc2', '', 'Sub Admin', 1, 1, '2021-01-15 07:10:48', NULL, '2021-01-15 07:59:21'),
(10, 'joseph', 'joseph', 'joseph', 'joseph@joseph.com', '$2a$10$NDA1NDYyODAxNjA0NjI2ZO5f.wbt8O4.9WDhWpaf0t5Kfx5Gim3R.', '', 'Sub Admin', 1, 1, '2021-01-15 08:01:03', NULL, '2021-03-08 01:30:19'),
(11, 'lanre', 'lanre', 'lanre', 'lanre@lanre.com', '$2a$10$MTExOTIyMjIxMDYxMDk4ZOKQ44Ela8JvYWHSyCtM0humEOwnpxtM6', '', 'Sub Admin', 1, 1, '2021-01-15 08:02:15', '2022-01-31 01:54:57', '2022-01-31 01:54:57'),
(12, 'pat', 'pat', 'pat', 'pat@pat.com', '$2a$10$OTczMTg2ODYwNDYyNzI4NeEQzDGk5g4sDqoV/Y/BsYBhyD7xodXBm', '', 'Sub Admin', 1, 1, '2021-01-15 08:14:51', '2021-06-22 04:06:52', '2021-06-22 04:06:52'),
(13, 'moses', 'moses', 'moses', 'moses@moses.com', '$2a$10$MTI4OTI2ODc0MjYwNDYyNuAPJIZ9v9BjYkk2KRxVNeXqKxLBnfMXm', '', 'Sub Admin', 1, 1, '2021-01-15 08:15:54', NULL, '2021-03-08 01:31:45'),
(14, 'chikito', 'chikito', 'chikito', 'chikito@chikito.com', '$2a$10$MTk2ODczNzk0MTYwMDE0ZeAucm5.3IrL3fxHhPPETzHUi4aHBbVTO', '', 'Sub Admin', 1, 1, '2021-01-15 08:17:25', NULL, NULL),
(15, 'ben', 'ben', 'ben', 'ben@ben.com', '$2a$10$MTMzODEwNDM4OTYwNDYyNu/2HbT0gCpP9sAriYYczVpKgxsio7H9y', '', 'Sub Admin', 1, 1, '2021-01-15 08:24:09', NULL, '2021-03-08 01:32:41'),
(16, 'nneka', 'nneka', 'nneka', 'nneka@nneka.com', '$2a$10$MTY1MTE1NTg2ODYyNGI0Nunn3N1.vtqiQ1E3LBT2ZLxMqtawh3QC6', '', 'Sub Admin', 1, 1, '2021-01-15 08:24:55', NULL, '2022-04-04 07:29:56'),
(17, 'caleb', 'caleb', 'caleb', 'caleb@caleb.com', '$2a$10$NjEwMTExMzkwNjA0NjI3YOsjYcHu/v9GSp46LYfrBT9MsKd8znmBe', '', 'Sub Admin', 1, 1, '2021-01-15 08:25:30', NULL, '2021-03-08 01:33:29'),
(18, 'tochi', 'tochi', 'tochi', 'tochi@tochi.com', '$2a$10$Mzc1ODgwMzI4NjAwMTU2NeBZWHAFm0rVcSh9PkG4.3G8EnyKdJKtu', '', 'Super Admin', 1, 1, '2021-01-15 08:45:30', '2021-06-22 03:48:16', '2021-06-22 03:48:16'),
(19, 'john', 'john', 'john', 'john@john.com', '$2a$10$MTg4ODAyMDU0ODYwZDIwN.PY8vraCobn.tjlnCMxv1aYe2JKdDf7a', '', 'Sub Admin', 18, 1, '2021-06-22 03:40:16', '2024-07-01 01:10:05', '2024-07-01 01:10:05')
ON CONFLICT (user_id) DO NOTHING;

-- Reset the sequence to continue after the highest user_id
SELECT setval('admin_users_user_id_seq', (SELECT MAX(user_id) FROM admin_users));

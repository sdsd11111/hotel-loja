CREATE TABLE IF NOT EXISTS `blog_articles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `slug` varchar(255) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `contenido` longtext NOT NULL,
  `extracto` text DEFAULT NULL,
  `imagen_url` varchar(512) DEFAULT NULL,
  `autor` varchar(100) DEFAULT 'Admin',
  `categoria` varchar(100) DEFAULT 'General',
  `tags` varchar(500) DEFAULT NULL,
  `meta_description` varchar(300) DEFAULT NULL,
  `palabra_clave` varchar(100) DEFAULT NULL,
  `activo` tinyint(1) DEFAULT 1,
  `fecha_publicacion` datetime DEFAULT CURRENT_TIMESTAMP,
  `fecha_creacion` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

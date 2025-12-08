<?php
/**
 * API Completa para Blog (v2) - Fixed Credentials
 */

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, X-API-Key");
header("Content-Type: application/json; charset=UTF-8");

// ===================================
// 1. CONFIGURACIÓN (DATOS REALES)
// ===================================
$host = "localhost";
$username = "enloja_platos";     // Usuario real
$password = ";4yX8nGtXK[*";      // Contraseña real
$dbname = "enloja_platos";       // Base de datos real
$valid_api_key = "enloja_secure_api_key_2024_restaurant_admin_xyz789"; // API Key real

// ===================================
// 2. SEGURIDAD (API Key)
// ===================================
// Obtener API Key de manera compatible
$api_key = '';
if (function_exists('getallheaders')) {
    $headers = getallheaders();
    $api_key = isset($headers['X-API-Key']) ? $headers['X-API-Key'] : (isset($headers['x-api-key']) ? $headers['x-api-key'] : '');
}
if (empty($api_key)) {
    $api_key = isset($_SERVER['HTTP_X_API_KEY']) ? $_SERVER['HTTP_X_API_KEY'] : '';
}

if ($api_key !== $valid_api_key) {
    http_response_code(401);
    echo json_encode(["success" => false, "error" => "No autorizado"]);
    exit;
}

// ===================================
// 3. CONEXIÓN A BASE DE DATOS
// ===================================
$conn = new mysqli($host, $username, $password, $dbname);
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["success" => false, "error" => "Error de conexión: " . $conn->connect_error]);
    exit;
}
$conn->set_charset("utf8mb4");

// ===================================
// 4. LÓGICA DEL API
// ===================================

$method = $_SERVER['REQUEST_METHOD'];

function handleFileUpload() {
    if (!isset($_FILES['imagen']) || $_FILES['imagen']['error'] !== UPLOAD_ERR_OK) {
        return null;
    }

    $file = $_FILES['imagen'];
    $max_size = 1 * 1024 * 1024; // 1MB
    
    if ($file['size'] > $max_size) {
        throw new Exception("La imagen excede el límite de 1MB");
    }

    $allowed_types = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!in_array($file['type'], $allowed_types)) {
        throw new Exception("Tipo de archivo no permitido");
    }

    // Directorio relativo: si el script está en blog/blog_api.php, uploads está en ../uploads/blog/
    $upload_dir = '../uploads/blog/'; 
    if (!file_exists($upload_dir)) {
        mkdir($upload_dir, 0755, true);
    }

    $ext = pathinfo($file['name'], PATHINFO_EXTENSION);
    $filename = uniqid('blog_') . '.' . $ext;
    $target_path = $upload_dir . $filename;

    if (move_uploaded_file($file['tmp_name'], $target_path)) {
        $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http";
        $domain = $_SERVER['HTTP_HOST'];
        
        // CORRECCIÓN DEFINITIVA: 
        // Si accedemos por IP temporal: http://216.246.46.43/~enloja/api.enloja.net/blog/blog_api.php
        // La imagen debe ser: http://216.246.46.43/~enloja/api.enloja.net/uploads/blog/filename
        
        // Detectamos si la URL contiene ~enloja
        if (strpos($_SERVER['REQUEST_URI'], '~enloja') !== false) {
             // Estamos en la URL temporal
             return "$protocol://$domain/~enloja/api.enloja.net/uploads/blog/$filename";
        }
        
        // Si estamos en dominio real (api.enloja.net)
        // La URL debe ser: https://api.enloja.net/uploads/blog/filename
        return "$protocol://$domain/uploads/blog/$filename";
    }
    
    return null;
}

switch ($method) {
    case 'GET':
        if (isset($_GET['slug'])) {
            $slug = $conn->real_escape_string($_GET['slug']);
            $sql = "SELECT * FROM blog_articles WHERE slug = '$slug' LIMIT 1";
            $result = $conn->query($sql);
            
            if ($result->num_rows > 0) {
                echo json_encode(["success" => true, "data" => $result->fetch_assoc()]);
            } else {
                http_response_code(404);
                echo json_encode(["success" => false, "error" => "Artículo no encontrado"]);
            }
        } else {
            $only_active = isset($_GET['active']) && $_GET['active'] === 'true';
            $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 1000;
            
            $where_clauses = [];
            if ($only_active) {
                $where_clauses[] = "activo = 1";
            }
            
            if (isset($_GET['category']) && !empty($_GET['category'])) {
                $cat = $conn->real_escape_string($_GET['category']);
                $where_clauses[] = "categoria = '$cat'";
            }

            $sql = "SELECT * FROM blog_articles";
            if (!empty($where_clauses)) {
                $sql .= " WHERE " . implode(" AND ", $where_clauses);
            }
            
            $sql .= " ORDER BY fecha_publicacion DESC LIMIT $limit";
            
            $result = $conn->query($sql);
            $articles = [];
            while($row = $result->fetch_assoc()) {
                $articles[] = $row;
            }
            echo json_encode(["success" => true, "data" => $articles]);
        }
        break;

    case 'POST':
        $input_data = [];
        $imagen_url = '';
        
        // Determinar si es UPDATE (tiene ID) o CREATE
        $id = isset($_GET['id']) ? (int)$_GET['id'] : null;

        try {
            if (!empty($_POST)) {
                $input_data = $_POST;
                $uploaded_url = handleFileUpload();
                if ($uploaded_url) {
                    $imagen_url = $uploaded_url;
                } elseif (isset($_POST['imagen_url'])) {
                    $imagen_url = $_POST['imagen_url'];
                }
            } 
            else {
                // Fallback para JSON (sin archivos)
                $input_data = json_decode(file_get_contents("php://input"), true);
                if (isset($input_data['imagen_url'])) {
                    $imagen_url = $input_data['imagen_url'];
                }
            }

            if (empty($input_data['titulo']) || empty($input_data['slug'])) {
                throw new Exception("Título y Slug son obligatorios");
            }

            $titulo = $conn->real_escape_string($input_data['titulo']);
            $slug = $conn->real_escape_string($input_data['slug']);
            $contenido = $conn->real_escape_string($input_data['contenido'] ?? '');
            $extracto = $conn->real_escape_string($input_data['extracto'] ?? '');
            $autor = $conn->real_escape_string($input_data['autor'] ?? 'Admin');
            $categoria = $conn->real_escape_string($input_data['categoria'] ?? 'General');
            $tags = $conn->real_escape_string($input_data['tags'] ?? '');
            $meta_desc = $conn->real_escape_string($input_data['meta_description'] ?? '');
            $keyword = $conn->real_escape_string($input_data['palabra_clave'] ?? '');
            $activo = isset($input_data['activo']) && ($input_data['activo'] === 'true' || $input_data['activo'] === '1' || $input_data['activo'] === 1) ? 1 : 0;
            $fecha_pub = isset($input_data['fecha_publicacion']) ? $conn->real_escape_string($input_data['fecha_publicacion']) : date('Y-m-d H:i:s');

            if ($id) {
                // === UPDATE LOGIC ===
                $updates = [
                    "titulo = '$titulo'",
                    "slug = '$slug'",
                    "contenido = '$contenido'",
                    "extracto = '$extracto'",
                    "autor = '$autor'",
                    "categoria = '$categoria'",
                    "tags = '$tags'",
                    "meta_description = '$meta_desc'",
                    "palabra_clave = '$keyword'",
                    "activo = $activo",
                    "fecha_publicacion = '$fecha_pub'"
                ];
                
                // Solo actualizar imagen si se subió una nueva
                if (!empty($imagen_url)) {
                    $updates[] = "imagen_url = '$imagen_url'";
                }

                $sql = "UPDATE blog_articles SET " . implode(', ', $updates) . " WHERE id = $id";
                
                if ($conn->query($sql) === TRUE) {
                    echo json_encode(["success" => true, "data" => ["id" => $id, "slug" => $slug]]);
                } else {
                    throw new Exception("Error al Actualizar: " . $conn->error);
                }

            } else {
                // === INSERT LOGIC ===
                $sql = "INSERT INTO blog_articles 
                        (slug, titulo, contenido, extracto, imagen_url, autor, categoria, tags, meta_description, palabra_clave, activo, fecha_publicacion) 
                        VALUES 
                        ('$slug', '$titulo', '$contenido', '$extracto', '$imagen_url', '$autor', '$categoria', '$tags', '$meta_desc', '$keyword', $activo, '$fecha_pub')";

                if ($conn->query($sql) === TRUE) {
                    http_response_code(201);
                    echo json_encode(["success" => true, "data" => ["id" => $conn->insert_id, "slug" => $slug, "imagen_url" => $imagen_url]]);
                } else {
                    throw new Exception("Error al Crear: " . $conn->error);
                }
            }

        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["success" => false, "error" => $e->getMessage()]);
        }
        break;

    case 'PUT':
        // Dejamos el PUT solo para actualizaciones parciales livianas (toggle activo)
        // ... (Keep existing PUT logic mostly or simplify) ...
        $data = json_decode(file_get_contents("php://input"), true);
        if (!isset($_GET['id'])) { /* ... */ exit; }
        $id = (int)$_GET['id'];
        
        // Manejamos solo lo básico para toggles rápidos
        if (isset($data['activo'])) {
             $activoVal = ($data['activo'] === true || $data['activo'] === 1) ? 1 : 0;
             $conn->query("UPDATE blog_articles SET activo = $activoVal WHERE id = $id");
             echo json_encode(["success" => true]);
             exit;
        }
        // ... Si llega algo más complejo por PUT podría fallar si son archivos, pero el frontend usará POST para edits completos.
        break;

    case 'DELETE':
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(["success" => false, "error" => "ID requerido"]);
            exit;
        }
        $id = (int)$_GET['id'];
        
        // 1. Obtener la imagen antes de borrar
        $sql_get_img = "SELECT imagen_url FROM blog_articles WHERE id = $id LIMIT 1";
        $res_img = $conn->query($sql_get_img);
        
        if ($res_img && $row = $res_img->fetch_assoc()) {
            $imagen_url = $row['imagen_url'];
            if (!empty($imagen_url)) {
                $filename = basename($imagen_url);
                // Asumiendo que estamos en api.enloja.net/blog y las img en ../uploads/blog
                $filepath = '../uploads/blog/' . $filename;
                if (file_exists($filepath)) {
                    @unlink($filepath); // Intentar borrar el archivo físico
                }
            }
        }
        
        // 2. Borrar registro
        if ($conn->query("DELETE FROM blog_articles WHERE id = $id")) {
            echo json_encode(["success" => true]);
        } else {
            http_response_code(500);
            echo json_encode(["success" => false, "error" => $conn->error]);
        }
        break;
}

$conn->close();
?>

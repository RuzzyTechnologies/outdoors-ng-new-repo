<?php
/**
 * Outdoors MySQL API
 * Upload this file to your server where phpMyAdmin is hosted
 * 
 * SETUP:
 * 1. Edit the database credentials below
 * 2. Upload to your server (e.g., https://yourserver.com/api/api.php)
 * 3. Add the URL to your Vercel environment variables as MYSQL_API_URL
 * 4. Add the API_SECRET_KEY to Vercel as MYSQL_API_KEY
 */

// ============ CONFIGURATION - EDIT THESE ============
$DB_HOST = 'localhost';
$DB_USER = 'your_username';
$DB_PASS = 'your_password';
$DB_NAME = 'your_database';
$API_SECRET_KEY = 'your-secret-key-here'; // Change this to a secure random string
// ====================================================

// CORS Headers
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-API-Key');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Verify API Key
$headers = getallheaders();
$apiKey = isset($headers['X-API-Key']) ? $headers['X-API-Key'] : (isset($headers['x-api-key']) ? $headers['x-api-key'] : '');

if ($apiKey !== $API_SECRET_KEY) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit();
}

// Database connection
$conn = new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed']);
    exit();
}

$conn->set_charset('utf8mb4');

// Get request parameters
$action = isset($_GET['action']) ? $_GET['action'] : '';
$table = isset($_GET['table']) ? $_GET['table'] : '';
$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

// Allowed tables (whitelist for security)
$allowedTables = [
    'billboards',
    'categories', 
    'locations',
    'states',
    'areas',
    'bookings',
    'users',
    'products',
    // Add more tables as needed
];

// Validate table name
function validateTable($table, $allowedTables) {
    return in_array($table, $allowedTables);
}

// Main router
switch ($action) {
    
    // ============ GET ALL RECORDS ============
    case 'getAll':
        if (!validateTable($table, $allowedTables)) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid table']);
            exit();
        }
        
        $limit = isset($_GET['limit']) ? intval($_GET['limit']) : 100;
        $offset = isset($_GET['offset']) ? intval($_GET['offset']) : 0;
        
        $sql = "SELECT * FROM `$table` LIMIT ? OFFSET ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('ii', $limit, $offset);
        $stmt->execute();
        $result = $stmt->get_result();
        
        $data = [];
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        
        echo json_encode(['success' => true, 'data' => $data, 'count' => count($data)]);
        break;
    
    // ============ GET SINGLE RECORD ============
    case 'getOne':
        if (!validateTable($table, $allowedTables)) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid table']);
            exit();
        }
        
        $sql = "SELECT * FROM `$table` WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('i', $id);
        $stmt->execute();
        $result = $stmt->get_result();
        
        $data = $result->fetch_assoc();
        
        if ($data) {
            echo json_encode(['success' => true, 'data' => $data]);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Record not found']);
        }
        break;
    
    // ============ SEARCH RECORDS ============
    case 'search':
        if (!validateTable($table, $allowedTables)) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid table']);
            exit();
        }
        
        $searchField = isset($_GET['field']) ? $_GET['field'] : '';
        $searchValue = isset($_GET['value']) ? $_GET['value'] : '';
        
        // Validate field name (basic alphanumeric check)
        if (!preg_match('/^[a-zA-Z_][a-zA-Z0-9_]*$/', $searchField)) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid field name']);
            exit();
        }
        
        $sql = "SELECT * FROM `$table` WHERE `$searchField` LIKE ?";
        $stmt = $conn->prepare($sql);
        $searchPattern = "%$searchValue%";
        $stmt->bind_param('s', $searchPattern);
        $stmt->execute();
        $result = $stmt->get_result();
        
        $data = [];
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        
        echo json_encode(['success' => true, 'data' => $data, 'count' => count($data)]);
        break;
    
    // ============ GET BY FIELD VALUE ============
    case 'getByField':
        if (!validateTable($table, $allowedTables)) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid table']);
            exit();
        }
        
        $field = isset($_GET['field']) ? $_GET['field'] : '';
        $value = isset($_GET['value']) ? $_GET['value'] : '';
        
        if (!preg_match('/^[a-zA-Z_][a-zA-Z0-9_]*$/', $field)) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid field name']);
            exit();
        }
        
        $sql = "SELECT * FROM `$table` WHERE `$field` = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('s', $value);
        $stmt->execute();
        $result = $stmt->get_result();
        
        $data = [];
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        
        echo json_encode(['success' => true, 'data' => $data, 'count' => count($data)]);
        break;
    
    // ============ INSERT RECORD ============
    case 'insert':
        if (!validateTable($table, $allowedTables)) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid table']);
            exit();
        }
        
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!$input || empty($input)) {
            http_response_code(400);
            echo json_encode(['error' => 'No data provided']);
            exit();
        }
        
        $columns = array_keys($input);
        $values = array_values($input);
        
        // Validate column names
        foreach ($columns as $col) {
            if (!preg_match('/^[a-zA-Z_][a-zA-Z0-9_]*$/', $col)) {
                http_response_code(400);
                echo json_encode(['error' => 'Invalid column name']);
                exit();
            }
        }
        
        $placeholders = str_repeat('?,', count($values) - 1) . '?';
        $columnList = '`' . implode('`,`', $columns) . '`';
        
        $sql = "INSERT INTO `$table` ($columnList) VALUES ($placeholders)";
        $stmt = $conn->prepare($sql);
        
        $types = str_repeat('s', count($values));
        $stmt->bind_param($types, ...$values);
        
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'id' => $conn->insert_id]);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Insert failed: ' . $stmt->error]);
        }
        break;
    
    // ============ UPDATE RECORD ============
    case 'update':
        if (!validateTable($table, $allowedTables)) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid table']);
            exit();
        }
        
        if (!$id) {
            http_response_code(400);
            echo json_encode(['error' => 'ID required']);
            exit();
        }
        
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!$input || empty($input)) {
            http_response_code(400);
            echo json_encode(['error' => 'No data provided']);
            exit();
        }
        
        $setParts = [];
        $values = [];
        
        foreach ($input as $col => $val) {
            if (!preg_match('/^[a-zA-Z_][a-zA-Z0-9_]*$/', $col)) {
                http_response_code(400);
                echo json_encode(['error' => 'Invalid column name']);
                exit();
            }
            $setParts[] = "`$col` = ?";
            $values[] = $val;
        }
        
        $values[] = $id;
        
        $sql = "UPDATE `$table` SET " . implode(', ', $setParts) . " WHERE id = ?";
        $stmt = $conn->prepare($sql);
        
        $types = str_repeat('s', count($values) - 1) . 'i';
        $stmt->bind_param($types, ...$values);
        
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'affected' => $stmt->affected_rows]);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Update failed: ' . $stmt->error]);
        }
        break;
    
    // ============ DELETE RECORD ============
    case 'delete':
        if (!validateTable($table, $allowedTables)) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid table']);
            exit();
        }
        
        if (!$id) {
            http_response_code(400);
            echo json_encode(['error' => 'ID required']);
            exit();
        }
        
        $sql = "DELETE FROM `$table` WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('i', $id);
        
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'affected' => $stmt->affected_rows]);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Delete failed: ' . $stmt->error]);
        }
        break;
    
    // ============ CUSTOM QUERY (Read Only) ============
    case 'query':
        $input = json_decode(file_get_contents('php://input'), true);
        $customQuery = isset($input['query']) ? $input['query'] : '';
        
        // Only allow SELECT queries for security
        if (!preg_match('/^\s*SELECT/i', $customQuery)) {
            http_response_code(400);
            echo json_encode(['error' => 'Only SELECT queries allowed']);
            exit();
        }
        
        $result = $conn->query($customQuery);
        
        if ($result) {
            $data = [];
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
            echo json_encode(['success' => true, 'data' => $data, 'count' => count($data)]);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Query failed: ' . $conn->error]);
        }
        break;
    
    // ============ GET TABLE INFO ============
    case 'tables':
        $result = $conn->query("SHOW TABLES");
        $tables = [];
        while ($row = $result->fetch_array()) {
            $tables[] = $row[0];
        }
        echo json_encode(['success' => true, 'tables' => $tables]);
        break;
    
    // ============ HEALTH CHECK ============
    case 'health':
        echo json_encode(['success' => true, 'message' => 'API is running', 'time' => date('Y-m-d H:i:s')]);
        break;
    
    default:
        http_response_code(400);
        echo json_encode([
            'error' => 'Invalid action',
            'available_actions' => [
                'getAll' => 'Get all records from a table',
                'getOne' => 'Get single record by ID',
                'search' => 'Search records by field',
                'getByField' => 'Get records by exact field value',
                'insert' => 'Insert new record',
                'update' => 'Update existing record',
                'delete' => 'Delete record',
                'query' => 'Run custom SELECT query',
                'tables' => 'List all tables',
                'health' => 'Check API health'
            ]
        ]);
}

$conn->close();
?>

<?php
session_start();
header('Content-Type: application/json');

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'Unauthorized.']);
    exit();
}

require_once 'db.php';

try {
    $username = $_SESSION['user_id'];

    $stmt = $pdo->prepare("
       SELECT 
    username,
    full_name,
    course,
    year_level,
    email,
    profile_photo,
    created_at
        FROM native_users
        WHERE username = ?
        LIMIT 1
    ");

    $stmt->execute([$username]);
    $profile = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$profile) {
        echo json_encode(['status' => 'error', 'message' => 'Profile not found.']);
        exit();
    }

    echo json_encode([
        'status' => 'success',
        'data' => $profile
    ]);

} catch (PDOException $e) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Database error: ' . $e->getMessage()
    ]);
}
?>
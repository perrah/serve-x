<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include('db.php');

try {
    $stmt = $pdo->query("SELECT name, star_rating, comments, created_at FROM feedback ORDER BY created_at DESC LIMIT 10");
    $feedback = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($feedback);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["message" => "Error fetching feedback: " . $e->getMessage()]);
}
?>
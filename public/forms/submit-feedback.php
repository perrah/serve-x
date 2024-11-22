<?php
header('Access-Control-Allow-Origin: *');
//header('Content-Type: application/json');
include('db.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $email = $_POST['email'] ?? null; 
    $star_rating = $_POST['star_rating'];
    $comments = $_POST['comments'];


    $sql = "INSERT INTO feedback (name, email, star_rating, comments) VALUES (?, ?, ?, ?)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$name, $email, $star_rating, $comments]);
    echo json_encode(["message" => "Feedback submitted successfully!"]);

}
?>

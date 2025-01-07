<?php
include 'db_connect.php';

$country_code = $_GET['country_code'] ?? '';

$sql = "UPDATE country SET is_delete = 1 WHERE country_code = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $country_code);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false]);
}
?>
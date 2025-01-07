<?php
header('Content-Type: application/json');
include 'db_connect.php';

$data = json_decode(file_get_contents('php://input'), true);

$sql = "INSERT INTO familymembers (emp_id, family_id, family_name, family_gender, relationship, birth_date) 
        VALUES (?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param(
    "ssssss",
    $data['emp_id'],
    $data['family_id'],
    $data['family_name'],
    $data['family_gender'],
    $data['relationship'],
    $data['birth_date']
);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false]);
}
?>

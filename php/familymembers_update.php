<?php
header('Content-Type: application/json');
include 'db_connect.php';

$data = json_decode(file_get_contents('php://input'), true);

$sql = "UPDATE familymembers 
        SET 
            family_name = ?, 
            family_gender = ?, 
            relationship = ?, 
            birth_date = ? 
        WHERE emp_id = ? AND family_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param(
    "ssssss",
    $data['family_name'],
    $data['family_gender'],
    $data['relationship'],
    $data['birth_date'],
    $data['emp_id'],
    $data['family_id']
);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false]);
}
?>

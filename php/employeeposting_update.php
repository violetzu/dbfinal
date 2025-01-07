<?php
header('Content-Type: application/json');
include 'db_connect.php';

$data = json_decode(file_get_contents('php://input'), true);

$sql = "UPDATE employeeposting 
        SET 
            country_code = ?, 
            emp_name = ?, 
            start_date = ?, 
            ambassador_name = ? 
        WHERE emp_id = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param(
    "sssss",
    $data['country_code'],
    $data['emp_name'],
    $data['start_date'],
    $data['ambassador_name'],
    $data['emp_id']
);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false]);
}
?>

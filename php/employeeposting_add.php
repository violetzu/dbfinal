<?php
header('Content-Type: application/json');
include 'db_connect.php';

$data = json_decode(file_get_contents('php://input'), true);

$sql = "INSERT INTO employeeposting (emp_id, country_code, emp_name, start_date, ambassador_name, is_delete) 
        VALUES (?, ?, ?, ?, ?, 0)";
$stmt = $conn->prepare($sql);
$stmt->bind_param(
    "sssss",
    $data['emp_id'],
    $data['country_code'],
    $data['emp_name'],
    $data['start_date'],
    $data['ambassador_name']
);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false]);
}
?>

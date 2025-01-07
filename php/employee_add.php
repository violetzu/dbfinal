<?php
header('Content-Type: application/json');
include 'db_connect.php';


$data = json_decode(file_get_contents('php://input'), true);

$sql = "INSERT INTO employee (emp_id, emp_name, gender, job_grade, phone, salary, birth_date, hire_date, address, is_delete) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0)";
$stmt = $conn->prepare($sql);
$stmt->bind_param(
    "ssssissss",
    $data['emp_id'],
    $data['emp_name'],
    $data['gender'],
    $data['job_grade'],
    $data['phone'],
    $data['salary'],
    $data['birth_date'],
    $data['hire_date'],
    $data['address']
);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false]);
}
?>


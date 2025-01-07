<?php
include 'db_connect.php';

$emp_id = $_GET['emp_id'] ?? ''; 

$sql = "UPDATE familymembers SET is_delete = 1 WHERE emp_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $emp_id);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false]);
}
?>

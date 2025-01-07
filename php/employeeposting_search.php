<?php
header('Content-Type: application/json');
include 'db_connect.php';

$emp_id = $_GET['emp_id'] ?? '';

$sql = "SELECT emp_id, country_code, emp_name, start_date, ambassador_name, is_delete 
        FROM employeeposting 
        WHERE emp_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $emp_id);
$stmt->execute();

$result = $stmt->get_result();
if ($result->num_rows > 0) {
    $data = $result->fetch_assoc();
    if ($data['is_delete'] == 1) {
        echo json_encode(["error" => "delete"]);
    } else {
        unset($data['is_delete']);
        echo json_encode($data);
    }
} else {
    echo json_encode(["error" => "none"]);
}
?>

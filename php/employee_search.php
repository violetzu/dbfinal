<?php
include 'db_connect.php';

$emp_id = $_GET['emp_id'] ?? ''; 

$sql = "SELECT emp_name, emp_id, job_grade, salary, phone, gender, birth_date, hire_date, address, photo, is_delete
        FROM employee 
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
        $data['photo_url'] = $data['photo'] ? "photo/" . $data['photo'] : null; // 加入照片 URL
        unset($data['is_delete']);
        echo json_encode($data);
    }
} else {
    echo json_encode(["error" => "none"]);
}
?>

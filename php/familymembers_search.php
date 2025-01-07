<?php
header('Content-Type: application/json');
include 'db_connect.php';

$id = $_GET['id'] ?? '';

// 查詢資料
$sql = "SELECT emp_id, family_id, family_name, family_gender, relationship, birth_date, is_delete
        FROM familymembers 
        WHERE emp_id = ? OR family_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $id, $id);
$stmt->execute();

$result = $stmt->get_result();
if ($result->num_rows > 0) {
    $data = [];
    while ($row = $result->fetch_assoc()) {
        if ($row['is_delete'] == 1) {
            echo json_encode(["error" => "delete"]);
            exit;
        }
        unset($row['is_delete']); 
        $data[] = $row;
    }
    echo json_encode($data); 
} else {
    echo json_encode(["error" => "none"]); // 若無資料，回傳錯誤訊息
}
?>

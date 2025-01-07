<?php
header('Content-Type: application/json');
include 'db_connect.php';

$response = [
    "success" => false,
    "error" => null,
    "photo" => null
];

// 確保有收到請求資料
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // 確保必要的資料欄位存在
    $emp_id = $_POST['emp_id'] ?? null;
    $emp_name = $_POST['emp_name'] ?? null;
    $gender = $_POST['gender'] ?? null;
    $job_grade = $_POST['job_grade'] ?? null;
    $phone = $_POST['phone'] ?? null;
    $salary = $_POST['salary'] ?? null;
    $birth_date = $_POST['birth_date'] ?? null;
    $hire_date = $_POST['hire_date'] ?? null;
    $address = $_POST['address'] ?? null;

    if (!$emp_id || !$emp_name || !$gender || !$job_grade || !$phone || !$salary || !$birth_date || !$hire_date || !$address) {
        $response["error"] = "所有欄位均為必填";
        echo json_encode($response);
        exit;
    }

    // 初始化照片變數
    $photo = null;

    // 照片上傳處理
    if (isset($_FILES['photo']) && $_FILES['photo']['error'] === UPLOAD_ERR_OK) {
        $target_dir = "../photo/";
        $timestamp = time();
        $original_filename = basename($_FILES['photo']['name']);
        $file_extension = pathinfo($original_filename, PATHINFO_EXTENSION);
        $new_filename = $timestamp . "_" . uniqid() . "." . $file_extension;

        $target_file = $target_dir . $new_filename;

        // 移動檔案到指定目錄
        if (move_uploaded_file($_FILES['photo']['tmp_name'], $target_file)) {
            $photo = $new_filename;
        } else {
            $response["error"] = "照片上傳失敗";
            echo json_encode($response);
            exit;
        }
    }

    // 更新資料庫
    $sql = "UPDATE employee 
            SET 
                emp_name = ?, 
                gender = ?, 
                job_grade = ?, 
                phone = ?, 
                salary = ?, 
                birth_date = ?, 
                hire_date = ?, 
                address = ?, 
                photo = IFNULL(?, photo) -- 若無上傳照片則保留原有照片
            WHERE emp_id = ?";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param(
        "ssssisssss",
        $emp_name,
        $gender,
        $job_grade,
        $phone,
        $salary,
        $birth_date,
        $hire_date,
        $address,
        $photo,
        $emp_id
    );

    if ($stmt->execute()) {
        $response["success"] = true;
        $response["photo"] = $photo; // 返回新的照片檔案名稱
    } else {
        $response["error"] = "資料更新失敗：" . $stmt->error;
    }
} else {
    $response["error"] = "無效的請求方法";
}

echo json_encode($response);
?>

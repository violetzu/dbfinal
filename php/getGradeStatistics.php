<?php
include 'db_connect.php';

// 驗證 grade 格式
$grade = $_GET['grade'] ?? '';
if (!preg_match('/^簡任(\d+)等$/', $grade, $matches)) {
    echo json_encode(["error" => "Invalid grade format"]);
    exit;
}
$targetGradeNumber = intval($matches[1]);

try {
    // 統計該職等人數
    $sqlCurrent = "SELECT COUNT(*) as count 
                   FROM employee 
                   WHERE is_delete = 0 AND job_grade = ?";
    $stmtCurrent = $conn->prepare($sqlCurrent);
    $stmtCurrent->bind_param("s", $grade);
    $stmtCurrent->execute();
    $currentResult = $stmtCurrent->get_result()->fetch_assoc();

    // 統計該職等以下人數
    $sqlBelow = "SELECT COUNT(*) as count 
                 FROM employee 
                 WHERE is_delete = 0 AND 
                       CAST(REGEXP_REPLACE(job_grade, '[^0-9]', '') AS UNSIGNED) <= ?";
    $stmtBelow = $conn->prepare($sqlBelow);
    $stmtBelow->bind_param("i", $targetGradeNumber);
    $stmtBelow->execute();
    $belowResult = $stmtBelow->get_result()->fetch_assoc();

    // 返回結果
    echo json_encode([
        "currentCount" => $currentResult['count'],
        "belowCount" => $belowResult['count']
    ]);
} catch (Exception $e) {
    echo json_encode(["error" => "An error occurred: " . $e->getMessage()]);
}
?>

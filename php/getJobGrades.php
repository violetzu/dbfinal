<?php
include 'db_connect.php';

// 獲取 job_grade 資料
$sql = "SELECT DISTINCT job_grade FROM employee WHERE is_delete = 0";
$result = $conn->query($sql);

$jobGrades = [];
while ($row = $result->fetch_assoc()) {
    $jobGrades[] = $row['job_grade'];
}

// 排序邏輯
usort($jobGrades, function ($a, $b) {
    // 使用正則提取數字部分
    preg_match('/^簡任(\d+)等$/', $a, $matchesA);
    preg_match('/^簡任(\d+)等$/', $b, $matchesB);

    // 如果格式無效，按字典順序排序
    if (!$matchesA && !$matchesB) return strcmp($a, $b);
    if (!$matchesA) return 1;
    if (!$matchesB) return -1;

    // 按數字部分排序
    return intval($matchesA[1]) - intval($matchesB[1]);
});

// 格式化輸出
echo json_encode(array_map(function ($jobGrade) {
    return ["job_grade" => $jobGrade];
}, $jobGrades));
?>

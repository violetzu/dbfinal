<?php
include 'db_connect.php';

// 總員工人數
$sql = "SELECT COUNT(*) as totalEmployees FROM employee WHERE is_delete = 0";
$totalEmployees = $conn->query($sql)->fetch_assoc()['totalEmployees'];

// 平均年齡
$sql = "SELECT AVG(TIMESTAMPDIFF(YEAR, birth_date, CURDATE())) as averageAge FROM employee WHERE is_delete = 0";
$averageAge = $conn->query($sql)->fetch_assoc()['averageAge'];

// 平均薪資
$sql = "SELECT AVG(salary) as averageSalary FROM employee WHERE is_delete = 0";
$averageSalary = $conn->query($sql)->fetch_assoc()['averageSalary'];

// 全年、每月與每周薪資
$sql = "SELECT SUM(salary) as totalYearlySalary FROM employee WHERE is_delete = 0";
$totalYearlySalary = $conn->query($sql)->fetch_assoc()['totalYearlySalary'];

$totalMonthlySalary = $totalYearlySalary / 12;
$totalWeeklySalary = $totalYearlySalary / 52;

echo json_encode([
    "totalEmployees" => $totalEmployees,
    "averageAge" => $averageAge,
    "averageSalary" => $averageSalary,
    "totalYearlySalary" => $totalYearlySalary,
    "totalMonthlySalary" => $totalMonthlySalary,
    "totalWeeklySalary" => $totalWeeklySalary,
]);
?>

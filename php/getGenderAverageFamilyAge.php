<?php
include 'db_connect.php';

$sql = "SELECT 
            AVG(IF(family_gender = '男', TIMESTAMPDIFF(YEAR, birth_date, CURDATE()), NULL)) AS male_average_age,
            AVG(IF(family_gender = '女', TIMESTAMPDIFF(YEAR, birth_date, CURDATE()), NULL)) AS female_average_age
        FROM familymembers
        WHERE is_delete = 0";
$result = $conn->query($sql)->fetch_assoc();

echo json_encode($result);
?>

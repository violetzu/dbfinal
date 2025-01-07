<?php
include 'db_connect.php';

$sql = "SELECT 
            SUM(family_gender = '男') AS male_count,
            SUM(family_gender = '女') AS female_count
        FROM familymembers
        WHERE is_delete = 0";
$result = $conn->query($sql)->fetch_assoc();

echo json_encode($result);
?>

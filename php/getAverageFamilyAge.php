<?php
include 'db_connect.php';

$sql = "SELECT AVG(TIMESTAMPDIFF(YEAR, birth_date, CURDATE())) AS average_age
        FROM familymembers
        WHERE is_delete = 0";
$result = $conn->query($sql)->fetch_assoc();

echo json_encode($result);
?>

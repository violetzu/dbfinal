<?php
include 'db_connect.php';

$sql = "SELECT 
            SUM(is_ally = 1) as allyCount, 
            SUM(is_ally = 0) as nonAllyCount 
        FROM country 
        WHERE is_delete = 0";
$result = $conn->query($sql)->fetch_assoc();

echo json_encode($result);
?>

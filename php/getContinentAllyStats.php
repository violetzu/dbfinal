<?php
include 'db_connect.php';

$continent = $_GET['continent'];

$sql = "SELECT 
            SUM(is_ally = 1) as allyCount, 
            SUM(is_ally = 0) as nonAllyCount 
        FROM country 
        WHERE continent_name = ? AND is_delete = 0";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $continent);
$stmt->execute();
$result = $stmt->get_result()->fetch_assoc();

echo json_encode($result);
?>

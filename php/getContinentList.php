<?php
include 'db_connect.php';

$sql = "SELECT DISTINCT continent_name FROM country WHERE is_delete = 0";
$result = $conn->query($sql);

$continentList = [];
while ($row = $result->fetch_assoc()) {
    $continentList[] = $row;
}

echo json_encode($continentList);
?>

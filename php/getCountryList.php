<?php
include 'db_connect.php';

$sql = "SELECT country_code, country_name FROM country WHERE is_delete = 0";
$result = $conn->query($sql);

$countries = [];
while ($row = $result->fetch_assoc()) {
    $countries[] = $row;
}

echo json_encode($countries);
?>

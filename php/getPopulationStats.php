<?php
include 'db_connect.php';

$country = $_GET['country'];

if ($country) {
    $sql = "SELECT population 
            FROM country 
            WHERE country_name = ? AND is_delete = 0";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $country);
} else {
    $sql = "SELECT SUM(population) as population 
            FROM country 
            WHERE is_delete = 0";
    $stmt = $conn->prepare($sql);
}

$stmt->execute();
$result = $stmt->get_result()->fetch_assoc();

echo json_encode($result);
?>

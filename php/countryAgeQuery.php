<?php
include 'db_connect.php';

$country = $_GET['country'];
$sql = "SELECT COUNT(*) as count FROM employeeposting e
        JOIN country c ON e.country_code = c.country_code
        WHERE c.country_name = ? AND e.is_delete = 0 AND TIMESTAMPDIFF(YEAR, e.start_date, CURDATE()) >= 30";

$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $country);
$stmt->execute();
$result = $stmt->get_result();
$data = $result->fetch_assoc();

echo json_encode($data);
?>

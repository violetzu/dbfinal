<?php
include 'db_connect.php';

$country = $_GET['country'];
$sql = "SELECT COUNT(*) as count 
        FROM employeeposting ep
        JOIN country c ON ep.country_code = c.country_code
        JOIN employee e ON ep.emp_id = e.emp_id
        WHERE c.country_name = ? AND e.is_delete = 0 AND ep.is_delete = 0 
        AND TIMESTAMPDIFF(YEAR, e.birth_date, CURDATE()) > 30";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $country);
$stmt->execute();
$result = $stmt->get_result()->fetch_assoc();
echo json_encode($result);
?>

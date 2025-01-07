<?php
include 'db_connect.php';

$continent = $_GET['continent'];
$sql = "SELECT COUNT(*) as count 
        FROM employeeposting e 
        JOIN country c ON e.country_code = c.country_code 
        JOIN employee emp ON e.emp_id = emp.emp_id 
        WHERE c.continent_name = ? AND e.is_delete = 0 AND emp.is_delete = 0 ";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $continent);
$stmt->execute();
$result = $stmt->get_result()->fetch_assoc();
echo json_encode($result);
?>

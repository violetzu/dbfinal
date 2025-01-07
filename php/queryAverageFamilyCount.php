<?php
include 'db_connect.php';

$sql = "SELECT AVG(family_count) as averageCount FROM (
            SELECT COUNT(*) as family_count 
            FROM familymembers f 
            JOIN employeeposting e ON f.emp_id = e.emp_id 
            JOIN employee emp ON e.emp_id = emp.emp_id 
            WHERE e.is_delete = 0 AND emp.is_delete = 0 
            AND TIMESTAMPDIFF(YEAR, emp.birth_date, CURDATE()) > 30
            GROUP BY e.emp_id
        ) as subquery";
$result = $conn->query($sql)->fetch_assoc();
echo json_encode($result);
?>

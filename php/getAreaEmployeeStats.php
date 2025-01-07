<?php
include 'db_connect.php';

$sql = "SELECT 
            c.country_name, 
            COUNT(ep.emp_id) / c.area  AS employee_per_area
        FROM country c
        LEFT JOIN employeeposting ep ON c.country_code = ep.country_code AND ep.is_delete = 0
        WHERE c.is_delete = 0 AND c.area > 0
        GROUP BY c.country_name";
$result = $conn->query($sql);

$areaStats = [];
while ($row = $result->fetch_assoc()) {
    $areaStats[] = $row;
}

echo json_encode($areaStats);
?>

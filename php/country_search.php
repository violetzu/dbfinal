<?php
include 'db_connect.php';

$country_code = $_GET['country_code'] ?? '';

$sql = "SELECT country_code, country_name, continent_name, head_of_state, foreign_minister, contact_person, population, area, contact_phone, is_ally, is_delete
        FROM country 
        WHERE country_code = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $country_code);
$stmt->execute();

$result = $stmt->get_result();
if ($result->num_rows > 0) {
    $data = $result->fetch_assoc();
    if ($data['is_delete'] == 1) {
        echo json_encode(["error" => "delete"]);
    } else {
        unset($data['is_delete']);
        echo json_encode($data);
    }
} else {
    echo json_encode(["error" => "none"]);
}
?>

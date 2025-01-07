<?php
header('Content-Type: application/json');
include 'db_connect.php';

$data = json_decode(file_get_contents('php://input'), true);

$sql = "UPDATE country
        SET
            country_name      = ?,
            continent_name    = ?,
            head_of_state     = ?,
            foreign_minister  = ?,
            contact_person    = ?,
            population        = ?,
            area              = ?,
            contact_phone     = ?,
            is_ally           = ?
        WHERE country_code = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param(
    "ssssssisss",
    $data['country_name'],
    $data['continent_name'],
    $data['head_of_state'],
    $data['foreign_minister'],
    $data['contact_person'],
    $data['population'],
    $data['area'],
    $data['contact_phone'],
    $data['is_ally'],
    $data['country_code']
);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false]);
}
?>


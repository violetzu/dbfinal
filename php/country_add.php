<?php
header('Content-Type: application/json');
include 'db_connect.php';


$data = json_decode(file_get_contents('php://input'), true);

$sql = "INSERT INTO country (country_code, country_name, continent_name, head_of_state, foreign_minister, contact_person, population, area, contact_phone, is_ally, is_delete) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)";
$stmt = $conn->prepare($sql);
$stmt->bind_param(
    "ssssssissi",
    $data['country_code'],      
    $data['country_name'],      
    $data['continent_name'],    
    $data['head_of_state'],    
    $data['foreign_minister'],
    $data['contact_person'],    
    $data['population'],        
    $data['area'],           
    $data['contact_phone'],  
    $data['is_ally']  
);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false]);
}
?>


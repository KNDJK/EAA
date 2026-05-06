<?php
// config.php - CONFIGURACIÓN DE BASE DE DATOS
// === TUS DATOS YA INCLUIDOS ===
$DB_HOST = "sql308.infinityfree.com";
$DB_NAME = "if0_41789352_game_db";
$DB_USER = "if0_41789352";
$DB_PASS = "Nzx8RiAdEGC2Gd";

// === NO CAMBIAR NADA DEBAJO ===
try {
    $pdo = new PDO("mysql:host=$DB_HOST;dbname=$DB_NAME;charset=utf8mb4", $DB_USER, $DB_PASS);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed: " . $e->getMessage()]);
    exit;
}

session_start();
?>
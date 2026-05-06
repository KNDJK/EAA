<?php
// save_game.php - GUARDAR PROGRESO
require_once 'config.php';

if (!isset($_SESSION['player_id'])) {
    echo json_encode(["success" => false, "error" => "No hay sesión activa"]);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

$gameData = json_encode($input['game_data'] ?? []);
$level = intval($input['level'] ?? 1);
$coins = intval($input['coins'] ?? 100);

$stmt = $pdo->prepare("UPDATE players SET level = ?, coins = ?, game_data = ? WHERE id = ?");
$stmt->execute([$level, $coins, $gameData, $_SESSION['player_id']]);

echo json_encode(["success" => true]);
?>
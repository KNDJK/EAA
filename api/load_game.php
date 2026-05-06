<?php
// load_game.php - CARGAR PROGRESO
require_once 'config.php';

if (!isset($_SESSION['player_id'])) {
    echo json_encode(["success" => false, "error" => "No hay sesión activa"]);
    exit;
}

$stmt = $pdo->prepare("SELECT level, coins, game_data FROM players WHERE id = ?");
$stmt->execute([$_SESSION['player_id']]);
$player = $stmt->fetch();

$gameData = [];
if ($player && $player['game_data']) {
    $gameData = json_decode($player['game_data'], true);
}

echo json_encode([
    "success" => true,
    "player" => [
        "level" => $player['level'],
        "coins" => $player['coins'],
        "game_data" => $gameData
    ]
]);
?>
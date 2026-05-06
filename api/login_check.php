<?php
// login_check.php - VERIFICAR LOGIN
require_once 'config.php';

$input = json_decode(file_get_contents('php://input'), true);

$username = trim($input['username'] ?? '');
$password = $input['password'] ?? '';

$stmt = $pdo->prepare("SELECT id, username, password_hash, avatar, level, coins FROM players WHERE username = ?");
$stmt->execute([$username]);
$player = $stmt->fetch();

if (!$player || !password_verify($password, $player['password_hash'])) {
    echo json_encode(["success" => false, "error" => "Usuario o contraseña incorrectos"]);
    exit;
}

$stmt = $pdo->prepare("UPDATE players SET last_login = NOW() WHERE id = ?");
$stmt->execute([$player['id']]);

$_SESSION['player_id'] = $player['id'];
$_SESSION['username'] = $player['username'];

$sessionToken = bin2hex(random_bytes(32));
$stmt = $pdo->prepare("INSERT INTO sessions (player_id, session_token) VALUES (?, ?)");
$stmt->execute([$player['id'], $sessionToken]);

echo json_encode([
    "success" => true,
    "player" => [
        "id" => $player['id'],
        "username" => $player['username'],
        "avatar" => $player['avatar'],
        "level" => $player['level'],
        "coins" => $player['coins']
    ],
    "session_token" => $sessionToken
]);
?>
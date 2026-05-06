<?php
// create_user.php - CREAR NUEVO USUARIO
require_once 'config.php';

$input = json_decode(file_get_contents('php://input'), true);

$username = trim($input['username'] ?? '');
$password = $input['password'] ?? '';
$avatar = $input['avatar'] ?? 'img/avatars/blank.png';

if (strlen($username) < 3) {
    echo json_encode(["success" => false, "error" => "Usuario muy corto (mínimo 3 caracteres)"]);
    exit;
}
if (strlen($password) < 4) {
    echo json_encode(["success" => false, "error" => "Contraseña muy corta (mínimo 4 caracteres)"]);
    exit;
}

$stmt = $pdo->prepare("SELECT id FROM players WHERE username = ?");
$stmt->execute([$username]);
if ($stmt->fetch()) {
    echo json_encode(["success" => false, "error" => "El usuario ya existe"]);
    exit;
}

$hashed_password = password_hash($password, PASSWORD_DEFAULT);
$stmt = $pdo->prepare("INSERT INTO players (username, password_hash, avatar) VALUES (?, ?, ?)");
$stmt->execute([$username, $hashed_password, $avatar]);

$playerId = $pdo->lastInsertId();
$_SESSION['player_id'] = $playerId;
$_SESSION['username'] = $username;

echo json_encode([
    "success" => true, 
    "player" => [
        "id" => $playerId,
        "username" => $username,
        "avatar" => $avatar,
        "level" => 1,
        "coins" => 100
    ]
]);
?>
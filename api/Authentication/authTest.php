<?php
// required headers
header("Access-Control-Allow-Origin: *"); // we can put our website link here
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
require_once 'jwt/src/JWT.php';
require_once 'jwt/src/SignatureInvalidException.php';
require_once 'jwt/src/BeforeValidException.php';
require_once 'jwt/src/ExpiredException.php';
require_once 'jwt/src/JWK.php';

use \Firebase\JWT\JWT;

// checking if user login
// if there is some authorization it will get into matches
if (!preg_match('/Bearer\s(\S+)/', $_SERVER['HTTP_AUTHORIZATION'], $matches)) {
    // can also http_response_code(400)
    echo 'Token not found in request';
    header('HTTP/1.0 400 Bad Request');
    
    exit;
}

$jwt = $matches[1];
if (!$jwt) {
    print_r($jwt);
    // No token was able to be extracted from the authorization header
    header('HTTP/1.0 400 Bad Request');
    exit;
}

$secretKey  = 'TGlkb3JCZW5TaGltb2w=';
$token = JWT::decode($jwt, $secretKey, ['HS512']);
$now = new DateTimeImmutable();
$serverName = "localhost";

if (
    $token->iss !== $serverName ||
    $token->nbf > $now->getTimestamp() ||
    $token->exp < $now->getTimestamp()
) {
    header('HTTP/1.1 401 Unauthorized');
    exit;
}

print_r($token);
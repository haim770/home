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

function base64url_encode($str)
{
    return rtrim(strtr(base64_encode($str), '+/', '-_'), '=');
}

$key  = '9c68e1263b2a8575939dd1b29431927380dcaab2';
// split the jwt
$tokenParts = explode('.', $jwt);
$header = base64_decode($tokenParts[0]);
$payload = base64_decode($tokenParts[1]);
$signature_provided = $tokenParts[2];
$token = json_decode($payloadl);

// build a signature based on the header and payload using the secret
$base64_url_header = base64url_encode($header);
$base64_url_payload = base64url_encode($payload);
$signature = hash_hmac('SHA256', $base64_url_header . "." . $base64_url_payload, $key, true);
$base64_url_signature = base64url_encode($signature);

// verify it matches the signature provided in the jwt
$is_signature_valid = ($base64_url_signature === $signature_provided);
if (!$is_signature_valid) {
    header('HTTP/1.1 401 Unauthorized');
    exit;
}
//$token = JWT::decode($jwt, $key, array('HS256'));
$now = new DateTimeImmutable();
$serverName = "localhost";

/* This section check if the token is valid, due to we not manage to use cookies correct we will temp
* comment this
*/
/*
if (
    $token->iss !== $serverName ||
    $token->nbf > $now->getTimestamp() ||
    $token->exp < $now->getTimestamp()
) {
    header('HTTP/1.1 401 Unauthorized');
    exit;
}
*/
print_r($token);
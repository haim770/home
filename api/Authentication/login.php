<?php
require_once 'jwt/src/JWT.php';
require_once 'jwt/src/SignatureInvalidException.php';
require_once 'jwt/src/BeforeValidException.php';
require_once 'jwt/src/ExpiredException.php';
require_once 'jwt/src/JWK.php';

use \Firebase\JWT\JWT;

$username = $DATA_OBJ->params->user;
$pass = $DATA_OBJ->params->pwd;

// Validate the credentials against a database, or other data store.
// ...
// For the purposes of this example, we'll assume that they're valid
$hasValidCredentials = $db->checkPassword($pass, $username);
if ($hasValidCredentials) {
    $secretKey  = 'bGS6lzFqvvSQ8ALbOxatm7/Vk7mLQyzqaS34Q4oR1ew=';
    $tokenId    = base64_encode(random_bytes(16));
    $issuedAt   = new DateTimeImmutable();
    $expire     = $issuedAt->modify('+1600 minutes')->getTimestamp();      // Add 1600 min
    $serverName = "Amico"; // Retrieved from filtered POST data

    // Create the token as an array
    $data = [
        'iat'  => $issuedAt->getTimestamp(),    // Issued at: time when the token was generated
        'jti'  => $tokenId,                     // Json Token Id: an unique identifier for the token
        'iss'  => $serverName,                  // Issuer
        'nbf'  => $issuedAt->getTimestamp(),    // Not before
        'exp'  => $expire,                      // Expire
        'data' => [                             // Data related to the signer user
            'userName' => $username,            // User name
        ]
    ];

    // Encode the array to a JWT string.
	echo json_encode(
            array(
                "message" => "Successful login.",
                "jwt" => JWT::encode(
									$data,      //Data to be encoded in the JWT
									$secretKey, // The signing key
									'HS512'     // Algorithm used to sign the token, see https://tools.ietf.org/html/draft-ietf-jose-json-web-algorithms-40#section-3
									),
                "username" => $username,
                "expireAt" => $expire
            ));
}

else {
	 echo json_encode(array("message" => "Login failed."));
}


?>

<?php
require_once 'jwt/src/JWT.php';
require_once 'jwt/src/SignatureInvalidException.php';
require_once 'jwt/src/BeforeValidException.php';
require_once 'jwt/src/ExpiredException.php';
require_once 'jwt/src/JWK.php';

$DH = "../Authentication/DiffiHelman/createSharedKey.php";
require_once(dirname(__FILE__) . DIRECTORY_SEPARATOR . $DH);

use \Firebase\JWT\JWT;
// Verifying whether a cookie is set or not

if (isset($DATA_OBJ->params->myCookie)) {
    $secretKey  = '9c68e1263b2a8575939dd1b29431927380dcaab2';
    $refreshKey = '291aad3e1acf2106b167fd6bce9875cb83fc6870';
    $refreshToken = $DATA_OBJ->params->myCookie;

    // Check if we have this jwtRefreshToken in our database.
    $arr['refreshToken'] = $refreshToken;
    $query = "SELECT * FROM `users` WHERE `refreshToken` =:refreshToken";
    $foundUser = $db->readDBNoStoredProcedure($query, $arr);

    if(!is_array($foundUser))
        {
        header('HTTP/1.1 403 Forbidde');
        exit;
        }
    $username = $foundUser[0]->mail;

/**
 * 
 */
    function base64url_encode($str)
    {
        return rtrim(strtr(base64_encode($str), '+/', '-_'), '=');
    }

    $key  = '291aad3e1acf2106b167fd6bce9875cb83fc6870';
    // split the jwt
    $tokenParts = explode('.', $refreshToken);
    $header = base64_decode($tokenParts[0]);
    $payload = base64_decode($tokenParts[1]);
    $signature_provided = $tokenParts[2];
    $token = json_decode($payload);

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

 /**
  * 
  */

    // check if the username in the refresh token match the username in our database.
    if($token->data->user != $foundUser[0]->mail) {
        header('HTTP/1.1 403 Forbidde');
        exit;
    }

    // create new user Token:
    $tokenId    = base64_encode(random_bytes(16));
    $issuedAt   = new DateTimeImmutable();
    $expireAccess     = $issuedAt->modify('+1 minutes')->getTimestamp();      // Add 1 min
    $expireRefresh    = $issuedAt->modify('+1440 minutes')->getTimestamp();      // Add 1 day
    $serverName = "localhost"; // Retrieved from filtered POST data

    // Create the token as an array
    $accessTokenData = [
        'iat'  => $issuedAt->getTimestamp(),    // Issued at: time when the token was generated
        'jti'  => $tokenId,                     // Json Token Id: an unique identifier for the token
        'iss'  => $serverName,                  // Issuer
        'nbf'  => $issuedAt->getTimestamp(),    // Not before
        'exp'  => $expireAccess,                      // Expire
        'data' => [                             // Data related to the signer user
            'user' => $username,            // User name
            'role' => $foundUser[0]->rule,          // User permissions on site
        ]
    ];
    $accessToken = JWT::encode(
        $accessTokenData,   //Data to be encoded in the JWT
        $secretKey,         // The signing key
        'HS256'             // Algorithm used to sign the token, see https://tools.ietf.org/html/draft-ietf-jose-json-web-algorithms-40#section-3
    );
    $arr2 = array();
    $arr2['refreshToken'] = $refreshToken;
    $arr2['sharedKey'] = $sharedSecretKey_Bob;
    $query = "UPDATE `users` SET `privateSharedKey`=:sharedKey  WHERE `refreshToken` =:refreshToken";
    $hasValidCredentials = $db->writeDBNotStoredProcedure($query, $arr2);
    // Encode the array to a JWT string.
    echo json_encode(
        array(
            "message" => "Successful login.",
            "accessToken" => $accessToken,
            "roles" => $foundUser[0]->rule,
            "user" => $username,
            "expireAt" => $expireAccess,
            "firstName" => $foundUser[0]->first_name,
            "lastName" => $foundUser[0]->last_name,
            'publicKey' => $bobPublicKey,
            "sharedKey" => $sharedSecretKey_Bob,
        )
    );
}
else{
    header('HTTP/1.1 401 Unauthorized');
    echo json_encode(
        array(
            "message" => "Failed refresh.",
        )
    );
    exit;
    }
?>
<?php
require_once 'jwt/src/JWT.php';
require_once 'jwt/src/SignatureInvalidException.php';
require_once 'jwt/src/BeforeValidException.php';
require_once 'jwt/src/ExpiredException.php';
require_once 'jwt/src/JWK.php';

use \Firebase\JWT\JWT;
// Verifying whether a cookie is set or not
if (isset($_COOKIE["jwtRefreshToken"])) {
    $secretKey  = '9c68e1263b2a8575939dd1b29431927380dcaab2';
    $refreshKey = '291aad3e1acf2106b167fd6bce9875cb83fc6870';
    $refreshToken = $_COOKIE["jwtRefreshToken"];

    // Check if we have this jwtRefreshToken in our database.
    $arr['refreshToken'] = $refreshToken;
    $query = "checkForRefreshToken(:refreshToken)";
    $foundUser = $db->readDB($query, $arr);
    if(!is_array($foundUser))
        {
        header('HTTP/1.1 403 Forbidde');
        exit;
        }
    $refreshTokenDecoded  = JWT::decode(
        $refreshToken,      //Data to be encoded in the JWT
        $refreshKey, // The signing key
        ['HS512']       // Algorithm used to sign the token, see https://tools.ietf.org/html/draft-ietf-jose-json-web-algorithms-40#section-3
    );    
    // check if the username in the refresh token match the username in our database.
    if($refreshTokenDecoded->data->userName != $foundUser) {
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
            'userName' => $foundUser,            // User name
            'role' => "SoomeRoleHere",          // User permissions on site
        ]
    ];
    $accessToken = JWT::encode(
        $accessTokenData,   //Data to be encoded in the JWT
        $secretKey,         // The signing key
        'HS512'             // Algorithm used to sign the token, see https://tools.ietf.org/html/draft-ietf-jose-json-web-algorithms-40#section-3
    );

    // Encode the array to a JWT string.
    echo json_encode(
        array(
            "message" => "Successful login.",
            "accessToken" => $accessToken,
            "username" => $username,
            "expireAt" => $expire,

        )
    );
}
else{
    header('HTTP/1.1 401 Unauthorized');
    exit;
    }
?>
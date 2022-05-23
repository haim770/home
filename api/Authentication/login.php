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
$arr = [];
$arr['password'] = $pass;
$arr['user'] = $username;
$query = "getUserByMailAndPassword(:user,:password)";
$hasValidCredentials = $db->readDB($query, $arr);

if (is_array($hasValidCredentials)) {
    $secretKey  = '9c68e1263b2a8575939dd1b29431927380dcaab2';
    $refreshKey = '291aad3e1acf2106b167fd6bce9875cb83fc6870';
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
            'role' => "2001",          // User permissions on site
        ]
    ];

    // Create the Refresh token as an array
    $refreshTokenData = [
        'iat'  => $issuedAt->getTimestamp(),    // Issued at: time when the token was generated
        'jti'  => $tokenId,                     // Json Token Id: an unique identifier for the token
        'iss'  => $serverName,                  // Issuer
        'nbf'  => $issuedAt->getTimestamp(),    // Not before
        'exp'  => $expireRefresh,                      // Expire
        'data' => [                             // Data related to the signer user
            'user' => $username,            // User name
        ]
    ];

    $accessToken = JWT::encode(
                    $accessTokenData,   //Data to be encoded in the JWT
					$secretKey,         // The signing key
					'HS512'             // Algorithm used to sign the token, see https://tools.ietf.org/html/draft-ietf-jose-json-web-algorithms-40#section-3
    );
    $refreshToken  = JWT::encode(
        $refreshTokenData,      //Data to be encoded in the JWT
        $refreshKey, // The signing key
        'HS512'     // Algorithm used to sign the token, see https://tools.ietf.org/html/draft-ietf-jose-json-web-algorithms-40#section-3
    );

    // This method will write the refreshToken of the user to the database.
    $arr2=array();
    $arr2['user'] = $username;
    $arr2['refreshToken'] = $refreshToken;
    $query = "UPDATE `users` SET `refreshToken`=:refreshToken WHERE mail=:user";
    $hasValidCredentials = $db->writeDBNotStoredProcedure($query, $arr2);

    // Creates Secure Cookie with refresh token
    // httpOnly: true, secure: true
        setcookie("Home_RefreshToken", $refreshToken, time() + 2 * 24 * 60 *60, '/');
        $_COOKIE["Home_RefreshToken"] = $refreshToken;
    
    // Encode the array to a JWT string.
	echo json_encode(
            array(
                "message" => "Successful login.",
                "accessToken" => $accessToken,
                "roles" => "2001",
                "refreshToken" => $refreshToken,
                "user" => $username,
                "expireAt" => $expireAccess,

            ));
}

else {
	 echo json_encode(array("message" => "Login failed."
    , 
"pass" => $arr['password']));
}


?>

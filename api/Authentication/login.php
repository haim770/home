<?php
require_once 'jwt/src/JWT.php';
require_once 'jwt/src/SignatureInvalidException.php';
require_once 'jwt/src/BeforeValidException.php';
require_once 'jwt/src/ExpiredException.php';
require_once 'jwt/src/JWK.php';

$DH = "../Authentication/DiffiHelman/createSharedKey.php";
require_once(dirname(__FILE__) . DIRECTORY_SEPARATOR . $DH);

use \Firebase\JWT\JWT;

$username = $DATA_OBJ->params->user;
$pass = $DATA_OBJ->params->pwd;

// Validate the credentials against a database, or other data store.
// ...
// For the purposes of this example, we'll assume that they're valid
$arr = [];

$arr['password'] = $pass;
$arr['user'] = $username;
//lidor's
$query = "getUserByMailAndPassword(:user,:password)";
$hasValidCredentials = $db->readDB($query, $arr);
//end of lidors
//my take to make it work with hash
$arr=[];
$arr['mail']=$username;
$query="select * from users where mail = '{$arr['mail']}'";
$hasValidCredentials = $db->readDBNoStoredProcedure($query);
//need to ask lidor if thinks it is good
if (is_array($hasValidCredentials)&&password_verify($pass,$hasValidCredentials[0]->password)) {
    // get user details
    $arr2 = [];
    $arr2['user'] = $username;
    $query = "SELECT * FROM `users` WHERE `mail` =:user";
    $foundUser = $db->readDBNoStoredProcedure($query, $arr2);

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
            'role' => $foundUser[0]->rule,          // User permissions on site
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
        'HS256',           // Algorithm used to sign the token, see https://tools.ietf.org/html/draft-ietf-jose-json-web-algorithms-40#section-3
    );
    $refreshToken  = JWT::encode(
        $refreshTokenData,      //Data to be encoded in the JWT
        $refreshKey, // The signing key
        'HS256',    // Algorithm used to sign the token, see https://tools.ietf.org/html/draft-ietf-jose-json-web-algorithms-40#section-3
    );

    // This method will write the refreshToken of the user to the database.
    $arr2=array();
    $arr2['user'] = $username;
    $arr2['refreshToken'] = $refreshToken;
    $arr2['sharedKey'] = $sharedSecretKey_Bob;
    $query = "UPDATE `users` SET `refreshToken`=:refreshToken, `privateSharedKey`=:sharedKey  WHERE mail=:user";
    $hasValidCredentials = $db->writeDBNotStoredProcedure($query, $arr2);

    // Encode the array to a JWT string.
	echo json_encode(
            array(
                "message" => "Successful login.",
                "accessToken" => $accessToken,
                "roles" => $foundUser[0]->rule,
                "refreshToken" => $refreshToken,
                "user" => $username,
                "firstName" => $foundUser[0]->first_name,
                "lastName" => $foundUser[0]->last_name,
                "expireAt" => $expireAccess,
                'publicKey' => $bobPublicKey,             
            ));
}

else {
	 echo json_encode(array("message" => "Login failed."
    , 
"pass" => $arr['password']));
}


?>
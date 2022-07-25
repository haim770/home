<?php
// get authTest file
$authPath = "../../Authentication/authTest.php";
include_once(dirname(__FILE__) . DIRECTORY_SEPARATOR . $authPath);
$arr = []; //for global scope var
// our uuid
$arr["alice"] = $user->getUuid();



// --------- REGEX ----------- //
$NAME_REGEX ="/^[\u{0590}-\u{05fe}a-zA-Z][^0-9_!¡?÷?¿+=@#$%ˆ&*|~<>;:]{1,}$/";
$PWD_REGEX = "/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/";
$PHONE_REGEX = "/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/";

// -------- INPUTS ----------- //
$firstName = $DATA_OBJ->params->firstName;
$lastName = $DATA_OBJ->params->lastName;
$phoneNumber = $DATA_OBJ->params->phoneNumber;
$user = $DATA_OBJ->params->user;
$pwd = $DATA_OBJ->params->pwd;
$matchPwd = $DATA_OBJ->params->matchPwd;
$validOldPass = $DATA_OBJ->params->confirmOldPass;

// -------- CHECK INPUTS ----------- //
// check old password match
$query = "select * from users where uuid =:alice";
$hasValidCredentials = $db->readDBNoStoredProcedure($query,$arr);
// check if we have response and our password match
if (!(is_array($hasValidCredentials) && password_verify($validOldPass, $hasValidCredentials[0]->password)))
{
    echo json_encode(
        array(
            "err" => "Old password wrong",
            "type" => "Incorrect permissions"
        )
        );    
    header('HTTP/1.1 401 Unauthorized');
    exit;
}

// check if user enter new password
if (!(strlen($pwd) === 0 && empty($pwd))) {
    // test regex
    if(!preg_match($PWD_REGEX, $pwd)){
    echo json_encode(
        array(
            "err" => "Password does not meet the criteria of the site",
            "type" => "I'm a teapot"
        )
    );
    header('HTTP/1.0 412 Precondition Failed');
    exit;
    }
    // test match passwords
    if ($pwd !== $matchPwd) {
        echo json_encode(
            array(
                "err" => "Password not match",
                "type" => "I'm a teapot"
            )
        );
        header('HTTP/1.0 412 Precondition Failed');
        exit;
    }
}
// check first name, last name, phone number
if((!preg_match($NAME_REGEX, $firstName)) || (!preg_match($NAME_REGEX, $lastName)) || (!preg_match($PHONE_REGEX, $phoneNumber))){
    echo json_encode(
        array(
            "err" => "User info wrong",
            "type" => "I'm a teapot"
        )
    );
    header('HTTP/1.0 412 Precondition Failed');
    exit;
}

// -------- UPDATE DATA ----------- //
unset($arr['mail']);
$arr['firstname'] = $firstName;
$arr['lasttname'] = $lastName;
$arr['phonenumber'] = $phoneNumber;
// update password if user change it
if (strlen($pwd) !== 0 && !empty($pwd)) {
    // create password
    $arr['passwordhash'] = password_hash($DATA_OBJ->params->password, PASSWORD_DEFAULT);
    $query = "UPDATE `users` SET `first_name`=:firstname,`last_name`=:lasttname,`phone`=:phonenumber,`password`=:passwordhash WHERE `uuid` =:alice";
}
else {
    $query = "UPDATE `users` SET `first_name`=:firstname,`last_name`=:lasttname,`phone`=:phonenumber WHERE `uuid` =:alice";
}
$db->writeDBNotStoredProcedure($query, $arr);

echo json_encode(
    array(
        "message" => "success",
    )
);
die;

<?php
$email = $DATA_OBJ->params->userMail ?? "null";
$token = $DATA_OBJ->params->token ?? "null";
$email = filter_var($email, FILTER_SANITIZE_EMAIL); // Remove all illegal characters from an email address:
$email = filter_var($email, FILTER_VALIDATE_EMAIL); // Check if the variable $email is a valid email address:
$pwd = $DATA_OBJ->params->pwd ?? "null";
$matchPwd = $DATA_OBJ->params->matchPwd ?? "null";

// --------- REGEX ----------- //
$PWD_REGEX = "/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/";

if (!$email) {
    $info = (object)[];
    $info->isValid = "false";
    echo json_encode($info);
    exit;
}

// check if user enter new password
if (!(strlen($pwd) === 0 && empty($pwd))) {
    // test regex
    if (!preg_match($PWD_REGEX, $pwd)) {
        header('HTTP/1.0 412 Precondition Failed');
        exit;
    }
    // test match passwords
    if ($pwd !== $matchPwd) {
        header('HTTP/1.0 412 Precondition Failed');
        exit;
    }
}

// check the values from url.
// if valid retrun the Expiration date else false.
if(!checkRecoveryTokenMail($email, $token)){
    header('HTTP/1.0 412 Precondition Failed');
    exit;
}

// -------- UPDATE DATA ----------- //
// create password
$arr['passwordhash'] = password_hash($pwd, PASSWORD_DEFAULT);
$arr['userMail']= $email;
$query = "UPDATE `users` SET `password`=:passwordhash WHERE `mail` =:userMail";
$db->writeDBNotStoredProcedure($query, $arr);

// check if new password was update succsess
$arr2 = [];
$arr2['mail'] = $email;
$query = "select * from users where mail = '{$arr2['mail']}'";
$hasValidCredentials = $db->readDBNoStoredProcedure($query);
//need to ask lidor if thinks it is good
if (is_array($hasValidCredentials) && password_verify($pwd, $hasValidCredentials[0]->password)) {
    // disable the password change token
    $curDate = date("Y-m-d H:i:s");
    $query = "UPDATE password_recovery SET exp_date=:expDate WHERE userMail=:userMail";
    $data = false;
    $data['expDate'] = $curDate;
    $data['userMail'] = $email;
    $db->writeDBNotStoredProcedure($query, $data);
echo json_encode(
    array(
        "message" => "success",
    )
);
die;
}
else {
    header('HTTP/1.0 412 Precondition Failed');
    exit;
}
/**
 * Method checkRecoveryTokenMail check if the mail and token key are vaild and the 
 * exp date is also valid.
 * if user mail and token fond and the date didnt passed then return true.
 * 
 * @param $mail - user email
 * @param $tokenKey - user token key
 * @return true if all data is valid.
 */

function checkRecoveryTokenMail($mail, $tokenKey)
{
    global $db;
    $arr["userMail"] = $mail;
    $arr["token"] = $tokenKey;
    $curDate = date("Y-m-d H:i:s"); // set server current time.
    $query = "SELECT exp_date FROM password_recovery WHERE userMail =:userMail and token =:token";
    $result = $db->readDBNoStoredProcedure($query, $arr);
    if ($result != null)
        // retrun the recovery mail Expiration date
        return $result[0]->exp_date > $curDate;
    else
        return false;
}
?>

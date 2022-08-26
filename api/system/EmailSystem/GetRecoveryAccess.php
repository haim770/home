<?php

$email = $DATA_OBJ->params->email ?? "null";
$token = $DATA_OBJ->params->token ?? "null";
$email = filter_var($email, FILTER_SANITIZE_EMAIL); // Remove all illegal characters from an email address:
$email = filter_var($email, FILTER_VALIDATE_EMAIL); // Check if the variable $email is a valid email address:
$curDate = date("Y-m-d H:i:s");

if (!$email) {
    $info = (object)[];
    $info->isValid="false";
    echo json_encode($info);
    exit;
} else {
    // check the values from url.
    // if valid retrun the Expiration date else false.
    $val = checkRecoveryTokenMail($email, $token);
    if ($val) {
        $info = (object)[];
        $info->isValid = "true";
        echo json_encode($info);
        exit;
    }
    $info = (object)[];
    $info->isValid = "false";
    echo json_encode($info);
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

	function checkRecoveryTokenMail($mail, $tokenKey) {
        global $db;
        $arr["userMail"]= $mail;
        $arr["token"] = $tokenKey;
		$curDate = date("Y-m-d H:i:s"); // set server current time.
        $query= "SELECT exp_date FROM password_recovery WHERE userMail =:userMail and token =:token";
		$result = $db->readDBNoStoredProcedure($query, $arr);
		if ($result != null)
			// retrun the recovery mail Expiration date
			return $result[0] > $curDate;
		else
			return false;
	}


?>
<?php


$email = $DATA_OBJ->params->resetMail ?? "null";
$email = filter_var($email, FILTER_SANITIZE_EMAIL); // Remove all illegal characters from an email address:
$email = filter_var($email, FILTER_VALIDATE_EMAIL); // Check if the variable $email is a valid email address:

if (!$email) {
    $info = (object)[];
    $info->isValid = "false";
    echo json_encode($info);
    exit;
}
	/**
	 * Method createTmpRecovery will create users temp token with exp date.
	 * @param $mail - mail we want to create recovery page for.
	 */

	function createTmpRecovery($mail)
	{
        global $db;
		$length = 16; // Adjust length to fit your new paranoia level. 16 is probably a sane default and the same length as md5 (if you are migrating from a method that uses it)
		// random_bytes — Generates cryptographically secure pseudo-random bytes.
		$token = bin2hex(random_bytes($length)); // bin2hex output is url safe.
		// H - Hour, i - Min , s - Second
		// also add the time we want to current date time
		$expFormat = mktime(
			date("H"),
			date("i"),
			date("s"),
			date("m"),
			date("d") + 1,
			date("Y")
		);
		$expDate = date("Y-m-d H:i:s", $expFormat);

		// inset into our database the email, token, exp date, if exist, update them to the new token and exp date.
		$query = "INSERT INTO password_recovery values(id,:userMail,:token,:exp_date) ON DUPLICATE KEY UPDATE
		token   = VALUES(token),
		exp_date = VALUES(exp_date)";
		$data = false;
		$data['userMail'] = $mail;
		$data['token'] = $token;
		$data['exp_date'] = $expDate;
        $db->writeDBNotStoredProcedure($query, $data);

		// send use recovery mail.
		sendRecoveryMail($mail, $token);
	}


    function sendRecoveryMail($userMail, $token)
    {
        //sends recovery mail to user
        $to_email = $userMail;
        $subject = "מייל שחזור סיסמה לאתר Home";
        $body = "<p>משתמש יקר,</p>";
        $body .= "<p>אנא לחץ על הקישור המצורף על מנת לשחזר את הסיסמה שלך</p>";
        $body .= "<p>-------------------------------------------------------------</p>";
        $body .= '<p><a href="http://localhost:3000/Recovery?key='. $token.'&email='. $userMail.'" target="_blank">לשחזור לחץ כאן</a></p>';
        /*
        MIME-Version: 1.0 needed for:
        Text in character sets other than ASCII
        Non-text attachments
        Message bodies with multiple parts
        Header information in non-ASCII character set
        */
        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n"; // must have to make the email at html format.
        $headers .= "From: servicelhproj@gmail.com";

        if (mail($to_email, $subject, $body, $headers)) {
            echo " $to_email הודעת שחזור נשלחה בהצלחה ל";
        } else {
            echo "Email sending failed...";
        }
    }


createTmpRecovery($email)

?>
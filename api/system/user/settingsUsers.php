<?php
// get authTest file
$authPath = "../../Authentication/authTest.php";
include_once(dirname(__FILE__) . DIRECTORY_SEPARATOR . $authPath);

// test if user is admin
if($user->getRule() == "5150"){
    $query = "SELECT `uuid`, `first_name`, `last_name`, `phone`, `mail`, `create_time`, `password`, `last_seen`, `prompt`, `rule`, `remaining_ads` from users";
    echo json_encode(
        array(
            "message" => "users",
            "result" => $db->readDBNoStoredProcedure($query, $arr),
        )
    );
    die;
}

else {
    echo json_encode(
        array(
            "message" => "Error",
            "result" => "You got no permission to get this data",
        )
    );
    die;
}
?>

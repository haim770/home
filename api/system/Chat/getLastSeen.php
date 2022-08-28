<?php
// get authTest file
$authPath = "../../Authentication/authTest.php";
include_once(dirname(__FILE__) . DIRECTORY_SEPARATOR . $authPath);


$arr = []; //for global scope var
// user we chat with uuid
$query = "SELECT * from users where uuid = :chatWith";
$arr['chatWith'] = $DATA_OBJ->params->chatWith ?? "null";
$last_seen = ($db->readDBNoStoredProcedure($query, $arr))[0]->last_seen;

function seen_status($date)
{
    $rtnStr = "מחובר/ת";
    // if user is offline check if last time seen is today, if today display only the hour 
    if (check_if_onlice($date)) {
        $rtnStr = "נראה לאחרונה ";
        if (check_if_today(strtotime($date))) {
            $rtnStr .= date("H:i", strtotime($date));
        } else {
            $rtnStr .= date("d-m-Y H:i", strtotime($date));
        }
    }
    return $rtnStr;
}

/**
 * check if user is online, check 4 second from now if not seen
 * return online or last time seen
 */
function check_if_onlice($date)
{
    $expFormat = mktime(
        date("H"),
        date("i"),
        date("s") - 8,
        date("m"),
        date("d"),
        date("Y")
    );
    $expDate = date("Y-m-d H:i:s", $expFormat);

    // if user is offline check if last time seen is today, if today display only the hour 
    return $expDate > $date;
}

/**
 * check if message sent today
 */
function check_if_today($date)
{
    $curDate = date("Y-m-d");
    $expDate = date("Y-m-d", $date);
    return $expDate == $curDate;
}

$info = (object)[];
$info->last_seen = seen_status($last_seen);
echo json_encode($info);
die;

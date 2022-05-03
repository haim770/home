<?php
//error_reporting(E_ALL);
//ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

// use to capture the data we get from client side
// we use this way and not with POST or GET becuse if we want to use it with POST or GET we need to 
// format our data before sending it to the server.
$DATA_RAW = file_get_contents("php://input");

/**
 * json_decode(json) => PHP =  EQUAL => JSON.parse()     ==> Convert Array to Object
 * json_encode(value) => PHP = EQUAL => JSON.strinfigy() ==> Convert Object to Array
 */
$DATA_OBJ = json_decode($DATA_RAW);

$error = "";
$dataType = $_POST["data"];

require_once('../api/system/classes/useDBs.php');
$db = dbClass::GetInstance();

$arr=[];
if ($dataType == "ads") 
    getAllAds();
if($dataType=="getSelectedAdByIdAndCity"
){
getSelectedAdByIdAndCity();
}

// select city from ads where adID =:adIDd
function getSelectedAdByIdAndCity(){
    global $db;
    global $arr;
    $arr['id']=1;
    $arr['city']="haifa";
    $query = "getSelectedAdById(:id,:city)";
    print_r(json_encode($db->readDB($query,$arr)));
}
function getAllAds(){
    global $db;
    global $arr;
    $query = "getAdsTable";
   print_r(json_encode($db->readDB($query,$arr)));
}

// proccess the data
if (isset($DATA_OBJ->data_type) && $DATA_OBJ->data_type == "TEST") {
    echo "TEST WORKED";
} else // proccess the data - Contact
    if (isset($DATA_OBJ->data_type) && $DATA_OBJ->data_type == "contacts") {
        include("contact.php");
    } else // proccess the data - Chat
        if (isset($DATA_OBJ->data_type) && $DATA_OBJ->data_type == "chat") {
            include("chat.php");
        } else // proccess the data - settings
            if (isset($DATA_OBJ->data_type) && $DATA_OBJ->data_type == "settings") {
                include("settings.php");
            }

// proccess the data - send message
if (isset($DATA_OBJ->data_type) && $DATA_OBJ->data_type == "send_message") {
    include("send_message.php");
}

// proccess the data - get_last_message
if (isset($DATA_OBJ->data_type) && $DATA_OBJ->data_type == "get_last_message") {
    include("get_last_message.php");
}

// proccess the data - refresh data
if (isset($DATA_OBJ->data_type) && $DATA_OBJ->data_type == "refresh") {
    include("refresh.php");
}

// proccess the data - download chat data
if (isset($DATA_OBJ->data_type) && $DATA_OBJ->data_type == "download_data") {
    include("data_download.php");
}

// proccess the data - user settings
if (isset($DATA_OBJ->data_type) && $DATA_OBJ->data_type == "user_settings") {
    include("user_settings_update.php");
}




// function to return bob message template(other msg)
function bob_message($data)
{
    $msgID = "msg" . $data->getMsgId();
    $a = "<div class='bob_message' id='$msgID'>
        <p>{$data->getMessage()}</p>";
    /*if message sent today dont show date*/
    if (check_if_today(strtotime($data->getdateMsg())))
        $a .= "<span>" . date("H:i", strtotime($data->getdateMsg())) . "</span></div>";
    else
        $a .= "<span>" . date("d-m-y H:i", strtotime($data->getdateMsg())) . "</span></div>";
    return $a;
}

// function to return alice message template(us msg)
function alice_message($data)
{
    $msgID = "msg" . $data->getMsgId();
    $seenStatus = $data->getMsgId();
    $viewstats = $data->getSeen() +  $data->getRecieved(); // 
    $a = "<div class='alice_message' id='$msgID'>
        <p>{$data->getMessage()}</p>
        <div class='alice_container'>";
    /*if message sent today dont show date*/
    if (check_if_today(strtotime($data->getdateMsg())))
        $a .= "<span>" . date("H:i", strtotime($data->getdateMsg())) . "</span>";
    else
        $a .= "<span>" . date("d-m-y H:i", strtotime($data->getdateMsg())) . "</span>";

    /**
     * 0 - not recieved   --> one tick
     * 1 - only recieved  --> grey tick
     * 2 - seen           --> blue tick
     */

    switch ($viewstats) {
        case 0:
            $a .= "<img id='$seenStatus' src='ui/images/onetick.png'>
             </div></div>";
            break;
        case 1:
            $a .= "<img id='$seenStatus' src='ui/images/tick_grey.png'>
             </div></div>";
            break;
        case 2:
            $a .= "<img id='$seenStatus' src='ui/images/tick.png'>
             </div></div>";
            break;
    }



    return $a;
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

/**
 * check if user is online, check 4 second from now if not seen
 * return online or last time seen
 */
function check_if_onlice($date)
{
    $expFormat = mktime(
        date("H"),
        date("i"),
        date("s") - 4,
        date("m"),
        date("d"),
        date("Y")
    );
    $expDate = date("Y-m-d H:i:s", $expFormat);

    // if user is offline check if last time seen is today, if today display only the hour 
    return $expDate > $date;
}

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


// function to return user we chat with 
function user_contact($data, $last)
{
    // build user name
    $a = "<div class='user_name' id='user_name_chat_with' style='font-size:1.3rem'>
        <p style='margin-block-end: 0.1em; margin-block-start: 0.1em;'>$data</p></div>";
    // build last seem
    $a .= "<div class='lase_seem' id='user_name_last_seem' style='color: #667781; font-size:1rem;'>
            <span>$last</span></div>";

    return $a;
}

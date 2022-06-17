<?php
// get authTest file
$authPath = "../../Authentication/authTest.php";
include_once(dirname(__FILE__) . DIRECTORY_SEPARATOR . $authPath);
$arr = array();
// test if user is admin
if($user->getRule() == "5150"){
    $query = "SELECT `uuid`, `first_name`, `last_name`, `phone`, `mail`, `create_time`, `password`, `last_seen`, `prompt`, `rule`, `remaining_ads` from users";
    $result = $db->readDBNoStoredProcedure($query, $arr);
    $users=array();
    foreach($result as $data){
        $arr2['uuid'] = $data->uuid;
        $queryAds = "SELECT ads.adID, ads.create_time, ads.user_id, ads.active, ads.watch, ads.expire_date, ads.approval_status FROM ads WHERE user_id =:uuid";
        $queryPurchased = "SELECT purchase_history.purchase_id, purchase_history.packageId, purchase_history.userId, purchase_history.purchase_time, purchase_history.price FROM purchase_history WHERE userId =:uuid";

        $resAds = $db->readDBNoStoredProcedure($queryAds, $arr2);
        $resPurchased = $db->readDBNoStoredProcedure($queryPurchased, $arr2);
        array_push($users,array($data, "ads"=> $resAds, "purchase"=> $resPurchased ));
    }
    
    echo json_encode(
        array(
            "message" => "users",
            "result" => $users,
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

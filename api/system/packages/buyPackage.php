<?php 
// get authTest file
$authPath = "../../Authentication/authTest.php";
include_once(dirname(__FILE__) . DIRECTORY_SEPARATOR . $authPath);


function buyPack(){
  global $db;
  global $DATA_OBJ;
  global $arr;
  global $user;
  $arr=[];
  $purchase_id=uniqid();
  $packageId=$DATA_OBJ->params->package_id;
  $userId=$user->getUuid();
  $adValue=$DATA_OBJ->params->adValue;
  $price=$DATA_OBJ->params->price;
  $queryAddPackToUser="INSERT INTO purchase_history (purchase_id, packageId, userId, price) VALUES ('$purchase_id', '$packageId','$userId', '$price')";
  $queryAddUserAdsValue="UPDATE users SET remaining_ads ='55' WHERE uuid  = '$userId'";
  $result=$db->readDBNoStoredProcedure($queryAddUserAdsValue);
  echo json_encode($result);
  $result=$db->readDBNoStoredProcedure($queryAddPackToUser);
  echo json_encode($result);
}
?>
<?php 
// get authTest file
$authPath = "../../Authentication/authTest.php";
include_once(dirname(__FILE__) . DIRECTORY_SEPARATOR . $authPath);
global $user;
global $db;
function getPackageById(){
  //get package by id
  
  global $db;
  global $DATA_OBJ;
  global $arr;
  global $user;
  $packId=$DATA_OBJ->params->packId;
  $query="select * from package  where packageId='$packId'";
  $result=$db->readDBNoStoredProcedure($query);
  if(isset($result)&&is_array($result)){
    echo json_encode($result);
  }
  else{
    echo "not authorized";
  }
}
function buyPack(){
  //purchase package after pay in  paypl
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
  $msgId=uniqid();
  $content=" רכשת חבילה מספר ".$packageId." במחיר ".$price;
  $queryAddPackToUser="INSERT INTO purchase_history (purchase_id, packageId, userId, price) VALUES ('$purchase_id', '$packageId','$userId', '$price')";
  $queryAddUserAdsValue="UPDATE users SET remaining_ads ='55' WHERE uuid  = '$userId'";
  $result=$db->readDBNoStoredProcedure($queryAddUserAdsValue);
  $result=$db->readDBNoStoredProcedure($queryAddPackToUser);
  $result= $db->createSystemMessage( $content, $userId, 'purchase', 'Success');
  echo json_encode($result);
}
?>
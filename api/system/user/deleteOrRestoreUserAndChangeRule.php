<?php

function changeRemainingAdsInDb(){
  global $db;
  global $DATA_OBJ;

    $query="UPDATE users SET remaining_ads = '{$DATA_OBJ->params->remainingAds}' WHERE  mail = '{$DATA_OBJ->params->mail}'";

  
  $result=$db->readDBNoStoredProcedure($query);
  $query=$query="select remaining_ads from users WHERE  mail = '{$DATA_OBJ->params->mail}'";
  $result=$db->readDBNoStoredProcedure($query);
  if($result[0]->remaining_ads==$DATA_OBJ->params->remainingAds){
echo json_encode("changed remaining ads");
die;
}
echo json_encode("failed changed remaining ads");
die;
}
function changeRule(){
  //change rule of user
  global $db;
  global $DATA_OBJ;
  if($DATA_OBJ->params->rule==2001){
    $query="UPDATE users SET rule = '5150' WHERE  mail = '{$DATA_OBJ->params->mail}'";
  }
  else{
    $query="UPDATE users SET active = '2001' WHERE  mail = '{$DATA_OBJ->params->mail}'";
  }
  $result=$db->readDBNoStoredProcedure($query);
  $query=$query="select rule from users WHERE  mail = '{$DATA_OBJ->params->mail}'";
  $result=$db->readDBNoStoredProcedure($query);
  if($result!=$DATA_OBJ->params->rule){
echo json_encode("changed rule of user");
die;
}
echo json_encode("failed changed rule of user");
die;
}
function deleteOrRestoreUser(){
  //selete or restore user active change
  global $db;
  global $DATA_OBJ;
  if($DATA_OBJ->params->active==1){
    $query="UPDATE users SET active = '0' WHERE  mail = '{$DATA_OBJ->params->mail}'";
  }
  else{
    $query="UPDATE users SET active = '1' WHERE  mail = '{$DATA_OBJ->params->mail}'";
  }
  $result=$db->readDBNoStoredProcedure($query);
  $query=$query="select active from users WHERE  mail = '{$DATA_OBJ->params->mail}'";
  $result=$db->readDBNoStoredProcedure($query);
  if($result!=$DATA_OBJ->params->active){
echo json_encode("changed active status");
die;
}
echo json_encode("failed changed active status");
die;
}
$authPath = "../../Authentication/authTest.php";
include_once(dirname(__FILE__) . DIRECTORY_SEPARATOR . $authPath);
if($user->getRule() == "5150"){
if($DATA_OBJ->data_type=="deleteOrRestoreUser")
deleteOrRestoreUser();
else{
  if($DATA_OBJ->data_type=="changeUserRule"){
    changeRule();
  }
  else{
    if($DATA_OBJ->data_type=="changeRemainingAdsInDb"){
      changeRemainingAdsInDb();
    }
  }
}
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
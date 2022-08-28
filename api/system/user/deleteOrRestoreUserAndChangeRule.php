<?php

function changeRemainingAdsInDb(){
  global $db;
  global $DATA_OBJ;
  $query="UPDATE users SET remaining_ads = '{$DATA_OBJ->params->remainingAds}' WHERE  mail = '{$DATA_OBJ->params->mail}'";
  $result=$db->readDBNoStoredProcedure($query);
  $query="select remaining_ads from users WHERE mail = '{$DATA_OBJ->params->mail}'";
  $result=$db->readDBNoStoredProcedure($query);
  echo json_encode($result);
  if($result==[]||$result==false||$result==""){
    echo json_encode("failed");
    die;
  }
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
function changeMailInDb(){
  //change mail of user by manager
  global $db;
  global $DATA_OBJ;
  $newMail=$DATA_OBJ->params->newMail;
  $oldMail=$DATA_OBJ->params->mail;
  $query="UPDATE users SET mail = '$newMail' WHERE  mail = '$oldMail'";
  $result=$db->readDBNoStoredProcedure($query);
  $query="select * from users where mail='$newMail'";
  $result=$db->readDBNoStoredProcedure($query);
  if($result==false||$result==""||$result==[]){
    echo "failed";
  }
  else{
    echo "success";
  }

}
function changeUserMailByManager(){
  //change to a new mail by the manager
  global $db;
  global $DATA_OBJ;
  global $user;
  $oldMail=$DATA_OBJ->params->oldMail;
  $query="select * from users where mail='{$DATA_OBJ->params->newMail}'";
  $result=$db->readDBNoStoredProcedure($query);
  if($result!=""&&$result!=[]&&$result!=false){
    echo json_encode("mail exist");
    die;
  }
  else{
     $query="UPDATE users SET mail = '{$DATA_OBJ->params->newMail}' WHERE  mail = '{$oldMail}'";
      $result=$db->readDBNoStoredProcedure($query);
      echo json_encode($result);
      die;
  }
}
function getUserById(){
  //get user by id
  global $db;
  global $DATA_OBJ;
  $query="select * from users where uuid='{$DATA_OBJ->params->userId}'";
  $result=$db->readDBNoStoredProcedure($query);
  echo json_encode($result);
  die;
}
function deleteOrRestoreUser(){
  //selete or restore user active change
  global $db;
  global $DATA_OBJ;
  if($DATA_OBJ->params->active==1){
    $query="UPDATE users SET active = '0' WHERE  mail = '{$DATA_OBJ->params->mail}'";
    $queryForAdsDeactive="update ads set active='0' where user_id='{$DATA_OBJ->params->userId}'";
  }
  else{
    $query="UPDATE users SET active = '1' WHERE  mail = '{$DATA_OBJ->params->mail}'";
  }
  if(isset($queryForAdsDeactive)){
    $result=$db->readDBNoStoredProcedure($queryForAdsDeactive);
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
    else{
      if($DATA_OBJ->data_type=="changeMailInDb"){
        changeMailInDb();
      }
      else{
        if($DATA_OBJ->data_type=="getUserById"){
          getUserById();
        }
        else{
          if($DATA_OBJ->data_type=="changeUserMailByManager"){
            changeUserMailByManager();
          }
        }
      }
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
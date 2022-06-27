<?php
register();
function checkIfMailExist($mail){
  //check if mail exists
  global $db;
  $query="select * from users where mail = '$mail'";
  $result=$db->readDBNoStoredProcedure($query);
  if($result==''){
    return false;}
    return true;//mail exist

}
function getFreeAdsFromSettings(){
  global $db;
  $query="select * from settings limit 1";
  $result=$db->readDBNoStoredProcedure($query);
  return $result;
}
function register()
{
    global $db;
    global $arr;
    global $DATA_OBJ;
    $arr=[];
    if(checkIfMailExist($DATA_OBJ->params->mail)){
      echo "mail exist";
      die;
    }
    $arr['first_name'] =$DATA_OBJ->params->first_name;
    $arr['mail'] =$DATA_OBJ->params->mail;
    $arr['password'] = password_hash($DATA_OBJ->params->password, PASSWORD_DEFAULT);
    $arr['uuid'] = uniqid();
    $arr['last_name'] = $DATA_OBJ->params->last_name;
    $arr['phone'] = $DATA_OBJ->params->phone;
    $arr['refreshToken']="ds";
    $arr['rule']=$DATA_OBJ->params->rule;
    $arr['prompt']=$DATA_OBJ->params->prompt;
    $freeAds=getFreeAdsFromSettings()[0]->adsGift;
    $query="";
    $query= "INSERT INTO users (uuid, first_name, last_name, phone,mail,password, prompt,rule,refreshToken,remaining_ads) VALUES ('{$arr['uuid']}', '{$arr['first_name']}', '{$arr['last_name']}', '{$arr['phone']}','{$arr['mail']}','{$arr['password']}','{$arr['prompt']}','{$arr['rule']}','{$arr['refreshToken']}',$freeAds)";
    $result = $db->writeDBNotStoredProcedure($query);
    echo json_encode($result);
    $arr = [];
}


?>
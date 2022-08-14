<?php
// get authTest file
global $DATA_OBJ;
$authPath = "../../Authentication/authTest.php";
include_once(dirname(__FILE__) . DIRECTORY_SEPARATOR . $authPath);
global $user;
global $db;
function getAllPurchasesForUser(){
//get all purchases for user
 global $db;
  global $DATA_OBJ;
  global $user;
  if($user->getRule()!="2001"&&$user->getRule()!="5150"){
     header('HTTP/1.1 401 Unauthorized');
    exit;
  }
  $uuid=$user->getUuid();
    $query = "SELECT `purchase_id`as id,`userId` as user, `packageId` as pack_id, `purchase_time` as purchase_date, `price` as value  FROM `purchase_history` where userId='$uuid' order by purchase_time DESC";
    $result=$db->readDBNoStoredProcedure($query);
    if(is_array($result)){
      $arrUserMostCountBuy=[];//array for count all users purchases
      $arrPacksMostCountBuy=[];//array for count all users purchases
      $sum=0;
      $count=0;
    for ($i=0; $i < count($result); $i++) { 
      //find user with most purchases and total sum and count and most wanted pack
      if(isset($arrPacksMostCountBuy[$result[$i]->pack_id])){
        $arrPacksMostCountBuy[$result[$i]->pack_id]+=1;
      }
      else{
        $arrPacksMostCountBuy[$result[$i]->pack_id]=1;
      }
      if(isset($arrUserMostCountBuy[$result[$i]->user])){
        $arrUserMostCountBuy[$result[$i]->user]+=1;
      }
      else{
        $arrUserMostCountBuy[$result[$i]->user]=1;
      }
      $count+=1;
      $sum+=$result[$i]->value;
      $mostCountUser=0;//most packs buy by one user
      $userMost="";//the user who buy most packs
      $mostPackCounter=0;//pack that sold the most
      $packMost="";//pack that was sold the most
      //find most user buy
      foreach ($arrUserMostCountBuy as $key => $value){
        //find  value most purchases by 1 person
        if($value>$mostCountUser){
          $mostCountUser=$value;
        }
      }
      foreach ($arrUserMostCountBuy as $key => $value){
        //find users who buy most packs
        if($value>=$mostCountUser){
          $userMost=$userMost==""?$key:$userMost." , ".$key;
        }
      }
    }
    //find most pack
     foreach ($arrPacksMostCountBuy as $key => $value){
        //find  value most count packs purchases per pack
        if($value>$mostPackCounter){
          $mostPackCounter=$value;
        }
      }
      foreach ($arrPacksMostCountBuy as $key => $value){
        //find packid that purchased the most
        if($value>=$mostPackCounter){
          $packMost=$packMost==""?$key:$packMost." , ".$key;
        }
      }
  }
  else{
    $sum=0;
    $count=0;
    $userMost="אין רכישות";
    $packMost="אין רכישות";
  }
echo json_encode(
    array(
        "message" => "users",
        "result" => $result,
        "sum"=>$sum,
        "count"=>$count,
        "userMost"=>$userMost,
        "packMost"=>$packMost,
    )
);
die;
}
function getAllPurchases(){
  //get all purchases
  global $db;
  global $DATA_OBJ;
  global $user;
  if($user->getRule()!="5150"){
     header('HTTP/1.1 401 Unauthorized');
    exit;
  }
    $query = "SELECT `purchase_id`as id,`userId` as user, `packageId` as pack_id, `purchase_time` as purchase_date, `price` as value  FROM `purchase_history` order by purchase_time DESC";
    $result=$db->readDBNoStoredProcedure($query);
    if(is_array($result)){
      $arrUserMostCountBuy=[];//array for count all users purchases
      $arrPacksMostCountBuy=[];//array for count all users purchases
      $sum=0;
      $count=0;
    for ($i=0; $i < count($result); $i++) { 
      //find user with most purchases and total sum and count and most wanted pack
      if(isset($arrPacksMostCountBuy[$result[$i]->pack_id])){
        $arrPacksMostCountBuy[$result[$i]->pack_id]+=1;
      }
      else{
        $arrPacksMostCountBuy[$result[$i]->pack_id]=1;
      }
      if(isset($arrUserMostCountBuy[$result[$i]->user])){
        $arrUserMostCountBuy[$result[$i]->user]+=1;
      }
      else{
        $arrUserMostCountBuy[$result[$i]->user]=1;
      }
      $count+=1;
      $sum+=$result[$i]->value;
      $mostCountUser=0;//most packs buy by one user
      $userMost="";//the user who buy most packs
      $mostPackCounter=0;//pack that sold the most
      $packMost="";//pack that was sold the most
      //find most user buy
      foreach ($arrUserMostCountBuy as $key => $value){
        //find  value most purchases by 1 person
        if($value>$mostCountUser){
          $mostCountUser=$value;
        }
      }
      foreach ($arrUserMostCountBuy as $key => $value){
        //find users who buy most packs
        if($value>=$mostCountUser){
          $userMost=$userMost==""?$key:$userMost." , ".$key;
        }
      }
    }
    //find most pack
     foreach ($arrPacksMostCountBuy as $key => $value){
        //find  value most count packs purchases per pack
        if($value>$mostPackCounter){
          $mostPackCounter=$value;
        }
      }
      foreach ($arrPacksMostCountBuy as $key => $value){
        //find packid that purchased the most
        if($value>=$mostPackCounter){
          $packMost=$packMost==""?$key:$packMost." , ".$key;
        }
      }
  }
  else{
    $sum=0;
    $count=0;
    $userMost="אין רכישות";
    $packMost="אין רכישות";
  }
echo json_encode(
    array(
        "message" => "users",
        "result" => $result,
        "sum"=>$sum,
        "count"=>$count,
        "userMost"=>$userMost,
        "packMost"=>$packMost,
    )
);
die;
}
if($DATA_OBJ->data_type=="getAllPurchases"){
  getAllPurchases();
}
else{
  if($DATA_OBJ->data_type=="getAllPurchasesForUser"){
    getAllPurchasesForUser();
  }
}
?>
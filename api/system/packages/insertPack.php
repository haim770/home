<?php
global $DATA_OBJ;
$userType="";//guest or registered
if($DATA_OBJ->params->guest=="guest"){
    $userType="guest";
    }
else{
        //now we will populate the user object with the user that signed in
     $authPath = "../../Authentication/authTest.php";
      include_once(dirname(__FILE__) . DIRECTORY_SEPARATOR . $authPath);
    $userType= "registered";
}
global $user;
function editPack(){
        global $db;
    global $DATA_OBJ;
    global $arr;
    global $userType;
    global $user;
    // var_dump($DATA_OBJ);
     if($userType=="guest"){
    echo "not authorized";
    die;
  }
  if($user->getRule()!="5150"){
    //not registered
    echo "not autorized";
    die;
  }
    if($DATA_OBJ->params->price=='0'){
        echo  "false";
        return;
    }
    $packId= $DATA_OBJ->params->id;
    $price=$DATA_OBJ->params->price;
    $title=$DATA_OBJ->params->title;
    $content=$DATA_OBJ->params->content;
    $ad_value=$DATA_OBJ->params->ad_value;
    $is_active=$DATA_OBJ->params->is_active;
    $update_time= date('Y-m-d H:i:s');
    $query="UPDATE package SET price = '$price', ad_value = '$ad_value', title = '$title', content = '$content', price = '$price', is_active = '$is_active', update_time = '$update_time' WHERE packageId = '$packId'";
      $result = $db->readDBNoStoredProcedure($query);
    echo json_encode(findPack($packId)!=false);
    $arr=[];
}
function insertPack(){
    //insert package
    global $db;
    global $DATA_OBJ;
    global $arr;
    global $userType;
    global $user;
    // var_dump($DATA_OBJ);
     if($userType=="guest"){
    echo "not authorized";
    die;
  }
  if($user->getRule()!="5150"){
    //not registered
    echo "not autorized";
    die;
  }
    if(checkIfTitleOfPackExist($DATA_OBJ->params->title)!=[]||$DATA_OBJ->params->price=='0'){
        echo  "false";
        return;
    }
    $packId= uniqid();
    $price=$DATA_OBJ->params->price;
    $title=$DATA_OBJ->params->title;
    $content=$DATA_OBJ->params->content;
    $ad_value=$DATA_OBJ->params->ad_value;
    $query="INSERT INTO package (packageId,price,title,content,ad_value) VALUES ('$packId','$price','$title','$content','$ad_value')";
    $result = $db->readDBNoStoredProcedure($query);
    echo json_encode(findPack($packId)!=false);
    $arr=[];
}
function findPack($packId){
    //find if pack exist by id
    global $db;
    $query=" select * from package where packageId='$packId'";
    $result = $db->readDBNoStoredProcedure($query);
    return $result;
}
function checkIfTitleOfPackExist($title){
global $db;
$query="SELECT * FROM package WHERE title = '$title' and is_active = '1'";
$result=$db->readDBNoStoredProcedure($query,[]);
return $result;
}
function getPackages($selector){
    //get  packages by selector
     global $db;
    global $DATA_OBJ;
    global $arr;
    global $userType;
    global $user;
    // var_dump($DATA_OBJ);
     if($userType=="guest"){
    echo "not authorized";
    die;
  }
  if($user->getRule()!="5150"){
    //not registered
    echo "not autorized";
    die;
  }
    if($selector=="getActivePacks"){
         $query="select * from package where is_active='1'";
    }
    else{
        if($selector=="getNotActivePacks"){
         $query="select * from package where is_active='0'";
        }
        else{
            $query="select * from package";
        }
    }
    $result=$db->readDBNoStoredProcedure($query);
    if($result==false||$result==[]){
        echo json_encode([]);
        die;
    }
    $resultForTheTable=[];
    $objForRow=[];
    for ($i=0; $i <count($result) ; $i++) {
      //we split the msg content to report id and adId
    $packId=$result[$i]->packageId;
      $query="select COUNT(packageId) AS numOfPurchases FROM purchase_history where packageId= '$packId'";
      $numOfPurchases=$db->readDBNoStoredProcedure($query);
      $numOfPurchases=$numOfPurchases[0]->numOfPurchases;
      $query="select sum(price) AS sumOfPurchases FROM purchase_history where packageId='$packId'";
      $sumOfPurchases=$db->readDBNoStoredProcedure($query);
      $sumOfPurchases=$sumOfPurchases[0]->sumOfPurchases==NULL?0:$sumOfPurchases[0]->sumOfPurchases;
      $objForRow=array("id"=>$result[$i]->packageId,"price"=>$result[$i]->price,"is_active"=>$result[$i]->is_active=="1"?"כן":"לא","title"=>$result[$i]->title,"content"=>$result[$i]->content,"create_time"=>$result[$i]->create_time,"ad_value"=>$result[$i]->ad_value,"update_time"=>$result[$i]->update_time,"countPurchases"=>$numOfPurchases,"sumPurchases"=>$sumOfPurchases);
      // $objForRow=json_encode($objForRow);
      $resultForTheTable[$i]=$objForRow;
    }
    echo json_encode($resultForTheTable);
    die;

}
if($DATA_OBJ->data_type=="insertPack")
insertPack();
else{
    if($DATA_OBJ->data_type=="getPackages"){
        getPackages($DATA_OBJ->params->selector);//the param is for the search type
    }
    else{
        if($DATA_OBJ->data_type=="editPack"){
            editPack();
        }
    }
}
?>
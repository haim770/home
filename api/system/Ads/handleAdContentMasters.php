<?php
$userType="";//guest or registered
global $DATA_OBJ;
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
function getMastersForAdsContentForTheTable()
{
    //get masters from adcontent table
    global $db;
    global $DATA_OBJ;
    global $arr;
    global $user;
    global $userType;
     if($userType!="registered"||$user->getRule()!="5150"){
    echo "not authorized";
    die;
  }
  else{
    $userId= $user->getUuid();
    if($DATA_OBJ->params->selector=="getRentParams"){
  $query = "select * from ad_content where master = '1' and category= 'השכרה'";
    }
    else{
      if($DATA_OBJ->params->selector=="getBuyParams")
      {
  $query = "select * from ad_content where master = '1' and category='קנייה'";
      }
      else{
        $query = "select * from ad_content where master = '1'";
      }
    }
    $result=$db->readDBNoStoredProcedure($query);
    $resultForTheTable=[];
    $objForRow=[];
    if($result!=false){
    for ($i=0; $i <count($result) ; $i++) {
      //we split the msg content to report id and adId
      $typeOfVar=$result[$i]->max_value!=null||$result[$i]->min_value!=null?"numeric":"text";
      $objForRow=array("id"=>$result[$i]->element_id,"category"=>$result[$i]->category,"min_value"=>$result[$i]->min_value,"max_value"=>$result[$i]->max_value,"category"=>$result[$i]->category,"name"=>$result[$i]->name,"display_type"=>$result[$i]->display_type,"typeOfVar"=>$typeOfVar);
      // $objForRow=json_encode($objForRow);
      $resultForTheTable[$i]=$objForRow;
    }}
    else{
      $resultForTheTable=[];
    }
    echo json_encode($resultForTheTable);
    die;
  }
}
function checkIfNameOfParamExist($paramName,$id,$category){
  //check if param name exist already return true if exist
  global $db;
    global $DATA_OBJ;
    global $arr;
    $query="select * from ad_content where name= '$paramName' and element_id !='$id' and category ='$category'";
    $result=$db->readDBNoStoredProcedure($query);
    if($result==false||$result==[]){
      return false;//not exist
    }
    return true;//exist


}
function editParameterAds(){
  global $db;
    global $DATA_OBJ;
    global $arr;
    global $user;
    global $userType;
     if($userType!="registered"||$user->getRule()!="5150"){
    echo "not authorized";
    die;
  }
  if(checkIfNameOfParamExist($DATA_OBJ->params->paramName,$DATA_OBJ->params->element_id,$DATA_OBJ->params->category)){
    echo json_encode("param exist");
    die;
  }
  $query="UPDATE ad_content SET name = '{$DATA_OBJ->params->paramName}', free_text ='{$DATA_OBJ->params->paramName}', display_type ='{$DATA_OBJ->params->paramStyle}', category ='{$DATA_OBJ->params->category}', min_value ='{$DATA_OBJ->params->minValue}', max_value ='{$DATA_OBJ->params->maxValue}' WHERE element_id = '{$DATA_OBJ->params->element_id}'";
  $result=$db->readDBNoStoredProcedure($query);
  echo json_encode("edit was done");
  die;
}
function addNewMasterToAdContentTable()
{
    //add master parameter to adContent table its for manager only and will add new master
    //for adid 0
    global $db;
    global $DATA_OBJ;
    global $arr;
    global $user;
    global $userType;
     if($userType!="registered"||$user->getRule()!="5150"){
    echo "not authorized";
    die;
  }
    $arr['paramName'] = $DATA_OBJ->params->paramName;
    $arr['paramType'] = $DATA_OBJ->params->paramType;
    $elementId = uniqid();
    $query = "";
    if ($arr['paramType'] == "VARCHAR")
        $query = "INSERT into ad_content (element_id, adID,category,master,required,name,value,prevDisplay) VALUES(
        '$elementId','0','{$DATA_OBJ->params->category}','1','0','{$DATA_OBJ->params->paramName}','master','0')";
    if ($arr['paramType'] == "INT")
        $query = "INSERT into ad_content (element_id, adID,category,master,min_value,max_value,required,name,value,prevDisplay) VALUES(
        '$elementId','0','{$DATA_OBJ->params->category}','1','{$DATA_OBJ->params->minValue}','{$DATA_OBJ->params->maxValue}','0','{$DATA_OBJ->params->paramName}','master','0')";

    if ($arr['paramType'] == "DOUBLE")
        $query = "INSERT into ad_content (element_id, adID,category,master,min_value,max_value,required,name,value,prevDisplay) VALUES(
        '$elementId','0','{$DATA_OBJ->params->category}','1','{$DATA_OBJ->params->minValue}','{$DATA_OBJ->params->maxValue}','0','{$DATA_OBJ->params->paramName}','master','0')";
    $result = $db->writeDBNotStoredProcedure($query);
    $arr = [];
    echo json_encode($result);
}
if($DATA_OBJ->data_type=="getMastersForAdsContentForTheTable"){
getMastersForAdsContentForTheTable();
}
else{
  if($DATA_OBJ->data_type=="editParameterAds"){
    editParameterAds();
  }
  else{
    if($DATA_OBJ->data_type=="addNewMasterToAdContentTable"){
      addNewMasterToAdContentTable();
    }
  }
}
?>
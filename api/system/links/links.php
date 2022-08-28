<?php
$userType="";//guest or registered
global $DATA_OBJ;
global $db;
if($DATA_OBJ->guest=="guest"){
    $userType="guest";
    }
else{
        //now we will populate the user object with the user that signed in
     $authPath = "../../Authentication/authTest.php";
     include_once(dirname(__FILE__) . DIRECTORY_SEPARATOR . $authPath);
    $userType= "registered";
}
global $user;
function showAllLinks(){
  global $db;
  $query= "select * from links where status= 'active' order by create_time desc";
  $result=$db->readDBNoStoredProcedure($query);
  echo json_encode($result);
  die;
}
function checkIfLinkExist($link,$linkContent){
  //check if link exist returns true or false by link and content
  global $db;
  $query="select * from links where link='$link' and link_content='$linkContent'";
  $result=$db->readDBNoStoredProcedure($query);
  if($result==[]||$result==false){
    return false;
  }
  else{
    return true;
  }

}
function insertLink(){
  //create new link
  global $userType;
  global $user;
  if($userType!="registered"||$user->getRule()!="5150"){
    echo "not authorized";
    die;
  }
  global $db;
  global $DATA_OBJ;
  $userId=$user->getUuid();
  $linkId=uniqid();
  $linkContent=$DATA_OBJ->params->linkContent;
  $link=$DATA_OBJ->params->link;
  $query ="INSERT INTO links (linkId, userId, link_content, link, views, status) VALUES ('$linkId', '$userId', '$linkContent', '$link', '0', 'active')";
  $result=$db->readDBNoStoredProcedure($query);
  echo json_encode(checkIfLinkExist($link,$linkContent));
  die;
}
function checkIfLinkExistByLInkId($linkId){
  //check if link exist by linkId
global $db;
  $query="select * from links where linkId='$linkId' and status='active'";
  $result=$db->readDBNoStoredProcedure($query);
  if($result==[]||$result==false){
    return false;
  }
  else{
    return true;
  }
}
function deleteLink($linkId){
  //delete link
  global $userType;
  global $user;
  if($userType!="registered"||$user->getRule()!="5150"){
    echo "not authorized";
    die;
  }
  global $db;
  global $DATA_OBJ;
  $query="UPDATE links SET status ='deleted' WHERE linkId  = '$linkId'";
  $result=$db->readDBNoStoredProcedure($query);
  echo json_encode(!checkIfLinkExistByLInkId($linkId));
  die;

}
function editLink($linkId,$link,$linkContent){
  // edit link
   global $userType;
  global $user;
  if($userType!="registered"||$user->getRule()!="5150"){
    echo "not authorized";
    die;
  }
  global $db;
  global $DATA_OBJ;
  $query="UPDATE links SET status ='active', link ='$link', link_content='$linkContent' WHERE linkId  = '$linkId'";
  $result=$db->readDBNoStoredProcedure($query);
  echo json_encode(checkIfLinkExist($link,$linkContent));
  die;
}
if($DATA_OBJ->data_type=="getAllLinks"){
  showAllLinks();
}
else{
  if($DATA_OBJ->data_type=="insertLink"){
  insertLink();
}
else{
  if($DATA_OBJ->data_type=="deleteLink"){
  deleteLink($DATA_OBJ->params->linkId);
}
else{
   if($DATA_OBJ->data_type=="editLink"){
  editLink($DATA_OBJ->params->linkId,$DATA_OBJ->params->link,$DATA_OBJ->params->linkContent);
}
}
  
}
}
?>
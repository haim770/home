<?php
global $DATA_OBJ;
global $db;
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
function checkIfBlogIsClose($blogId){
  //check if blog is closed by his id
  global $db;
   $query="select * from blogs where  status = 'close' and blog_id = '{$blogId}'";
   $result=$db->readDBNoStoredProcedure($query);
   if($result==[]||$result==false){
    return false;
   }
   return true;
}
function deleteBlogById($blogId){
  //delete blog by id
  global $db;
  global $user;
  global $userType;
  if($userType=="guest"||$user->getRule()!="5150"){
    //not manager
    echo "not authorized";
    die;
  }
   $query="UPDATE blogs SET status = 'close' WHERE blog_id = '{$blogId}'";
   $result=$db->readDBNoStoredProcedure($query);
   echo json_encode(checkIfBlogIsClose($blogId));
   die;
}
if($DATA_OBJ->data_type=="deleteBlogById"){
  deleteBlogById($DATA_OBJ->params->blogId);
}
?>
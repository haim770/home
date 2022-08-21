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
function getCommentsForBlogId($blogId){
  //get all comments for blogId
  global $db;
  $query="select * from blogcomments where blogId='$blogId' and status= '1' order by create_time desc";
  $result=$db->readDBNoStoredProcedure($query);
  if($result==false){
    $result=[];
  }
  echo json_encode($result);
  die;
}
function submitComment(){
  //submit new comment
global $user;
global $db;
global $DATA_OBJ;
global $userType;
$userId="guest";
if($userType!="guest"){
  $userId=$user->getUuid();
}
$id=uniqid();
$blogId=$DATA_OBJ->params->blogId;
$title=$DATA_OBJ->params->title;
$content=$DATA_OBJ->params->content;
$query="INSERT INTO blogcomments (id,blogId,userId,title,content) VALUES ('$id','$blogId','$userId','$content','$title') ";
$result=$db->readDBNoStoredProcedure($query);
  echo json_encode($result);
  die;
}
function deleteComment($id){
  echo $blogId;
  //delete comment
  global $DATA_OBJ;
  global $userType;
  global $user;
  global $db;
  if($userType=="guest"||$user->getRule()!="5150"){
    echo "not authorized";
    die;
  }
   $query="UPDATE blogcomments SET status = '0' WHERE id = '{$id}'";
   $result=$db->readDBNoStoredProcedure($query);
     echo json_encode($result);
  die;

}
if($DATA_OBJ->data_type=="submitComment"){
  submitComment();
}
else{
  if($DATA_OBJ->data_type=="getCommentsForBlogId"){
    getCommentsForBlogId($DATA_OBJ->params->blogId);
  }
  else{
    if($DATA_OBJ->data_type=="deleteComment"){
      deleteComment($DATA_OBJ->params->id);
    }
  }
}

?>
<?php
require_once('<./useDBs.php');
enum queries :string{
  case getAllUsers="select * from users";
}

$db = new useDbs();
echo $db->readDBObj(q)
?>


if($dataType=='add parameter ads'){
    addParameterAds();
}
}
function addParameterAds(){
    global $db;
    global $arr;
    $arr['paramName']=$_POST['paramName'];
    $arr['paramType']=$_POST['paramType'];
    $query="ALTER TABLE ads ADD :paramName :paramType;"
    $result=$db->writeDBNotStoredProcedure($query,$arr);
    $arr=[];
	echo json_encode ($result);
}
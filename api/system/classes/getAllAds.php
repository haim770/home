<?php
require_once('useDBs.php');
$db = dbClass::GetInstance();
$arr=[];
print_r($db->readDB("getUsersTable",$arr));
?>
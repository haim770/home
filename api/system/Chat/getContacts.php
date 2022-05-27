<?php
// test user login
include("../../Authentication/authTest.php");

$arr = []; //for global scope var
$query = "SELECT firstName, lastName, uuid from users where uuid in (SELECT DISTINCT sender from messages where receiver = :alice UNION SELECT DISTINCT receiver from messages where sender = :alice)";
     
?>
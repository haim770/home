<?php
function getCountOfTotalAds(){
  //get total ads that where posted from the begining of the site 
global $db;
$query= "SELECT COUNT(adID) as total FROM ads";
$result=$db->readDBNoStoredProcedure($query);
return $result;
}
function getCountOfActiveAds(){
    //get total ads that where posted from the begining of the site that are active and not expired 
global $db;
$time=time();
$query= "SELECT COUNT(adID) as total FROM ads where active ='1' and expire_date>'$time'";
$result=$db->readDBNoStoredProcedure($query);
return $result;
}
function getCountOfBlogs(){
    //get total blogs that where posted from the begining of the site 
global $db;
$query= "SELECT COUNT(blog_id) as total FROM blogs";
$result=$db->readDBNoStoredProcedure($query);
return $result;
}
function getUsersConnectedToday(){
      //get total users that where connected today
global $db;
$yesterday=date('d.m.Y',strtotime("-1 days"));
$query= "SELECT COUNT(uuid) as total FROM users where  last_seen>'$yesterday'";
$result=$db->readDBNoStoredProcedure($query);
return $result;
}
function getUsersConnectedhisMonth(){
      //get total users that where connected this month we take month as 30 days period time
global $db;
$thisMonth=date('d.m.Y',strtotime("-30 days"));
$query= "SELECT COUNT(uuid) as total FROM users where  last_seen>'$thisMonth'";
$result=$db->readDBNoStoredProcedure($query);
return $result;
}
function getUsersConnectedThisWeek(){
  //get total users that where connected this week we take month as 30 days period time
global $db;
$thisWeek=date('d.m.Y',strtotime("-7 days"));
$query= "SELECT COUNT(uuid) as total FROM users where  last_seen>'$thisWeek'";
$result=$db->readDBNoStoredProcedure($query);
return $result;
}
function getUsersCount(){
  global $db;
  $query="select count(uuid) as total from users";
  $result=$db->readDBNoStoredProcedure($query);
  return $result;
}
function getAvgWatchPerAd(){
  //get avg watches on ad where the ad is active
  global $db;
  $query="select avg(watch) as total from ads where active='1'";
  $result=$db->readDBNoStoredProcedure($query);
  return $result;
}
function getFooterStats(){
  //get site stats to present at the footer
  $arr=[];
  $arr["getCountOfTotalAds"]=getCountOfTotalAds();
  $arr["countActiveAds"]=getCountOfActiveAds();
  $arr["getCountOfBlogs"]=getCountOfBlogs();
  $arr["getUsersConnectedToday"]=getUsersConnectedToday();
  $arr["getUsersConnectedThisWeek"]=getUsersConnectedThisWeek();
  $arr["getUsersConnectedhisMonth"]=getUsersConnectedhisMonth();
  $arr["getUsersCount"]=getUsersCount();
  $arr["getAvgWatchPerAd"]=getAvgWatchPerAd();
  echo json_encode($arr);
  die;
}
if($DATA_OBJ->data_type=="getFooterStats"){
getFooterStats();
}
?>
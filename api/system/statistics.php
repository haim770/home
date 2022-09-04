<?php
$userType="";//guest or registered
if($DATA_OBJ->guest=="guest"){
    $userType="guest";
    }
else{
        //now we will populate the user object with the user that signed in
     $authPath = "../Authentication/authTest.php";
     include_once(dirname(__FILE__) . DIRECTORY_SEPARATOR . $authPath);
    $userType= "registered";
}
global $user;
global $DATA_OBJ;
global $db;
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
function getCountOfBlogsThisMonth(){
    //get total blogs that where posted this month
global $db;
$thisMonth=date('y.m.d',time()-30*24*60*60);
$query= "SELECT COUNT(blog_id) as total FROM blogs where create_time >='$thisMonth'";
$result=$db->readDBNoStoredProcedure($query);
return $result;
}
function getUsersConnectedToday(){
      //get total users that where connected today
global $db;
$yesterday=date('y.m.d',time()-1*24*60*60);
$query= "SELECT COUNT(uuid) as total FROM users where  last_seen>'$yesterday'";
$result=$db->readDBNoStoredProcedure($query);
return $result;
}
function getUsersConnectedhisMonth(){
      //get total users that where connected this month we take month as 30 days period time
global $db;
$thisMonth=date('y.m.d',time()-30*24*60*60);
$query= "SELECT COUNT(uuid) as total FROM users where  last_seen>'$thisMonth'";
$result=$db->readDBNoStoredProcedure($query);
return $result;
}
function getUsersConnectedThisWeek(){
  //get total users that where connected this week we take month as 30 days period time
global $db;
$thisWeek=date('y.m.d',time()-7*24*60*60);
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
  $query="select avg(watch) as total from ads";
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
   foreach($arr as $key=>$value){
    if($value==""||$value==false||$value==[]){
     $arr[$key]["total"]=0;
    }
    
  }
  echo json_encode($arr);
  die;
}
function getTodaySales(){
  //return sum of sales today
global $db;
  $time=date('y.m.d',time());
  $query="select sum(price) as sum from purchase_history where DATE(purchase_time) >= '$time'";
  $result=$db->readDBNoStoredProcedure($query);
  if($result[0]->sum==null||$result[0]->sum==false){
  $result[0]->sum=0;
  }
  return $result;
}
function getMonthSales(){
   //return sum of sales month
  global $db;
   $time=date('y.m.d',time()-30*24*60*60);
  $query="select sum(price) as sum from purchase_history where DATE(purchase_time) >= '$time'";
  $result=$db->readDBNoStoredProcedure($query);
  if($result[0]->sum==null||$result[0]->sum==false){
  $result[0]->sum=0;
  }
  return $result;
}
function getWeekSales(){
   //return sum of sales week
  global $db;
  $time=date('y.m.d',time()-7*24*60*60);
  $query="select sum(price) as sum from purchase_history where DATE(purchase_time) >= '$time'";
  $result=$db->readDBNoStoredProcedure($query);
  if($result[0]->sum==null||$result[0]->sum==false){
  $result[0]->sum=0;
  }
  return $result;
}
function getSalesTarget(){
  //get sales target from site settings
  global $db;
  $query="select expectedProfit from settings";
  $result=$db->readDBNoStoredProcedure($query);
  if($result[0]->expectedProfit==null||$result[0]->expectedProfit==false){
  $result[0]->expectedProfit=0;
  }
  return $result;
}
function getSalesStats(){
  //get all sales stats and pass to js
   global $DATA_OBJ;
  global $user;
  global $userType;
  if($userType=="guest"||$user->getRule()!="5150"){
    header('HTTP/1.1 401 Unauthorized');
    exit;
  }
  $arr=[];
  $arr["todaySales"]=getTodaySales();
  $arr["monthSales"]=getMonthSales();
  $arr["weekSales"]=getWeekSales();
  $arr["target"]=getSalesTarget();
  foreach($arr as $key=>$value){
    if($value==""||$value==false||$value==[]){
      if($key=="target"){
        $arr[$key]["expectedProfit"]=0;
      }
      else{
       $arr[$key]["sum"]=0;}
    }
  }
  echo json_encode($arr);
}
function getUsersRegisteredLastMonth(){
  //count users that registered last month
   global $db;
   $time=date('y.m.d',time()-30*24*60*60);
  $query="select count(uuid) as count from users where create_time>='$time'";
  $result=$db->readDBNoStoredProcedure($query);
  if($result==[]||$result==false){
    $result["count"]=0;
  }
  return $result;
}
function getAdPostedThisMonth(){
  //get count of ads posted this month
   global $db;
   $time=date('y.m.d',time()-30*24*60*60);
  $query="select count(adID) as count from ads where create_time>='$time'";
  $result=$db->readDBNoStoredProcedure($query);
  if($result==[]||$result==false){
    $result["count"]=0;
  }
  return $result;
}
function getCountPurchasesThisMonth(){
  //count purchase this month
    global $db;
   $time=date('y.m.d',time()-30*24*60*60);
  $query="select count(purchase_id) as count from purchase_history where purchase_time>='$time'";
  $result=$db->readDBNoStoredProcedure($query);
  if($result==[]||$result==false){
    $result["count"]=0;
  }
  return $result;
}
function getCountPurchases(){
  //count all purchase
  global $db;
   $time=date('y.m.d',time()-30*24*60*60);
  $query="select count(purchase_id) as count from purchase_history";
  $result=$db->readDBNoStoredProcedure($query);
  if($result==[]||$result==false){
    $result["count"]=0;
  }
  return $result;
}
function getWidgetStats(){
  //gets the widget stats for the js
   global $DATA_OBJ;
  global $user;
  global $userType;
  if($userType=="guest"||$user->getRule()!="5150"){
    header('HTTP/1.1 401 Unauthorized');
    exit;
  }
  $arr=[];
  $arr["allUsers"]=getUsersCount();
  $arr["usersRegisteredLastMonth"]=getUsersRegisteredLastMonth();
  $arr["adCount"]=getCountOfTotalAds();
  $arr["adThisMonth"]=getAdPostedThisMonth();
  $arr["getCountOfBlogs"]=getCountOfBlogs();
  $arr["getCountOfBlogsThisMonth"]=getCountOfBlogsThisMonth();
  $arr["getAllPurchasescount"]=getCountPurchases();
  $arr["getPurchasesThisMonthCount"]=getCountPurchasesThisMonth();
  echo json_encode($arr);
}
function UserMonthPurchase(){
  //get sum of specific user  purchase this month
  global $db;
  global $user;
  $uuid=$user->getUuid();
  $time=date('y-m-d',time()-30*24*60*60);
  $query="select sum(price) as sum from purchase_history where DATE(purchase_time) >= '$time' and userId= '$uuid'";
  $result=$db->readDBNoStoredProcedure($query);
  if($result[0]->sum==null||$result[0]->sum==false){
  $result[0]->sum=0;
  }
  return $result;
}
function UserWeekPurchase(){
   //get sum of specific user  purchase this week
  global $db;
  global $user;
  $uuid=$user->getUuid();
  $time=date('y-m-d',time()-7*24*60*60);
  $query="select sum(price) as sum from purchase_history where DATE(purchase_time) >= '$time' and userId= '$uuid'";
  $result=$db->readDBNoStoredProcedure($query);
  if($result[0]->sum==null||$result[0]->sum==false){
  $result[0]->sum=0;
  }
  return $result;
}
function UserTodayPurchase(){
   //get sum of specific user  purchase today
  global $db;
  global $user;
  $uuid=$user->getUuid();
  $time=date('y.m.d',time());
  $query="select sum(price) as sum from purchase_history where DATE(purchase_time) >= '$time' and userId= '$uuid'";
  $result=$db->readDBNoStoredProcedure($query);
  if($result[0]->sum==null||$result[0]->sum==false){
  $result[0]->sum=0;
  }
  return $result;
}
function pricesPerCity(){
  //present prices per city for all city in the db
  global $DATA_OBJ;
  global $db;
  $query="SELECT city ,COUNT(*) as countTransactions,AVG(price) as avg,rooms,adType from ads group by city,adType,rooms order by city,adType,rooms";
  $result=$db->readDBNoStoredProcedure($query);
  if($result==false||$result=="")
  $result=[];
  for ($i=0; $i < count($result); $i++) { 
    $result[$i]->id=$i;
    $result[$i]->avg=number_format($result[$i]->avg, 2);
  }
  echo json_encode($result);
}
function getUserPurchasesStats(){
  //statistics for user purchases for the chart divide the avg of users and target
  global $DATA_OBJ;
  global $user;
  global $userType;
  global $db;
  if($userType=="guest"||($user->getRule()!="2001"&&$user->getRule()!="5150")){
    header('HTTP/1.1 401 Unauthorized');
    exit;
  }
  $arr=[];
  $arr["UserTodayPurchase"]=getTodaySales();
  $arr["UserMonthPurchase"]=getMonthSales();
  $arr["UserWeekPurchase"]=getWeekSales();
  if(getUsersCount()[0]->total!="0")
  $arr["target"]=getSalesTarget()[0]->expectedProfit/getUsersCount()[0]->total;
  else{
    $arr["target"]=0;
  }
echo json_encode($arr);
}
function getAdPostedThisMonthForUser(){
  //ads posted this month by user
  global $db;
  global $DATA_OBJ;
  global $user;
  $uuid=$user->getUuid();
  global $userType;
   $time=date('y.m.d',time()-30*24*60*60);
  $query="select count(adID) as count from ads where create_time>='$time' and user_id='$uuid'";
  $result=$db->readDBNoStoredProcedure($query);
  if($result==[]||$result==false){
    $result["count"]=0;
  }
  return $result;
}
function getCountOfTotalAdsForUser(){
  //get total ads that where posted from the begining of the site  by the user
  global $DATA_OBJ;
  global $user;
  $uuid=$user->getUuid();
  global $userType;
global $db;
$query= "SELECT COUNT(adID) as total FROM ads where user_id='$uuid'";
$result=$db->readDBNoStoredProcedure($query);
return $result;
}
function getCountOfBlogsThisMonthByUser(){
  //get total blogs that where posted from this month of the site  by the user
  global $DATA_OBJ;
  global $user;
  $uuid=$user->getUuid();
  global $userType;
  global $db;
  $thisMonth=date('y.m.d',time()-30*24*60*60);
$query= "SELECT COUNT(blog_id) as total FROM blogs where create_time >='$thisMonth' and userId='$uuid'";
$result=$db->readDBNoStoredProcedure($query);
return $result;
}
function getCountOfBlogsByUser(){
    //get total blogs that where posted from the begining of the site  by the user
  global $DATA_OBJ;
  global $user;
  $uuid=$user->getUuid();
  global $userType;
  global $db;
$query= "SELECT COUNT(blog_id) as total FROM blogs where userId='$uuid'";
$result=$db->readDBNoStoredProcedure($query);
return $result;
}
function getCountPurchasesByUserThisMonth(){
  //get total purchases that from this month  by the user
  global $DATA_OBJ;
  global $db;
  global $user;
  $uuid=$user->getUuid();
  global $userType;
   $time=date('y-m-d',time()-30*24*60*60);
  $query="select count(purchase_id) as count from purchase_history where purchase_time>='$time' and userId= '$uuid'";
  $result=$db->readDBNoStoredProcedure($query);
  if($result==[]||$result==false){
    $result["count"]=0;
  }
  return $result;
}
function getCountPurchasesByUser(){
     //get total purchases that from the begining of the site  by the user
  global $DATA_OBJ;
  global $user;
  global $db;
  $uuid=$user->getUuid();
  global $userType;
  $query="select count(purchase_id) as count from purchase_history where userId= '$uuid'";
  $result=$db->readDBNoStoredProcedure($query);
  if($result==[]||$result==false){
    $result["count"]=0;
  }
  return $result;
}
function getWidgetStatsForUser(){
  //get user widgets stats
  global $DATA_OBJ;
  global $user;
  global $userType;
  if($userType=="guest"||($user->getRule()!="5150"&&$user->getRule()!="2001")){
    header('HTTP/1.1 401 Unauthorized');
    exit;
  }
  $arr=[];
  $arr["allUsers"]=getUsersCount();
  $arr["usersRegisteredLastMonth"]=getUsersRegisteredLastMonth();
  $arr["adCount"]=getCountOfTotalAdsForUser();
  $arr["adThisMonth"]=getAdPostedThisMonthForUser();
  $arr["getCountOfBlogs"]=getCountOfBlogsByUser();
  $arr["getCountOfBlogsThisMonth"]=getCountOfBlogsThisMonthByUser();
  $arr["getAllPurchasescount"]=getCountPurchasesByUser();
  $arr["getPurchasesThisMonthCount"]=getCountPurchasesByUserThisMonth();
  echo json_encode($arr);
}
function getAllAdsByMonthsChart(){
  //get ads posted by month for last 6 month
  global $db;
  global $DATA_OBJ;
  $arr=[];
  $thisMonth= date('m');//num of cur month
  for ($i=5; $i >0 ; $i--) { 
    $begin=date('y-m-d',time()-($i)*30*24*60*60);
    $end=date('y-m-d',time()-($i-1)*30*24*60*60);
    array_push($arr,["name"=>$thisMonth-$i,"Total"=>(int)getAllAdsBetween2TimeStamps($begin,$end)]);
  }
  echo json_encode($arr);
  die;
}
function getAllAdsBetween2TimeStamps($begin,$end){
  //return count of ads between 2 timestamps
  global $db;
  $query="select count(adID) as count from ads where create_time>='$begin' and create_time<='$end'";
  $result=$db->readDBNoStoredProcedure($query);
  if($result==[]||$result==false){
    $result["count"]=0;
  }
  return $result[0]->count;
}
function getAllAdsBetween2TimeStampsForUser($begin,$end,$uuid){
  //return count of ads between 2 timestamps
  global $db;
  $query="select count(adID) as count from ads where create_time>='$begin' and create_time<='$end' and user_id='$uuid'";
  $result=$db->readDBNoStoredProcedure($query);
  if($result==[]||$result==false){
    $result["count"]=0;
  }
  return $result[0]->count;
}
function getAllAdsByMonthsForUserChart(){
  //get ads posted by month by user
 global $db;
  global $DATA_OBJ;
  global $user;
  $uuid=$user->getUuid();
  $arr=[];
  $thisMonth= date('m');//num of cur month
  for ($i=5; $i >0 ; $i--) { 
    $begin=date('y.m.d',time()-($i)*30*24*60*60);
    $end=date('y.m.d',time()-($i-1)*30*24*60*60);
    array_push($arr,["name"=>$thisMonth-$i,"Total"=>(int)getAllAdsBetween2TimeStampsForUser($begin,$end,$uuid)]);
  }
  echo json_encode($arr);
  die;
}
if($DATA_OBJ->data_type=="getFooterStats"){
getFooterStats();
}
else{
  if ($DATA_OBJ->data_type=="getSalesStats"){
    getSalesStats();
  }
  else{
    if($DATA_OBJ->data_type=="getWidgetStats"){
      getWidgetStats();
    }
    else{
      if($DATA_OBJ->data_type=="getUserPurchasesStats"){
        getUserPurchasesStats();
      }
      else{
        if($DATA_OBJ->data_type=="getWidgetStatsForUser"){
          getWidgetStatsForUser();
        }
        else{
          if($DATA_OBJ->data_type=="getAllAdsPostedByMonth"){
            getAllAdsPostedByMonth();
          }
          else{
          if($DATA_OBJ->data_type=="getAllAdsPostedByMonthForUser"){
            getAllAdsPostedByMonthForUser();
          }
          else{
            if($DATA_OBJ->data_type=="getAllAdsByMonthsChart"){
              getAllAdsByMonthsChart();
            }
            else{
              if($DATA_OBJ->data_type=="getAllAdsByMonthsForUserChart"){
              getAllAdsByMonthsForUserChart();
            }
            else{
              if($DATA_OBJ->data_type=="pricesPerCity"){
                pricesPerCity();
              }
            }
          }
          }
        }
        }
      }
    }
  }
}
?>
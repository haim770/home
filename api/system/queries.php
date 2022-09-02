<?php
$queryArr=[];
//select queries
$queryArr["checkIfFavoriteExistByUserIdAndAdId"]="SELECT 1 where EXISTS(SELECT * from favorites WHERE adId= :adId and favorites.userId =:userId);";
$queryArr["getSystemMessagesByUserIdAndTypeOfReport"]="select * from system_messages where userId = :userId and msgType=:msgType";
$queryArr["getUser_reportById"]="select * from user_reports where id= :id";
$queryArr["getSystemMsgBySeenStatus"]="select * from system_messages where userId = :userId and msgType=:msgType and seen=:seen";
$queryArr["getActiveReports"]="select * from user_reports where active = '1'";
$queryArr["getNotActiveReports"]="select * from user_reports where active = '0'";
$queryArr["getAllReports"]="select * from user_reports";
$queryArr["getReportByActiveReaonNameAndElementType"]="select * from report_reason where element_type=:element_type and reason_name=:reason_name and active='1'";
$queryArr["getReportByActiveAndById"]="select * from report_reason where reason_id=:reason_id and active='1'";
$queryArr["createReportOnElement"]="INSERT INTO user_reports (id,element_id,userId,content,title,report_reason,element_type) VALUES (:id,:element_id,:userId,:content,:title,:report_reason,:element_type) ";
$queryArr["getAllReportReasons"]="select  reason_id as id ,element_type, reason_name, create_time, active from report_reason";
$queryArr["getAllReportReasonsForElementType"]="select * from report_reason where element_type = :element_type";
$queryArr["getExpireDateFromSettings"]="select expireDateAds from settings";
$queryArr["getAllAdsWaitForApproval"]="select adID,user_id from ads where approval_status= 'pending' and active= '0'";
$queryArr["getFavoritesTouserId"]="select * from favorites where userId = :userId";
$queryArr["getUserById"]="select * from users where uuid =:uuid";
$queryArr["getPicsForElementId"]="select * from pictures where element_id =:element_id order by serial_number";
$queryArr["getUserByID"]="select * from users where uuid =:uuid";
$queryArr["getAdContentMastersForRent"]="select * from ad_content where master = '1' and category= 'השכרה'";
$queryArr["getAdContentMastersForBuy"]="select * from ad_content where master = '1' and category='קנייה'";
$queryArr["getAllMasters"]="select * from ad_content where master = '1'";
$queryArr["checkIfAdContentMasterExist"]="select * from ad_content where name=:name and element_id !=:element_id and category =:category";
//insert queries
$queryArr["sendReportToSystemMsg"]="INSERT INTO system_messages (msgId,userId,message_content,msgType) VALUES (:msgId,:userId,:message_content,:msgType)";
$queryArr["insertUserReport"]="INSERT INTO user_reports (id,element_id,userId,content,title,report_reason,element_type) VALUES (:id,:element_id,:userId,:content,:title,:report_reason,:element_type)";
$queryArr["insertNewReportReason"]="INSERT INTO report_reason (reason_id,element_type,reason_name) VALUES (:reason_id,:element_type,:reason_name)";
$queryArr["insertAdContentMasterWithMinAndMax"]="INSERT into ad_content (element_id,adID,category,master,min_value,max_value,required,name,free_text,value,prevDisplay,display_type)  VALUES(:element_id,'0',:category,'1',:min_value,:max_value,:required,:name,:free_text,'master','0',:display_type)";
$queryArr["insertAdContentMasterWithMinNoMax"]="INSERT into ad_content (element_id,adID,category,master,min_value,required,name,free_text,value,prevDisplay,display_type)  VALUES(:element_id,'0',:category,'1',:min_value,:required,:name,:free_text,'master','0',:display_type)";
$queryArr["insertAdContentMasterWithMaxNoMin"]="INSERT into ad_content (element_id,adID,category,master,max_value,required,name,free_text,value,prevDisplay,display_type)  VALUES(:element_id,'0',:category,'1',:max_value,:required,:name,:free_text,'master','0',:display_type)";
$queryArr["insertAdContentMasterWithoutMinAndMax"]="INSERT into ad_content (element_id,adID,category,master,required,name,free_text,value,prevDisplay,display_type) VALUES(:element_id,'0',:category,'1',:required,:name,:free_text,'master','0',:display_type)";
$queryArr["insertFavoriteAd"]="INSERT INTO favorites (favorite_id,userId,AdId) VALUES (:favorite_id, :userId, :adID)";
$queryArr["insertPictures"]="INSERT INTO `pictures`(`pictureID`, `element_id`, `serial_number`, `picture_url`, `upload_time`, `alt`) VALUES (:uuid,:adUuid,:serial_number,:insertValuesSQL,:curDate,:alt)";
//update queries
$queryArr["updateReportSeenByUserId"]="UPDATE user_reports SET seen = :seen WHERE userId = :userId";
$queryArr["updateManagerFeedback"]="UPDATE user_reports SET manage_feedback = :manager_feedback WHERE id = :id";
$queryArr["updateReportStatus"]="UPDATE user_reports SET active = :active,manage_feedback=:manage_feedback WHERE id =:id";
$queryArr["editReportReason"]="UPDATE report_reason SET active = '1', reason_name= :reason_name, element_type=:element_type WHERE reason_id = :reason_id";
$queryArr["updateActiveStatusOfReport"]="UPDATE report_reason SET active = :active WHERE reason_id = :reason_id";
$queryArr["decreaseRemainingAdsByOne"]="UPDATE users SET remaining_ads = remaining_ads-1 WHERE uuid =:uuid";
$queryArr["declineAd"]="UPDATE ads SET approval_status = 'declined', active= false WHERE adID = :adID";
$queryArr["aproveAd"]="UPDATE ads SET approval_status = 'aproved', active= true WHERE adID = :adID";
$queryArr["updateParamWithMinAndMaxValue"]="UPDATE ad_content SET name =:name, free_text =:free_text,required=:required, display_type =:display_type, category =:category, min_value =:min_value, max_value=:max_value WHERE element_id =:element_id";
$queryArr["updateParamWithOnlyMinValue"]="UPDATE ad_content SET name = :name, free_text =:free_text,required=:required, display_type =:display_type, category =:category, min_value =:min_value, max_value =NULL WHERE element_id =:element_id";
$queryArr["updateParamWithOnlyMaxValue"]="UPDATE ad_content SET name = :name, free_text =:free_text,required=:required, display_type =:display_type, category =:category, min_value =NULL, max_value =:max_value WHERE element_id =:element_id";
$queryArr["updateParamWithNoMinAndNoMaxValue"]="UPDATE ad_content SET name =:name, free_text =:free_text,required=:required, display_type =:display_type, category =:category, min_value =NULL, max_value =NULL WHERE element_id =:element_id";
//delete queries
$queryArr["deleteAdContentMasterByElementId"]="delete from ad_content WHERE element_id = :element_id";
$queryArr["deleteAdFromFavorites"]="DELETE from favorites where userId=:userId and AdId=:adID";
$queryArr["deleteAdContentForAdId"]="Delete from ad_content where adID=:adID";
function queryForGetAdsWaitForApprovalByParams($end,$start){
  //get query for ads wait for approval by start and end values
  return "select  DISTINCT ads.adID,ads.user_id from ads where approval_status= 'pending' and active='0' limit ".$end." OFFSET ".$start;
}
function generateQueryForSearchAdsByUnknownParamsFromAdContentAndAd($time,$DATA_OBJ){
  //get the query that combine ad content params and ad
  $query="select DISTINCT ads.adID,ads.user_id from ads,ad_content where ads.adID=ad_content.adID and active =1 and expire_date>='$time'" ;
  $queryWithoutAdContentParams="select DISTINCT ads.adID,ads.user_id from ads where 1=1 and ads.active =1 and expire_date>='$time' " ;
  $queryAdTableParams="";//the part for querying ads table
  $queryAdContentTableParams="";//the part for querying adcontent
  if (isset($DATA_OBJ->params)) {
    //check the params to create the query
    foreach ($DATA_OBJ->params as $key => $value) {
      if ($value=="") {
        continue;
      }
      if($key=="maxPrice"){
        $queryAdTableParams.=" and price <= '$value' ";
        continue;
      }
      if($key=="minPrice"){
        $queryAdTableParams.=" and price >= '$value' ";
        continue;
      }
      if($key=="minRooms"){
          $queryAdTableParams.=" and rooms>= '$value' ";
          continue;
      }
      if($key=="maxRooms"){
          $queryAdTableParams.=" and rooms<= '$value' ";
          continue;
        }
      if($key=="minArea"){
          $queryAdTableParams.=" and area>= '$value' ";
          continue;
      }
      if($key=="maxArea"){
          $queryAdTableParams.=" and area<= '$value' ";
          continue;
      }
      if($key=="create_time"||$key=="user_id"||$key=="active"||$key=="contact_counter"||$key=="watch"||$key=="close_reason"||$key=="expire_date"||$key=="approval_status"||$key=="ad_link"||$key=="city"||$key=="street"||$key=="building_number"||$key=="entry"||$key=="apartment"||$key=="zip_code"||$key=="map_X"||$key=="map_Y"||$key=="price"||$key=="rooms"||$key=="adType"||$key=="floor"||$key=="maxFloor"||$key=="houseCommittee"||$key=="propertyTaxes"||$key=="enteringDate"){
        $queryAdTableParams.=" and $key = '$value' ";
        $arr[$key] = $value;
      }
      else{
        $hasAdContentAtSearch=true;
        $queryAdContentTableParams.="and ad_content.name = '$key' and ad_content.value ='$value'"; 
        $arr[$key] = $key;
        $arr[$value] = $value;
      }
    }
        //check for the limit part
        if (isset($DATA_OBJ->limitBy)){
            if(!$hasAdContentAtSearch){
                $query=$queryWithoutAdContentParams;
            }
             $query.=" ".$queryAdTableParams." ".$queryAdContentTableParams."order by create_time DESC limit ".$DATA_OBJ->limitBy->end." offset ".$DATA_OBJ->limitBy->start.";";
             
        }
        else{
        $query.=" ".$queryAdTableParams." ".$queryAdContentTableParams.";";
    }
  }
  return $query;
}
function addLimitAndOffsetToQuery($query,$end,$start){
  //add limit and offset to a query
}
function queryForGetAdsIdAndUserIdActiveByOffsetAndLimit($time,$end,$start){
  //return query of select adid and userId that is active and by some offset and limit
 "select  DISTINCT ads.adID,ads.user_id from ads where ads.active =1 and expire_date>='$time' order by create_time DESC limit ".$end." OFFSET ".$start.";";
}
function queryForGetAdsIdActiveByOffsetAndLimit($date,$end,$start){
  //return query of select ad id that is active and by some offset and limit
  return "select adID from ads where active=1 and expire_date > '$date' order by create_time DESC limit ".$end." OFFSET ".$start;
}
function queryForUpdateAdPardOfTheAd($city,$street,$propertyTaxes,$houseCommittee,$floor,$maxFloor,$price,$rooms,$adType,$entry,$building_number,$expire_date,$area,$property_type,$entryDate,$adID){
  //returns query for updating the ads part of ad
  return "UPDATE ads SET city = '$city', street = '$street',propertyTaxes ='$propertyTaxes', houseCommittee ='$houseCommittee',floor ='$floor',maxFloor ='$maxFloor',price='$price',rooms='$rooms',adType='$adType',entry='$entry',building_number='$building_number',expire_date='$expire_date',area= '$area',property_type='$property_type',entry_date='$entryDate',active ='0' ,approval_status ='pending' WHERE adID = '$adID'";
}
function queryForInsertAdPardOfTheAd($city,$street,$propertyTaxes,$houseCommittee,$floor,$maxFloor,$price,$rooms,$adType,$entry,$building_number,$expire_date,$area,$property_type,$entryDate,$adID,$user_id){
  //returns query for inserting the ads part of ad
  return "INSERT INTO ads (adID,user_id,city,street,propertyTaxes,houseCommittee,floor,maxFloor,price,rooms,adType,entry,building_number,expire_date,area,entry_date,property_type,ad_link) VALUES('$adID','$user_id','$city','$street','$propertyTaxes','$houseCommittee','$floor','$maxFloor','$price','$rooms','$adType','$entry','$building_number','$expire_date','$area','$entryDate','$property_type','$adID')";
}
?>

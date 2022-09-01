<?php
$queryArr=[];
//select queries
$queryArr["getExpireDateFromSettings"]="select expireDateAds from settings";
$queryArr["getAllAdsWaitForApproval"]="select adID,user_id from ads where approval_status= 'pending' and active= '0'";
$queryArr["getFavoritesTouserId"]="select * from favorites where userId = :userId";
$queryArr["getUserById"]="select * from users where uuid =:uuid";
$queryArr["getPicsForElementId"]="select * from pictures where element_id =:element_id order by serial_number";
$queryArr["getImgesForAd"]="select * from pictures where element_id =:element_id order by serial_number";
$queryArr["getUserByID"]="select * from users where uuid =:uuid";
$queryArr["getAdContentMastersForRent"]="select * from ad_content where master = '1' and category= 'השכרה'";
$queryArr["getAdContentMastersForBuy"]="select * from ad_content where master = '1' and category='קנייה'";
$queryArr["getAllMasters"]="select * from ad_content where master = '1'";
$queryArr["checkIfAdContentMasterExist"]="select * from ad_content where name=:name and element_id !=:element_id and category =:category";
//insert queries

$queryArr["insertAdContentMasterWithMinAndMax"]="INSERT into ad_content (element_id,adID,category,master,min_value,max_value,required,name,free_text,value,prevDisplay,display_type)  VALUES(:element_id,'0',:category,'1',:min_value,:max_value,:required,:name,:free_text,'master','0',:display_type)";
$queryArr["insertAdContentMasterWithMinNoMax"]="INSERT into ad_content (element_id,adID,category,master,min_value,required,name,free_text,value,prevDisplay,display_type)  VALUES(:element_id,'0',:category,'1',:min_value,:required,:name,:free_text,'master','0',:display_type)";
$queryArr["insertAdContentMasterWithMaxNoMin"]="INSERT into ad_content (element_id,adID,category,master,max_value,required,name,free_text,value,prevDisplay,display_type)  VALUES(:element_id,'0',:category,'1',:max_value,:required,:name,:free_text,'master','0',:display_type)";
$queryArr["insertAdContentMasterWithoutMinAndMax"]="INSERT into ad_content (element_id,adID,category,master,required,name,free_text,value,prevDisplay,display_type) VALUES(:element_id,'0',:category,'1',:required,:name,:free_text,'master','0',:display_type)";
$queryArr["insertFavoriteAd"]="INSERT INTO favorites (favorite_id,userId,AdId) VALUES (:favorite_id, :userId, :adID)";
$queryArr["insertPictures"]="INSERT INTO `pictures`(`pictureID`, `element_id`, `serial_number`, `picture_url`, `upload_time`, `alt`) VALUES (:uuid,:adUuid,:serial_number,:insertValuesSQL,:curDate,:alt)";
//update queries
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
function queryForUpdateAdPardOfTheAd($city,$street,$propertyTaxes,$houseCommittee,$floor,$maxFloor,$price,$rooms,$adType,$entry,$building_number,$expire_date,$area,$property_type,$entryDate,$adID){
  //returns query for updating the ads part of ad
  return "UPDATE ads SET city = '$city', street = '$street',propertyTaxes ='$propertyTaxes', houseCommittee ='$houseCommittee',floor ='$floor',maxFloor ='$maxFloor',price='$price',rooms='$rooms',adType='$adType',entry='$entry',building_number='$building_number',expire_date='$expire_date',area= '$area',property_type='$property_type',entry_date='$entryDate',active ='0' ,approval_status ='pending' WHERE adID = '$adID'";
}
function queryForInsertAdPardOfTheAd($city,$street,$propertyTaxes,$houseCommittee,$floor,$maxFloor,$price,$rooms,$adType,$entry,$building_number,$expire_date,$area,$property_type,$entryDate,$adID,$user_id){
  //returns query for inserting the ads part of ad
  return "INSERT INTO ads (adID,user_id,city,street,propertyTaxes,houseCommittee,floor,maxFloor,price,rooms,adType,entry,building_number,expire_date,area,entry_date,property_type,ad_link) VALUES('$adID','$user_id','$city','$street','$propertyTaxes','$houseCommittee','$floor','$maxFloor','$price','$rooms','$adType','$entry','$building_number','$expire_date','$area','$entryDate','$property_type','$adID')";
}
?>

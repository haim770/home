  <?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: PUT, GET, POST");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header("Access-Control-Allow-Credentials: true");
    require_once('../api/system/classes/useDBs.php');
    $db = dbClass::GetInstance();
    $arr=[];
    if(isset($_POST["data"])&&$_POST["data"]=="addAdComplete"){
      insertNewAd();
    }
    var_dump($_POST["ad"]);
    function moveFileToNewLocation(){
      //moves the file to the new location and returns its new location
      if(isset($_FILES["images"])){
      if($_FILES["images"]["error"]==0){
        $tmp_name = $_FILES["images"]["tmp_name"];
        $name = uniqid().$_FILES["images"]["name"];
        if(move_uploaded_file($_FILES["images"]["tmp_name"],__DIR__."/src/pics/".$name)){
          return "pics/".$name;//the new location
        }
      }
      return false;//didnt succeed
      
    }
    return "no upload was done";
    }
    function insertNewAd(){
    //insert new ad with its ad content
    global $db;
    global $arr;
    $arr=[];
    $arrOfAd=insertNewAdTableArray($_POST["ad"]);
    $arrOfAdContent=[];
    $arrOfAdContent=insertNewAdContentTableArray($_POST["adContent"]);
    $queryAdContent=makeInsertAdContentQuery($arrOfAdContent,$arrOfAd['adID']);
    echo $queryAdContent;
    $queryAd="insertAd(:adID,:user_id,:city,:street,:price,:adType,:building_number,:entry,:apartment,:rooms)";
    $newFileLocation=moveFileToNewLocation();
    if(!$newFileLocation){
      echo "no upload was done for file";
    }
    else{
      $imageQuery="INSERT INTO pictures (pictureID, element_id, serial_number, picture_url, alt) VALUES ('$newFileLocation','{$arrOfAd["adID"]}',1,'$newFileLocation','pic for the ad')";
    }
    $imageArray=[];
    $result = $db->writeDB($queryAd, $arrOfAd);
    if($result){
        $result = $db->writeDBNotStoredProcedure($queryAdContent);
        if($result){
          //after both ad and adcontent are successful we upload imgas
            $result = $db->writeDBNotStoredProcedure($imageQuery);
            print_r($result);
        }
    }
    echo json_encode($result);
    $arr=[];
}
function insertNewAdTableArray($ad)
{
  $ad=json_decode($ad);
    //return array with the ad params the ad we got is std class type so the fields storde like ->
    global $db;
    global $arr;
    $arrForAd=[];
    $arrForAd['adID'] = uniqid();
    $arrForAd['user_id'] = $ad->user_id;
    $arrForAd['city'] = $ad->city;
    $arrForAd['street'] = $ad->street;
    $arrForAd['price'] = $ad->price;
    $arrForAd['adType'] = "ad->adType";
    $arrForAd['building_number'] = $ad->building_number;
    $arrForAd['entry'] = $ad->entry;
    $arrForAd['apartment'] = $ad->apartment;
    $arrForAd['rooms'] = $ad->rooms;
    return $arrForAd;
    // $query = "insertAd(:adID,:city,:street,:building_number,:entry,:user_id,:apartment,:rooms)";
    // $result = $db->writeDB($query, $arr);
    // echo json_encode($result);
}
function insertNewAdContentTableArray($adContent){
    //return array with params of ad content
     $adContent=json_decode($adContent);
    $arrOfAdContent=[];
    $count=0;
    if (isset($adContent)) {
        foreach ($adContent as $key => $value) {
             $arrOfAdContent[$count]["element_id"]=uniqid();
            $arrOfAdContent[$count]["name"] = $key;
            $arrOfAdContent[$count]["value"] = $value;
            $arrOfAdContent[$count++]["master"] = 0;
        }
    }
  
    return $arrOfAdContent;

}
function makeInsertAdContentQuery($adContentArr,$adID){
    //make from the array of 2d ad content query for inserting multy rows
$query="INSERT into ad_content (element_id, adID,master,name,value) VALUES ";
for ($i=0; $i < count($adContentArr); $i++) { 
    $query=$query." ('{$adContentArr[$i]['element_id']}','$adID','0','{$adContentArr[$i]['name']}','{$adContentArr[$i]['value']}'),";
}
    $query=substr($query,0,-1);
 return $query;

}
       
    // Folder Path For Ubuntu
    // $folderPath = "/var/www/my-app/uploads";
    // Folder Path For Window
    var_dump($_POST['data']);
    //var_dump($_FILES);
?>
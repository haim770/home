<?php
// get authTest file
$authPath = "../../../Authentication/authTest.php";
include_once(dirname(__FILE__) . DIRECTORY_SEPARATOR . $authPath);

$arr = []; //for global scope var
// File upload configuration 
$targetDir = "../../../Images/";
$allowTypes = array('jpg', 'png', 'jpeg', 'gif');

$fileNames = array_filter($_FILES['files']['name']);
$statusMsg = $errorMsg = $insertValuesSQL = $errorUpload = $errorUploadType = '';

if(!empty($fileNames)){ 
        foreach($_FILES['files']['name'] as $key=>$val){ 
            // File upload path 
            $fileName = basename($_FILES['files']['name'][$key]); 
            $targetFilePath = dirname(__FILE__) . DIRECTORY_SEPARATOR . $targetDir . $fileName; 
             
            // Check whether file type is valid 
            $fileType = pathinfo($targetFilePath, PATHINFO_EXTENSION); 
            if(in_array($fileType, $allowTypes)){ 
                // Upload file to server 
                if(move_uploaded_file($_FILES["files"]["tmp_name"][$key], $targetFilePath)){ 
                    // Image db insert sql 
                    $insertValuesSQL .= "('".$fileName."', NOW()),"; 
                }else{ 
                    $errorUpload .= $_FILES['files']['name'][$key].' | '; 
                } 
            }else{ 
                $errorUploadType .= $_FILES['files']['name'][$key].' | '; 
            } 
        } 
        // Error message 
        $errorUpload = !empty($errorUpload)?'Upload Error: '.trim($errorUpload, ' | '):''; 
        $errorUploadType = !empty($errorUploadType)?'File Type Error: '.trim($errorUploadType, ' | '):''; 
        $errorMsg = !empty($errorUpload)?'<br/>'.$errorUpload.'<br/>'.$errorUploadType:'<br/>'.$errorUploadType; 
         
        if(!empty($insertValuesSQL)){ /*
            $insertValuesSQL = trim($insertValuesSQL, ','); 
            // Insert image file name into database 
            $insert = $db->query("INSERT INTO images (file_name, uploaded_on) VALUES $insertValuesSQL"); 
            if($insert){ 
                $statusMsg = "Files are uploaded successfully.".$errorMsg; 
            }else{ 
                $statusMsg = "Sorry, there was an error uploading your file."; 
            } */
        }else{ 
            $statusMsg = "Upload failed! ".$errorMsg; 
        }
    }else{ 
        $statusMsg = 'Please select a file to upload.'; 
    } 

//$query = "SELECT * FROM `ad_content` WHERE `category` =:type and `master` = 1;";

print_r($user->getRefreshToken());
die;
echo json_encode(
    array(
        "message" => "addNewForm",       
        "formData" => $DATA_OBJ["formData"],
        "formDataStepThree" => $DATA_OBJ["formDataStepThree"],
        "userName" => $user->remaining_ads(),
        //"Data" => $citysNames
    )
);
die;

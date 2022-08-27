<?php
// get authTest file
$authPath = "../../Authentication/authTest.php";
include_once(dirname(__FILE__) . DIRECTORY_SEPARATOR . $authPath);

/**
 * Check if user is admin
 */
if ($user->getRule() == "5150") {
    $arr = []; //for global scope var
    $arr["blogId"] = json_decode($DATA_OBJ["blogId"]);
    $arr["curDate"] = date("Y-m-d H:i:s");
    $coverImageURL = json_decode($DATA_OBJ["image_name"] ?? null);
    if ($coverImageURL == null) {
        // File upload configuration 
        $targetDir = "../../Images/";
        $allowTypes = array('jpg', 'png', 'jpeg', 'gif');
        if (isset($_FILES) && isset($_FILES['files']) && isset($_FILES['files']['name'])) {
            $fileNames = array_filter($_FILES['files']['name']);
        }
        $statusMsg = $errorMsg = $insertValuesSQL = $errorUpload = $errorUploadType = '';
        $coverImageURL = "";
        /**
         * STEP ONE
         * upload files to server
         */
        if (isset($fileNames)) {
            if (!empty($fileNames)) {
                $arr["serial_number"] = 1; // image counter
                foreach ($_FILES['files']['name'] as $key => $val) {
                    /**
                     * Generate random string to save in the begining of the file name
                     */
                    $length = 8; // Adjust length to fit your new paranoia level. 16 is probably a sane default and the same length as md5 (if you are migrating from a method that uses it)
                    // random_bytes — Generates cryptographically secure pseudo-random bytes.
                    $token = bin2hex(random_bytes($length)); // bin2hex output is url safe.
                    // File upload path 
                    $fileName = basename($_FILES['files']['name'][$key]);
                    $targetFilePath = dirname(__FILE__) . DIRECTORY_SEPARATOR . $targetDir . $token . $fileName;

                    $arr["alt"] = $fileName;
                    // Check whether file type is valid 
                    $fileType = pathinfo($targetFilePath, PATHINFO_EXTENSION);
                    if (in_array($fileType, $allowTypes)) {
                        // Upload file to server 
                        if (move_uploaded_file($_FILES["files"]["tmp_name"][$key], $targetFilePath)) {
                            // Image db insert sql 
                            $arr["insertValuesSQL"] = $token . $fileName;
                        } else {
                            $errorUpload .= $_FILES['files']['name'][$key] . ' | ';
                        }
                    } else {
                        $errorUploadType .= $_FILES['files']['name'][$key] . ' | ';
                    }
                    /**
                     * Save image to database
                     */
                    if (!empty($arr["insertValuesSQL"])) {
                        $arr["uuid"] = uniqid(); // image uniq id
                        $coverImageURL = $arr["insertValuesSQL"];
                        $query = "UPDATE `pictures` SET `pictureID`=:uuid,`serial_number`=:serial_number,`picture_url`=:insertValuesSQL,`upload_time`=:curDate,`alt`=:alt WHERE `element_id`=:blogId";
                        $db->writeDBNotStoredProcedure($query, $arr);
                        $arr["serial_number"] = 1 + $arr["serial_number"]; // image counter
                    } else {
                        $statusMsg = "Upload failed! ";
                    }
                    unset($arr["insertValuesSQL"]);
                }
            }
        }
    }
    /**
     * STEP TWO write all Ad data to server
     */

    $arr2 = [];
    $arr2["blogId"] = $arr["blogId"];
    $arr2["blogTitle"] = json_decode($DATA_OBJ["blogTitle"]);
    $arr2["blogBody"] = json_decode($DATA_OBJ["blogBody"]);
    $arr2["blogCategory"] = json_decode($DATA_OBJ["blogCategory"]);
    $arr2["blogSubCategory"] = json_decode($DATA_OBJ["blogSubCategory"]);
    $arr2["updateTime"] = $arr["curDate"];
    $arr2["coverImageURL"] = $coverImageURL;
    $arr2["user_id"]= $user->getUuid();
    $query = "UPDATE `blogs` SET `title`=:blogTitle ,`userId`=:user_id ,`content`=:blogBody ,`update_time`=:updateTime ,`cover_image`=:coverImageURL ,`category`=:blogCategory ,`subCategory`=:blogSubCategory WHERE `blog_id`=:blogId";
    $db->writeDBNotStoredProcedure($query, $arr2);

    echo json_encode(
        "publish"
    );
    die;
} else {
    echo json_encode("not auturized");
}

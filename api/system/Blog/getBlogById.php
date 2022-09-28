<?php
$arr = []; //for global scope var
$BlogId = $DATA_OBJ->params->blogId;

// our uuid
$query = "SELECT blogs.blog_id as `id`, blogs.title,blogs.category,blogs.subCategory,blogs.content as `description`, blogs.create_time as `createdAt`, blogs.cover_image as `cover`, concat(users.first_name, ' ', users.last_name) as `authorName`, blogs.views FROM `blogs` 
INNER JOIN users ON blogs.userId = users.uuid 
WHERE blogs.blog_id = '$BlogId';";

//increment views
$increment_query= "UPDATE `blogs` SET `views`=`views`+1 WHERE blogs.blog_id = '$BlogId';";
$db->writeDBNotStoredProcedure($increment_query, $arr);

$info = (object)[];
$info->Blogs = $db->readDBNoStoredProcedure($query, $arr);
echo json_encode($info);

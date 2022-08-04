<?php
$arr = []; //for global scope var
$BlogId = $DATA_OBJ->params->blogId;

// our uuid
$query = "SELECT blogs.blog_id as `id`, blogs.title,blogs.category,blogs.subCategory,blogs.content as `description`, blogs.create_time as `createdAt`, blogs.cover_image as `cover`, concat(users.first_name, ' ', users.last_name) as `authorName` FROM `blogs` 
INNER JOIN users ON blogs.userId = users.uuid 
WHERE blogs.blog_id = " . $BlogId . ";";

$info = (object)[];
$info->Blogs = $db->readDBNoStoredProcedure($query, $arr);
echo json_encode($info);

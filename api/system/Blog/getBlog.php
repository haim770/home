<?php
$arr = []; //for global scope var
$searchElement = $DATA_OBJ->params->searchParams;

// our uuid
$query = "SELECT blogs.blog_id as `id`, blogs.title,blogs.category,blogs.subCategory,blogs.content as `description`, blogs.create_time as `createdAt`, blogs.cover_image as `cover`, concat(users.first_name, ' ', users.last_name) as `authorName` FROM `blogs` 
INNER JOIN users ON blogs.userId = users.uuid 
WHERE users.first_name LIKE '%".$searchElement."%' 
	OR users.last_name LIKE '%".$searchElement."%'
	OR blogs.title LIKE '%".$searchElement."%'
	OR blogs.category LIKE '%".$searchElement."%';";

$info = (object)[];
$info->Blogs = $db->readDBNoStoredProcedure($query, $arr);
echo json_encode($info);


?>
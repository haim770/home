<?php
require_once('<./useDBs.php');
enum queries :string{
  case getAllUsers="select * from users";
}

$db = new useDbs();
echo $db->readDBObj(q)
?>

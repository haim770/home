<?php
class password_recovery{
private int $id;
private string $userMail;
private string $token;
private string $exp_date;
protected function int getId(){
  return $this->id;
}	
protected function string getUserMail(){
  return $this->userMail;
}	
protected function string getToken(){
  return $this->token;
}	
protected function string getExp_date(){
  return $this->exp_date;
}	
}
?>
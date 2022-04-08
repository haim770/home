<?php
class system_messages{
  private string $msgId   ;
private string $message_content ;
private string $userId ;
private string $create_time;
private int $seen;

protected function int getMsgId (){
  return $this->msgId  ;
}	
protected function string getMessage_content(){
  return $this->message_content ;
}	
protected function string getUserId (){
  return $this->userId;
}	
protected function string getCreate_time(){
  return $this->create_time;
}	
protected function int getSeen(){
  return $this->seen;
}	


}

?>
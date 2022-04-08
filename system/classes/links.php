<?php
class links{
  private string $linkId;
   private string $create_time;
   private string $user_id;
  private string $link_content;
  private string $link;
  private int $views;
  private string $status;
  
  
  protected function string getLinkId(){
    return $this->linkId;
  }
   protected function string getCreate_time(){
    return $this->create_time;
  }
   protected function string getUser_id (){
    return $this->User_id;
  }
   protected function string getLink_content(){
    return $this->link_content;
  } 
  protected function string getLink(){
    return $this->link;
  }
   protected function int getViews(){
    return $this->link_contviewsent;
  }
   protected function string getStatus(){
    return $this->status;
  }
}
?>
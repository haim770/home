<?php
class blogs{
  private string $blog_id;
   private string $create_time;
   private string $user_id;
  private string $status;
  private string  $title;
  private int $views;
  private string $content;
  private string $update_time;
  private string $cover_image;
  protected function string getBlog_id(){
    return $this->blog_id;
  }
   protected function string getCreate_time(){
    return $this->create_time;
  }
   protected function string getUser_id (){
    return $this->User_id;
  }
   protected function string getStatus(){
    return $this->status;
  }
   protected function string getTitle(){
    return $this->title;
  }
   protected function string getContent(){
    return $this->content;
  }
   protected function string getUpdate_time(){
    return $this->update_time;
  } 
  protected function int getViews(){
    return $this->views;
  }
  protected function int getCover_image(){
    return $this->cover_image;
  }
}
?>
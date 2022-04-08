<?php
 class ads{
   private string $adId;
   private string $create_time;
   private string $user_id;
  private bool $active;
  private int  $contact_counter;
  private int $views;
  private string $close_reason;
  private string $expire_date;
  private string $approval_status;
  private string $ad_link;
  protected function getActive(){
    return $this->active;
  }
  protected function string getAdId(){
    return $this->adId;
  }
   protected function string getCreate_time(){
    return $this->create_time;
  }
   protected function string getUser_id (){
    return $this->User_id;
  }
   protected function string getClose_reason(){
    return $this->close_reason;
  }
   protected function string getExpire_date(){
    return $this->expire_date;
  }
   protected function string getApproval_status(){
    return $this->approval_status;
  }
   protected function string getAd_link(){
    return $this->ad_link;
  } 
  protected function int getViews(){
    return $this->views;
  }
  protected function int getContact_counter(){
    return $this->contact_counter;
  }
}
?>
<?php
 class ads{
   private String $adId;
   private String $create_time;
   private String $user_id;
  private bool $active;
  private int  $contact_counter;
  private int $views;
  private String $close_reason;
  private String $expire_date;
  private String $approval_status;
  private String $ad_link;
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
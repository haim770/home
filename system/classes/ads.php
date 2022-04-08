<?php
 class ads{
   String $adId;
   String $create_time;
   String $user_id;
   bool $active;
  private int  $contact_counter;
  private int $views;
  private String $close_reason;
  private String $expire_date;
  private String $approval_status;
  private String $ad_link;
  protected function String getAdId(){
    return $this->adId;
  }
   protected function String getCreate_time(){
    return $this->create_time;
  }
   protected function String getUser_id (){
    return $this->User_id;
  }
   protected function String getClose_reason(){
    return $this->close_reason;
  }
   protected function String getExpire_date(){
    return $this->expire_date;
  }
   protected function String getApproval_status(){
    return $this->approval_status;
  }
   protected function String getAd_link(){
    return $this->ad_link;
  } 
  protected function String getViews(){
    return $this->views;
  }
  protected function String getContact_counter(){
    return $this->contact_counter;
  }
}
?>
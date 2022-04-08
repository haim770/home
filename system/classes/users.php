<?php
class users{
  private String 	$uuid;
  private String $mail;
  private String 	$first_name;
  private bool $active;
  private int  $contact_counter;
  private int $views;
  private String $close_reason;
  private String $expire_date;
  private String $approval_status;
  private String $ad_link;
  protected function String getUuid(){
    return $this->uuid;
  }
   protected function String getPhone(){
    return $this->create_time;
  }
   protected function String getMail (){
    return $this->mail;
  }
   protected function String getFirst_name(){
    return $this->first_name;
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
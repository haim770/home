<?php
class package{
private string $packageId;
  private string $create_time;
  private string $user_id;
  private bool $is_active;
  private string  $title;
  private int $ad_value;
  private string $content;
  private string $life_cycle;
  private double $price;
  private string $update_time;
   protected function string getTitle(){
    return $this->title;
  }
    protected function getIs_active(){
    return $this->is_active;
  }
  protected function string getPackageId(){
    return $this->packageId;
  }
   protected function string getLife_cycle(){
    return $this->life_cycle;
  }
  protected function string getCreate_time(){
    return $this->create_time;
  }
   protected function string getContent(){
    return $this->content;
  }
   protected function string getUpdate_time(){
    return $this->update_time;
  }
   protected function double getPrice(){
    return $this->price;
  }
   protected function string getAd_link(){
    return $this->ad_link;
  } 
  protected function int getAd_value(){
    return $this->ad_value;
  }

}
  ?>
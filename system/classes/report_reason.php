<?php
class report_reason{
  private string $reason_id  ;
  private string $element_type ;
  private string $reason_name ;
  private string $create_time;
  private bool $active;
  protected function string getReason_id(){
    return $this->reason_id ;
  }	
  protected function string getElement_type (){
    return $this->packageId ;
  }	
  protected function string getReason_name (){
    return $this->reason_name;
  }	
  
  protected function string getCreate_time(){
    return $this->purchase_time;
  }	
  protected function bool getActive(){
    return $this->active;
  }	


}
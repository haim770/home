<?php
 class ads{
   private string $element_id;
   private string $adId;
   private string $category;
  private bool $master;
  private double  $max_value;
  private double $min_value;
  private string $icon;
  private string $free_text;
  private bool $required;
  private string $name;
  protected function string getElement_id(){
    return $this->element_id;
  }
   protected function string getAdId(){
    return $this->adId;
  }
   protected function string getCategory(){
    return $this->category;
  }
   protected function bool getMaster(){
    return $this->master;
  }
   protected function bool getRequired(){
    return $this->required;
  }
  protected function double getMin_value(){
    return $this->Min_value;
  }
   protected function double getMax_value(){
    return $this->max_value;
  }
   protected function string getFree_text(){
    return $this->free_text;
  } 
  protected function string getName(){
    return $this->name;
  }
}
?>
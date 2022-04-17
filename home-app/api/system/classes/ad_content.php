<?php
class ads
{
  private string $element_id;
  private string $adId;
  private string $category;
  private bool $master;
  private float $max_value;
  private float $min_value;
  private string $icon;
  private string $free_text;
  private bool $required;
  private string $name;
  protected function getElement_id()
  {
    return $this->element_id;
  }
  protected function getAdId()
  {
    return $this->adId;
  }
  protected function getCategory()
  {
    return $this->category;
  }
  protected function getMaster()
  {
    return $this->master;
  }
  protected function getRequired()
  {
    return $this->required;
  }
  protected function getMin_value()
  {
    return $this->Min_value;
  }
  protected function getMax_value()
  {
    return $this->max_value;
  }
  protected function getFree_text()
  {
    return $this->free_text;
  }
  protected function getName()
  {
    return $this->name;
  }
}

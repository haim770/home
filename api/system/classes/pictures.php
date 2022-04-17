<?php
class pictures
{
  private int $pictureId;
  private string $element_id;
  private string $serial_number;
  private string $picture_url;
  private string $upload_time;
  private string $alt;
  protected function getSerial_number()
  {
    return $this->id;
  }
  protected function getPictureId()
  {
    return $this->pictureID;
  }
  protected function getElement_id()
  {
    return $this->element_id;
  }
  protected function getPicture_url()
  {
    return $this->picture_url;
  }
  protected function getUpload_time()
  {
    return $this->upload_time;
  }
  protected function getAlt()
  {
    return $this->alt;
  }
}

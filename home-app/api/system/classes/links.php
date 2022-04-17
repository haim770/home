<?php
class links
{
  private string $linkId;
  private string $create_time;
  private string $user_id;
  private string $link_content;
  private string $link;
  private int $views;
  private string $status;


  protected function getLinkId()
  {
    return $this->linkId;
  }
  protected function getCreate_time()
  {
    return $this->create_time;
  }
  protected function getUser_id()
  {
    return $this->User_id;
  }
  protected function getLink_content()
  {
    return $this->link_content;
  }
  protected function getLink()
  {
    return $this->link;
  }
  protected function getViews()
  {
    return $this->link_contviewsent;
  }
  protected function getStatus()
  {
    return $this->status;
  }
}

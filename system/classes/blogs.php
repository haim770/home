<?php
class blogs
{
  private string $blog_id;
  private string $create_time;
  private string $user_id;
  private string $status;
  private string  $title;
  private int $views;
  private string $content;
  private string $update_time;
  private string $cover_image;
  protected function getBlog_id()
  {
    return $this->blog_id;
  }
  protected function getCreate_time()
  {
    return $this->create_time;
  }
  protected function getUser_id()
  {
    return $this->User_id;
  }
  protected function getStatus()
  {
    return $this->status;
  }
  protected function getTitle()
  {
    return $this->title;
  }
  protected function getContent()
  {
    return $this->content;
  }
  protected function getUpdate_time()
  {
    return $this->update_time;
  }
  protected function getViews()
  {
    return $this->views;
  }
  protected function getCover_image()
  {
    return $this->cover_image;
  }
}

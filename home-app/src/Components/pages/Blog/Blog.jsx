import React from 'react'
import BlogHeader
 from './BlogHeader'
import Posts from './posts/Posts'
import SideBar from './sidebar/SideBar'
const Blog = () => {
  return (
    <>
      <BlogHeader />
      <div className='blogBody'>
        <Posts />
        <SideBar />
      </div>
    </>
  )
}

export default Blog
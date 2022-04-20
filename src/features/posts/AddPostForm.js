import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'


import { postAdded } from './postsSlice'

export const AddPostForm = () => {
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [content, setContent] = useState('')
  const [confirm, setConfirm] = useState(false)

  const dispatch = useDispatch()

  const onTitleChanged = e => setTitle(e.target.value)
  const onSubtitleChanged = e => setSubtitle(e.target.value)
  const onContentChanged = e => setContent(e.target.value)

  const onSavePostClicked = () => {
    if (title && subtitle && content) {
      dispatch(postAdded(title, subtitle, content))
      setTitle('')
      setSubtitle('')
      setContent('')
      setConfirm(true);
    }
  }

  if (confirm) {
    return (
      <Navigate to={{ pathname: "/" }} />
    )
  }

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <div className='form-group py-2'>
          <label htmlFor="postTitle">Post Title:</label>
          <input
            className='form-control'
            type="text"
            id="postTitle"
            name="postTitle"
            value={title}
            onChange={onTitleChanged}
          />
        </div>
        <div className='form-group py-2'>
          <label htmlFor="postSubtitle">Post Subtitle:</label>
          <input
            className='form-control'
            type="text"
            id="postSubtitle"
            name="postSubtitle"
            value={subtitle}
            onChange={onSubtitleChanged}
          />
        </div>
        <div className='form-group py-2'>
          <label htmlFor="postContent">Content:</label>
          <textarea
            className='form-control'
            id="postContent"
            name="postContent"
            value={content}
            onChange={onContentChanged}
          />
        </div>
        <button type="button" className='btn btn-primary' style={{backgroundColor: "#5cfc70", borderColor: "#0e2712", color: "#0e2712"}} onClick={onSavePostClicked}>Save Post</button>
      </form>
    </section>
  )
}
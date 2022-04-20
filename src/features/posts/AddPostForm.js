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
      if (title && subtitle && content){
          dispatch(postAdded(title, subtitle, content))
          setTitle('')
          setSubtitle('')
          setContent('')
          setConfirm(true);
      }
  }

  if (confirm){
    return(
      <Navigate to={{pathname: "/"}}/>
    )
  }

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postSubtitle">Post Subtitle:</label>
        <input
          type="text"
          id="postSubtitle"
          name="postSubtitle"
          value={subtitle}
          onChange={onSubtitleChanged}
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button type="button" onClick={onSavePostClicked}>Save Post</button>
      </form>
    </section>
  )
}
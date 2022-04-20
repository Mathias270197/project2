import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { postUpdated, selectPostById } from './postsSlice'


export const EditPostForm = ({ match }) => {
  const { postId } = useParams();

  const post = useSelector(state => selectPostById(state, postId))

  const [title, setTitle] = useState(post.title)
  const [subtitle, setSubtitle] = useState(post.subtitle)
  const [content, setContent] = useState(post.content)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onTitleChanged = e => setTitle(e.target.value)
  const onSubtitleChanged = e => setSubtitle(e.target.value)
  const onContentChanged = e => setContent(e.target.value)

  const onSavePostClicked = () => {
    if (title && subtitle && content) {
      dispatch(postUpdated({ id: postId, title, subtitle, content }))
      navigate(`/posts/${postId}`)
    }
  }

  return (
    <section>
      <h2>Edit Post</h2>
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
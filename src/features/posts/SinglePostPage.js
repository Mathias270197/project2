import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { selectPostById } from './postsSlice'

export const SinglePostPage = ({ match }) => {
  const { postId } = useParams();

  const post = useSelector(state => selectPostById(state, postId))

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }

  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <h5>{post.subtitle}</h5>
        <p className="post-content">{post.content}</p>
        <Link to={`/editPost/${post.id}`} className="button">
            Edit post
        </Link>
      </article>
    </section>
  )
}
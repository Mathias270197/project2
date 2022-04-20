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
        <div className='card-body card my-5'>
        <h2 className='py-5 text-center'>{post.title}</h2>
        <h5 className='py-3'>{post.subtitle}</h5>
        <p className="post-content">{post.content}</p>
        <Link to={`/editPost/${post.id}`} className="btn btn-primary" style={{backgroundColor: "#5cfc70", borderColor: "#0e2712", color: "#0e2712"}}>
            Edit post
        </Link>
        </div>
      </article>
    </section>
  )
}
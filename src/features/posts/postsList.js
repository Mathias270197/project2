import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { selectAllPosts, getPosts } from './postsSlice'
import { Spinner } from '../../components/Spinner';
import { format, parseISO } from "date-fns";
import Pagination from '../../components/Pagination';


const PostExcerpt = ({ post }) => {
  return (
    <>
      <div className="card text-center my-5">
        <div className="card-header">
        <h1>{post.title}</h1>
        <img src={post.imageUrls} className="card-img-top"></img>
        </div>
        <div className="card-body">
          <h5 className="card-title">{post.subtitle}</h5>
          <p className="card-text">{post.content.substring(0, 100)}...</p>
          <Link to={`/posts/${post.id}`} className="btn btn-primary">
          View Post
        </Link>
        </div>
        <div className="card-footer text-muted">
          {format(parseISO(post.articleDates.publicationDate), 'dd/MM/yyyy')}
        </div>
      </div>
    </>
  )
}

export const PostsList = () => {
  const dispatch = useDispatch()
  const posts = useSelector(selectAllPosts)
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const postStatus = useSelector(state => state.posts.status)
  const error = useSelector(state => state.posts.error)

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(getPosts())
    }
  }, [postStatus, dispatch])

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  
  const paginate = pageNumber => setCurrentPage(pageNumber);

  let content

  if (postStatus === 'loading') {
    content = <Spinner text="Loading..." />
  } else if (postStatus === 'succeeded') {
    // Sort posts in reverse chronological order by datetime string
    const orderedPosts = posts.slice().sort((a, b) => b.articleDates.publicationDate.localeCompare(a.articleDates.publicationDate))

    const currentPosts = orderedPosts.slice(indexOfFirstPost, indexOfLastPost);

    content = currentPosts.map(post => (
      <PostExcerpt key={post.id} post={post} />
    ))
  } else if (postStatus === 'failed') {
    content = <div>{error}</div>
  }

  return (
    <>
      <section className="posts-list">
        {content}
      </section>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </>
  )
};

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
      <div className="card text-center col-md-5 my-5" style={{backgroundColor: "#2d7c37", color: "white"}}>
        <div className="card-body">
          <img src={post.imageUrls} width="200" height="400" className="card-img-top img-responsive"></img>
          <h1>{post.title}</h1>
          <h5 className="card-title">{post.subtitle}</h5>
          <p className="card-text">{post.content.substring(0, 100)}...</p>
          <Link to={`/posts/${post.id}`} className="btn btn-primary" style={{backgroundColor: "#0e2712", borderColor: "#5cfc70"}}>
            View Post
          </Link>
        </div>
        {format(parseISO(post.articleDates.publicationDate), 'dd/MM/yyyy')}
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
      <div className="posts-list container">
        <div className="row justify-content-between">
          {content}
        </div>
      </div>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </>
  )
};

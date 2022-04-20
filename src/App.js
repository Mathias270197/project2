import React from 'react';
import './App.css';
import { PostsList } from './features/posts/postsList';
import { AddPostForm } from './features/posts/AddPostForm';
import Navbar from './components/navbar';
import { Routes, Route } from "react-router-dom";
import { SinglePostPage } from './features/posts/SinglePostPage';
import { EditPostForm } from './features/posts/EditPostForm';
import { Info } from './components/info';


function App() {
  return (
    <>
    <header>
      <Navbar />
    </header>
    <React.Fragment>
    </React.Fragment>

    <div className='container'>
        <Routes>
          <Route path='/' exact element = {<PostsList />} />
          <Route path='/posts/create' exact element = {<AddPostForm />} />
          <Route path='/posts/:postId' exact element = {<SinglePostPage />} />
          <Route path='/editPost/:postId' exact element = {<EditPostForm />} />
          <Route path='/info' exact element = {<Info />} />
        </Routes>
    </div>
    </>
  );
}

export default App;

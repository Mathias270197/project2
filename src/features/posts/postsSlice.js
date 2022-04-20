import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";



const initialState = {
        posts: [],
        status: 'idle',
        error: null
}

export const getPosts = createAsyncThunk(
    //action type string
    'posts/getPosts',
    // callback function
    async () => {
      const res = await fetch('https://www.vrt.be/vrtnws/nl/regio/_jcr_content/par/grid.app.json').then(
      (data) => data.json()
    )
    return res
  })


const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer(state,action){
                state.posts.push(action.payload)
            },
            prepare(title, subtitle, content) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        subtitle,
                        content,
                        imageUrls: ["https://picsum.photos/300/200.jpg"],
                        articleDates:{
                          publicationDate: new Date().toISOString(),
                          lastModificationDate: new Date().toISOString(),
                        },
                    }
                }
            }
        },
        postUpdated(state, action) {
            const { id, title, subtitle, content } = action.payload
            const existingPost = state.posts.find(post => post.id === id)
            if (existingPost){
                existingPost.title = title
                existingPost.subtitle = subtitle
                existingPost.content = content
            }
        }
    },
    extraReducers(builder) {
        builder
          .addCase(getPosts.pending, (state, action) => {
            state.status = 'loading'
          })
          .addCase(getPosts.fulfilled, (state, action) => {
            state.status = 'succeeded'
            // Add any fetched posts to the array
            state.posts = state.posts.concat(action.payload)
          })
          .addCase(getPosts.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
          })
      }
})

export const { postAdded, postUpdated } = postsSlice.actions

export default postsSlice.reducer

export const selectAllPosts = state => state.posts.posts

export const selectPostById = (state, postId) =>
  state.posts.posts.find(post => post.id === postId)
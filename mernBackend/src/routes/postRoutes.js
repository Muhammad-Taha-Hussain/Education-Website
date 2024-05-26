import express from 'express'
import {createPost, getPostById, getPosts} from '../controllers/postController.js'

const app = express();

app.post('./create', createPost)

app.get('./posts', getPosts)

app.get('/:postId', getPostById)

export default app;
import express from 'express'
import blog from './controllers/blog'

const router = express.Router()

router
  .get('/blog', blog.findAll)
  .get('/blog/:ID', blog.getBlogByID)
  .post('/blog', blog.create)
  .put('/blog/:ID', blog.updateBlogByID)
  .delete('/blog/:ID', blog.deleteBlogByID)

export default router

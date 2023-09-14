const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
})

blogRouter.post('/', async (request, response) => {
  const { title, url } = request.body;

  if (!title || !url) {
    return response.status(400).json({ error: 'Title and url are required' });
  } else {
      const blog = new Blog(request.body)
      const savedBlog = await blog.save();
      response.status(201).json(savedBlog)
}
})

blogRouter.delete('/:id', async (request, response) => {

  const id = request.params.id;
  const x = await Blog.findById(id)
  if (!x) {
    return response.status(404).json({ error: 'Blog not found' })
  }

  await Blog.findByIdAndRemove(id);
  response.status(204).end();
});

blogRouter.put('/:id', async (request, response) => {
  const { body } = request

  const blogToUpdate = await Blog.findById(request.params.id)

  if ( blogToUpdate ) {
    const blog = {
      title: body.title || blogToUpdate.title,
      author: body.author || blogToUpdate.author,
      url: body.url || blogToUpdate.url,
      likes: body.likes || blogToUpdate.likes,
      comments: body.comments || blogToUpdate.comments,
    };


    
    const updatedBlogDoc = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.status(200).json(updatedBlogDoc)
  } else {
    response.status(404).json({error: 'Blog not found' })
  }

})


module.exports = blogRouter
const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user');

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1});
  response.json(blogs);
})

blogRouter.post('/', async (request, response) => {
  const body = request.body;

  const user = await User.findById(body.userId)

  if (!body.title || !body.url) {
    return response.status(400).json({ error: 'Title and url are required' });
  } else {
      const blog = new Blog({
        url: body.url,
        title: body.title,
        author: body.author,
        user: user.id,
        likes: body.likes,
        
      })

      const savedBlog = await blog.save();
      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()
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
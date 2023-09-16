const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        "title": "Testi",
        "author": "Heinoja",
        "url": "Url3",
        "likes": 5
        
        
    },
    {
        "title": "Heh",
        "author": "haha",
        "url": "Url2",
        "likes": 10
    },
    {
        "title": "Jepu",
        "author": "Jepa",
        "url": "Url3",
        "likes": 15
    }
]

const newBlog = {
    "title": "For testing the blog app",
    "author": "Test2",
    "url": "Test3",
    "likes": 1
}

const missingLikesBlog = {
    "title": "For testing the like defaults",
    "author": "Test2",
    "url": "Test3",
}

const missingTitleBlog = {
    "author": "Test2",
    "url": "Test3",
    "likes": 4
}

const missingUrlBlog = {
    "title": "This blog is  missing the URL",
    "author": "Test2",
    "likes": 4
}


const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}



module.exports = {
    initialBlogs, blogsInDb, newBlog, missingLikesBlog, missingTitleBlog, missingUrlBlog, usersInDb
};
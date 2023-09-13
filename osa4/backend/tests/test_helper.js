const Blog = require('../models/blog')

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

const newNote = {
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


const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, blogsInDb, newNote, missingLikesBlog
};
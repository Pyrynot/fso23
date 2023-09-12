const dummy = (blogs) => {
    return 1;
  }
  

const totalLikes = (blogs) => {
    return blogs.length === 0
    ? 0
    : blogs.reduce((sum, blog) => sum + blog.likes, 0)
  }


const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return 0
    }

    const x = blogs.reduce((a, b) => {
        return b.likes > a.likes ? b : a
    }, blogs[0])

    return {
        title: x.title,
        author: x.author,
        likes: x.likes,
    }
    
}




module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
  }


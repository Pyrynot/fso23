const _ = require('lodash')

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

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return 0
    }

    const authorCounts = _.countBy(blogs, 'author')
    // console.log(authorCounts)

    const mostBlogsAuthor = _.maxBy(_.toPairs(authorCounts), ([_, blogCount]) => blogCount)
    // console.log(mostBlogsAuthor)
    return { author: mostBlogsAuthor[0], blogs: mostBlogsAuthor[1] }
        
    }


const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return 0
    }

    const authorLikes = _.groupBy(blogs, 'author')
    console.log(authorLikes)
    const authorTotalLikes = _.map(authorLikes, (authorBlogs, author) => ({
        author,
        likes: _.sumBy(authorBlogs, 'likes')
    }))
    console.log(authorTotalLikes)

    const mostLikesAuthor = _.maxBy(authorTotalLikes, 'likes')
    console.log(mostLikesAuthor)
    return mostLikesAuthor
}




module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }


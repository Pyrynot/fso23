const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)


const Blog = require('../models/blog');

beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);
}, 20000);

describe('when there is initially some blogs saved', () => {
    test('blogs are returned as json and with correct length', async () => {
        const response = await api.get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/);

        expect(response.body).toHaveLength(helper.initialBlogs.length);
    },20000);

    test('unique identifier named id and not _id', async () => {
        const response = await api.get('/api/blogs');

        response.body.forEach((blog) => {
            expect(blog.id).toBeDefined();
        })

    },20000 )
})

describe('addition of a new blog', () => {
    test('succeeds with valid data', async () => {

        await api
            .post('/api/blogs')
            .send(helper.newNote)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const blogsAtEnd = await helper.blogsInDb();
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
        const contents = blogsAtEnd.map((n) => n.title);
        expect(contents).toContain(
            'For testing the blog app',
        );
    },20000);

    test('like field defaults to 0 if missing', async () => {

        await api
            .post('/api/blogs')
            .send(helper.missingLikesBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const blogsAtEnd = await helper.blogsInDb();
        expect(blogsAtEnd[blogsAtEnd.length -1].likes).toBe(
            0
        )
    },20000)

    test('returns 400 if title is missing', async () => {

        await api
            .post('/api/blogs')
            .send(helper.missingTitleBlog)
            .expect(400)
            .expect('Content-Type', /application\/json/);
                
    })

    test('returns 400 if url is missing', async () => {

        await api
            .post('/api/blogs')
            .send(helper.missingUrlBlog)
            .expect(400)
            .expect('Content-Type', /application\/json/);
                
    })
})

describe('deletion of a new blog', () => {
    test('returns 204 and deletes the blog from the database', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(
            helper.initialBlogs.length - 1
        )
        
        const contents = blogsAtEnd.map(r => r.id)
        expect(contents).not.toContain(blogToDelete.id)
    })

    test ('returns 404 if id is not found', async () => {
        await api
            .delete('/api/blogs/111111111a1a1aa111111111')
            .expect(404)

    })
})

describe('updating of a blog', () => {
    test('returns 200 and updates likes in the database', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send({"likes": 15})
            .expect(200)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd[0].likes).not.toEqual(blogToUpdate.likes)
    })

    test('returns 404 if id is not found', async () => {
        await api
            .put('/api/blogs/111111111a1a1aa111111111')
            .send({"likes": 15})
            .expect(404)
    })
})


afterAll(async () => {
    await mongoose.connection.close();
});






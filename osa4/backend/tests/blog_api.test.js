const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)

const Blog = require('../models/blog');

beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);
});

describe('when there is initially some blogs saved', () => {
    test('blogs are returned as json and with correct length', async () => {
        const response = await api.get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/);

        expect(response.body).toHaveLength(helper.initialBlogs.length);
    });

    test('unique identifier named id and not _id', async () => {
        const response = await api.get('/api/blogs');

        response.body.forEach((blog) => {
            expect(blog.id).toBeDefined();
        })

    })
})

describe('addition of a new note', () => {
    test('succeeds with valid data', async () => {

        await api
            .post('/api/blogs')
            .send(helper.newNote)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const blogsAtEnd = await helper.blogsInDb();
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
        console.log(blogsAtEnd)
        const contents = blogsAtEnd.map((n) => n.title);
        expect(contents).toContain(
            'For testing the blog app',
        );
    });

    test('like field defaults to 0 if missing', async () => {

        await api
            .post('/api/blogs')
            .send(helper.missingLikesBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const blogsAtEnd = await helper.blogsInDb();
        console.log(blogsAtEnd)
        expect(blogsAtEnd[blogsAtEnd.length -1].likes).toBe(
            0
        )
    })
})

afterAll(async () => {
    await mongoose.connection.close();
});
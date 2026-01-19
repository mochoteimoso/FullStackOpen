const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

describe('when database already has some blog entries', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.listWithMultipleBlogs)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length,
    helper.listWithMultipleBlogs.length)
  })

  test('unique identifier of blogs is called id (not _id)', async () => {
    const response = await api.get('/api/blogs')

    response.body.forEach(blog => {
      assert.ok(blog.id)
    })
  })

  describe('addition of a new note', () => {
    test('a valid blog can be added ', async () => {
      const newBlog = {
        _id: "9a999a999b99a676234d17f9",
        title: "Reactions to patterns",
        author: "Sherlock Holmes",
        url: "https://reactionstopatterns.com/",
        likes: 77,
        __v: 0
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.listWithMultipleBlogs.length + 1)

      const contents = blogsAtEnd.map(n => n.title)
      assert(contents.includes('Reactions to patterns'))
    })

    test('if likes property is missing, its value reverts to 0', async () => {
      const newBlog = {
        title: "Bafflement ratio",
        author: "Doctor Watson",
        url: "https://bafflementratio.com/"
      }

      await api
        .post('/api/blogs')
        .send(newBlog)

      const response = await api.get('/api/blogs')

      const createdBlog = response.body.find(entry => entry.title === newBlog.title)
      assert.strictEqual(createdBlog.likes, 0)
    })

    test('blog without title or url is not added', async () => {
      const newBlog = {
        author: "Moriarty"
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.listWithMultipleBlogs.length)
    })
  })

  describe('deletion of a note', () => {
    test('succeeds with status code 204', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      const ids = blogsAtEnd.map(n => n.id)
      assert(!ids.includes(blogToDelete.id))

      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)
    })
  })

  describe('updating a blog entry', () => {
    test('succeeds with status code 200 when updating likes', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate= blogsAtStart[1]

      const updatedData = {
        ...blogToUpdate,
        likes: blogToUpdate.likes + 3
      }
      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedData)
        .expect(200)
      
      const blogsAtEnd = await helper.blogsInDb()
      const updatedBlog = blogsAtEnd.find(b => b.id === blogToUpdate.id)

      assert.strictEqual(updatedBlog.likes, updatedData.likes)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})


const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')

describe('total likes', () => {

   test('when list is empty, result should be zero', () => {
    const result = listHelper.totalLikes(helper.emptyList)
    //console.log("Total likes Test 1: sum = ", result)
    assert.strictEqual(result, 0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(helper.listWithOneBlog)
    //console.log("Total likes Test 2: sum = ", result)
    assert.strictEqual(result, 5)
  })

  test('when list has multiple blogs, equals the sum of their likes', () => {
    const result = listHelper.totalLikes(helper.listWithMultipleBlogs)
    //console.log("Total likes Test 3: sum = ", result)
    assert.strictEqual(result, 36)
  })
})

describe('most likes', () => {

  test('when list is empty, no blog should be returned', () => {
    const result = listHelper.favoriteBlog(helper.emptyList)
    //console.log("Most likes Test 1: = ", result)
    assert.deepStrictEqual(result, null)
  })

  test('when list has only one blog, equals that one', () => {
    const result = listHelper.favoriteBlog(helper.listWithOneBlog)
    //console.log("Most likes Test 2: = ", result)
    assert.strictEqual(result, helper.listWithOneBlog[0])
  })

  test('when list has multiple blogs, equals the one with most likes', () => {
    const result = listHelper.favoriteBlog(helper.listWithMultipleBlogs)
    //console.log("Most likes Test 3: = ", result)
    assert.strictEqual(result, helper.listWithMultipleBlogs[2])
  })
})

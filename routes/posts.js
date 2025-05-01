const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET /posts - Show all posts
router.get('/', async (req, res) => {
  const posts = await prisma.post.findMany();
  res.render('posts/index', { posts });
});

// GET /posts/create - Show create form
// POST /posts/create - Handle form submission
router
  .route('/create')
  .get((req, res) => {
    res.render('posts/create');
  })
  .post(async (req, res) => {
    try {
      const { title, content, published } = req.body;
      await prisma.post.create({
        data: {
          title,
          content,
          published: published === 'on',
        },
      });
      res.redirect('/posts');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error creating post');
    }
  });

// ✅ NEW: GET /posts/:id/edit - Show edit form
router.get('/:id/edit', async (req, res) => {
  const post = await prisma.post.findUnique({
    where: { id: req.params.id },
  });

  if (!post) {
    return res.status(404).send('Post not found');
  }

  res.render('posts/edit', { post });
});

// GET /posts/:id - Show single post
router.get('/:id', async (req, res) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id: req.params.id },
    });

    if (!post) {
      return res.status(404).send('Post not found');
    }

    res.render('posts/show', { post });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching post');
  }
});

// PUT /posts/:id - Update post
router.put('/:id', async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedPost = await prisma.post.update({
      where: { id: req.params.id },
      data: { title, content },
    });
    res.render('posts/show', { post: updatedPost });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating post');
  }
});

// DELETE /posts/:id - Delete post
router.delete('/:id', async (req, res) => {
  try {
    await prisma.post.delete({
      where: { id: req.params.id },
    });
    res.redirect('/posts');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting post');
  }
});

module.exports = router;

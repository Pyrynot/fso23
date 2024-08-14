const { test, expect, beforeEach, describe } = require('@playwright/test');

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:5173/api/testing/reset');
    await request.post('http://localhost:5173/api/users', {
      data: {
        name: 'Test User',
        username: 'testuser',
        password: 'password',
      },
    });
    await page.goto('http://localhost:5173');
  });

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('login')).toBeVisible();
  });

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByPlaceholder('username').fill('testuser');
      await page.getByPlaceholder('password').fill('password');
      await page.getByRole('button', { name: 'login' }).click();
      await expect(page.getByText('Test User logged in')).toBeVisible();
    });

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByPlaceholder('username').fill('testuser');
      await page.getByPlaceholder('password').fill('wrongpassword');
      await page.getByRole('button', { name: 'login' }).click();

      await expect(page.getByText('wrong credentials')).toBeVisible();
    });
  });
});

describe('When logged in', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
    await page.getByPlaceholder('username').fill('testuser');
    await page.getByPlaceholder('password').fill('password');
    await page.getByRole('button', { name: 'login' }).click();
  });

  test('a new blog can be created', async ({ page }) => {
    await page.getByRole('button', { name: 'Create new blog' }).click();
    await page.getByPlaceholder('Title').fill('Test Blog');
    await page.getByPlaceholder('Author').fill('Author');
    await page.getByPlaceholder('URL').fill('http://testblog.com');
    await page.getByRole('button', { name: 'create' }).click();

    await expect(page.getByText('Test Blog Author view')).toBeVisible();
  });
});

test('a blog can be liked', async ({ page, request }) => {
  await request.post('http://localhost:5173/api/testing/reset');
  await request.post('http://localhost:5173/api/users', {
    data: {
      name: 'Test User',
      username: 'testuser',
      password: 'password',
    },
  });
  await page.goto('http://localhost:5173');
  await page.getByPlaceholder('username').fill('testuser');
  await page.getByPlaceholder('password').fill('password');
  await page.getByRole('button', { name: 'login' }).click();

  // Create a blog
  await page.getByRole('button', { name: 'Create new blog' }).click();
  await page.getByPlaceholder('Title').fill('Test Blog');
  await page.getByPlaceholder('Author').fill('Author');
  await page.getByPlaceholder('URL').fill('http://testblog.com');
  await page.getByRole('button', { name: 'create' }).click();

  // Like the blog
  await page.getByRole('button', { name: 'view' }).click();
  await page.getByRole('button', { name: 'like' }).click();
  await expect(page.getByText('1 likes')).toBeVisible();
});

test('a blog can be deleted by the user who created it', async ({ page, request }) => {
  await request.post('http://localhost:5173/api/testing/reset');
  await request.post('http://localhost:5173/api/users', {
    data: {
      name: 'Test User',
      username: 'testuser',
      password: 'password',
    },
  });
  await page.goto('http://localhost:5173');
  await page.getByPlaceholder('username').fill('testuser');
  await page.getByPlaceholder('password').fill('password');
  await page.getByRole('button', { name: 'login' }).click();
  await page.getByRole('button', { name: 'Create new blog' }).click();
  await page.getByPlaceholder('Title').fill('Test Blog');
  await page.getByPlaceholder('Author').fill('Author');
  await page.getByPlaceholder('URL').fill('http://testblog.com');
  await page.getByRole('button', { name: 'create' }).click();
  await page.getByRole('button', { name: 'view' }).click();
  await page.getByRole('button', { name: 'like' }).click();

  page.once('dialog', async (dialog) => {
    await dialog.accept();
  });

  await page.getByRole('button', { name: 'remove' }).click();
  await expect(page.getByText('Test Blog Author')).not.toBeVisible();
});




test('only the user who created the blog sees the delete button', async ({ page, request }) => {
  await request.post('http://localhost:5173/api/testing/reset');
  await request.post('http://localhost:5173/api/users', {
    data: {
      name: 'Test User',
      username: 'testuser',
      password: 'password',
    },
  });
  await page.goto('http://localhost:5173');
  await page.getByPlaceholder('username').fill('testuser');
  await page.getByPlaceholder('password').fill('password');
  await page.getByRole('button', { name: 'login' }).click();
  await page.getByRole('button', { name: 'Create new blog' }).click();
  await page.getByPlaceholder('Title').fill('Test Blog');
  await page.getByPlaceholder('Author').fill('Author');
  await page.getByPlaceholder('URL').fill('http://testblog.com');
  await page.getByRole('button', { name: 'create' }).click();
  await page.getByRole('button', { name: 'view' }).click();
  await page.getByRole('button', { name: 'like' }).click();
  await expect(page.getByRole('button', { name: 'remove' })).toBeVisible();
  await page.getByRole('button', { name: 'logout' }).click();
  await request.post('http://localhost:5173/api/users', {
    data: {
      name: 'Other User',
      username: 'otheruser',
      password: 'password',
    },
  });
  await page.getByPlaceholder('username').fill('otheruser');
  await page.getByPlaceholder('password').fill('password');
  await page.getByRole('button', { name: 'login' }).click();
  await page.getByRole('button', { name: 'view' }).click();
  await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible();
});




test('blogs are ordered by likes', async ({ page }) => {
  const blogs = await page.locator('.blog').all();
  const likes = await Promise.all(
    blogs.map(async (blog) => {
      const likeText = await blog.getByText(/likes/).innerText();
      return parseInt(likeText.match(/\d+/)[0]);
    })
  );
  for (let i = 1; i < likes.length; i++) {
    expect(likes[i]).toBeLessThanOrEqual(likes[i - 1]);
  }
});

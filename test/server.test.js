const tap = require('tap');
const supertest = require('supertest');
const app = require('../app');
const server = supertest(app);

const mockUser = {
    name: 'Clark Kent',
    username: 'superman',
    email: 'clark@superman.com',
    password: 'Krypt()n8',
    newsPreferences:['movies', 'comics']
};

let token = '';

// Auth tests

tap.test('POST /users/register', async (t) => { 
    const response = await server.post('/users/register').send(mockUser);
    t.equal(response.status, 201);
    t.end();
});

tap.test('POST /users/register register the same user', async (t) => { 
    const response = await server.post('/users/register').send(mockUser);
    t.equal(response.status, 400);
    t.end();
});

tap.test('POST /users/register with missing email', async (t) => {
    const response = await server.post('/users/register').send({
        name: mockUser.name,
        password: mockUser.password
    });
    t.equal(response.status, 400);
    t.end();
});

tap.test('POST /users/login', async (t) => { 
    const response = await server.post('/users/login').send({
        username: mockUser.username,
        password: mockUser.password
    });
    t.equal(response.status, 200);
    t.hasOwnProp(response.body, 'accessToken');
    token = response.body.accessToken;
    t.end();
});

tap.test('POST /users/login with wrong password', async (t) => {
    const response = await server.post('/users/login').send({
        email: mockUser.email,
        password: 'wrongpassword'
    });
    t.equal(response.status, 401);
    t.end();
});

// Preferences tests

tap.test('GET /users/preferences', async (t) => {
    const response = await server.get('/users/preferences').set('Authorization', `Bearer ${token}`);
    t.equal(response.status, 200);
    t.hasOwnProp(response.body, 'newsPreferences');
    t.same(response.body.newsPreferences, mockUser.newsPreferences);
    t.end();
});

tap.test('GET /users/preferences without token', async (t) => {
    const response = await server.get('/users/preferences');
    t.equal(response.status, 401);
    t.end();
});

tap.test('PUT /users/preferences', async (t) => {
    const response = await server.put('/users/preferences').set('Authorization', `Bearer ${token}`).send({
        newsPreferences: ['movies', 'comics', 'games']
    });
    t.equal(response.status, 200);
});

tap.test('Check GET /users/preferences', async (t) => {
    const response = await server.get('/users/preferences').set('Authorization', `Bearer ${token}`);
    t.equal(response.status, 200);
    console.log(response.body);
    t.same(response.body.newsPreferences, ['movies', 'comics', 'games']);
    t.end();
});

// News tests

tap.test('GET /news', async (t) => {
    const response = await server.get('/news').set('Authorization', `Bearer ${token}`);
    t.equal(response.status, 200);
    t.hasOwnProp(response.body, 'news');
    t.end();
});

tap.test('GET /news without token', async (t) => {
    const response = await server.get('/news');
    t.equal(response.status, 401);
    t.end();
});



tap.teardown(() => {
    process.exit(0);
});
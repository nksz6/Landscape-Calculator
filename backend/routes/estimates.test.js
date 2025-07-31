const request = require('supertest');
const express = require('express');
const pool = require('../db');
const estimateRoutes = require('./estimates');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use('/api/estimates', estimateRoutes);

//DATABASE SETUP
let client;
let querySpy;

beforeEach(async () => {
  client = await pool.connect();
  await client.query('BEGIN');

  querySpy = jest.spyOn(pool, 'query');
  querySpy.mockImplementation((...args) => client.query(...args));
});

afterEach(async () => {
  await client.query('ROLLBACK');
  client.release();

  querySpy.mockRestore();
});

//tests
describe('Estimate Routes API', () => {
  let testUser;
  let token;

  beforeEach(async () => {
    const userResult = await client.query(
      "INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email",
      ['test@example.com', 'password123']
    );
    testUser = userResult.rows[0];
    token = jwt.sign({ id: testUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  });

  describe('GET /api/estimates', () => {
    it('should return 401 Unauthorized if no token is provided', async () => {
      const response = await request(app).get('/api/estimates');
      expect(response.statusCode).toBe(401);
    });

    it('should return an empty array if the user has no estimates', async () => {
      const response = await request(app)
        .get('/api/estimates')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual([]);
    });

    it('should return estimates for the authenticated user', async () => {
      await client.query(
        `INSERT INTO estimates (user_id, service_name, input_value, unit_label, estimated_cost)
         VALUES ($1, 'Test Service', 100, 'sq ft', 50.00)`,
        [testUser.id]
      );

      const response = await request(app)
        .get('/api/estimates')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBe(1);
      expect(response.body[0].service_name).toBe('Test Service');
    });
  });

  describe('POST /api/estimates', () => {
    it('should save an estimate for the authenticated user', async () => {
        const estimateData = {
            serviceName: 'New Paver Patio',
            materialName: 'Bluestone',
            inputValue: 250,
            unitLabel: 'sq ft',
            estimatedCost: 7500.00
        };

        const response = await request(app)
            .post('/api/estimates')
            .set('Authorization', `Bearer ${token}`)
            .send(estimateData);

        expect(response.statusCode).toBe(201);
        expect(response.body.service_name).toBe('New Paver Patio');
        expect(response.body.user_id).toBe(testUser.id);
    });
  });
});
import request from 'supertest';
import express from 'express';
import { textRoutes } from '../../../routes/textRoutes';
import { texts } from '../../../storage/textMemory';

const app = express();
app.use(express.json());
app.use('/texts', textRoutes);

describe('Text Routes Integration Tests', () => {
  beforeEach(() => {
    texts.length = 0;
  });

  describe('POST /texts', () => {
    it('should create a new text', async () => {
      const response = await request(app)
        .post('/texts')
        .send({
          title: 'Test Title',
          content: 'Test Content',
          status: 'draft',
          author: 'Test Author'
        });
      
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(texts.length).toBe(1);
    });

    it('should return 400 if missing required fields', async () => {
      const response = await request(app)
        .post('/texts')
        .send({
          title: 'Incomplete'
        });
      
      expect(response.status).toBe(400);
    });
  });

  describe('GET /texts', () => {
    it('should return all texts', async () => {
      // Pré-popular com dados de teste
      texts.push({
        id: '1',
        title: 'Test 1',
        content: 'Content 1',
        status: 'draft',
        author: 'Author 1',
        createdAt: new Date()
      });

      const response = await request(app).get('/texts');
      
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(1);
    });
  });

  describe('DELETE /texts/:id', () => {
    it('should delete an existing text', async () => {
      const text = {
        id: '1',
        title: 'Test 1',
        content: 'Content 1',
        status: 'draft',
        author: 'Author 1',
        createdAt: new Date()
      };
      texts.push(text);

      const response = await request(app).delete(`/texts/${text.id}`);
      
      expect(response.status).toBe(204);
      expect(texts.length).toBe(0);
    });

    it('should return 404 if text does not exist', async () => {
      const response = await request(app).delete('/texts/non-existent-id');
      
      expect(response.status).toBe(404);
    });
  });

  describe('PATCH /texts/:id', () => {
    it('should update an existing text', async () => {
      const text = {
        id: '1',
        title: 'Original Title',
        content: 'Original Content',
        status: 'draft',
        author: 'Author 1',
        createdAt: new Date()
      };
      texts.push(text);

      const response = await request(app)
        .patch(`/texts/${text.id}`)
        .send({ title: 'Updated Title' });
      
      expect(response.status).toBe(200);
      expect(response.body.title).toBe('Updated Title');
      expect(texts[0].title).toBe('Updated Title');
    });

    it('should return 404 if text does not exist', async () => {
      const response = await request(app)
        .patch('/texts/non-existent-id')
        .send({ title: 'Updated Title' });
      
      expect(response.status).toBe(404);
    });
  });
});
import { Request, Response } from 'express';
import { TextController } from '../../../controllers/TextController';
import { TextService } from '../../../services/TextService';

// Mock completo do TextService
jest.mock('../../../services/TextService', () => ({
  TextService: jest.fn().mockImplementation(() => ({
    createText: jest.fn(),
    getAllTexts: jest.fn(),
    deleteTaskById: jest.fn(),
    updateText: jest.fn()
  }))
}));

describe('TextController', () => {
  let controller: TextController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockService: jest.Mocked<TextService>;

  beforeEach(() => {
    // Resetar todos os mocks antes de cada teste
    jest.clearAllMocks();
    
    mockService = new TextService() as jest.Mocked<TextService>;
    controller = new TextController();
    
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn()
    };
  });

  describe('create()', () => {
    it('should return 400 if any field is missing', () => {
      mockRequest = {
        body: { title: 'Only Title' } // Campos faltando
      };

      controller.create(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Todos os campos são obrigatórios."
      });
    });

    it('should create text and return 201 with the created text', () => {
      const mockText = {
        id: '123',
        title: 'Test',
        content: 'Content',
        status: 'draft',
        author: 'Author',
        createdAt: new Date()
      };

      mockRequest = {
        body: {
          title: 'Test',
          content: 'Content',
          status: 'draft',
          author: 'Author'
        }
      };

      mockService.createText.mockReturnValue(mockText);

      controller.create(mockRequest as Request, mockResponse as Response);

      expect(mockService.createText).toHaveBeenCalledWith(
        'Test', 'Content', 'draft', 'Author'
      );
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(mockText);
    });
  });

  describe('list()', () => {
    it('should return all texts', () => {
      const mockTexts = [
        {
          id: '1',
          title: 'Test 1',
          content: 'Content 1',
          status: 'draft',
          author: 'Author 1',
          createdAt: new Date()
        }
      ];

      mockService.getAllTexts.mockReturnValue(mockTexts);
      mockRequest = {};

      controller.list(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.json).toHaveBeenCalledWith(mockTexts);
    });
  });

  describe('delete()', () => {
    it('should return 404 if text not found', () => {
      mockRequest = { params: { id: '999' } };
      mockService.deleteTaskById.mockReturnValue(false);

      controller.delete(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Texto não encontrado."
      });
    });

    it('should return 204 if deletion succeeds', () => {
      mockRequest = { params: { id: '123' } };
      mockService.deleteTaskById.mockReturnValue(true);

      controller.delete(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(204);
      expect(mockResponse.send).toHaveBeenCalled();
    });
  });

  describe('patch()', () => {
    it('should return 404 if text not found', () => {
      mockRequest = {
        params: { id: '999' },
        body: { title: 'New Title' }
      };
      mockService.updateText.mockReturnValue(null);

      controller.patch(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Texto não encontrado."
      });
    });

    it('should return updated text if update succeeds', () => {
      const updatedText = {
        id: '123',
        title: 'New Title',
        content: 'Content',
        status: 'draft',
        author: 'Author',
        createdAt: new Date()
      };

      mockRequest = {
        params: { id: '123' },
        body: { title: 'New Title' }
      };
      mockService.updateText.mockReturnValue(updatedText);

      controller.patch(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.json).toHaveBeenCalledWith(updatedText);
    });
  });
});
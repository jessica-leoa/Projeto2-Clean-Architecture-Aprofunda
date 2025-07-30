import { TextService } from '../../../services/TextService';
import { texts } from '../../../storage/textMemory';

describe('TextService Unit Tests', () => {
  let service: TextService;

  beforeEach(() => {
    // Limpa o array antes de cada teste
    texts.length = 0;
    service = new TextService();
  });

  describe('createText', () => {
    it('should create a new text', () => {
      const result = service.createText('Title', 'Content', 'draft', 'Author');
      expect(result).toHaveProperty('id');
      expect(result.title).toBe('Title');
      expect(texts.length).toBe(1);
    });
  });

  describe('getAllTexts', () => {
    it('should return all texts', () => {
      service.createText('Title 1', 'Content 1', 'draft', 'Author 1');
      service.createText('Title 2', 'Content 2', 'published', 'Author 2');
      
      const result = service.getAllTexts();
      expect(result.length).toBe(2);
    });
  });

  describe('deleteText', () => {
    it('should delete an existing text', () => {
      const text = service.createText('Title', 'Content', 'draft', 'Author');
      const result = service.deleteTaskById(text.id);
      
      expect(result).toBe(true);
      expect(texts.length).toBe(0);
    });

    it('should return false when text does not exist', () => {
      const result = service.deleteTaskById('non-existent-id');
      expect(result).toBe(false);
    });
  });

  describe('updateText', () => {
    it('should update an existing text', () => {
      const text = service.createText('Title', 'Content', 'draft', 'Author');
      const updated = service.updateText(text.id, { title: 'New Title' });
      
      expect(updated?.title).toBe('New Title');
      expect(texts[0].title).toBe('New Title');
    });

    it('should return null when text does not exist', () => {
      const result = service.updateText('non-existent-id', { title: 'New Title' });
      expect(result).toBeNull();
    });
  });
});
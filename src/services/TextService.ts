import { Text } from "../models/Text";
import { texts } from "../storage/textMemory";
import { TextFactory } from "../factories/TextFactory";
import { text } from "stream/consumers";

export class TextService {
  createText(title: string, content: string, status: string, author: string): Text {
    const newText = TextFactory.create(title, content, status, author);
    texts.push(newText);
    return newText;
  }

  getAllTexts(): Text[] {
    return texts;
  }

  deleteTaskById(id: string): boolean {
    const index = texts.findIndex(text => text.id === id);
    if (index === -1) return false;
    texts.splice(index, 1);
    return true;
  }

  updateText(id: string, updatedFields: Partial<Text>): Text | null {
    const text = texts.find(text => text.id === id);
    if (!text) return null;

    Object.assign(text, updatedFields);
    return text;
  }
  
}

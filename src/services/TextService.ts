import { Text } from "../models/Text";
import { texts } from "../storage/textMemory";
import { TextFactory } from "../factories/TextFactory";

export class TextService {
  createText(title: string, content: string, status: string, author: string): Text {
    const newText = TextFactory.create(title, content, status, author);
    texts.push(newText);
    return newText;
  }

  getAllTexts(): Text[] {
    return texts;
  }
}

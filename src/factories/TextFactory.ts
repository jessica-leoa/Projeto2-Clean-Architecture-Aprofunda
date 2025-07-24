import { Text } from "../models/Text";
import { v4 as uuidv4 } from "uuid";

export class TextFactory {
  static create(title: string, content: string, status: string, author: string): Text {
    return {
      id: uuidv4(),
      title,
      content,
      status,
      author,
      createdAt: new Date()
    };
  }
}

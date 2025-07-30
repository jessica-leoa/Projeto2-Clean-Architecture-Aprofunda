import { Request, Response } from "express";
import { TextService } from "../services/TextService";

const textService = new TextService();

export class TextController {
  create(req: Request, res: Response): Response {
    const { title, content, status, author } = req.body;

    if (!title || !content || !status || !author) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios." });
    }

    const text = textService.createText(title, content, status, author);
    return res.status(201).json(text);
  }

  list(req: Request, res: Response): Response {
    const allTexts = textService.getAllTexts();
    return res.json(allTexts);
  }

   delete(req: Request, res: Response): Response {
    const { id } = req.params;
    const isDeleted = textService.deleteTaskById(id);

    if (!isDeleted) {
      return res.status(404).json({ message: "Texto não encontrado." });
    }

    return res.status(204).send();
  }

  patch(req: Request, res: Response): Response {
    const { id } = req.params;
    const updatedFields = req.body;

    const updatedText = textService.updateText(id, updatedFields);

    if (!updatedText) {
      return res.status(404).json({ message: "Texto não encontrado." });
    }

    return res.json(updatedText);
  }
}

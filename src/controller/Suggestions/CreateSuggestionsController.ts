import { Request, Response } from "express";
import { CreateSuggestions } from "../../services/Suggestions/CreateSuggestionsService";

class CreateSuggestionsController {
  async handle(request: Request, response: Response) {
    const createSuggestionsService = new CreateSuggestions();
    const {
      subject,
      comments,
      sugestionType
    } = request.body

    if(!comments) {
      throw new Error("Por favor, insira um comentário")
    }

    const exercise = await createSuggestionsService.execute({subject, comments, sugestionType});

    return response.json(exercise)
  }
}

export {CreateSuggestionsController}
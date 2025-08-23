import { Request, Response } from "express";
import { ListSuggestionsServices } from "../../services/Suggestions/ListSuggestionsServices";

class ListSuggestionsController {
  async handle(request: Request, response: Response) {
    const listSiggestionsService = new ListSuggestionsServices();

    const suggestions = await listSiggestionsService.execute();

    return response.json(suggestions)
  }
}

export {ListSuggestionsController}
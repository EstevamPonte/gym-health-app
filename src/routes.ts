import { Request, Response, Router } from "express";
import { CreateUserController } from "./controller/Users/CreateUserController";

const router = Router()

const createUserController = new CreateUserController()

router.post('/user', createUserController.handle)

export {router}
import { Request, Response, Router } from "express";
import { ensureAuthenticate } from "./middlewares/ensureAuthenticate";
import { CreateUserController } from "./controller/Users/CreateUserController";
import { AuthenticateUserController } from "./controller/Users/AuthenticateUserController";
import { DeleteUserController } from "./controller/Users/DeleteUserController";
import { LogoutUser } from "./controller/Users/LogoutUser";
import { CreateCodeController } from "./controller/Code/CreateCodeController";
import { AuthenticateUserWithCodeController } from "./controller/Code/AuthenticateUserWithCodeController";
import { CreateFileController } from "./controller/File/CreateFileController";
import { ListFileController } from "./controller/File/ListFileController";
import { DeleteFileController } from "./controller/File/DeleteFileController";
import { CreateExerciseController } from "./controller/Exercise/CreateExerciseController";
import { ListExerciseController } from "./controller/Exercise/ListExerciseController";
import { DeleteExerciseController } from "./controller/Exercise/DeleteExerciseController";
import { UpdateExerciseController } from "./controller/Exercise/UpdateExerciseController";
import { CreateSuggestionsController } from "./controller/Suggestions/CreateSuggestionsController";
import { ListSuggestionsController } from "./controller/Suggestions/ListSuggestionsController";

const router = Router();

const createUserController = new CreateUserController();
const acauthenticateUserController = new AuthenticateUserController();
const deleteUserController = new DeleteUserController();
const logoutUser = new LogoutUser();

const createCodeController = new CreateCodeController();
const authenticateUserWithCodeController =
  new AuthenticateUserWithCodeController();

const createFileController = new CreateFileController();
const listFileController = new ListFileController();
const deleteFileController = new DeleteFileController();

const createExerciseController = new CreateExerciseController();
const listExerciseController = new ListExerciseController();
const deleteExerciseController = new DeleteExerciseController();
const updateExerciseController = new UpdateExerciseController();

const createSuggestionsController = new CreateSuggestionsController();
const listSuggestionsController = new ListSuggestionsController();

router.post("/user", createUserController.handle);
router.delete("/deleteuser", ensureAuthenticate, deleteUserController.handle);
router.post("/login", acauthenticateUserController.handle);
router.delete("/logout", ensureAuthenticate, logoutUser.handle);

router.get("/createCode", ensureAuthenticate, createCodeController.handle);
router.post("/loginWithCode", authenticateUserWithCodeController.handle);

router.post("/createFile", ensureAuthenticate, createFileController.handle);
router.get("/listFile", ensureAuthenticate, listFileController.handle);
router.delete(
  "/deleteFile/:fileID",
  ensureAuthenticate,
  deleteFileController.handle,
);

router.post(
  "/createExercise",
  ensureAuthenticate,
  createExerciseController.handle,
);
router.get(
  "/listExercise/:fileId",
  ensureAuthenticate,
  listExerciseController.handle,
);
router.delete(
  "/deleteExercise/:fileId",
  ensureAuthenticate,
  deleteExerciseController.handle,
);
router.put(
  "/updateExercise",
  ensureAuthenticate,
  updateExerciseController.handle,
);

router.post("/suggestions", createSuggestionsController.handle);
router.get("/suggestions", listSuggestionsController.handle);

export { router };

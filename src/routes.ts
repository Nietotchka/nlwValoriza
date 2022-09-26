import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import { CreateTagController } from "./controllers/CreateTagController";
import { ensureAdmin } from "./middlewares/ensureAdmin"
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { ListSendComplimentsController } from "./controllers/ListUserSendComplimentsController";
import { ListReceiveComplimentsController } from "./controllers/ListUserReceiveComplimentsController";
import { ListTagsController } from "./controllers/ListTagsController";
import { ListUsersController } from "./controllers/ListUsersController";

const router = Router();

const createUserController = new CreateUserController();
const createTagController=new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listSendComplimentsController = new ListSendComplimentsController();
const listReceiveComplimentsController = new ListReceiveComplimentsController();
const listTagsController = new ListTagsController();
const listUsersController = new ListUsersController();

router.post("/users", createUserController.handle);
router.post("/tags", ensureAuthenticated,  ensureAdmin, createTagController.handle);
router.post("/login", authenticateUserController.handle);
router.post("/compliments", ensureAuthenticated, createComplimentController.handle);

router.get("/users/compliments/send", ensureAuthenticated, listSendComplimentsController.handle)
router.get("/users/compliments/receive", ensureAuthenticated, listReceiveComplimentsController.handle)
router.get("/tags", ensureAuthenticated, listTagsController.handle);
router.get("/users", ensureAuthenticated, listUsersController.handle);

export{router};
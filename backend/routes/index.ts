import { Router } from "express";

import userRouter from "./users";

// Init router
const apiRouter = Router();

// Add path routers
apiRouter.use("/", userRouter);

export default apiRouter;

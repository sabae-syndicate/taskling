import {
	type NextFunction,
	type Request,
	type Response,
	Router,
} from "express";

const userRouter = Router();

// Add path routers
userRouter.get("/", (_: Request, res: Response, __: NextFunction) => {
	res.send("Hello world! The Taskling backend API is here!!");
});

export default userRouter;

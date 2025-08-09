import type {Request, Response} from "express";
import express from "express";
const router = express.Router();

router.get("/test", (req: Request, res: Response) => {
	res.send("Getting from user.ts")
})
router.get("/test2", (req: Request, res: Response) => {
	res.send("Getting from user.taas")
})

export default router;

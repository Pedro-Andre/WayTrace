import { Router } from "express";
import { createUser, getAllUsers } from "../controllers/user-controller";
// import "dotenv/config";

const router = Router();

router.post("/", createUser);
router.get("/", getAllUsers);

// console.log(process.env.API_KEY);

export default router;

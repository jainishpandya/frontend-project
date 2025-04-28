import TransactionController from "../controller/transactionController.js";

import express from "express";
const router = express.Router();

router.post("/request", TransactionController.borrowRequest);
router.post("/accept", TransactionController.RequestApproval);
router.post("/drop", TransactionController.BookDropped);

export default router;
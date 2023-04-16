const express = require("express");
const { addTransaction, getAllTransaction, editTransaction, deleteTransaction } = require("../controllers/transactionCtrl");

//router object
const router = express.Router();

//routers
// add te=rasaction method post 
router.post("/add-transaction", addTransaction);

//edit 
router.post("/edit-transaction", editTransaction);

//delete
router.post("/delete-transaction", deleteTransaction);


//get trasaction
router.post("/get-transaction", getAllTransaction);

module.exports = router;
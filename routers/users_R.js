const express = require('express');
const router = express.Router();
module.exports = router;

const user_mid = require("../middleware/user_mid");

router.get("/Add",(req,res)=>{
    res.render("user_add",{
        data:{},
    });
});


router.post("/Add",[user_mid.AddUser],(req, res) => {
    res.redirect("/U/add");
});
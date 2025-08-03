const express = require('express');
const router = express.Router();
module.exports = router;

const user_Mid = require("../middleware/user_Mid");

router.get("/login",(req, res)=>{
    res.render("login",{
        page_title  : "כניסת משתמש",
    });
});

router.post("/login", [user_Mid.CheckLogin], (req, res) => {
    if(req.validUser)
        res.redirect("/cat/List");
    else
        res.redirect("/login");
});

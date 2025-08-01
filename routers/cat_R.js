const express = require('express');
const router = express.Router();
module.exports = router;

const cat_Mid = require("../middleware/cat_Mid");

router.get("/Add",(req,res)=>{
    res.render("cat_add",{
        data:{},
    });
});
router.post("/Add", [cat_Mid.AddCategory], (req, res) => {
    res.redirect("./List");
});
router.get("/Edit/:id",[cat_Mid.GetOneCategory],(req,res)=>{
    if(req.GoodOne) {
        res.render("cat_add", {
            data: req.one_category_data,
        });
    } else{
        res.redirect("/cat/List");
    }
});
router.post("/Edit/:id", [cat_Mid.UpdateCategory], (req, res) => {
    res.redirect("../List");
});
router.get("/List",[cat_Mid.GetAllCategories],(req,res)=>{
    res.render("cat_list",{
        page_title : "רשימת קטגוריות",
        categories:  req.categories_data,
    });
});
router.post("/Delete",[cat_Mid.DeleteCategory],(req,res)=>{
    res.redirect("./List");
})
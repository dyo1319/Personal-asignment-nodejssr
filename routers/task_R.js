const express = require('express');
const router = express.Router();
module.exports = router;

const task_Mid = require("../middleware/task_Mid");
const cat_Mid = require("../middleware/cat_Mid");

router.get('/plan', [cat_Mid.GetAllCategories], (req, res) => {
    res.render("task_add",{
        page_title   : "הוספת משימה"        ,
        categories   : req.categories_data   ,
        data:{},
    });
});
router.post('/plan', [task_Mid.AddNewTask], (req, res) => {
    res.redirect("./List");
});
router.get("/List",[task_Mid.GetAllTasks,cat_Mid.GetCategoriesNames,cat_Mid.GetAllCategories],(req,res)=>{
    res.render("task_List",{
        page_title            : "רשימת משימות"       ,
        categories            : req.categories_data   ,
        categories_names      : req.categories_names  ,
        task_data             : req.task_data         ,
        filter_params         : req.filter_params     ,
        page                  : req.page              ,
        total_pages           : req.total_pages       ,
    });
});
router.post('/markTask/:taskId', [task_Mid.MarkTask], (req, res) => {
    res.redirect("../List"); 
});
router.post("/Delete",[task_Mid.DeleteTask],(req,res)=>{
    res.redirect("/A/List");
})
router.get("/Edit/:id",[task_Mid.GetOneTask,cat_Mid.GetCategoriesNames,cat_Mid.GetAllCategories],(req,res)=>{
    if(req.GoodOne) {
        res.render("task_add", {
            page_title            : "עריכת משימה"         ,
            data                  : req.one_task_data      ,
            categories            : req.categories_data    ,
            categories_names      : req.categories_names   ,
        });
    } else{
        res.redirect("/A/List");
    }
});
router.post("/Edit/:id", [task_Mid.UpdateTask], (req, res) => {
    res.redirect("/A/List");
});
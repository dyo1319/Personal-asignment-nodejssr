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
router.get('/markDone/:taskId', [task_Mid.MarkTaskDone], (req, res) => {
    res.redirect("./List"); 
});
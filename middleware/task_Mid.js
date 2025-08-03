async function AddNewTask(req, res, next) {
    let user_id      = req.user_id;
    let description  = (req.body.description !== undefined)  ?   addSlashes(req.body.description)  : ""  ;
    let due_date     = (req.body.due_date !== undefined)     ?      addSlashes(req.body.due_date)  : ""  ;
    let category_id  = (req.body.category_id !== undefined)  ?        Number(req.body.category_id) : null;
    let done         = (req.body.done !== undefined) ? 1 : 0;


    let Query = "INSERT INTO `tasks`";
    Query += "( `user_id`, `description`, `due_date`, `category_id`,`done`)  ";
    Query += " VALUES ";
    Query += `( '${user_id}', '${description}', '${due_date}', '${category_id}','${done}')  `;

    req.ok=false;
    const promisePool = db_pool.promise();
    let rows=[];
    try {
        [rows] = await promisePool.query(Query);
        req.ok=true;
    } catch (err) {
        console.log(err);
    }
    next();
}
async function GetAllTasks(req,res,next){
    let user_id       =  req.user_id;
    let ed            = (req.query.ed          !== undefined)        ? addSlashes(req.query.ed)         : "";
    let category_id   = (req.query.category_id !== undefined)        ? Number(req.query.category_id)    : -1;
    let done          = (req.query.done        !== undefined)        ? Number(req.query.done)           : -1;
    req.filter_params = {
        ed               : ed             ,
        category_id      : category_id    ,
        done             : done           ,
    };

    let page=0;
    let rowPerPage=10;
    if (req.query.p !== undefined) {
        page = parseInt(req.query.p);
    }
    req.page = page;

    const promisePool = db_pool.promise();
    let rows=[];

    let wh = ` WHERE user_id = '${user_id}' `;
    if(ed !== ""){
        wh += (wh === "")?" WHERE " : " AND ";
        wh += ` ( due_date <= '${ed}' )`;
    }

    if (category_id !== -1) {
        wh += (wh === "")?" WHERE " : " AND ";
        wh += ` category_id = '${category_id}' `;
    }
    
    if (done !== -1) {
        wh += (wh === "")?" WHERE " : " AND ";
        wh += ` done = '${done}' `;
    }

    let Query = "SELECT COUNT(id) AS cnt FROM tasks";
    Query += wh;

    let total_rows=0;
    try {
        [rows] = await promisePool.query(Query);
        total_rows=rows[0].cnt;
    } catch (err) {
        console.log(err);
    }
    req.total_pages = Math.floor(total_rows/rowPerPage);

    Query = "SELECT *,DATE_FORMAT(due_date,'%d-%m-%Y') AS nice_date FROM tasks";
    Query += wh;
    Query += " ORDER BY due_date DESC";
    Query += ` LIMIT ${page*rowPerPage},${rowPerPage} `;


    req.task_data=[];
    try {
        [rows] = await promisePool.query(Query);
        req.task_data=rows;
    } catch (err) {
        console.log(err);
    }

    next();
}
async function MarkTask(req, res, next) {
    let user_id = req.user_id;
    let taskId = req.params.taskId;
    let done = req.body.done !== undefined ? req.body.done : 1;
    
    let doneValue = done == 1 ? 1 : 0;
    let Query = `UPDATE tasks SET done = ? WHERE id = ? AND user_id = ?`;
    
    const promisePool = db_pool.promise();
    try {
        await promisePool.query(Query, [doneValue, taskId, user_id]);
    } catch (err) {
        console.log(err);
    }
    next();
}
async function DeleteTask(req,res,next){
    let id = parseInt(req.body.id);
    if(id > 0) {
        let Query = `DELETE FROM tasks WHERE id='${id}' `;
        const promisePool = db_pool.promise();
        let rows = [];
        try {
            [rows] = await promisePool.query(Query);
        } catch (err) {
            console.log(err);
        }
    }

    next();

}
async function UpdateTask(req,res,next){
    let user_id      = req.user_id;
    let description  = (req.body.description !== undefined)  ?      addSlashes(req.body.description)  : ""  ;
    let due_date     = (req.body.due_date    !== undefined)  ?      addSlashes(req.body.due_date)     : ""  ;
    let category_id  = (req.body.category_id !== undefined)  ?           Number(req.body.category_id) : null;
    let done         = (req.body.done        !== undefined)  ?   1 : 0;
   if(user_id <= 0){
        req.GoodOne=false;
        return next();
    }
    req.GoodOne=true;

    let Query=`UPDATE tasks SET `;
    Query +=`description   ='${description   }' ,`;
    Query +=`due_date  ='${due_date  }' ,`;
    Query +=`category_id  ='${category_id  }' ,`;
    Query +=`done     ='${done     }'  `;
    Query +=` WHERE id='${user_id}'`;
    const promisePool = db_pool.promise();
    let rows=[];
    try {
        [rows] = await promisePool.query(Query);
    } catch (err) {
        console.log(err);
    }

    next();
}
async function GetOneTask(req,res,next){
    let id = parseInt(req.params.id);

    if((id === NaN) || (id <= 0)){
        req.GoodOne=false;
        return next();
    }
    req.GoodOne=true;
    let Query=`SELECT * FROM tasks  WHERE id='${id}' `;
    const promisePool = db_pool.promise();
    let rows=[];
    req.one_task_data=[];
    try {
        [rows] = await promisePool.query(Query);
        if(rows.length > 0) {
            req.one_task_data = rows[0];
        }
    } catch (err) {
        console.log(err);
    }

    next();
}

module.exports = {
    AddNewTask,
    GetAllTasks,
    MarkTask,
    DeleteTask,
    UpdateTask,
    GetOneTask
}
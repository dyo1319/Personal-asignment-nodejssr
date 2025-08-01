async function AddCategory(req,res,next){
    let name = addSlashes(req.body.name);
    let Query=`INSERT INTO categories( name) VALUES ('${name}')`;
    const promisePool = db_pool.promise();
    let rows=[];
    try {
        [rows] = await promisePool.query(Query);
    } catch (err) {
        console.log(err);
    }

    next();
}
async function UpdateCategory(req,res,next){
    let id = parseInt(req.params.id);
    if(id <= 0){
        req.GoodOne=false;
        return next();
    }
    req.GoodOne=true;
    let name = addSlashes(req.body.name);
    let Query=`UPDATE categories SET name='${name}' WHERE id='${id}'`;
    const promisePool = db_pool.promise();
    let rows=[];
    try {
        [rows] = await promisePool.query(Query);
    } catch (err) {
        console.log(err);
    }

    next();
}
async function GetAllCategories(req,res,next){
    let filter = (req.query.filter !== undefined) ? req.query.filter : "";
    let Query="SELECT * FROM categories";
    let wh="";
    if(filter !== ""){
        wh += (wh === "")?" WHERE " : " AND ";
        wh += ` ( name LIKE '%${filter}%' )`;
    }
    // if(req.user_id !== undefined){
    //     wh += (wh === "")?" WHERE " : " AND ";
    //     wh += ` ( id IN (SELECT crs_id FROM crs2user WHERE user_id=${req.user_id}) )`;
    // }
    Query += wh;
    Query += " ORDER BY name ASC ";
    Query+= " LIMIT 0,100 ";

    const promisePool = db_pool.promise();
    let rows=[];
    req.categories_data=[];
    try {
        [rows] = await promisePool.query(Query);
        req.categories_data=rows;
    } catch (err) {
        console.log(err);
    }

    next();
}
async function GetCategoriesNames(req,res,next){
    let Query="SELECT * FROM categories";

    const promisePool = db_pool.promise();
    let rows=[];
    req.categories_names=[];
    try {
        [rows] = await promisePool.query(Query);
        for(let row of rows) {
            req.categories_names[row.id] = row.name;
        }
    } catch (err) {
        console.log(err);
    }

    next();
}
async function GetOneCategory(req,res,next){
    let id = parseInt(req.params.id);
    console.log(id)
    if((id === NaN) || (id <= 0)){
        req.GoodOne=false;
        return next();
    }
    req.GoodOne=true;
    let Query=`SELECT * FROM categories  WHERE id='${id}' `;
    const promisePool = db_pool.promise();
    let rows=[];
    req.one_category_data=[];
    try {
        [rows] = await promisePool.query(Query);
        if(rows.length > 0) {
            req.one_category_data = rows[0];
        }
    } catch (err) {
        console.log(err);
    }

    next();
}
async function DeleteCategory(req,res,next){
    let id = parseInt(req.body.id);
    if(id > 0) {
        let Query = `DELETE FROM categories WHERE id='${id}' `;
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
module.exports = {
    AddCategory,
    GetAllCategories,
    GetCategoriesNames,
    GetOneCategory,
    DeleteCategory,
    UpdateCategory,
}
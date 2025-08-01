var md5 = require('md5');

async function AddUser(req,res,next){
    let name    = (req.body.name   !== undefined) ? addSlashes(req.body.name      ) : "";
    let uname   = (req.body.uname  !== undefined) ? addSlashes(req.body.uname     ) : "";
    let passwd  = (req.body.passwd !== undefined) ?            req.body.passwd      : "";
    let enc_pass = md5("A"+passwd);
    let email   = (req.body.email  !== undefined) ? addSlashes(req.body.email     ) : "";
    let tz      = (req.body.tz     !== undefined) ? addSlashes(req.body.tz        ) : "";

    let Query="INSERT INTO users";
    Query +="( `name`, `uname`, `passwd`, `email`,`tz`)";
    Query +=" VALUES ";
    Query +=`( '${name}', '${uname}', '${enc_pass}', '${email}', '${tz}')`;

    const promisePool = db_pool.promise();
    let rows=[];
    try {
        [rows] = await promisePool.query(Query);
    } catch (err) {
        console.log(err);
    }

    next();
}



module.exports = {
    AddUser,
    // GetAllUsers,
    // GetOneUser,
    // DeleteUser,
    // UpdateUser,
    // CheckLogin,
    // isLogged,
}
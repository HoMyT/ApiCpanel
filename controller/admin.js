const connection = require('../middelware/mysqlConnection');


exports.getAllProject = (req, res, next) => {
    $Sql = `SELECT * FROM users WHERE uuid = ${JSON.stringify(req.auth.userId)}`;
    connection.query($Sql, (err, results, fields) =>{
        if (err) { return res.status(401).json({message: 'An error as been occured'}) }
        else {
            const ResultUuid = results.map(obj => obj.admin);
            if (ResultUuid == 69) {
                $Sql = `SELECT * FROM project_user`;
                connection.query($Sql, (err, results, fields) => {
                    if (err) { return res.status(401).json({message: 'An error as been occured'}) }
                    else { return res.status(201).json(results) }
                })
            }
        }
    })
}

exports.getOneProject = (req, res, next) => {
    const { id } = req.params;
    const project = {
        id : connection.escape(id)
    };
    $Sql = `SELECT * FROM users WHERE uuid = ${JSON.stringify(req.auth.userId)}`;
    connection.query($Sql, (err, results, fields) =>{
        if (err) { return res.status(401).json({message: 'An error as been occured'}) }
        else {
            const ResultUuid = results.map(obj => obj.admin);
            if (ResultUuid == 69) {
                $Sql = `SELECT * FROM project_user WHERE uuid_project = ${project.id}`;
                connection.query($Sql, (err, results, fields) => {
                    if (err) { return res.status(401).json({message: 'An error as been occured'}) }
                    else { return res.status(201).json(results) }
                })
            }
        }
    })
}

exports.getEmail = (req, res, next) => {
    $Sql = `SELECT * FROM users WHERE uuid = ${JSON.stringify(req.auth.userId)}`;
    connection.query($Sql, (err, results, fields) =>{
        if (err) { return res.status(401).json({message: 'An error as been occured'}) }
        else {
            const ResultUuid = results.map(obj => obj.admin);
            if (ResultUuid == 69) {
                $Sql = `SELECT * FROM user_email`;
                connection.query($Sql, (err, results, fields) => {
                    if (err) { return res.status(401).json({message: 'An error as been occured'}) }
                    else { return res.status(201).json(results) }
                })
            }
        }
    })
}
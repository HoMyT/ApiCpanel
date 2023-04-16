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

const connection = require('../middelware/mysqlConnection');
const { v4: uuidv4 } = require('uuid');
var fs = require('fs');

exports.updateImgEntreprise = (req, res, next) => {

    const ObjImgEntreprise = {
        uuid : connection.escape(uuidv4()),
        imgEntreprise : connection.escape(`${req.protocol}://${req.get('host')}/img-entreprise/${req.auth.userId}/${req.file.filename}`),
        user_uuid: connection.escape(req.auth.userId)
    }

    const pathLogoEntreprise = `./img-entreprise/${req.auth.userId}`;
    if (!fs.existsSync(pathLogoEntreprise)) {
        fs.mkdirSync(pathLogoEntreprise, {recursive: true}, (error) => {
            if (error) {
                return res.status(401).json({message: "error ocuured"})
            } 
        })
    }

    $Sql = `SELECT * FROM img_entreprise WHERE user_uuid = ${JSON.stringify(req.auth.userId)}`;
    connection.query($Sql, (err, results, fields) => {
        if (err) { return res.status(401).json({message: "An error as been occured:", err})}
        else {
            if (results.length > 0) {
                pathImg = results.map(results => results.pathImg)[0];
                ImgUuid = results.map(results => results.uuid)[0];
                imgName = pathImg.split(req.auth.userId + "/")[1];

                fs.unlink( `./img-entreprise/${req.auth.userId}/${imgName}`  , (err) => { if (err) { throw err} })
                connection.query(`DELETE FROM img_entreprise WHERE uuid = ${JSON.stringify(ImgUuid)}`, (err, results, fields) => {
                    if(err){ return res.status(401).json({message: "An error as been occured:", err}) }
                    else {
                        connection.query(`INSERT INTO img_entreprise(uuid, pathImg, user_uuid) VALUES(${ObjImgEntreprise.uuid}, ${ObjImgEntreprise.imgEntreprise}, ${ObjImgEntreprise.user_uuid})`, (err, results, fields) => {
                            if(err){ return res.status(401).json({message: "An error as been occured:", err}) }
                            else { return res.status(201).json({message: "Img enregister"}) }
                        })
                    }
                })

            } else {
                $Sql = `INSERT INTO img_entreprise(uuid, pathImg, user_uuid) VALUES(${ObjImgEntreprise.uuid}, ${ObjImgEntreprise.imgEntreprise}, ${ObjImgEntreprise.user_uuid})`;
                connection.query($Sql, (err, results, fields) => {
                    if(err){ return res.status(401).json({message: "An error as been occured:", err}) }
                    else { return res.status(201).json({message: "Img enregister"}) }
                })
            }
        }
    })
}
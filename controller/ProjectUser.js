var connexion = require('../middelware/mysqlConnection');
// const { v4: uuidv4 } = require('uuid');
// const fs = require('fs');

exports.createProject = (req, res, next) => {
    const { uuid, name_project, descriptif_project, type_project } = req.body;
    const objCreateProjectUser = {
        uuid_project: connexion.escape(uuid),
        uuid_client: connexion.escape(req.auth.userId),
        name_project: connexion.escape(name_project),
        descriptif_project: connexion.escape(descriptif_project),
        type_project: connexion.escape(type_project)
    }

    $Sql = `INSERT INTO project_user(uuid_project, uuid_client, name_project, descriptif_project, type_project) VALUES(${objCreateProjectUser.uuid_project}, ${objCreateProjectUser.uuid_client}, ${objCreateProjectUser.name_project}, ${objCreateProjectUser.descriptif_project}, ${objCreateProjectUser.type_project})`;
    connexion.query($Sql, (err, results, fields) => {
        if(err) { return res.status(401).json({message: `An error as been occured: ${err}`})}
        else { return res.status(201).json({message: 'Votre project a bien été enregistré'}) }
    })
}

exports.getOneProject = (req, res, next) => {
    const { id } = req.params;
    const project = {
        id : connexion.escape(id)
    }
    $Sql = `SELECT * FROM project_user WHERE uuid_project = ${project.id}`;
    connexion.query($Sql, (err, results, fields) => {
        if (err) { return res.status(401).json({message: 'An error has been occured', err}) }
        else { return res.status(201).json(results) }
    })
}

exports.postCommentaireProject = (req, res, next) => {
    const { uuid_conversation, uuid_project, commentaire } = req.body;
    const commentaireProject = {
        uuid_conversation: connexion.escape(uuid_conversation),
        commentaire: connexion.escape(commentaire),
        uuid_sender_message: connexion.escape(req.auth.userId),
        uuid_project: connexion.escape(uuid_project)
    };

    $Sql = `INSERT INTO discution_project(uuid_conversation, uuid_project, uuid_sender_message, commentaire) VALUES(${commentaireProject.uuid_conversation}, ${commentaireProject.uuid_project}, ${commentaireProject.uuid_sender_message}, ${commentaireProject.commentaire})`;
    connexion.query($Sql, (err, results, fields) => {
        if (err) { return res.status(401).json({message: "An error as been occured"}) }
        else { return res.status(201).json({message: 'Votre message a bien été enregistré !'}) }
    })

}

exports.getCommentaire = (req, res, next) => {
    const {id} = req.params;
    const conversation = {
        id: connexion.escape(id),
        user: connexion.escape(req.auth.userId)
    };

    $Sql = `SELECT * FROM discution_project AS dp JOIN users AS u WHERE dp.uuid_project = ${conversation.id} AND u.uuid = ${conversation.user};`

    connexion.query($Sql, (err, results, fields) => {
        if (err) { return res.status(401).json({ message: 'An error as been occured' }) }
        else { return res.status(201).json(results) }
    })
}
import { Router, Request, Response } from "express";
import { Commenta } from '../models/comment.model';


const commentsRoutes = Router();

commentsRoutes.get('/prueba', ( req: Request, res: Response ) => {
    res.json({
        ok: true,
        mensaje: 'Todo funciona bien'
    })
});

//crear pedido
commentsRoutes.post('/crearcommentario', ( req: Request, res: Response ) => {

    const commentario  = {
        idpost: req.body.idpost, 
        comentario: req.body.comentario, 
        correo: req.body.correo,
    };

    Commenta.create( commentario ).then( userDB => {

        res.json({
            ok: true,
            Comments: userDB
        });

    }).catch( err => {

        res.json({
            ok: false,
            err
        });

    });
    
});

//Obtener comentarios
commentsRoutes.get('/obtcommentarios', async(req: any, res: Response) => {

    let postid = req.query.postid;

    const comments = await Commenta.find({ idpost: postid })
                                    .sort({ _id: -1 })
                                    .exec();

    res.json({
        ok: true,
        comments
    });

});


export default commentsRoutes;
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comment_model_1 = require("../models/comment.model");
const commentsRoutes = express_1.Router();
commentsRoutes.get('/prueba', (req, res) => {
    res.json({
        ok: true,
        mensaje: 'Todo funciona bien'
    });
});
//crear pedido
commentsRoutes.post('/crearcommentario', (req, res) => {
    const commentario = {
        idpost: req.body.idpost,
        comentario: req.body.comentario,
        correo: req.body.correo,
    };
    comment_model_1.Commenta.create(commentario).then(userDB => {
        res.json({
            ok: true,
            Comments: userDB
        });
    }).catch(err => {
        res.json({
            ok: false,
            err
        });
    });
});
//Obtener comentarios
commentsRoutes.get('/obtcommentarios', (req, res) => __awaiter(this, void 0, void 0, function* () {
    let postid = req.query.postid;
    const comments = yield comment_model_1.Commenta.find({ idpost: postid })
        .sort({ _id: -1 })
        .exec();
    res.json({
        ok: true,
        comments
    });
}));
exports.default = commentsRoutes;

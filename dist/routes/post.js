"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const autenticacion_1 = require("../middlewares/autenticacion");
const post_model_1 = require("../models/post.model");
const file_system_1 = __importDefault(require("../classes/file-system"));
const postRoutes = express_1.Router();
const fileSystem = new file_system_1.default();
//obtener POST paginados
//HOME
postRoutes.get('/home', (req, res) => __awaiter(this, void 0, void 0, function* () {
    let pagina = Number(req.query.pagina) || 1;
    let skip = pagina - 1;
    skip = skip * 10;
    const posts = yield post_model_1.Post.find()
        .sort({ _id: -1 })
        .skip(skip)
        .limit(10)
        .populate('usuario', '-password')
        .exec();
    res.json({
        ok: true,
        pagina,
        posts
    });
}));
//LOST
postRoutes.get('/lost', (req, res) => __awaiter(this, void 0, void 0, function* () {
    let pagina = Number(req.query.pagina) || 1;
    let skip = pagina - 1;
    skip = skip * 10;
    const posts = yield post_model_1.PostLost.find()
        .sort({ _id: -1 })
        .skip(skip)
        .limit(10)
        .populate('usuario', '-password')
        .exec();
    res.json({
        ok: true,
        pagina,
        posts
    });
}));
//ADOPT
postRoutes.get('/adopt', (req, res) => __awaiter(this, void 0, void 0, function* () {
    let pagina = Number(req.query.pagina) || 1;
    let skip = pagina - 1;
    skip = skip * 10;
    const posts = yield post_model_1.PostAdopt.find()
        .sort({ _id: -1 })
        .skip(skip)
        .limit(10)
        .populate('usuario', '-password')
        .exec();
    res.json({
        ok: true,
        pagina,
        posts
    });
}));
//crear POST
postRoutes.post('/', [autenticacion_1.verificaToken], (req, res) => {
    const body = req.body;
    body.usuario = req.usuario._id;
    const imagenes = fileSystem.imagenesDeTempHaciaPost(req.usuario._id);
    body.imgs = imagenes;
    if (body.tipo == "home") {
        {
            post_model_1.Post.create(body).then((postDB) => __awaiter(this, void 0, void 0, function* () {
                yield postDB.populate('usuario', '-password').execPopulate();
                res.json({
                    ok: true,
                    post: postDB
                });
            })).catch(err => {
                res.json(err);
            });
        }
    }
    else if (body.tipo == "lost") {
        {
            post_model_1.PostLost.create(body).then((postDB) => __awaiter(this, void 0, void 0, function* () {
                yield postDB.populate('usuario', '-password').execPopulate();
                res.json({
                    ok: true,
                    post: postDB
                });
            })).catch(err => {
                res.json(err);
            });
        }
    }
    else if (body.tipo == "adopt") {
        {
            post_model_1.PostAdopt.create(body).then((postDB) => __awaiter(this, void 0, void 0, function* () {
                yield postDB.populate('usuario', '-password').execPopulate();
                res.json({
                    ok: true,
                    post: postDB
                });
            })).catch(err => {
                res.json(err);
            });
        }
    }
});
//servicio para subir archivos 
postRoutes.post('/upload', [autenticacion_1.verificaToken], (req, res) => __awaiter(this, void 0, void 0, function* () {
    if (!req.files) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No se subio ningun archivo'
        });
    }
    const file = req.files.image;
    if (!file) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No se subio ningun archivo -image'
        });
    }
    if (!file.mimetype.includes('image')) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Lo que subio no es una imagen'
        });
    }
    yield fileSystem.guardarImagenTemporal(file, req.usuario._id);
    res.json({
        ok: true,
        file: file.mimetype
    });
}));
postRoutes.get('/imagen/:userid/:img', (req, res) => {
    const userId = req.params.userid;
    const img = req.params.img;
    const pathFoto = fileSystem.getFotoUrl(userId, img);
    res.sendFile(pathFoto);
});
//HOME
postRoutes.get('/obtenerpu', (req, res) => __awaiter(this, void 0, void 0, function* () {
    let user = req.query.user;
    const postsUsuarioSelect = yield post_model_1.Post.find({ usuario: user })
        .sort({ _id: -1 })
        .populate('usuario', '-password')
        .exec();
    res.json({
        ok: true,
        postsUsuarioSelect
    });
}));
exports.default = postRoutes;

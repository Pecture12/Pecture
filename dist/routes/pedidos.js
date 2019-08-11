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
const pedido_model_1 = require("../models/pedido.model");
const empresa_model_1 = require("../models/empresa.model");
const pedidosRoutes = express_1.Router();
pedidosRoutes.get('/prueba', (req, res) => {
    res.json({
        ok: true,
        mensaje: 'Todo funciona bien'
    });
});
//crear usuario
pedidosRoutes.post('/crearpedido', (req, res) => {
    const pedido = {
        id: req.body.id,
        producto: req.body.producto,
        precio: req.body.precio,
        cantidad: req.body.cantidad,
        empresa: req.body.empresa,
        id_usuario: req.body.userid,
        direccion: req.body.direccion,
        estado: req.body.estado
    };
    pedido_model_1.Pedido.create(pedido).then(userDB => {
        res.json({
            ok: true,
            Pedido: userDB
        });
    }).catch(err => {
        res.json({
            ok: false,
            err
        });
    });
});
//Obtener pedidos
pedidosRoutes.get('/ordenes', (req, res) => __awaiter(this, void 0, void 0, function* () {
    let pagina = Number(req.query.pagina) || 1;
    const pedidos = yield pedido_model_1.Pedido.find()
        .sort({ _id: -1 })
        .exec();
    res.json({
        ok: true,
        pagina,
        pedidos
    });
}));
//Obtener empresas
pedidosRoutes.get('/empresas', (req, res) => __awaiter(this, void 0, void 0, function* () {
    let cat = req.query.categoria || 'Tienda';
    let pagina = Number(req.query.pagina) || 1;
    var d = new Date();
    var date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    const empresas = yield empresa_model_1.Empresa.find({ categoria: cat, suscripcion: { '$gte': date } })
        .sort({ _id: -1 })
        .exec();
    res.json({
        ok: true,
        pagina,
        // date,
        empresas
    });
}));
//Obtener inventario de empresa
pedidosRoutes.get('/inventario', (req, res) => __awaiter(this, void 0, void 0, function* () {
    let empresa = req.query.empresa || "Pizza@gmail.com";
    const empresas = yield empresa_model_1.Empresa.findOne({ correo: empresa }, { inventario: 1 })
        .exec();
    res.json({
        ok: true,
        empresa,
        empresas
    });
}));
exports.default = pedidosRoutes;

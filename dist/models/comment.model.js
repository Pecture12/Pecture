"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const commentSchema = new mongoose_1.Schema({
    idpost: {
        type: String
    },
    comentario: {
        type: String
    },
    correo: {
        type: String
    },
    fecha: {
        type: Date
    }
});
commentSchema.pre('save', function (next) {
    this.fecha = new Date();
    next();
});
exports.Commenta = mongoose_1.model('Comment', commentSchema);

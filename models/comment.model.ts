
import { Schema, model, Document } from 'mongoose';

const commentSchema = new Schema({
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

commentSchema.pre<IComment>('save', function( next ) {
    this.fecha = new Date();
    next();
});

interface IComment extends Document {
    idpost: string;
    comentario: string;
    correo: string;
    fecha: Date;
}

export const Commenta = model<IComment>('Comment', commentSchema);
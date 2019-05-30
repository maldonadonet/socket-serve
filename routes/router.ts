import { Router, Request, Response } from 'express';
import Server from '../class/server';

const router = Router();

router.get('/mensajes', ( req: Request, res: Response)=>{

    res.json({
        ok: true,
        mensaje: 'Todo esta bien!!'
    });

});

router.post('/mensajes', ( req: Request, res: Response)=>{

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;

    const payload = {
        de,
        cuerpo
    }

    // instancia del server de los sockets
    const server = Server.instance;
    
    // Para mandar msj a todos :  server.io.emit( 'mensaje-privado', payload );
    server.io.emit( 'mensaje-nuevo', payload );

    res.json({
        ok: true,
        cuerpo : cuerpo,
        de: de
    });

});

router.post('/mensajes/:id', ( req: Request, res: Response)=>{

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;

    const payload = {
        de,
        cuerpo
    }

    // instancia del server de los sockets
    const server = Server.instance;
    
    // Para mandar msj a todos :  server.io.emit( 'mensaje-privado', payload );
    server.io.in( id ).emit( 'mensaje-privado', payload );

    res.json({
        ok: true,
        cuerpo : cuerpo,
        de: de,
        id: id
    });

});

export default router;


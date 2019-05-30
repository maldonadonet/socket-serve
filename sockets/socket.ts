import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UsuariosLista } from '../class/usuarios-lista';
import { Usuario } from '../class/usuario';

export const usuariosConectados = new UsuariosLista();

// 
export const conectarCliente = ( cliente: Socket ) => {

    const usuario = new Usuario( cliente.id );
    usuariosConectados.agregar( usuario );

}

// Desconexión de usuarios
export const desconectar = ( cliente: Socket ) => {

    cliente.on('disconnect', ()=>{
        console.log('Cliente Desconectado');

        usuariosConectados.borrarUsuario( cliente.id );

    });
}

// Escuchar mensajes
export const mensaje = ( cliente : Socket, io: socketIO.Server ) => {

    cliente.on('mensaje', ( payload: { de:string, cuerpo: string } ) =>{

        console.log('Mensaje recibido ', payload );

        // enviar el mensaje a todos los usarios de mi app
        io.emit('mensaje-nuevo', payload );

        
    });
}

// Configurar usuario
export const configurarUsuario = ( cliente : Socket, io: socketIO.Server ) => {

    cliente.on('configurar-usuario', ( payload: { nombre: string }, callback: Function ) =>{

        usuariosConectados.actualizarNombre( cliente.id, payload.nombre );

        callback({
            ok: true,
            mensaje: `Usuario ${ payload.nombre }, configurado`
        });
        
    });
}


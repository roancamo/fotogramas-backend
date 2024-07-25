import { Controller,  Delete,  Get,  Post, Param, Res, Body, Put} from '@nestjs/common';
import { Usuario } from 'src/model/usuario';
import { UsuariosService } from './usuarios.service';
import { response } from 'express';
@Controller('usuarios')
export class UsuariosController {
    constructor(private readonly servicio:UsuariosService){

    }
    
@Get()
obtenerUsuarios():Usuario[]{
    return this.servicio.obtenerUsuarios();
}
@Get(':nombreUsuario')
obtieneUsuario(@Param('nombreUsuario') nombreUsuario:string , 
@Res() response ):Usuario{
    let usuario= this.servicio.obtieneUsuario(nombreUsuario);
    if(usuario){
        return response.status(200).send(usuario);
    }
    else{
        return response.status(404).send('usuario no existe');
    }


}

@Post()
creaUsuario(@Body() usuario: Usuario, 
@Res() response):void{
    let creaUsuario= this.servicio.creaUsuario(usuario);
    if(creaUsuario){
        return response.status(200).send('Usuario creado');
    }
    else{
        return response.status(500).send('Error al crear usuario');
    }

}

@Delete(':nombreUsuario')
eliminaUsuario(@Param('nombreUsuario') nombreUsuario:string, @Res() response):void{
    let elimina= this.servicio.eliminaUsuario(nombreUsuario);
    if(elimina){
        return response.status(200).send('usuario eliminado');
    }
    else{
        return response.status(404).send('usuario no existe');
    }

}
@Put(':nombreUsuario/:nuevafotoPerfil')
editaFotoPerfil(@Param('nombreUsuario') nombreUsuario:string , @Param('nuevafotoPerfil') nuevafotoPerfil:string,
@Res() response):void{
    let actualiza= this.servicio.editaFotoPerfil(nombreUsuario,nuevafotoPerfil);
    if(actualiza){
        return response.status(200).send('Foto Perfil actualizada');
    }
    else{
        return response.status(404).send('usuario no existe');
    }
    
}

@Put('seguir/:nombreUsuario/:seguido')
seguirUsuario(@Param('nombreUsuario') nombreUsuario:string, @Param('seguido')  seguido: string, 
@Res() response):void{
    let seguirUsuario= this.servicio.seguirUsuario(nombreUsuario,seguido);
    if(seguirUsuario){
        return response.status(200).send('Siguiendo usuario(s)');
    }
    else{
        return response.status(404).send('No puede seguir a este usuario');
    }

}
}
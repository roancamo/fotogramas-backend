import { Injectable } from '@nestjs/common';
import { Usuario } from 'src/model/usuario';
@Injectable()
export class UsuariosService {
      usuarios: Usuario[]=[];

  /*obtiene usuarios  en array*/
    obtenerUsuarios():Usuario[]{
        return this.usuarios;
    }

    /*obtiene usuario por nombre en array*/
    obtieneUsuario(nombre:string):Usuario{
        console.log('obtieneUsuario:' +  nombre);
        for(let i:number=0;i<this.usuarios.length;i++)
        {
            if(this.usuarios[i].nombreUsuario.toLowerCase().trim() == nombre.toLowerCase().trim()){
                return this.usuarios[i];
            }
        }
    }

    /*crea un nuevo usuario en array*/
    creaUsuario(usuario:Usuario):boolean{
        if(this.usuarios.length == 0){
            usuario.seguidores=[];
            usuario.siguiendo=[]
            this.usuarios.push(usuario);
            return true
        }
        else{
                if(!this.verificaUsuarioMail(usuario.email)){
                    console.log(usuario.nombreUsuario);
                    usuario.seguidores=[];
                    usuario.siguiendo=[]
                        this.usuarios.push(usuario);
                        return true;
                    

                   
                    
            }
        }
        return false;
    }

    /*busca nombre usuario en array*/
    validaNombreUsuario(nombre:string):boolean{
        for(let i:number=0; i< this.usuarios.length;i++){
            if(nombre.toLowerCase().trim() == this.usuarios[i].nombreUsuario.toLowerCase().trim()){
                return true;
            }
        }
        return false
    }

    /*busca email en array*/
    verificaUsuarioMail(email:string):boolean{
        for(let i:number=0; i< this.usuarios.length;i++){
            if(email.toLowerCase().trim() == this.usuarios[i].email.toLowerCase().trim()){
                if(this.validaNombreUsuario(this.usuarios[i].nombreUsuario.toLowerCase().trim())){
                    return true;
                }
                
            }
        }
        return false
    }
    /*Eliminar un usuarios según su nombreUsuario*/
    eliminaUsuario(nombreUsuario:string):boolean{
            for (let i: number = 0; i < this.usuarios.length; i++) {
                if (this.usuarios[i]. nombreUsuario == nombreUsuario) {
                          this.usuarios.splice(i  , 1);
                        return true;
                }
            }        
        return false
    }

    /*actualiza solo foto perfil*/
    editaFotoPerfil(nombreUsuario:string, nuevafotoPerfil:string):boolean{
        for (let i: number = 0; i < this.usuarios.length; i++) {
            if (this.usuarios[i]. nombreUsuario == nombreUsuario) {
                    this.usuarios[i].fotoPerfil= nuevafotoPerfil;
                    return true;
            }
        }      
        return false;
    }
    /*
    Seguir a un usuario (Debe validar que el usuario al que se desea seguir exista y
     que no tenga como seguidor al usuario solicitante )
    */
     obtieneIdx(nombre:string):number{
        for(let i:number=0; i< this.usuarios.length;i++){
            if(nombre.toLowerCase().trim() == this.usuarios[i].nombreUsuario.toLowerCase().trim()){
                return i;
            }
        }
        return -1;
    }

    seguirUsuario(nombreUsuario:string,seguido:string): boolean{
        if(this.validaNombreUsuario(nombreUsuario)){
            let indice:number=this.obtieneIdx(nombreUsuario);
           
        for(let i:number = 0 ; i< this.usuarios.length;i++) {
                if(this.usuarios[i].nombreUsuario.toLowerCase().trim() == seguido.toLowerCase().trim()){
                    for(let j:number = 0 ; j< this.usuarios[i].siguiendo.length;j++) {
                        if(this.usuarios[i].siguiendo[j].toLowerCase().trim()==nombreUsuario.toLowerCase().trim()){
                            return false
                        }
                    }
                    this.usuarios[indice].siguiendo.push(seguido);
                }

        }
        return true;
    }
    return false;
    }
  
}




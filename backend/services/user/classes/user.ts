export class user{
    idUser?:number|undefined = -1;
    name:string;
    password:string;
    mail:string;

    constructor(name:string, password:string, mail:string){
        this.name = name;
        this.password = password;
        this.mail = mail;
    }

    getId():number | undefined{
        return this.idUser;
    }

    setId(id:number | undefined):void{
        this.idUser = id;
    }

    getName():string{
        return this.name;
    }

    getMail():string{
        return this.mail;
    }
}
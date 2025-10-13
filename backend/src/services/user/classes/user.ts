export class user{
    idUser:number = -1;
    name:string;
    password:string;
    mail:string;

    constructor(name:string, password:string, mail:string){
        this.name = name;
        this.password = password;
        this.mail = mail;
    }

    getId():number{
        return this.idUser;
    }

    setId(id:number):void{
        this.idUser = id;
    }

    getName():string{
        return this.name;
    }

    getMail():string{
        return this.mail;
    }

    getPassword():string{
        return this.password;
    }
}
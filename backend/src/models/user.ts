export class user{
    id:number = -1;
    role:string;
    name:string;
    password:string;
    mail:string;

    constructor(role:string, name:string, password:string, mail:string,id?:number){
        this.role = role;
        this.name = name;
        this.password = password;
        this.mail = mail;
        if(id) this.id = id;
    }

    getRole():string{
        return this.role;
    }

    setRole(role:string):void{ 
        this.role = role;
    }

    getId():number{
        return this.id;
    }

    setId(id:number):void{
        this.id = id;
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
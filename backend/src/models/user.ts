import bcrypt from 'bcryptjs';

type UserDto = {
  id: number;
  name: string;
  mail: string;
  role: string;
};


export class User{
    id:number = -1;
    readonly role:string;
    readonly name:string;
    readonly mail:string;
    private readonly passwordHash:string;
    

    constructor(role:string, name:string, mail:string,password:string,id?:number){
        this.role = role;
        this.name = name;
        this.mail = mail;
        this.passwordHash = password;
        if(id) this.id = id;
    }

    verifiyPassword(plain:string):Promise<boolean>{
        return bcrypt.compare(plain,this.passwordHash);
    }


    toDto(): UserDto {
    return {
      id: this.id,
      name: this.name,
      mail: this.mail,
      role: this.role
    };
  }
}
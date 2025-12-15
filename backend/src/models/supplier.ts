type SupplierDto = {
  id: number;
  contact_name: string;
  mail: string;
  phone:string;
  address:string;
};

export class Supplier{
    id: number = -1;
    readonly contact_name: string;
    readonly mail: string;
    readonly phone:string;
    readonly address:string;

    constructor(contact_name:string,mail:string,phone:string,address:string,id?:number){
        
        this.contact_name = contact_name;
        this.mail = mail;
        this.phone = phone;
        this. address = address;
        if(id)  this.id = id;

    }

    toDto(): SupplierDto {
    return {
      id: this.id,
      contact_name: this.contact_name,
      mail: this.mail,
      phone: this.phone,
      address : this.address
    };
  }
}

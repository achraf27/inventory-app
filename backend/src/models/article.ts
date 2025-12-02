export class article{
    id:number = -1;
    user_id:number;
    name:string;
    quantity:number = 0;
    unit:string;


    constructor(idUser:number,name:string,quantity:number,unit:string,id?:number){
        this.user_id = idUser;
        this.quantity = quantity;
        this.name = name;
        this.unit = unit;
        if(id) this.id = id;
    }

    getName():string{
        return this.name;
    }

    getId():number{
        return this.id;
    }

    setId(id:number):void{
        this.id = id;
    }

    getUserId():number{
        return this.user_id;
    }

    setQuantity(quantity:number):void{
        this.quantity = quantity;
    }

    getQuantity():number{
        return this.quantity;
    }

    getUnit():string{
        return this.unit
    }

    setUnit(unit:string):void{
        this.unit = unit;
    }
}
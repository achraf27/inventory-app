export class article{
    idArticle:number = -1;
    name:string;
    quantity:number = 0;
    unit:string;


    constructor(name:string,quantity:number,unit:string){
        this.quantity = quantity;
        this.name = name;
        this.unit = unit;
    }

    getName():string{
        return this.name;
    }

    getId():number{
        return this.idArticle;
    }

    setId(id:number):void{
        this.idArticle = id;
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
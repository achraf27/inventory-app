export class article{
    idArticle:number = -1;
    name:string;
    quantity:number = 0;


    constructor(name:string,quantity:number){
        this.quantity = quantity;
        this.name = name;
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
}
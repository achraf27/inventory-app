export class article{
    idArticle:number = -1;
    name:string;


    constructor(name:string){
        this.name = name;
    }

    getName():string{
        return this.name;
    }

    setId(id:number):void{
        this.idArticle = id;
    }
}
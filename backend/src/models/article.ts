type ArticleDto = {
  id: number;
  name: string;
  unit: string;
};

export class Article{
    id:number = -1;
    readonly name:string;
    readonly unit:string;
    

    constructor(name:string,unit:string,id?:number){
        this.name = name;
        this.unit = unit;
        if(id) this.id = id;
    }


   toDto(): ArticleDto {
        return {
            id: this.id,
            name: this.name,
            unit: this.unit
        };
    }
}
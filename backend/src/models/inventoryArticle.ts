type InventoryArticleDto = {
  userId: number;
  articleId: number;
  name:string;
  quantity: number;
  unit:string;
  
};

export class InventoryArticle{
    readonly user_id:number;
    readonly article_id:number;
    readonly name:string;
    readonly quantity:number;
    readonly unit:string;
    

    constructor(userId:number,articleId:number,name:string,quantity:number,unit:string){
        this.user_id = userId;
        this.article_id = articleId;
        this.name = name;
        this.quantity = quantity;
        this.unit = unit;
        
    }

    toDto(): InventoryArticleDto {
    return {
      userId: this.user_id,
      articleId: this.article_id,
      name: this.name,
      quantity: this.quantity,
      unit: this.unit,
      
    };
  }
}
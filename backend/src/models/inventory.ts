type InventoryDto = {
  userId: number;
  articleId: number;
  quantity: number;
};

export class Inventory{
    readonly user_id:number;
    readonly article_id:number;
    readonly quantity:number;

    constructor(userId:number,articleId:number,quantity:number){
        this.user_id = userId;
        this.article_id = articleId;
        this.quantity = quantity;
    }

    toDto(): InventoryDto {
    return {
      userId: this.user_id,
      articleId: this.article_id,
      quantity: this.quantity
    };
  }
}
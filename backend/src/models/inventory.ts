export class inventory{
    user_id:number;
    article_id:number;
    quantity:number = 0;

    constructor(userId:number,articleId:number,quantity:number){
        this.user_id = userId;
        this.article_id = articleId;
        this.quantity = quantity;
    }

    getArticleId():number{
        return this.article_id;
    }


    getUserId():number{
        return this.user_id;
    }

    setArticleId(id:number):void{
        this.article_id = id;
    }

    setUserId(id:number):void{
        this.user_id = id;
    }

    setQuantity(quantity:number):void{
        this.quantity = quantity;
    }

    getQuantity():number{
        return this.quantity;
    }
}
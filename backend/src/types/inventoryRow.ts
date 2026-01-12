export type InventoryRow = {
    article_id:number,
    user_id:number,
    quantity:number
    addedAt?:Date
}

export type InventoryArticleRow = {
    article_id:number,
    user_id:number,
    quantity:number
    name:string;
    unit:string;
    addedAt:Date;
}
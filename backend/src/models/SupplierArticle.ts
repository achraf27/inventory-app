export type SupplierArticleDto = {
  article_id: number;
  supplier_id:number;
  readonly contact_name:string;
  name:string;
  unit:string;
};

export class SupplierArticle{
    readonly article_id: number;
    readonly supplier_id:number;
    readonly contact_name:string;
    readonly name;
    readonly unit;

    constructor(article_id:number,supplier_id:number,contact_name:string,name:string,unit:string){
        
        this.article_id = article_id;
        this.supplier_id = supplier_id;
        this.contact_name = contact_name
        this.name = name;
        this.unit = unit;
    }

    toDto(): SupplierArticleDto {
    return {
      article_id: this.article_id,
      supplier_id: this.supplier_id,
      contact_name:this.contact_name,
      name:this.name,
      unit:this.unit
    };
  }
}
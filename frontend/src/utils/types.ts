  export type AuthResponseDto = {
    message: string;
    token?: string;
    user?:UserDTO;
};

  
  export interface MessageDTO {
    message:string;
  }
  
  export interface ArticleDTO {
    id?:number;
    name:string;
    unit:string;
  }

  export type GetOneArticleResponse = {
  message: string;
  article: ArticleDTO;
};

export type InventoryArticleDTO = {
  user_id: number;
  article_id: number;
  name:string;
  quantity: number;
  unit:string;
  addedAt:Date;
};

export type GetAllInventoryArticlesResponse = {
  message: string;
  articles: InventoryArticleDTO[];
};

export type GetOneInventoryArticleResponse = {
  message: string;
  article: InventoryArticleDTO;
};

export type SupplierDTO = {
  id: number;
  contact_name: string;
  mail: string;
  phone:string;
  address:string;
};

export type SupplierArticleDTO = {
  article_id: number;
  supplier_id:number;
  contact_name:string;
  name:string;
  unit:string;
};

export type GetOneSupplierResponse = {
  message: string;
  supplier: SupplierDTO;
};


export type GetAllSuppliersResponse = {
  message: string;
  suppliers: SupplierDTO[];
};

export type GetAllSupplierArticlesResponse = {
  message: string;
  articles: SupplierArticleDTO[];
};

export type GetOneSupplierArticleResponse = {
  message: string;
  article: SupplierArticleDTO;
};



export type UserDTO = {
  id: number;
  name: string;
  mail: string;
  role: UserRole;
};

export type getAllUsersResponseDTO = {
  message:string;
  users:UserDTO[];
};

export type getUserResponseDTO = {
  message:string;
  user:UserDTO;
};

export type UserRole = "Admin" | "User";


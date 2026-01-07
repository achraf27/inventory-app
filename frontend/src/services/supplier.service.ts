import type { MessageDTO, GetAllSuppliersResponse, GetOneSupplierArticleResponse, GetAllSupplierArticlesResponse, GetOneSupplierResponse } from '../utils/types';
import { apiClient } from './apiClient';
import { getToken } from './auth.service';

export async function createSupplier(data: {contact_name:string,mail:string,phone:string,address:string}):Promise<GetOneSupplierResponse> {
  const res = await apiClient.post(`/supplier/admin/create/`,data,{
    headers:{
      Authorization: `Bearer ${getToken()}`
    }
    });
  return res.data;
}


export async function getOneSupplier(supplier_id:number):Promise<GetOneSupplierResponse> {
  const res = await apiClient.get(`/supplier/${supplier_id}`,{
    headers:{
      Authorization: `Bearer ${getToken()}`
    }
  });
  return res.data;
}

export async function getAllSuppliers():Promise<GetAllSuppliersResponse> {
  const res = await apiClient.get(`/supplier`,{
    headers:{
      Authorization: `Bearer ${getToken()}`
    }
  });
  return res.data;
}

export async function updateSupplier(supplier_id:number,data:{contact_name:string,mail:string,phone:string,address:string}):Promise<MessageDTO> {
  const res = await apiClient.patch(`/supplier/admin/update/${supplier_id}`,data,{
    headers:{
      Authorization: `Bearer ${getToken()}`
    }
  });
  return res.data;
}

export async function deleteSupplier(supplier_id:number):Promise<MessageDTO>{
  const res = await apiClient.delete(`/supplier/admin/delete/${supplier_id}`,{
    headers:{
      Authorization: `Bearer ${getToken()}`
    }
    });
  return res.data
}


export async function updateSupplierArticles(supplier_id:number,articleIds:number[]):Promise<MessageDTO> {
  const res = await apiClient.put(`/supplier/${supplier_id}/admin/update/articles`,{articleIds},{
    headers:{
      Authorization: `Bearer ${getToken()}`
    }
    });
  return res.data;
}

export async function addSupplierArticle(supplier_id:number,article_id:number):Promise<MessageDTO> {
  const res = await apiClient.post(`/supplier/${supplier_id}/admin/add/article/${article_id}`,{},{
    headers:{
      Authorization: `Bearer ${getToken()}`
    }
    });
  return res.data;
}

export async function removeSupplierArticle(supplier_id:number,article_id:number):Promise<MessageDTO> {
  const res = await apiClient.delete(`/supplier/${supplier_id}/admin/delete/article/${article_id}`,{
    headers:{
      Authorization: `Bearer ${getToken()}`
    }
    });
  return res.data;
}

export async function getAllArticlesBySupplier(supplier_id:number):Promise<GetAllSupplierArticlesResponse> {
  const res = await apiClient.get(`/supplier/${supplier_id}/articles`,{
    headers:{
      Authorization: `Bearer ${getToken()}`
    }
    });
  return res.data;
}

export async function getOneSupplierArticles(supplier_id:number,article_id:number):Promise<GetOneSupplierArticleResponse> {
  const res = await apiClient.get(`/supplier/${supplier_id}/article/${article_id}`,{
    headers:{
      Authorization: `Bearer ${getToken()}`
    }
    });
  return res.data;
}

export async function getAllSuppliersArticles():Promise<GetAllSupplierArticlesResponse> {
  const res = await apiClient.get(`/supplier/articles`,{
    headers:{
      Authorization: `Bearer ${getToken()}`
    }
    });
  return res.data;
}



import type { GetAllInventoryArticlesResponse, GetOneInventoryArticleResponse, MessageDTO } from '../utils/types';
import { apiClient } from './apiClient';
import { getToken } from './auth.service';

export async function addArticleToInventory(article_id:string,data:{quantity:string}):Promise<GetOneInventoryArticleResponse> {
  const res = await apiClient.post(`/inventory/add/${article_id}`,data,{
    headers:{
      Authorization: `Bearer ${getToken()}`
    }
    });
  return res.data;
}

export async function removeArticleFromInventory(article_id:string):Promise<MessageDTO>{
  const res = await apiClient.delete(`/inventory/delete/${article_id}`,{
    headers:{
      Authorization: `Bearer ${getToken()}`
    }
    });
  return res.data
}


export async function getOneArticleFromInventory(article_id:string):Promise<GetOneInventoryArticleResponse> {
  const res = await apiClient.get(`/inventory/${article_id}`,{
    headers:{
      Authorization: `Bearer ${getToken()}`
    }
  });
  return res.data;
}

export async function getAllInventoryArticles():Promise<GetAllInventoryArticlesResponse> {
  const res = await apiClient.get(`/inventory/`,{
    headers:{
      Authorization: `Bearer ${getToken()}`
    }
  });
  return res.data;
}

export async function updateInventoryArticleQuantity(article_id:string,data:{quantity:string}):Promise<MessageDTO> {
  const res = await apiClient.patch(`/inventory/update/${article_id}`,data,{
    headers:{
      Authorization: `Bearer ${getToken()}`
    }
  });
  return res.data;
}



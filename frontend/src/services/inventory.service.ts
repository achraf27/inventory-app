import type { GetAllInventoryArticlesResponse, GetOneInventoryArticleResponse, MessageDTO } from '../utils/types';
import { apiClient } from './apiClient';
import { getToken } from './auth.service';

export async function addArticle(article_id:number,data:{quantity:number}):Promise<GetOneInventoryArticleResponse> {
  const res = await apiClient.post(`/inventory/add/${article_id}`,data,{
    headers:{
      Authorization: `Bearer ${getToken()}`
    }
    });
  return res.data;
}

export async function deleteArticle(article_id:number):Promise<MessageDTO>{
  const res = await apiClient.delete(`/inventory/delete/${article_id}`,{
    headers:{
      Authorization: `Bearer ${getToken()}`
    }
    });
  return res.data
}


export async function getOneArticle(article_id:number):Promise<GetOneInventoryArticleResponse> {
  const res = await apiClient.get(`/inventory/${article_id}`,{
    headers:{
      Authorization: `Bearer ${getToken()}`
    }
  });
  return res.data;
}

export async function getAllArticles():Promise<GetAllInventoryArticlesResponse> {
  const res = await apiClient.get(`/inventory}`,{
    headers:{
      Authorization: `Bearer ${getToken()}`
    }
  });
  return res.data;
}

export async function updateArticleQuantity(article_id:number,data:{quantity:number}):Promise<MessageDTO> {
  const res = await apiClient.patch(`/inventory${article_id}`,data,{
    headers:{
      Authorization: `Bearer ${getToken()}`
    }
  });
  return res.data;
}



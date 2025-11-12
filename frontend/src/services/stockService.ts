import type { Stocks } from '../utils/types';
import { apiClient } from './apiClient';
import { getToken } from './authService';


export async function loadStocks(user_id:number):Promise<any> {
  const res = await apiClient.get('/article/user/' + user_id,{
    headers:{
      Authorization: `Bearer ${getToken()}`
    }
    });
  return res.data;
}

export async function createArticle(data: { name: string; quantity: number; unit: string, user_id : number }):Promise<string> {
  const res = await apiClient.post('/article', data,{
    headers:{
      Authorization: `Bearer ${getToken()}`
    }
    });
  return res.data;
}

export async function deleteArticle(id_article:number):Promise<any>{
  const res = await apiClient.delete('/article/'+id_article,{
    headers:{
      Authorization: `Bearer ${getToken()}`
    }
    });
  return res
}


export async function getArticle(id:number):Promise<Stocks> {
  const res = await apiClient.get('/article/' + id,{
    headers:{
      Authorization: `Bearer ${getToken()}`
    }
  });
  return res.data;
}

export async function updateArticle(id:number,article:Stocks):Promise<string>{
  const res = await apiClient.patch('/article/updateArticle/'+id,{name:article.name,quantity:article.quantity,unit:article.unit},{
    headers:{
      Authorization: `Bearer ${getToken()}`
    }
    });
  return res.data;
}
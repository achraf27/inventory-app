import type { ArticleDTO, GetOneArticleResponse, MessageDTO } from '../utils/types';
import { apiClient } from './apiClient';
import { getToken } from './auth.service';

export async function createArticle(data: { name: string; unit: string }):Promise<MessageDTO> {
  const res = await apiClient.post('/article/add', data,{
    headers:{
      Authorization: `Bearer ${getToken()}`
    }
    });
  return res.data;
}

export async function deleteArticle(article_id:number):Promise<MessageDTO>{
  const res = await apiClient.delete(`/article/delete/${article_id}`,{
    headers:{
      Authorization: `Bearer ${getToken()}`
    }
    });
  return res.data
}

export async function getAllArticles(){
 const res = await apiClient.get('/article',{
    headers:{
      Authorization: `Bearer ${getToken()}`
    }
  });
  return res.data;
}

export async function getArticle(article_id:number):Promise<GetOneArticleResponse> {
  const res = await apiClient.get('/article/' + article_id,{
    headers:{
      Authorization: `Bearer ${getToken()}`
    }
  });
  return res.data;
}

export async function updateArticle(article_id:number,article:ArticleDTO):Promise<MessageDTO>{
  const res = await apiClient.patch('/article/update/'+article_id,{name:article.name,unit:article.unit},{
    headers:{
      Authorization: `Bearer ${getToken()}`
    }
    });
  return res.data;
}
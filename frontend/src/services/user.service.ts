import type { MessageDTO, UserDTO } from '../utils/types';
import { apiClient } from './apiClient';
import { getToken } from './auth.service';


export async function deleteUser(user_id:number):Promise<MessageDTO>{
  const res = await apiClient.delete(`/user/admin/delete/${user_id}`,{
    headers:{
      Authorization: `Bearer ${getToken()}`
    }
    });
  return res.data
}

export async function updateMail(newMail:string):Promise<MessageDTO> {
  const res = await apiClient.patch(`/user/updateMail`,{newMail},{
    headers:{
      Authorization: `Bearer ${getToken()}`
    }
  });
  return res.data;
}

export async function updatePassword(newPassword:string):Promise<MessageDTO> {
  const res = await apiClient.patch(`/user/updatePassword`,{newPassword},{
    headers:{
      Authorization: `Bearer ${getToken()}`
    }
  });
  return res.data;
}


export async function getOneUser(user_id:number):Promise<UserDTO> {
  const res = await apiClient.get(`/user/admin/${user_id}`,{
    headers:{
      Authorization: `Bearer ${getToken()}`
    }
  });
  return res.data;
}

export async function getAllUsers():Promise<UserDTO[]> {
  const res = await apiClient.get(`/user/admin`,{
    headers:{
      Authorization: `Bearer ${getToken()}`
    }
  });
  return res.data;
}

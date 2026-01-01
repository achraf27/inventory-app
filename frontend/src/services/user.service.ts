import type { MessageDTO, UserDTO } from '../utils/types';
import { apiClient } from './apiClient';
import { getToken } from './auth.service';


export async function createUser(data:{role:string,name:string,password:string,mail:string}):Promise<MessageDTO>{
  const res = await apiClient.post(`/user/admin/user`,data,{
    headers:{
      Authorization: `Bearer ${getToken()}`
    }
    });
  return res.data
}

export async function deleteUser(user_id:number):Promise<MessageDTO>{
  const res = await apiClient.delete(`/user/admin/delete/${user_id}`,{
    headers:{
      Authorization: `Bearer ${getToken()}`
    }
    });
  return res.data
}

export async function updateMail(newMail:string):Promise<MessageDTO> {
  const res = await apiClient.patch(`/user/update/mail`,{newMail},{
    headers:{
      Authorization: `Bearer ${getToken()}`
    }
  });
  return res.data;
}

export async function updatePassword(newPassword:string):Promise<MessageDTO> {
  const res = await apiClient.patch(`/user/update/password`,{newPassword},{
    headers:{
      Authorization: `Bearer ${getToken()}`
    }
  });
  return res.data;
}
export async function adminUpdateRole(user_id:number,newRole:string):Promise<MessageDTO> {
  const res = await apiClient.patch(`/user/admin/update/${user_id}/role`,{newRole},{
    headers:{
      Authorization: `Bearer ${getToken()}`
    }
  });
  return res.data;
}

export async function adminUpdateName(user_id:number,newName:string):Promise<MessageDTO> {
  const res = await apiClient.patch(`/user/admin/update/${user_id}/name`,{newName},{
    headers:{
      Authorization: `Bearer ${getToken()}`
    }
  });
  return res.data;
}

export async function adminUpdateMail(user_id:number,newMail:string):Promise<MessageDTO> {
  const res = await apiClient.patch(`/user/admin/update/${user_id}/mail`,{newMail},{
    headers:{
      Authorization: `Bearer ${getToken()}`
    }
  });
  return res.data;
}

export async function adminUpdatePassword(user_id:number,newPassword:string):Promise<MessageDTO> {
  const res = await apiClient.patch(`/user/admin/update/${user_id}/password`,{newPassword},{
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

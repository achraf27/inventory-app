import { describe, it, expect, jest,beforeEach,afterEach} from '@jest/globals';
import { UserRepository } from '../../src/repositories/user.repository.js';
import { User } from '../../src/models/user.js';
import * as userDaoModule  from '../../src/dao/user.dao.js';



// Mock du DAO
jest.mock('../../src/dao/user.dao.js');

describe('userRepository', () => {
  let repo: UserRepository;

  beforeEach(() => {
    repo = new UserRepository();
  });

  it("Should create a user",async ()=>{

    const fakeId = 123
    const fakeRow = {role: 'Admin', name: 'Alice', mail: 'alice@mail.com', passwordHash: 'hashed' };

    const mockCreateUser = jest.spyOn(userDaoModule.UserDao.prototype, 'insert')
      .mockResolvedValue(fakeId as any);

    
    const user = await repo.createUser(fakeRow);

    expect(mockCreateUser).toHaveBeenCalledWith({role: 'Admin', name: 'Alice', mail: 'alice@mail.com', passwordHash: 'hashed' });
    expect(user.id).toEqual(fakeId)



  })

  it("Should return a user",async ()=>{

    const fakeRow = { id: 1, role: 'Admin', name: 'Alice', mail: 'alice@mail.com', passwordHash: 'hashed' };

    const mockFindById = jest.spyOn(userDaoModule.UserDao.prototype, 'findById')
      .mockResolvedValue(fakeRow as any);

    const user = await repo.getUser(1);

     expect(mockFindById).toHaveBeenCalledWith(1);
    expect(user).toBeInstanceOf(User);
    expect(user?.name).toBe('Alice');



  })


  it("Should return every user",async ()=>{

    const fakeRows = [{ id: 1, role: 'Admin', name: 'Alice', mail: 'alice@mail.com', passwordHash: 'hashed' },
                      { id: 2, role: 'User', name: 'Bob', mail: 'bob@mail.com', passwordHash: 'hashed' }];

    const mockFindAll = jest.spyOn(userDaoModule.UserDao.prototype, 'findAll')
      .mockResolvedValue(fakeRows as any);

    const users = await repo.getAllUsers();
    expect(Array.isArray(users)).toBe(true)
    expect(users).toHaveLength(2);
    users?.forEach(u=>expect(u).toBeInstanceOf(User))

 

  })

   

  it("Should update a password",async ()=>{

    const fakeResult = true

    const mockUpdateUserPassword = jest.spyOn(userDaoModule.UserDao.prototype, 'updatePassword')
      .mockResolvedValue(fakeResult as any);


   
    const user = await repo.updatePassword(123,"hash");

    expect(mockUpdateUserPassword).toHaveBeenCalledWith(123, "hash");
    expect(user).toBe(true);

  })

  it("Should update a mail",async ()=>{

    const fakeResult = true

    const mockUpdateUserMail = jest.spyOn(userDaoModule.UserDao.prototype, 'updateMail')
      .mockResolvedValue(fakeResult as any);

   
    const user = await repo.updateMail(123,"new@mail.com");

     expect(mockUpdateUserMail).toHaveBeenCalledWith(123, "new@mail.com");
    expect(user).toBe(true);

    

  })

   it("Should update a role",async ()=>{

    const fakeResult = true

    const mockUpdateUserRole = jest.spyOn(userDaoModule.UserDao.prototype, 'updateRole')
      .mockResolvedValue(fakeResult as any);

    const user = await repo.updateRole(123,"Admin");

    expect(mockUpdateUserRole).toHaveBeenCalledWith(123, "Admin");
    expect(user).toBe(true);
   
  })

   it("Should delete a user",async ()=>{

    const fakeResult = true

    const mockDeleteUser = jest.spyOn(userDaoModule.UserDao.prototype, 'delete')
      .mockResolvedValue(fakeResult as any);


    
    const user = await repo.deleteUser(123);

    expect(mockDeleteUser).toHaveBeenCalledWith(123);
    expect(user).toBe(true);

  })

  afterEach(()=>{
    jest.restoreAllMocks();
  })


});
import { describe, it, expect, jest,beforeEach,afterEach} from '@jest/globals';
import { SupplierRepository } from '../../src/repositories/supplier.repository.js';
import { Supplier } from '../../src/models/supplier.js';
import * as SupplierDaoModule  from '../../src/dao/supplier.dao.js';



// Mock du DAO
jest.mock('../../src/dao/supplier.dao.js');

describe('articleRepository', () => {
  let repo: SupplierRepository;

  beforeEach(() => {
    repo = new SupplierRepository();
  });

  it("Should create a Supplier",async ()=>{

    const fakeId = 123
    const fakeRow = {contact_name: 'Supplier', mail: 'supplier@mail.com' ,phone:"0699298796",address:"adress"};

    const mockCreateUser = jest.spyOn(SupplierDaoModule.SupplierDao.prototype, 'insert')
      .mockResolvedValue(fakeId as any);

    
    const supplier = await repo.createSupplier(fakeRow);

    expect(mockCreateUser).toHaveBeenCalledWith(fakeRow);
    expect(supplier.id).toEqual(fakeId)
  })


  it("Should return a Supplier",async ()=>{

    const fakeRow = {contact_name: 'Supplier', mail: 'supplier@mail.com' ,phone:"0699298796",address:"adress"};

    const mockFindById = jest.spyOn(SupplierDaoModule.SupplierDao.prototype, 'findById')
      .mockResolvedValue(fakeRow as any);

    const supplier = await repo.getSupplier(1);

     expect(mockFindById).toHaveBeenCalledWith(1);
    expect(supplier).toBeInstanceOf(Supplier);
    expect(supplier?.contact_name).toBe('Supplier');
  })


  it("Should update the Supplier contact_name",async ()=>{

    const fakeResult = true

    const mockUpdateArticleName = jest.spyOn(SupplierDaoModule.SupplierDao.prototype, 'updateName')
      .mockResolvedValue(fakeResult as any);
    const Supplier = await repo.updateSupplier(123,{contact_name:"newName"});

    expect(mockUpdateArticleName).toHaveBeenCalledWith(123, "newName");
    expect(Supplier).toBe(true);

  })


   it("Should delete an Supplier",async ()=>{

    const fakeResult = true

    const mockDeleteUser = jest.spyOn(SupplierDaoModule.SupplierDao.prototype, 'delete')
      .mockResolvedValue(fakeResult as any);
    const Supplier = await repo.deleteSupplier(123);

    expect(mockDeleteUser).toHaveBeenCalledWith(123);
    expect(Supplier).toBe(true);

  })

  afterEach(()=>{
    jest.restoreAllMocks();
  })


});
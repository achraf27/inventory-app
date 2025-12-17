import { describe, it, expect, jest,beforeEach,afterEach} from '@jest/globals';
import { SupplierRepository } from '../../src/repositories/supplier.repository.js';
import * as SupplierDaoModule  from '../../src/dao/supplierArticle.dao.js';



// Mock du DAO
jest.mock('../../src/dao/supplier.dao.js');

describe('articleRepository', () => {
  let repo: SupplierRepository;

  beforeEach(() => {
    repo = new SupplierRepository();
  });

  it("Should create a Supplier",async ()=>{

    const fakeResult = true
    const fakeRow = {supplier_id: 1, article_id:1};

    const mockCreateUser = jest.spyOn(SupplierDaoModule.SupplierArticleDao.prototype, 'insert')
      .mockResolvedValue(fakeResult as any);

    
    const supplier = await repo.addArticle(fakeRow.supplier_id,fakeRow.article_id);

    expect(mockCreateUser).toHaveBeenCalledWith(fakeRow);
    expect(supplier).toBe(true)
  })


  it("Should return a Supplier",async ()=>{

    const fakeRow = [{supplier_id: 1, article_id:1 ,name:"Farine",unit:"kg"},
                      {supplier_id: 1, article_id:2 ,name:"blé",unit:"kg"}];

    const mockFindById = jest.spyOn(SupplierDaoModule.SupplierArticleDao.prototype, 'findBySupplierId')
      .mockResolvedValue(fakeRow as any);

    const supplier = await repo.getAllSupplierArticles(1);

    expect(mockFindById).toHaveBeenCalledWith(1);
  })


  it("Should update the Supplier contact_name",async ()=>{

    const fakeRow = {supplier_id: 1, article_id:1 ,name:"Farine",unit:"kg"};

    const mockUpdateArticleName = jest.spyOn(SupplierDaoModule.SupplierArticleDao.prototype, 'findOneArticle')
      .mockResolvedValue(fakeRow as any);
    const Supplier = await repo.getOneSupplierArticle(1,1);

    expect(mockUpdateArticleName).toHaveBeenCalledWith(1, 1);
    expect(Supplier).toEqual(fakeRow);

  })


   it("Should delete an Supplier",async ()=>{

    const fakeResult = true

    const mockDeleteUser = jest.spyOn(SupplierDaoModule.SupplierArticleDao.prototype, 'delete')
      .mockResolvedValue(fakeResult as any);
    const Supplier = await repo.removeSupplierArticle(1,1);

    expect(mockDeleteUser).toHaveBeenCalledWith({article_id: 1,supplier_id:1});
    expect(Supplier).toBe(true);

  })

  afterEach(()=>{
    jest.restoreAllMocks();
  })


});
import { describe, it, expect, jest,beforeEach,afterEach} from '@jest/globals';
import { SupplierRepository } from '../../src/repositories/supplier.repository.js';
import * as SupplierDaoModule  from '../../src/dao/supplierArticle.dao.js';



jest.mock('../../src/dao/supplier.dao.js');

describe('articleRepository', () => {
  let repo: SupplierRepository;

  beforeEach(() => {
    repo = new SupplierRepository();
  });

  it("Should create a Supplier",async ()=>{

    const fakeResult = true
    const fakeRow = {supplier_id: 1, article_id:1};

    const mockCreateUser = jest.spyOn(SupplierDaoModule.SupplierArticleDao.prototype, 'insertOneArticle')
      .mockResolvedValue(fakeResult as any);

    
    const supplier = await repo.addArticle(fakeRow.supplier_id,fakeRow.article_id);

    expect(mockCreateUser).toHaveBeenCalledWith(fakeRow);
    expect(supplier).toBe(true)
  })


  it("Should return all supplier articles",async ()=>{

    const fakeRow = [{supplier_id: 1, article_id:1,contact_name:"supplier" ,name:"Farine",unit:"kg"},
                      {supplier_id: 1, article_id:2,contact_name:"supplier"  ,name:"blé",unit:"kg"}];

    const mockFindById = jest.spyOn(SupplierDaoModule.SupplierArticleDao.prototype, 'findBySupplierId')
      .mockResolvedValue(fakeRow as any);

    const supplierArticles = await repo.getAllArticlesBySupplierId(1);

    expect(supplierArticles).toEqual(fakeRow);
    expect(mockFindById).toHaveBeenCalledWith(1);
  })


  it("Should get a specific supplier article",async ()=>{

    const fakeRow = {supplier_id: 1, article_id:1,contact_name:"supplier" ,name:"Farine",unit:"kg"};

    const mockUpdateArticleName = jest.spyOn(SupplierDaoModule.SupplierArticleDao.prototype, 'findOneArticle')
      .mockResolvedValue(fakeRow as any);
    const Supplier = await repo.getOneSupplierArticle(1,1);

    expect(mockUpdateArticleName).toHaveBeenCalledWith(1, 1);
    expect(Supplier).toEqual(fakeRow);

  })


   it("Should remove a supplier article",async ()=>{

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
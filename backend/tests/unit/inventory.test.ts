import { describe, it, expect, jest,beforeEach,afterEach} from '@jest/globals';
import { inventoryRepository } from '../../src/repositories/inventory.repository.js';
import * as InventoryDaoModule  from '../../src/dao/inventory.dao.js';
import { Inventory } from '../../src/models/inventory.js';




// Mock du DAO
jest.mock('../../src/dao/inventory.dao.js');

describe('inventoryRepository', () => {
  let repo: inventoryRepository;

  beforeEach(() => {
    repo = new inventoryRepository();
  });

  it("Should add an article to the inventory",async ()=>{

    const fakeResult = true
    const fakeRow = { articleId:1,userId:1, quantity:5};

    const mockCreateUser = jest.spyOn(InventoryDaoModule.InventoryDao.prototype, 'insert')
      .mockResolvedValue(fakeResult as any);

    
    const inventory = await repo.addArticle(fakeRow);

    expect(mockCreateUser).toHaveBeenCalledWith({article_id:1,user_id:1, quantity:5});
    expect(inventory.article_id).toEqual(fakeRow.articleId)
  })

    it("Should update an article's quantity",async ()=>{

    const fakeResult = true

    const mockCreateUser = jest.spyOn(InventoryDaoModule.InventoryDao.prototype, 'updateQuantity')
      .mockResolvedValue(fakeResult as any);

    
    const inventory = await repo.updateQuantity(1,1,5);
    expect(inventory).toBe(true)
  })

   it("Should return a article",async ()=>{
  
      const fakeRow = { articleId:1,userId:1, quantity:5};
  
      const mockFindById = jest.spyOn(InventoryDaoModule.InventoryDao.prototype, 'findOneArticle')
        .mockResolvedValue(fakeRow as any);
  
      const article = await repo.getOneInventoryArticle(1,1);
  
      expect(mockFindById).toHaveBeenCalledWith(1,1);
      expect(article).toBeInstanceOf(Inventory);
      expect(article?.quantity).toEqual(5);
  
  
  
    })
  
  
    it("Should return every articles",async ()=>{
  
      const fakeRows = [{ articleId:1,userId:1, quantity:5},
                        { articleId:2,userId:1, quantity:2}];
  
      const mockFindAll = jest.spyOn(InventoryDaoModule.InventoryDao.prototype, 'findByUserId')
        .mockResolvedValue(fakeRows as any);
  
      const articles = await repo.getAllInventoryArticles(1);
      expect(Array.isArray(articles)).toBe(true)
      expect(articles).toHaveLength(2);
      articles?.forEach(u=>expect(u).toBeInstanceOf(Inventory))
  
   
  
    })

  it("Should remove an article from the inventory",async ()=>{

    const fakeResult = true

    const mockCreateUser = jest.spyOn(InventoryDaoModule.InventoryDao.prototype, 'delete')
      .mockResolvedValue(fakeResult as any);

    
    const inventory = await repo.removeArticle(1,1);

    expect(inventory).toBe(true)
  })





  afterEach(()=>{
    jest.restoreAllMocks();
  })


});
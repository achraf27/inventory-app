import { describe, it, expect, jest,beforeEach,afterEach} from '@jest/globals';
import { ArticleRepository } from '../../src/repositories/article.repository.js';
import { Article } from '../../src/models/article.js';
import * as ArticleDaoModule  from '../../src/dao/article.dao.js';



// Mock du DAO
jest.mock('../../src/dao/article.dao.js');

describe('articleRepository', () => {
  let repo: ArticleRepository;

  beforeEach(() => {
    repo = new ArticleRepository();
  });

  it("Should create a article",async ()=>{

    const fakeId = 123
    const fakeRow = {name: 'Farine', unit: 'kg' };

    const mockCreateUser = jest.spyOn(ArticleDaoModule.ArticleDao.prototype, 'insert')
      .mockResolvedValue(fakeId as any);

    
    const users = await repo.createArticle(fakeRow);

    expect(mockCreateUser).toHaveBeenCalledWith({name: 'Farine', unit: 'kg' });
    expect(users.id).toEqual(fakeId)
  })


  it("Should return a article",async ()=>{

    const fakeRow = { id: 1, name: 'Farine', unit: 'kg' };

    const mockFindById = jest.spyOn(ArticleDaoModule.ArticleDao.prototype, 'findById')
      .mockResolvedValue(fakeRow as any);

    const article = await repo.getArticle(1);

     expect(mockFindById).toHaveBeenCalledWith(1);
    expect(article).toBeInstanceOf(Article);
    expect(article?.name).toBe('Farine');
  })


  it("Should update the article name",async ()=>{

    const fakeResult = true

    const mockUpdateArticleName = jest.spyOn(ArticleDaoModule.ArticleDao.prototype, 'updateName')
      .mockResolvedValue(fakeResult as any);
    const article = await repo.updateArticle(123,{name:"hash"});

    expect(mockUpdateArticleName).toHaveBeenCalledWith(123, "hash");
    expect(article).toBe(true);

  })


   it("Should delete an article",async ()=>{

    const fakeResult = true

    const mockDeleteUser = jest.spyOn(ArticleDaoModule.ArticleDao.prototype, 'delete')
      .mockResolvedValue(fakeResult as any);
    const article = await repo.deleteArticle(123);

    expect(mockDeleteUser).toHaveBeenCalledWith(123);
    expect(article).toBe(true);

  })

  afterEach(()=>{
    jest.restoreAllMocks();
  })


});
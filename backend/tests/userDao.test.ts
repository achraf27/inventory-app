import { user } from '../src/services/user/classes/user';
import { DAODbFactory } from '../src/services/database/classes/DAODbFactory';

const factory = new DAODbFactory();
const userDb = factory.createUserDAO()

let userTest:user;

describe('User Dao',  () => {


  it('POST /register should create a user', async () => {
    
  });
   
  });
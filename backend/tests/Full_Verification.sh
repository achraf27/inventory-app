#!/bin/bash

npx tsc

echo "Test unitaires des repository "

npm run test user.test.ts

npm run test article.test.ts

npm run test inventory.test.ts

npm run test supplier.test.ts

npm run test supplier_article.test.ts

echo "Test d'acceptation des end points"

npm run test inventory.acceptance.test.ts

npm run test supplier.acceptance.test.ts


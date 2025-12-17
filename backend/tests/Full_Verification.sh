#!/bin/bash

npx tsc

echo "Test unitaires des repository "

npm run test user.test.ts

npm run test article.test.ts

npm run test inventory.test.ts

echo "Test d'acceptation des end points"


#!/bin/bash

npx tsc

echo "Test création utilisateur"

npm run test createUser.test.ts

echo "Test création article"

npm run test createArticle.test.ts
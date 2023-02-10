**\*** Project Setup **\***

1.  Initialize Project: npm init
2.  Script in JSON: Delete script in package.json
3.  Install Typescript: npm install --save-dev typescript
4.  File Exclusion: .gitignore => enter the list
    .idea
    \*.js
    node_modules
    dist
    .env
    rest-api/logs
5.  Git Setup
    1. Initialize Git: git init
    2. Remote Access to git Repository: git remote add origin https://github.com/iqbal-arif/Node-REST-API--TypeORM-Express.git
    3. Commit changes.
6.  Typescript Configuration:
    {
    "compilerOptions": {
    "target": "ES5",
    "outDir": "dist"
    }
    }
7.  Package JSON configuration:
    "scripts": {
    "build": "tsc",
    "start-server": "node dist/server.js"
    },
8.  File compilation: tsc
9.  App Launch for script: npm run build
10. To run the .ts file and get result: npm run start-server
11. Typescript Continuous UPdate: tsc -w
12. Install Express normal dependency: npm install --save express
13. Install Express for Typescript dependency: npm install --save-dev @types/express
14. Install rimraf to clean /dist folder at the beginning of build process: npm install --save-def rimraf. In linux it is rm -rf
15. Install cross-platform module that runs in scripts in sequence and in parallel:
    npm install --save-dev npm-run-all
16. Modify script for dev and production application
    "scripts": {
    "clean": "rimraf dist",
    "build": "tsc",
    "start-server": "node dist/server.js",
    "start-dev-server": "",
    "dev": "npm-run-all clean build start-server"
    },
17. Typescript tsc watch, watches for the changes & build it : npm install --save-dev tsc-watch
18. Parsing Command Line Argument
    "start-dev-server": "tsc-watch --onSuccess \"node dist/server.js 9901\"",

    ***

    // print process.argv
    argv.forEach((val, index) => {
    console.log(`${index}: ${val}`);
    });
    Launching the Node.js process as:

    $ node dist/server.js 9901
    Would generate the output:

    0: C:\\Program Files\\nodejs\\node.exe
    1: C:\\GITHUB\\Typescript_REST_API\\dist\\server.js
    2: 9901

19. DotEnv Package: To support Multiple Environments for App.
    1. Install Package: npm install dotenv --save
    2. Add LOGGER_LEVEL=debug: In production it is "debug"; normally it is set to "error" or "info"
20. Winston Logging Framework: 1. Install Package: npm install --save winston
    **\*** SERVER Setup **\***

21. Server Logic: server.js
22. Routes HTTP Logic: route.ts
23. Compile: npm run build if this does not work then try tsc or tsc -w
24. Start Server: node dist/server.js
25. DataBase Connection Installation: TypeORM
    1. npm install typeorm --save
    2. Database Driver: npm install pg --save
26. DataBase Connection AppDataSource TypeORM module
27. Database Initialize in server.ts
28. Start Server to Connect to Database successfully and then start server
29. Data Model
30. Meta Data Node Library: For Decorators to work properly
    1. Install: npm install --save reflect-metadata
31. DataBase Connection by SQL Shell
    1. Data Base listing: \dt;
    2. DataBase table COURSES data entry: select \* from "COURSES";
    3. DataBase Column for Table COURSES: \dS "COURSES";
    4. DataBase Column for Table LESSONS: \dS "LESSONS";
32. CORS Installation
    1. Install: npm install --save cors
33. Body Parser : a middleware fills body property with content of the body
    1. Install: npm install --save body-parser
34. POST , PATCH, PUT, DELETE UTILITY
    1. Chrome Extensions: Boomerang-SOAP & REST Client, etc
    2. POST App
    3. CURL Command for Windows / Mac Utility for POST, PUT, DELETE REQUESTS
       1. curl -X PATCH http://localhost:9001/api/courses/20 -H "Content-Type:application/json" -d '{"title":"Typescript Bootcamp v2"}'
35. POST: Creating a Course in a database
    1. curl -X POST http://localhost:9000/api/courses -H "Content-Type:application/json" -d '{"url": "firebase-bootcamp", "title": "Firebase Bootcamp", "iconUrl": "https://angular-university.s3-us-west-1.amazonaws.com/course-images/firebase-course-1.jpg","longDescription": "Complete guided tour to the Firebase ecosystem.", "category": "BEGINNER"}'
36. DELETE: Delete a Course from database
    1. curl -X DELETE http://localhost:9001/api/courses/45
    2. PostgresSQL SHELL CMD: postgres=# select \* from "LESSONS" where "courseId" = 45;
37. Create USER: 1. curl -X POST http://localhost:9001/api/users -H "Content-Type:application/json" -d '{"email": "new-user@angular-university.io", "pictureUrl":"https://avatars.githubusercontent.com/u/5454709", "password": "test123", "isAdmin": false}' 2. PostgresSQL SHELL CMD: postgres=# select \* from "USERS";
    /\***\*\*\*\*\*** npm notes **\*\***\***\*\***

        delete the node modules folder by running rm -rf node_modules
        delete package.lock.json file by running rm -f package-lock.json
        clean up the NPM cache by running npm cache clean --force
        install all packages again by running npm install

/\***\*\*\*\*\*** TypeORM Testing with Local Database **\*\***\***\*\***

1. Local Data: db_data.ts
2. Database Connection Logic: populate_db.ts
3. Script for Database in Package.json
   1. "populate-db": "npm-run-all clean build run-populate-db-script",
   2. "run-populate-db-script": "node dist/models/populate-db.js",

/\***\*\*\*\*\*** Script to clean Database **\*\***\***\*\***

1. Script for Database in Package.json
   1. "delete-db": "npm-run-all clean build run-delete-db-script",
   2. "run-delete-db-script": "node dist/models/delete_db.js"

/\***\*\*\*\*\*** CORS Capabilities To an Express Server **\*\***\***\*\***

1. Install: npm install --save cors

/\***\*\*\*\*\* Node Crypto Module (crypto.pbkdf2) For HashPassword **\*\***\***\*\*

1. Crypto in Action:
   1. in Terminal: type: node
   2. set crypto variable: type: const crypto = require('crypto');
   3. Run crypto.pbkdf2(): crypto.pbkdf2("plain password", "passwordSalt", number of hash iterations,hash password length, "hash algorithm", callback fnc (error,hash)=>console.log(hash.toString('hex'))). Hash value is going to be a buffer object, so convert it to string use "hex" to make it decimal string.
      Actual function is written as follows:
      crypto.pbkdf2("test", 'o61TA7yaJIsa', 1000, 64, "sha512",(err, hash) => console.log(hash.toString('hex')))
      Result Hash value: 8444e1207312309e8a0687bee0015633a1d51135ef75175d48786629e44e697be93a29ba70898f2c74107c3e827e6936346d3b0006a1354125a65ca755a691d6

/\***\*\*\*\*\*** JWT Authentication **\*\***\***\*\***

1. https://jwt.io/
2. it is encoded in base 64 URL , so it can be used in browser as a url parameter without special encoding.
   https://jwt.io/?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

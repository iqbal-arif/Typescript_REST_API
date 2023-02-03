**\*** Project Setup **\***

1. Initialize Project: npm init
2. Script in JSON: Delete script in package.json
3. Install Typescript: npm install --save-dev typescript
4. File Exclusion: .gitignore => enter the list
   .idea
   \*.js
   node_modules
   dist
   .env
   rest-api/logs
5. Git Setup
   1. Initialize Git: git init
   2. Remote Access to git Repository: git remote add origin https://github.com/iqbal-arif/Node-REST-API--TypeORM-Express.git
   3. Commit changes.
6. Typescript Configuration:
   {
   "compilerOptions": {
   "target": "ES5",
   "outDir": "dist"
   }
   }
7. Package JSON configuration:
   "scripts": {
   "build": "tsc",
   "start-server": "node dist/server.js"
   },
8. File compilation: tsc
9. App Launch for script: npm run build
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

/\***\*\*\*\*\*** npm notes **\*\***\***\*\***

    delete the node modules folder by running rm -rf node_modules
    delete package.lock.json file by running rm -f package-lock.json
    clean up the NPM cache by running npm cache clean --force
    install all packages again by running npm install

Backend
Backend service is responsible for adding the given values to database. Backend service is written in NodeJS, Hence we need to install NodeJS.

Developer has chosen NodeJs, Check with developer which version of NodeJS is needed. Developer has set a context that it can work with NodeJS >20

Install NodeJS, By default NodeJS 16 is available, We would like to enable 20 version and install this.

You can list modules by using dnf module list:


dnf module disable nodejs -y

dnf module enable nodejs:20 -y

dnf install nodejs -y

sudo dnf install git -y

Then verify:

node --version
npm --version

You write the backend code here:

VS Code
 ↓
Git Bash
 ↓
GitHub

GitHub
 ↓
git clone
 ↓
/var/www/employee-leave-management
 ↓
backend

Backend dependencies

Inside the backend directory linux:

npm install express mysql2 dotenv cors bcryptjs jsonwebtoken

npm install --save-dev nodemon

In linux pull backend repository:

git clone 

cd ~/expense-project/backend/

 ls -la

find ~/expense-project -name "package.json" -type f

Run: inside this server.js only we have package.json

node server.js

expected :

injected env (7) from .env
Server running on port 5000


Test from Backend EC2:

curl http://localhost:5000/api/health

expected result:
{
  "status": "OK",
  "message": "Employee Leave API is running"
}

Test Backend → MySQL:----

We'll also create a database test endpoint:

curl http://localhost:5000/api/health

Backend production Don't keep Node.js running with:

node server.js

for production , We'll install PM2:

sudo npm install -g pm2

pm2 start server.js --name employee-leave-api

pm2 status

pm2 logs employee-leave-api

pm2 save

check status:
ps -ef | grep node

Check whether port 5000 is listening:

sudo ss -lntp | grep :5000

Recommended for EC2: run it with PM2,If you don't want the backend to stop when you close SSH:

npm install -g pm2
cd ~/expense-project/backend/backend
pm2 start server.js --name backend


flow path :

Backend EC2
     |
     ↓
PM2
     |
     ↓
Node.js
     |
     ↓
Express
     |
     ↓
MySQL


 employee-leave-management
    │
    └── backend
        ├── server.js
        ├── .env
        ├── package.json
        ├── config/
        ├── models/
        ├── controllers/
        ├── routes/
        └── middleware/

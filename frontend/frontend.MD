Frontend
The frontend is the service in Expense to serve the web content over Nginx. This will have the web frame for the web application.

This is a static content and to serve static content we need a web server. This server

Developer has chosen Nginx as a web server and thus we will install Nginx Web Server.

Install Nginx:

dnf install nginx -y 

systemctl enable nginx

systemctl start nginx

Frontend files in VS Code:

frontend/
│
├── index.html
├── login.html
├── register.html
├── dashboard.html
├── apply-leave.html
├── leave-history.html
│
├── css/
│   └── style.css
│
└── js/
    ├── login.js
    ├── register.js
    ├── dashboard.js
    ├── apply-leave.js
    └── leave-history.js


In linux i have pull all files:

git clone

cd ~/expense-project/frontend 

Nginx configuration:

sudo dnf install nano -y

sudo yum install nano -y

sudo nano /etc/nginx/conf.d/expense-project.conf

ctrl+o --- > enter
ctrl+x  ---> exit

status check:

sudo nginx -t

expected result: ok , successfull.

sudo systemctl enable nginx


sudo systemctl start nginx


sudo systemctl status nginx


we can check our application in browser:

hhtp://frontend-publicip






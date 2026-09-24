Developer has chosen the database MySQL. Hence, we are trying to install it up and configure it.

Versions of the DB Software you will get context from the developer, Meaning we need to check with developer.

Install MySQL Server 8.0.x:

dnf install mysql-server -y

Start MySQL Service:

systemctl enable mysqld

systemctl start mysqld

login MYSQL:

sudo mysql

You should see:

mysql>
CREATE DATABASE employee_leave;
SHOW DATABASES;
CREATE USER 'leave_user'@'%' IDENTIFIED BY 'StrongPassword123!';
GRANT ALL PRIVILEGES
ON employee_leave.*
TO 'leave_user'@'%';
FLUSH PRIVILEGES;
exit

structure:

Node.js
   |
   | leave_user
   ↓
employee_leave database

In VS Code, we'll create:

database/
└── employee_leave.sql

Then push this SQL file to GitHub.

Clone your GitHub repository in linux:

cd /opt
sudo git clone https://github.com/YOUR_USERNAME/employee-leave-management.git
cd /opt/expense-project/database

ls -l

run cmd:

mysql -u leave_user -p employee_leave < employee_leave.sql

it will ask Enter password:StrongPassword123!

Run cmd:

mysql -u leave_user -p employee_leave

you will enter SQL:

mysql>

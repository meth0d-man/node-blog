You need:
NodeJs
Database (MongoDB) Free Cluster
Create .env file
Create a .env file to store your credentials. Example below:

MONGODB_URL = mongodb+srv://mrvladimir011:4Y4VGAHAZhyVwxd8@cluster0.llwmhqg.mongodb.net/blog

JWT_SECRET = 'mySecret';

Run Docker
docker build -t node-blog .
docker run -p 5000:5000 node-blog

API Endpoints:
Create a user on login, or use an existing user with these cred:

username: dovla
pass: 123456

after that you can go to http://localhost:5000/dashboard and edit with admin rights

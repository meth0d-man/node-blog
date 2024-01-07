#Using NodeJs and Database (MongoDB) Free Cluster

#App features:

Login, Register, List posts, list single post, edit post(with admin rights), delete post

#Create .env file to store your credentials. Example below:

`MONGODB_URL = mongodb+srv://mrvladimir011:4Y4VGAHAZhyVwxd8@cluster0.llwmhqg.mongodb.net/blog`

`JWT_SECRET = 'mySecret';`

#Run Docker

`docker build -t node-blog .`

`docker run -p 5000:5000 node-blog`

#Run app in browser here http://localhost:5000/

API Endpoints:

Create a user on login link, or use an existing user with these cred here http://localhost:5000/admin

`username: dovla`

`pass: 123456`

after that you can go to http://localhost:5000/dashboard and edit with admin rights

#Run test with
`npm test` from root NODE-BLOG dir

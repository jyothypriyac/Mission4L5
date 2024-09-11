This is the AI insurance assistant project for the Turner car insurance.

In this project we have two part: FrontEnd and Backend, each sepeerated in two different folders.

Once you clone this repository, you need to install npm and run the projects seperately.

Steps to follow:
- npm install
- npm run dev

this is needs to be done in both the frontend and backend seperately.

DOCKER SETUP

the Docker is set up in both the projects. for you to run docker, you need to follow the steps below:

Frontend:

docker build -t demo-insuranceassist-frontend .  
docker run -p 8080:80 demo-insuranceassist-frontend 


Back END:

docker build -t demo-insuranceassit-backend .       
docker run -p 8081:4000 demo-insuranceassit-backend 

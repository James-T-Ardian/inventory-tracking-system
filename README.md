This repository holds the development code for inventory-tracking-system website.

Deployment code for client folder: https://github.com/James-T-Ardian/inventory-tracking-system-client-deploy

Deployment code for server : NOT PUBLISHED (Deployment code for server has heroku mysql credentials out in the open. If an employer wants 
                            the server deployment code then please email me at: jamesardian01@gmail.com)

Description on difference between development and deployment code for server:
1. db.js has heroku mysql credentials
2. "require('dotenv').config()" in db.js and server.js deleted
3. cors origin parameter in server.js is changed to deployed website's url instead of local host 

Deployed website: https://inventory-tracking-system.netlify.app/ (CLICK HERE TO ACCESS WEBSITE !!!!!!!!!)
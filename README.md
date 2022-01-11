Development code for inventory-tracking-system website.

Deployment code for client folder: https://github.com/James-T-Ardian/inventory-tracking-system-client-deploy

Deployment code for server : NONE (Deployment code for server has heroku mysql credentials out in the open. If an employer wants 
                            the server deployment code then please email me at: jamesardian01@gmail.com)

Description on difference between development and deployment code for server: - db.js has heroku mysql credentials
                                                                              - "require('dotenv').config()" in db.js and server.js deleted
                                                                              - cors origin parameter in server.js is changed to deployed website's url instead of local host 

Deployed website: https://inventory-tracking-system.netlify.app/
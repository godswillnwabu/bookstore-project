# bookstore-project
Finally I landed my first backend project. After watching too many online tutorials and specific instructions I was able to launch my bookstore database (just a collection of two books) starting from the CRUD fundamental operations to API integrations and preventing malwares to setting up a secure bookstore database (Authentication & Authorization included). I find it demanding being a backend developer, I need to project more on the APIs.

# General-info
I npm installed all modules and package dependencies. I started with requiuring all the necessary dependencies in my app.js, created the book routes plus the configuration file and using my app to listen to it, thereby creating my local server and the port. In my app.js, I connected my mongodb to my book database using mongoose and I used models for my book schema to organise my data and joi for input validation. I implemented my software authorizatioin with AuthO database and finally created a http logger with winston package.

## Technologies
My database are supported by these middlewares 
* [helmet](https://www.npmjs.com/package/helmet) - Helmet helps secure Express apps by setting HTTP response headers.
* [joi](https://www.npmjs.com/package/joi) - The most powerful schema description language and data validator for JavaScript.
* [Morgan](https://www.npmjs.com/package/morgan) - Morgan is a Node.js and Express middleware to log HTTP requests and errors.
* [body-parser](https://www.npmjs.com/package/body-parser)

## Setup
Feel free to clone my repo and create more books for our store :)

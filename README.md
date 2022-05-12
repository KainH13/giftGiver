# [GiftIt:)](https://github.com/KainH13/giftIt.git)

### Technology
Built with Node.js, an Express and MongoDB backend, using a React front end.

### Use Case 
Provides a place to collect gift ideas for friends and family. Users can create contact cards storing their own ideas and make connections with other users to see their current interests and more.

### Local Setup
To run locally first clone this repo onto your local machine
```console
git clone https://github.com/KainH13/giftIt.git
```

Make sure node.js is installed: https://nodejs.org/en/download/

Make sure MongoDB is installed and running:
[Mac OS Setup](https://www.mongodb.com/docs/v4.4/tutorial/install-mongodb-on-os-x/)
[Windows Setup](https://www.mongodb.com/docs/v4.4/tutorial/install-mongodb-on-windows/)
[Linux Setup](https://www.mongodb.com/docs/v4.4/administration/install-on-linux/)


Navigate to client directory and install node modules
```console
cd giftIt/client
npm i
```

Navigate to server directory and install node modules
```console
cd giftIt/server
npm i
```

(Optional) install `nodemon` globally, which is handy for automatically restarting your backend during development
```console
npm install -g nodemon
```

Start backend server (from server directory)
```console
nodemon server.js
```
    or
```console
npm start
```

Start frontend React server (from client directory)
```console
npm start
```

You should now be able to navigate to `http://localhost:3000/` in your browser of choice to see the GiftIt login screen.
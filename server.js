var http = require("http");
var PORT = 8080;

//create a server object:
http
  .createServer(function(req, res) {
    console.log(req.body);
    res.write("Hello, your IP is: " + req.connection.remoteAddress); //write a response to the client
    res.end(); //end the response
  })
  .listen(PORT); //the server object listens on port 8080
console.log(`Server is running on port: ${PORT}`);

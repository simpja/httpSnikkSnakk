var http = require("http");
var PORT = 8080;
var fs = require("fs");

function getHTMLAsString(fileName, callBack) {
  fs.readFile(fileName, "utf8", function(err, data) {
    if (err) {
      callBack("Could not retrieve file");
    }
    callBack(data);
  });
}

//create a server object:
http
  .createServer(function(req, res) {
    getHTMLAsString("./index.html", HTMLString => {
      console.log(HTMLString);
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(HTMLString); //write a response to the client
      res.end(); //end the response
    });
  })
  .listen(PORT); //the server object listens on port 8080
console.log(`Server is running on port: ${PORT}`);

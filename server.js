var http = require("http");
var PORT = 8080;
var fs = require("fs");
var path = require("path");

function getHTMLAsString(fileName, callBack) {
  fs.readFile(fileName, "utf8", function(err, data) {
    if (err) {
      callBack("Could not retrieve file");
    }
    callBack(data);
  });
}

const gameData = {
  score: 0
};

//create a server object:
http
  .createServer(function(req, res) {
    console.log(
      "hey! someone is contacting me!",
      new Date().getSeconds(),
      req.url
    );
    if (req.url === "/") {
      getHTMLAsString("./index.html", HTMLString => {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(HTMLString); //write a response to the client
        res.end(); //end the response
      });
    } else if (req.url === "/api") {
      if (req.method === "POST") {
        let body = [];
        req
          .on("data", chunk => {
            body.push(chunk);
          })
          .on("end", () => {
            body = Buffer.concat(body).toString();

            console.log(body);
          });
      }
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(gameData));
      res.end();
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.write("404: Page not existus gigantus dickus");
      res.end();
    }
  })
  .listen(PORT); //the server object listens on port 8080
console.log(`Server is running on port: ${PORT}`);

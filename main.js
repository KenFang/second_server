const port = 3000;
http = require("http");
httpStatus = require("http-status-codes");
// Server object; app
app = http.createServer();

// Take a JavaScript object as an argument and return more-readable strings.
const getJSONSString = (obj) => {
  return JSON.stringify(obj, null, 2);
};

// Server object; app; has a callback function, (req, res) => {}
// callback function, (req, res) => {} is triggered every time a request is made to the server.
app.on("request", (req, res) => {
  let body = [];
  // Callback function; req.on("data"); is triggered when data is received for a specific request.
  req.on("data", (bodyData) => {
    // Add the data chunks to array; body.
    body.push(bodyData);
  });
  // Callback function; req.on("end") is triggered when the transmission of data is complete.
  req.on("end", () => {
    // The data chunks array; body; is turned into a String of text.
    body = Buffer.concat(body).toString();
    console.log(`Request Body Contents: ${body}`);
  });

  // Convert objects in request convert to more-readable strings.
  // Because some objects in request can have within them other nested objects.
  console.log(`Method: ${getJSONSString(req.method)}`);
  console.log(`Url: ${getJSONSString(req.url)}`);
  console.log(`Headers: ${getJSONSString(req.headers)}`);

  res.writeHead(httpStatus.OK, {
    "Content-Type": "text/html",
  });

  let responseMessage = "<hi>This will show on the screen.</hi>";
  res.end(responseMessage);
});

app.listen(port);
console.log(`The server has started and is listing on port number: ${port}`);

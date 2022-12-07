let express = require("express");
let app = express();
let ejs = require("ejs");
let pdf = require("html-pdf");
let path = require("path");
const https = require("https");
const fs = require("fs");
const cors = require("cors");

app.use(
  cors({
    origin: "*",
  })
);

let students = [
  {
    name: "Joy",
    email: "joy@example.com",
    city: "New York",
    country: "USA",
  },
  {
    name: "John",
    email: "John@example.com",
    city: "San Francisco",
    country: "USA",
  },
  {
    name: "Clark",
    email: "Clark@example.com",
    city: "Seattle",
    country: "USA",
  },
  {
    name: "Watson",
    email: "Watson@example.com",
    city: "Boston",
    country: "USA",
  },
  {
    name: "Tony",
    email: "Tony@example.com",
    city: "Los Angels",
    country: "USA",
  },
];

app.get("/generateReport", (req, res) => {
  ejs.renderFile(
    path.join(__dirname, "./views/", "report-template.ejs"),
    {
      students: students,
    },
    (err, data) => {
      if (err) {
        res.send(err);
      } else {
        let options = {
          height: "11.25in",
          width: "8.5in",
          header: {
            height: "20mm",
          },
          footer: {
            height: "20mm",
          },
        };
        pdf.create(data, options).toFile("report.pdf", function (err, data) {
          if (err) {
            res.send(err);
          } else {
            res.send("File created successfully");
          }
        });
      }
    }
  );
});

app.get("/test", (req, res) => {
  console.log("req", req.protocol);
  res.send([{ msg: "testing" }, { req: "req" }]);
});

// for SSL
// Read the certificate and the private key for the https server options
const options = {
  key: fs.readFileSync("./cert.key"),
  cert: fs.readFileSync("./cert.crt"),
};

// Create the https server by initializing it with 'options'
https.createServer(options, app).listen(3300, () => {
  console.log(`HTTPS server started on port 3300`);
});

console.log("listening at 3000");
app.listen(3000);

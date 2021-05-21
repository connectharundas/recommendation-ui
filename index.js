const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
let request = require('request');
const path = require("path");

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get("/recommendations/userattribute/trending", (req, res) => {
  console.log("query param ;", req.query.agegroup);
    callme(res,req.query);
  });

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);

});


callme = (res, req) => {
  const ageGroup = req.agegroup;
  const gender=req.gender;

  console.log("age group :", req.agegroup);
  console.log("gender: ", req.gender);

let url = "https://crm-nightly-new.cc.capillarytech.com/api_gateway/v1/recommendations/userattribute/trending?agegroup=" + ageGroup + "&fashiontype=%7Bupper%3Ashirt%2Clower%3Apant%7D&gender=" + gender + "&limit=3&offset=0";

const headers = {
  'Content-Type': 'application/json',
  'X-CAP-API-AUTH-ENTITY-ID': 123,
  'X-CAP-API-AUTH-ORG-ID': 50104,
  'Accept': 'application/json',
  'Authorization': "Basic dGVzdC50aWxsLjI6ZjkyNTkxNmUyNzU0ZTVlMDNmNzVkZDU4YTU3MzMyNTE="
}

request.get({ url: url, headers: headers }, function (e, r, body) {

  if (e) {
    console.log('error:', e);
  } else {
    console.log("body ", JSON.parse(body));
    res.json(JSON.parse(body));
  }
})
};
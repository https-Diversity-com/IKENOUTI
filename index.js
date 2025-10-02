const express = require('express');
const path = require('path'); // ファイルパスを扱うモジュール
const db = require('./DB');
const app = express();
const port = 3000;


app.use(express.static("public"));

//home
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "home.html"));
});

//db
app.get("/test", (req, res) => {
  db.query('SELECT 1 + 1 AS result', (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send("DBエラー");
      return;
    }
    res.json({ result: rows[0].result });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',   // DBサーバー（ローカルならこれ）
  user: 'root',        // ユーザー名
  password: '',// パスワード
  database: 'Diversity'   // 使うDB名
});

connection.connect((err) => {
  if (err) {
    console.error('接続エラー:', err);
    return;
  }
  console.log('MySQLに接続できたよ！');
});

module.exports = connection;
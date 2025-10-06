// ホームに戻る
function goHome() {
    location.href = "home.html";
  }
  
  // ログイン画面へ
  function goLogin() {
    location.href = "login.html";
  }
  
  // ページ遷移（例： kouan, yomitori, sentaku）
  function goPage(pageName) {
    location.href = `${pageName}.html`;
  }
  
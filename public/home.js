// 各ボタンを取得
const btnLogout = document.querySelector(".logout button");
const btnKouan = document.querySelector(".up button:nth-child(1)");
const btnYomitori = document.querySelector(".up button:nth-child(2)");
const btnKakeibo = document.querySelector(".down button");

// ページ遷移
btnLogout.addEventListener("click", () => {
    location.href = "login.html";
});

btnKouan.addEventListener("click", () => {
    location.href = "kouan.html";
});

btnYomitori.addEventListener("click", () => {
    location.href = "yomitori.html";
});

btnKakeibo.addEventListener("click", () => {
    location.href = "sentaku.html";
});

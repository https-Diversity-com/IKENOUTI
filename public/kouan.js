// 追加ボタン
const addBtn = document.getElementById("addBtn");
const contentArea = document.getElementById("contentArea");
const confirmBtn = document.getElementById("confirmBtn");
const backBtn = document.querySelector(".back-btn");

backBtn.addEventListener("click", goHome);

addBtn.addEventListener("click", () => {
  const wrapper = document.createElement("div");
  wrapper.classList.add("content-wrapper");

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "考案内容（例: カロリー）";

  const detail = document.createElement("input");
  detail.type = "text";
  detail.placeholder = "内容詳細（例: ○○以下）";

  const delBtn = document.createElement("button");
  delBtn.textContent = "削除";
  delBtn.classList.add("oval");

  delBtn.addEventListener("click", () => {
    wrapper.remove();
  });

  wrapper.appendChild(input);
  wrapper.appendChild(detail);
  wrapper.appendChild(delBtn);

  contentArea.appendChild(wrapper);
});

// 確定ボタンの処理
confirmBtn.addEventListener("click", () => {
  const wrappers = document.querySelectorAll(".content-wrapper");
  if (wrappers.length === 0) {
    alert("条件が入力されていません。");
    return;
  }

  let results = "【入力した条件】\n";
  wrappers.forEach((wrapper, index) => {
    const inputs = wrapper.querySelectorAll("input");
    const content = inputs[0].value || "（未入力）";
    const detail = inputs[1].value || "（未入力）";
    results += `${index + 1}. ${content} - ${detail}\n`;
  });

  alert(results);
});

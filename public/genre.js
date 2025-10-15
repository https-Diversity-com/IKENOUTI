let items = [
  { date: "2025-10-01", name: "りんご", price: 100 },
  { date: "2025-10-02", name: "バナナ", price: 150 },
  { date: "2025-10-03", name: "牛乳", price: 200 },
  { date: "2025-10-04", name: "卵", price: 250 },
  { date: "2025-10-05", name: "パン", price: 180 },
  { date: "2025-10-06", name: "ティッシュ", price: 300 },
  { date: "2025-10-07", name: "洗剤", price: 350 },
  { date: "2025-10-08", name: "コーヒー", price: 400 },
  { date: "2025-10-09", name: "カレー", price: 500 },
  { date: "2025-10-10", name: "お茶", price: 120 },
  { date: "2025-10-01", name: "りんご", price: 100 },
  { date: "2025-10-02", name: "バナナ", price: 150 },
  { date: "2025-10-03", name: "牛乳", price: 200 },
  { date: "2025-10-04", name: "卵", price: 250 },
  { date: "2025-10-05", name: "パン", price: 180 },
  { date: "2025-10-06", name: "ティッシュ", price: 300 },
  { date: "2025-10-07", name: "洗剤", price: 350 },
  { date: "2025-10-08", name: "コーヒー", price: 400 },
  { date: "2025-10-09", name: "カレー", price: 500 },
  { date: "2025-10-10", name: "お茶", price: 120 },
  { date: "2025-10-01", name: "りんご", price: 100 },
  { date: "2025-10-02", name: "バナナ", price: 150 },
  { date: "2025-10-03", name: "牛乳", price: 200 },
  { date: "2025-10-04", name: "卵", price: 250 },
  { date: "2025-10-05", name: "パン", price: 180 },
  { date: "2025-10-06", name: "ティッシュ", price: 300 },
  { date: "2025-10-07", name: "洗剤", price: 350 },
  { date: "2025-10-08", name: "コーヒー", price: 400 },
  { date: "2025-10-09", name: "カレー", price: 500 },
  { date: "2025-10-10", name: "お茶", price: 120 },
];

const itemsPerPage = 10;
let currentPage = 1;

const tableBody = document.querySelector(".item-table tbody");
const prevBtn = document.querySelector(".page-btn.prev");
const nextBtn = document.querySelector(".page-btn.next");
const addBtn = document.querySelector(".add-btn");

const toast = document.createElement("div");
toast.className = "toast";
document.body.appendChild(toast);

const overlay = document.querySelector(".confirm-overlay");
const confirmMsg = document.getElementById("confirm-message");
const yesBtn = document.getElementById("confirm-yes");
const noBtn = document.getElementById("confirm-no");
let deleteTarget = null;

const addOverlay = document.querySelector(".add-overlay");
const addSubmit = document.getElementById("add-submit");
const addCancel = document.getElementById("add-cancel");
const itemNameInput = document.getElementById("item-name");
const itemPriceInput = document.getElementById("item-price");

function renderTable() {
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageItems = items.slice(start, end);

  tableBody.innerHTML = "";
  pageItems.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.date}</td>
      <td>${item.name}</td>
      <td>${item.price}</td>
      <td><button class="delete-btn">削除</button></td>
    `;

    const deleteBtn = row.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () => {
      deleteTarget = { index: start + index, name: item.name };
      confirmMsg.textContent = `「${item.name}」を削除しますか？`;
      overlay.style.display = "flex";
    });

    tableBody.appendChild(row);
  });

  prevBtn.style.display = currentPage === 1 ? "none" : "inline-block";
  nextBtn.style.display = end >= items.length ? "none" : "inline-block";
}

yesBtn.addEventListener("click", () => {
  if (deleteTarget) {
    items.splice(deleteTarget.index, 1);
    overlay.style.display = "none";
    showToast(`「${deleteTarget.name}」を削除しました！`);
    const totalPages = Math.ceil(items.length / itemsPerPage);
    if (currentPage > totalPages) currentPage = totalPages;
    renderTable();
    deleteTarget = null;
  }
});

noBtn.addEventListener("click", () => {
  overlay.style.display = "none";
  deleteTarget = null;
});

addBtn.addEventListener("click", () => {
  addOverlay.style.display = "flex";
  itemNameInput.value = "";
  itemPriceInput.value = "";
  itemNameInput.focus();
});

addCancel.addEventListener("click", () => {
  addOverlay.style.display = "none";
});

addSubmit.addEventListener("click", () => {
  const name = itemNameInput.value.trim();
  const price = parseInt(itemPriceInput.value);
  if (!name || isNaN(price)) {
    showToast("商品名と価格を入力してください！");
    return;
  }

  const today = new Date().toISOString().split("T")[0];
  items.push({ date: today, name, price });

  addOverlay.style.display = "none";
  showToast(`「${name}」を追加しました！`);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  currentPage = totalPages;
  renderTable();
});

nextBtn.addEventListener("click", () => {
  if (currentPage * itemsPerPage < items.length) {
    currentPage++;
    renderTable();
  }
});

prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderTable();
  }
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

renderTable();

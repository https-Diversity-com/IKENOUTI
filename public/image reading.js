// 画像データを保存する配列
let images = [];
let currentImageIndex = -1;

// DOM要素の取得
const backButton = document.getElementById('backButton');
const browseButton = document.getElementById('browseButton');
const addButton = document.getElementById('addButton');
const fileInput = document.getElementById('fileInput');
const photoDisplay = document.getElementById('photoDisplay');
const imageList = document.getElementById('imageList');

// 参照ボタンのクリックイベント
browseButton.addEventListener('click', () => {
    fileInput.click();
});

// ファイル選択時のイベント
fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
        displayImage(file);
        addButton.disabled = false;
    }
});

// 画像を表示する関数
function displayImage(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        photoDisplay.innerHTML = `<img src="${e.target.result}" alt="選択した画像">`;
        // 現在表示している画像を一時保存
        photoDisplay.dataset.currentImage = e.target.result;
        photoDisplay.dataset.currentFileName = file.name;
    };
    reader.readAsDataURL(file);
}

// 追加ボタンのクリックイベント
addButton.addEventListener('click', () => {
    const imageData = photoDisplay.dataset.currentImage;
    const fileName = photoDisplay.dataset.currentFileName;
    
    if (imageData) {
        // 画像を配列に追加
        images.push({
            data: imageData,
            name: fileName
        });

        // リストに追加
        addImageToList(images.length - 1);

        // リストを表示
        imageList.style.display = 'block';

        // 追加ボタンを無効化
        addButton.disabled = true;

        // プレースホルダーに戻す
        photoDisplay.innerHTML = '<div class="placeholder">選んだ写真を表示</div>';
        delete photoDisplay.dataset.currentImage;
        delete photoDisplay.dataset.currentFileName;

        alert('画像を追加しました！');
    }
});

// 画像をリストに追加する関数
function addImageToList(index) {
    const image = images[index];
    const imageItem = document.createElement('div');
    imageItem.className = 'image-item';
    imageItem.dataset.index = index;

    imageItem.innerHTML = `
        <img src="${image.data}" alt="${image.name}">
        <span>${image.name}</span>
        <button class="delete-btn" data-index="${index}">削除</button>
    `;

    // 画像アイテムをクリックして表示
    imageItem.addEventListener('click', (e) => {
        if (!e.target.classList.contains('delete-btn')) {
            selectImage(index);
        }
    });

    // 削除ボタンのイベント
    imageItem.querySelector('.delete-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        deleteImage(index);
    });

    imageList.appendChild(imageItem);
}

// 画像を選択して表示する関数
function selectImage(index) {
    const image = images[index];
    photoDisplay.innerHTML = `<img src="${image.data}" alt="${image.name}">`;
    currentImageIndex = index;

    // 選択状態をハイライト
    document.querySelectorAll('.image-item').forEach((item, i) => {
        if (i === index) {
            item.classList.add('selected');
        } else {
            item.classList.remove('selected');
        }
    });

    addButton.disabled = true;
}

// 画像を削除する関数
function deleteImage(index) {
    if (confirm('この画像を削除しますか？')) {
        images.splice(index, 1);
        refreshImageList();

        // 現在表示中の画像が削除された場合
        if (currentImageIndex === index) {
            photoDisplay.innerHTML = '<div class="placeholder">選んだ写真を表示</div>';
            currentImageIndex = -1;
        }

        // リストが空になったら非表示
        if (images.length === 0) {
            imageList.style.display = 'none';
        }
    }
}

// 画像リストを再描画する関数
function refreshImageList() {
    imageList.innerHTML = '';
    images.forEach((image, index) => {
        addImageToList(index);
    });
}

// 戻るボタンのクリックイベント
backButton.addEventListener('click', () => {
    if (images.length > 0) {
        if (confirm('追加した画像は削除されます。戻りますか？')) {
            window.history.back();
        }
    } else {
        window.history.back();
    }
});
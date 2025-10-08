// パスワード表示/非表示トグル機能
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');

togglePassword.addEventListener('click', function() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    this.textContent = type === 'password' ? '表示' : '非表示';
});

// ログインフォーム送信処理
const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');

loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    // エラーメッセージをクリア
    errorMessage.textContent = '';
    errorMessage.style.color = '#d32f2f';

    // 基本的なバリデーション
    if (username === '') {
        errorMessage.textContent = 'ユーザーネームを入力してください';
        return;
    }

    if (password === '') {
        errorMessage.textContent = 'パスワードを入力してください';
        return;
    }

    if (password.length < 6) {
        errorMessage.textContent = 'パスワードは6文字以上で入力してください';
        return;
    }

    // ログイン処理
    console.log('ログイン試行:', { username, password: '***' });
    
    // ログイン処理中メッセージ
    errorMessage.style.color = '#2e7d32';
    errorMessage.textContent = 'ログイン処理中...';

    // 1秒後にホーム画面に遷移
    setTimeout(() => {
        window.location.href = 'home.html';
    }, 1000);
});

// Enterキーでのフォーム送信を有効化
document.getElementById('username').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        document.getElementById('password').focus();
    }
});
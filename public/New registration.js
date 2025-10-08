const registerForm = document.getElementById('registerForm');
const newUsernameInput = document.getElementById('newUsername');
const newPasswordInput = document.getElementById('newPassword');
const confirmPasswordInput = document.getElementById('confirmPassword');
const errorMessage = document.getElementById('errorMessage');
const togglePassword = document.getElementById('togglePassword');
const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');


togglePassword.addEventListener('click', function() {
    if (newPasswordInput.type === 'password') {
        newPasswordInput.type = 'text';
        togglePassword.textContent = '非表示';
    } else {
        newPasswordInput.type = 'password';
        togglePassword.textContent = '表示';
    }
});


toggleConfirmPassword.addEventListener('click', function() {
    if (confirmPasswordInput.type === 'password') {
        confirmPasswordInput.type = 'text';
        toggleConfirmPassword.textContent = '非表示';
    } else {
        confirmPasswordInput.type = 'password';
        toggleConfirmPassword.textContent = '表示';
    }
});


registerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = newUsernameInput.value.trim();
    const password = newPasswordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    
    errorMessage.style.display = 'none';
    errorMessage.textContent = '';

    
    if (username === '') {
        showError('ユーザーネームを入力してください');
        return;
    }

    if (password === '') {
        showError('パスワードを入力してください');
        return;
    }

    if (confirmPassword === '') {
        showError('パスワード確認を入力してください');
        return;
    }

    if (username.length < 3) {
        showError('ユーザーネームは3文字以上で入力してください');
        return;
    }

    if (password.length < 6) {
        showError('パスワードは6文字以上で入力してください');
        return;
    }

    if (password !== confirmPassword) {
        showError('パスワードが一致しません');
        return;
    }

    // 登録成功
    registerSuccess(username);
});

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

function registerSuccess(username) {
    
    window.location.href = 'Login.html';
}
// forms 
const form = document.querySelector('#main-form');
const register = document.querySelector('#register-form');

// buttons
    // login buttons
    const formLogin = document.querySelector('#main-form #login');
    const formRegister = document.querySelector('#main-form #register');
    // register buttons
    const registerLogin = document.querySelector('#register-form #login');
    const registerRegister = document.querySelector('#register-form #register');

registerLogin.addEventListener('click', (e) => {
    e.preventDefault();
    register.classList.add('hidden');
    form.classList.remove('hidden');
});
formRegister.addEventListener('click', (e) => {
    e.preventDefault();
    register.classList.remove('hidden');
    form.classList.add('hidden');
});

formLogin.addEventListener('click', (e) => {
    e.preventDefault();
    // get user info
    // check if username exists
    console.log('login');
    
    window.location.href = '/menu.html';
});
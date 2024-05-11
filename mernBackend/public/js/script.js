
let body = document.body;
let profile = document.querySelector('.header .flex .profile');
document.querySelector('#user-btn').onclick = () =>{
    profile.classList.toggle('active');
    searchform.classList.remove('active');
}

let searchform = document.querySelector('.header .flex .search-form');
document.querySelector('#search-btn').onclick = () =>{
    searchform.classList.toggle('active');
    profile.classList.remove('active');
}


let sideBar = document.querySelector('.side-bar');
let main = document.querySelector('.main');
document.querySelector('#menu-btn').onclick = () =>{
    sideBar.classList.toggle('active');
    main.classList.toggle('active');
}
document.querySelector('.side-bar .close-side-bar').onclick = () =>{
    sideBar.classList.add('active');
    main.classList.add('active');
}

 window.onscroll = () =>{
     profile.classList.remove('active');
     searchform.classList.remove('active');
//     if(window.innerWidth < 1200) {
//         sideBar.classList.add('active');
//         main.classList.add('active');
//         body.classList.remove('active')
//     }
 }

let toggleBtn = document.querySelector('#toggle-btn');
let darkMode = localStorage.getItem('dark-mode');
const enableDarkMode = () => {
    toggleBtn.classList.replace('fa-sun', 'fa-moon');
    body.classList.add('dark');
    localStorage.setItem('dark-mode', 'enabled');
} 
const disableDarkMode = () => {
    toggleBtn.classList.replace('fa-moon', 'fa-sun');
    body.classList.remove('dark');
    localStorage.setItem('dark-mode', 'disabled');
} 
if(darkMode === 'enabled') {
    enableDarkMode();
}
toggleBtn.onclick = (e) => {
    let darkMode = localStorage.getItem('dark-mode');
    if(darkMode === 'disabled') {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
}
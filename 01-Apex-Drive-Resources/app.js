import page from './node_modules/page/page.mjs';
import { render } from './node_modules/lit-html/lit-html.js';
import { getUserData, clearUserData } from './src/util.js';
import { homePage } from './src/views/home.js';
import { loginPage } from './src/views/login.js';
import { registerPage } from './src/views/register.js';
import { dashboardPage } from './src/views/dashboard.js';
import { createPage } from './src/views/create.js';
import { detailsPage } from './src/views/details.js';
import { editPage } from './src/views/edit.js';
import { searchPage } from './src/views/search.js';

const root = document.querySelector('#main-element');

page(decorateContext);
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/dashboard', dashboardPage);
page('/create', createPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);
page('/search', searchPage);

updateNav();
page.start();

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateNav = updateNav;
    next();
}

function updateNav() {
    const user = getUserData();
    const guestNav = document.querySelectorAll('.guest');
    const userNav = document.querySelectorAll('.user');
    
    const guestArray = Array.from(guestNav);
    const userArray = Array.from(userNav);
    
    if (user) {
        guestArray.forEach(el => el.style.display = 'none');
        userArray.forEach(el => el.style.display = 'block');
        
        // Attach logout handler
        const logoutLinks = document.querySelectorAll('a[href="/logout"]');
        Array.from(logoutLinks).forEach(link => {
            link.removeEventListener('click', logout);
            link.addEventListener('click', logout);
        });
    } else {
        guestArray.forEach(el => el.style.display = 'block');
        userArray.forEach(el => el.style.display = 'none');
    }
}

async function logout(e) {
    e.preventDefault();
    const confirmation = confirm('Are you sure you want to logout?');
    if (confirmation) {
        try {
            await fetch('http://localhost:3030/users/logout', {
                method: 'GET',
                headers: {
                    'X-Authorization': getUserData().accessToken
                }
            });
            clearUserData();
            updateNav();
            page.redirect('/');
        } catch (err) {
            console.error(err);
        }
    }
}
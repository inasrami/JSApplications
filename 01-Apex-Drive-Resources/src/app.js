import { page, render, html } from './lib.js';
import { getUserData } from './util.js';
import { logout } from './api/users.js';

import { showHome } from './views/home.js';
import { showLogin } from './views/login.js';
import { showRegister } from './views/register.js';
import { showDashboard } from './views/dashboard.js';
import { showCreate } from './views/create.js';
import { showDetails } from './views/details.js';
import { showEdit } from './views/edit.js';
import { showSearch } from './views/search.js';

const main = document.getElementById('main-element');
const nav = document.querySelector('nav');

page(decorateContext);
page('/', showHome);
page('/index.html', showHome);
page('/login', showLogin);
page('/register', showRegister);
page('/dashboard', showDashboard);
page('/create', showCreate);
page('/details/:id', showDetails);
page('/edit/:id', showEdit);
page('/search', showSearch);
page('/logout', onLogout);

updateNav();
page.start();

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, main);
    ctx.updateNav = updateNav;
    ctx.user = getUserData();
    next();
}

function updateNav() {
    const user = getUserData();
    render(navTemplate(user), nav);
}

const navTemplate = (user) => html`
    <div>
        <a href="/dashboard">Our Cars</a>
        <a href="/search">Search</a>
    </div>

    ${user 
        ? html`
            <div class="user">
                <a href="/create">Add Your Car</a>
                <a href="/logout">Logout</a>
            </div>`
        : html`
            <div class="guest">
                <a href="/login">Login</a>
                <a href="/register">Register</a>
            </div>`
    }
`;

async function onLogout() {
    await logout();
    updateNav();
    page.redirect('/');
}
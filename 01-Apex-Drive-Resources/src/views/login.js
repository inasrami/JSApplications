import { html } from '../../node_modules/lit-html/lit-html.js';
import { post } from '../api.js';
import { setUserData } from '../util.js';

const loginTemplate = (onSubmit) => html`
<section id="login">
    <div class="form">
        <h2>Login</h2>
        <form class="login-form" @submit=${onSubmit}>
            <input type="text" name="email" id="email" placeholder="email" />
            <input type="password" name="password" id="password" placeholder="password" />
            <button type="submit">login</button>
            <p class="message">
                Not registered? <a href="/register">Create an account</a>
            </p>
        </form>
    </div>
</section>`;

export function loginPage(ctx) {
    ctx.render(loginTemplate(onSubmit));

    async function onSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get('email').trim();
        const password = formData.get('password').trim();

        if (!email || !password) {
            return alert('All fields are required!');
        }

        try {
            const userData = await post('/users/login', { email, password });
            setUserData(userData);
            ctx.updateNav();
            ctx.page.redirect('/');
        } catch (err) {
            console.error(err);
        }
    }
}
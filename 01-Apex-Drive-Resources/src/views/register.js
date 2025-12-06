import { html } from '../../node_modules/lit-html/lit-html.js';
import { post } from '../api.js';
import { setUserData } from '../util.js';

const registerTemplate = (onSubmit) => html`
<section id="register">
    <div class="form">
        <h2>Register</h2>
        <form class="register-form" @submit=${onSubmit}>
            <input type="text" name="email" id="register-email" placeholder="email" />
            <input type="password" name="password" id="register-password" placeholder="password" />
            <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
            <button type="submit">register</button>
            <p class="message">Already registered? <a href="/login">Login</a></p>
        </form>
    </div>
</section>`;

export function registerPage(ctx) {
    ctx.render(registerTemplate(onSubmit));

    async function onSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get('email').trim();
        const password = formData.get('password').trim();
        const rePassword = formData.get('re-password').trim();

        if (!email || !password || !rePassword) {
            return alert('All fields are required!');
        }

        if (password !== rePassword) {
            return alert('Passwords don\'t match!');
        }

        try {
            const userData = await post('/users/register', { email, password });
            setUserData(userData);
            ctx.updateNav();
            ctx.page.redirect('/');
        } catch (err) {
            console.error(err);
        }
    }
}
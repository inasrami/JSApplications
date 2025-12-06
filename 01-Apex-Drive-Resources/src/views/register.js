import { html } from '/node_modules/lit-html/lit-html.js';
import { register } from '../api/data.js';
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

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const email = formData.get('email').trim();
        const password = formData.get('password').trim();
        const repass = formData.get('re-password').trim();

        if (email == '' || password == '' || repass == '') {
            return alert('All fields are required!');
        }
        if (password != repass) {
            return alert('Passwords do not match!');
        }

        try {
            const user = await register({ email, password });
            setUserData(user);
            ctx.updateNav();
            ctx.page.redirect('/');
        } catch (err) {

        }
    }
}
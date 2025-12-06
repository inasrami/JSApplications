import { html } from '../lib.js';

const homeTemplate = () => html`
    <section id="hero">
        <img class="hero-logo" src="/images/car-logo.png" alt="logo">
        <h1>
            Peak performance on four wheels. Your ultimate destination for innovation, power, and an unparalleled driving experience.
        </h1>
    </section>
`;

export function showHome(ctx) {
    ctx.render(homeTemplate());
}
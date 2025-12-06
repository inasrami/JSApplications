import { html } from '/node_modules/lit-html/lit-html.js';
import { createCar } from '../api/data.js';

const createTemplate = (onSubmit) => html`
    <section id="create">
        <div class="form form-auto">
            <h2>Share Your Car</h2>
            <form class="create-form" @submit=${onSubmit}>
                <input type="text" name="model" id="model" placeholder="Model"/>
                <input type="text" name="imageUrl" id="car-image" placeholder="Your Car Image URL" />
                <input type="text" name="price" id="price" placeholder="Price in Euro" />
                <input type="number" name="weight" id="weight" placeholder="Weight in Kg" />
                <input type="text" name="speed" id="speed" placeholder="Top Speed in Kmh" />
                <textarea id="about" name="about" placeholder="More About The Car" rows="10" cols="50"></textarea>
                <button type="submit">Add</button>
            </form>
        </div>
    </section>`;

export function createPage(ctx) {
    ctx.render(createTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        
        const car = {
            model: formData.get('model').trim(),
            imageUrl: formData.get('imageUrl').trim(),
            price: formData.get('price').trim(),
            weight: formData.get('weight').trim(),
            speed: formData.get('speed').trim(),
            about: formData.get('about').trim()
        };

        if (Object.values(car).some(x => x == '')) {
            return alert('All fields are required!');
        }

        await createCar(car);
        ctx.page.redirect('/dashboard');
    }
}
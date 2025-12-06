import { html } from '../../node_modules/lit-html/lit-html.js';
import { get, put } from '../api.js';

const editTemplate = (car, onSubmit) => html`
<section id="edit">
    <div class="form form-auto">
        <h2>Edit Your Car</h2>
        <form class="edit-form" @submit=${onSubmit}>
            <input type="text" name="model" id="model" placeholder="Model" .value=${car.model} />
            <input type="text" name="imageUrl" id="car-image" placeholder="Your Car Image URL" .value=${car.imageUrl} />
            <input type="text" name="price" id="price" placeholder="Price in Euro" .value=${car.price} />
            <input type="number" name="weight" id="weight" placeholder="Weight in Kg" .value=${car.weight} />
            <input type="text" name="speed" id="speed" placeholder="Top Speed in Kmh" .value=${car.speed} />
            <textarea id="about" name="about" placeholder="More About The Car" rows="10" cols="50" .value=${car.about}></textarea>
            <button type="submit">Edit</button>
        </form>
    </div>
</section>`;

export async function editPage(ctx) {
    const id = ctx.params.id;
    const car = await get('/data/cars/' + id);
    
    ctx.render(editTemplate(car, onSubmit));

    async function onSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        const model = formData.get('model').trim();
        const imageUrl = formData.get('imageUrl').trim();
        const price = formData.get('price').trim();
        const weight = formData.get('weight').trim();
        const speed = formData.get('speed').trim();
        const about = formData.get('about').trim();

        if (!model || !imageUrl || !price || !weight || !speed || !about) {
            return alert('All fields are required!');
        }

        try {
            await put('/data/cars/' + id, { model, imageUrl, price, weight, speed, about });
            ctx.page.redirect('/details/' + id);
        } catch (err) {
            console.error(err);
        }
    }
}
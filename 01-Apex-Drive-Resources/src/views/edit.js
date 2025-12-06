import { html } from '/node_modules/lit-html/lit-html.js';
import { getCarById, editCar } from '../api/data.js';

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
    const carId = ctx.params.id;
    const car = await getCarById(carId);

    ctx.render(editTemplate(car, onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        
        const editedCar = {
            model: formData.get('model').trim(),
            imageUrl: formData.get('imageUrl').trim(),
            price: formData.get('price').trim(),
            weight: formData.get('weight').trim(),
            speed: formData.get('speed').trim(),
            about: formData.get('about').trim()
        };

        if (Object.values(editedCar).some(x => x == '')) {
            return alert('All fields are required!');
        }

        await editCar(carId, editedCar);
        ctx.page.redirect('/details/' + carId);
    }
}
import { html } from '../../node_modules/lit-html/lit-html.js';
import { get } from '../api.js';

const dashboardTemplate = (cars) => html`
<h3 class="heading">Our Cars</h3>
<section id="dashboard">
    ${cars.length > 0 
        ? cars.map(carTemplate)
        : html`<h3 class="nothing">Nothing to see yet</h3>`
    }
</section>`;

const carTemplate = (car) => html`
<div class="car">
    <img src=${car.imageUrl} alt="example1" />
    <h3 class="model">${car.model}</h3>
    <div class="specs">
        <p class="price">Price: €${car.price}</p>
        <p class="weight">Weight: ${car.weight} kg</p>
        <p class="top-speed">Top Speed: ${car.speed} kph</p>
    </div>
    <a class="details-btn" href="/details/${car._id}">More Info</a>
</div>`;

export async function dashboardPage(ctx) {
    const cars = await get('/data/cars?sortBy=_createdOn%20desc');
    ctx.render(dashboardTemplate(cars));
}
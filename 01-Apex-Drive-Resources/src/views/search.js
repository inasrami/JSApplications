import { html } from '../../node_modules/lit-html/lit-html.js';
import { get } from '../api.js';

const searchTemplate = (onSearch, cars) => html`
<section id="search">
    <div class="form">
        <h4>Search</h4>
        <form class="search-form" @submit=${onSearch}>
            <input type="text" name="search" id="search-input" />
            <button class="button-list">Search</button>
        </form>
    </div>
    <div class="search-result">
        ${cars === null
            ? html`<h2 class="no-avaliable">No result.</h2>`
            : cars.length > 0
                ? cars.map(carTemplate)
                : html`<h2 class="no-avaliable">No result.</h2>`
        }
    </div>
</section>`;

const carTemplate = (car) => html`
<div class="car">
    <img src=${car.imageUrl} alt="example1" />
    <h3 class="model">${car.model}</h3>
    <a class="details-btn" href="/details/${car._id}">More Info</a>
</div>`;

export function searchPage(ctx) {
    ctx.render(searchTemplate(onSearch, null));

    async function onSearch(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const query = formData.get('search').trim();

        if (!query) {
            return alert('Please enter a search query!');
        }

        try {
            const cars = await get(`/data/cars?where=model%20LIKE%20%22${query}%22`);
            ctx.render(searchTemplate(onSearch, cars));
        } catch (err) {
            console.error(err);
        }
    }
}
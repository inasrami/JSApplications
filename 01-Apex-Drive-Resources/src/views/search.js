import { html } from '../lib.js';
import { searchCars } from '../api/data.js';

const searchTemplate = (cars, onSearch) => html`
    <section id="search">
        <div class="form">
            <h4>Search</h4>
            <form class="search-form" @submit=${onSearch}>
                <input type="text" name="search" id="search-input" />
                <button class="button-list">Search</button>
            </form>
        </div>
        <div class="search-result">
            ${cars.length > 0 
                ? cars.map(carCard)
                : html`<h2 class="no-avaliable">No result.</h2>`
            }
        </div>
    </section>
`;

const carCard = (car) => html`
    <div class="car">
        <img src="${car.imageUrl}" alt="example1"/>
        <h3 class="model">${car.model}</h3>
        <a class="details-btn" href="/details/${car._id}">More Info</a>
    </div>
`;

export function showSearch(ctx) {
    ctx.render(searchTemplate([], onSearch));

    async function onSearch(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const query = formData.get('search').trim();

        if (query == '') {
            return alert('Please enter a search query');
        }

        const cars = await searchCars(query);
        ctx.render(searchTemplate(cars, onSearch));
    }
}
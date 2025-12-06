import { html } from '/node_modules/lit-html/lit-html.js';
import { searchCars } from '../api/data.js';

const searchTemplate = (cars, onSearch, params = '') => html`
    <section id="search">
        <div class="form">
            <h4>Search</h4>
            <form class="search-form" @submit=${onSearch}>
                <input type="text" name="search" id="search-input" />
                <button class="button-list">Search</button>
            </form>
        </div>
        <div class="search-result">
            ${cars.length == 0 
                ? html`<h2 class="no-avaliable">No result.</h2>`
                : cars.map(car => html`
                    <div class="car">
                        <img src=${car.imageUrl} alt="example1"/>
                        <h3 class="model">${car.model}</h3>
                        <a class="details-btn" href="/details/${car._id}">More Info</a>
                    </div>`)
            }
        </div>
    </section>`;

export async function searchPage(ctx) {
    ctx.render(searchTemplate([], onSearch));

    async function onSearch(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const search = formData.get('search').trim();

        if (search == '') {
            return alert('Please enter a search query');
        }

        const cars = await searchCars(search);
        ctx.render(searchTemplate(cars, onSearch, search));
    }
}
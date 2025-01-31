document.addEventListener('DOMContentLoaded', function() {
    cargarDatos();

    async function cargarDatos() {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');

        const url = `https://restcountries.com/v3.1/alpha/${id}`;

        Spinner();

        try {
            const respuesta = await fetch(url);
            const resultado = await respuesta.json();
            mostrarHTML(resultado);
        } catch(error) {
            console.log(error);
            mostrarError();
        }
    }

    function mostrarError() {
        const error = document.querySelector('.country__error');
        error.style.display = "block";
    }

    function mostrarHTML(datos) {
        limpiarHTML();

        const container = document.querySelector('.country__info');

        const containerImagen = document.createElement('div');
        containerImagen.classList.add('country__info__imagen');

        const containerImg = document.createElement('img');
        containerImg.classList.add('country__info_img');
        containerImg.src = `${datos[0].flags.svg}`;
        containerImg.alt = "flags";

        containerImagen.appendChild(containerImg);
        container.appendChild(containerImagen);

        const h1Heading = document.createElement('h1');
        h1Heading.classList.add('country__info__heading');
        h1Heading.textContent = `${datos[0].name.common}`;
        container.appendChild(h1Heading);

        const h1Name = document.createElement('h3');
        h1Name.classList.add('country__info__name');
        h1Name.textContent = `${datos[0].name.official}`;
        container.appendChild(h1Name);

        const containerFlex = document.createElement('div');
        containerFlex.classList.add('country__info__flex');

        const containerPopulation = document.createElement('div');
        containerPopulation.classList.add('country__info__population');

        const h4Population = document.createElement('h4');
        h4Population.classList.add('country__info__number');
        h4Population.textContent = "Population";

        const parafoPopulation = document.createElement('p');
        parafoPopulation.classList.add('country__info__count');
        parafoPopulation.textContent = `${datos[0].population}`;

        containerPopulation.appendChild(h4Population);
        containerPopulation.appendChild(parafoPopulation);

        const containerArea = document.createElement('div');
        containerArea.classList.add('country__info__area');

        const h4Area = document.createElement('h4');
        h4Area.classList.add('country__info__number');
        h4Area.textContent = "Area(km)";

        const parafoArea = document.createElement('p');
        parafoArea.classList.add('country__info__count');
        parafoArea.textContent = `${datos[0].area}`;

        containerArea.appendChild(h4Area);
        containerArea.appendChild(parafoArea);

        containerFlex.appendChild(containerPopulation);
        containerFlex.appendChild(containerArea);

        container.appendChild(containerFlex);

        const divCapital = document.createElement('div');
        divCapital.classList.add('country__info__flexbox');

        const h4Capital = document.createElement('h4');
        h4Capital.classList.add('country__info__label');
        h4Capital.textContent = "Capital";

        const parrafoCapital = document.createElement('p');
        parrafoCapital.classList.add('country__info__description');
        parrafoCapital.textContent = `${datos[0].capital}`;

        divCapital.appendChild(h4Capital);
        divCapital.appendChild(parrafoCapital);

        container.appendChild(divCapital);

        const divSubregion = document.createElement('div');
        divSubregion.classList.add('country__info__flexbox');

        const h4Subregion = document.createElement('h4');
        h4Subregion.classList.add('country__info__label');
        h4Subregion.textContent = "Subregion";

        const parrafoSubregion = document.createElement('p');
        parrafoSubregion.classList.add('country__info__description');
        parrafoSubregion.textContent = `${datos[0].subregion}`;

        divSubregion.appendChild(h4Subregion);
        divSubregion.appendChild(parrafoSubregion);

        container.appendChild(divSubregion);

        const divLanguage = document.createElement('div');
        divLanguage.classList.add('country__info__flexbox');

        const h4Language = document.createElement('h4');
        h4Language.classList.add('country__info__label');
        h4Language.textContent = "Language";

        const parrafoLanguage = document.createElement('p');
        parrafoLanguage.classList.add('country__info__description');
        parrafoLanguage.textContent = `${arrayAString(datos[0].languages)}`;

        divLanguage.appendChild(h4Language);
        divLanguage.appendChild(parrafoLanguage);

        container.appendChild(divLanguage);

        const divCurrencies = document.createElement('div');
        divCurrencies.classList.add('country__info__flexbox');

        const h4Currencies = document.createElement('h4');
        h4Currencies.classList.add('country__info__label');
        h4Currencies.textContent = "Currencies";

        const parrafoCurrencies = document.createElement('p');
        parrafoCurrencies.classList.add('country__info__description');
        parrafoCurrencies.textContent = `${Object.values(datos[0].currencies)[0].name}`;

        divCurrencies.appendChild(h4Currencies);
        divCurrencies.appendChild(parrafoCurrencies);

        container.appendChild(divCurrencies);

        const divContinents = document.createElement('div');
        divContinents.classList.add('country__info__flexbox');

        const h4Continents = document.createElement('h4');
        h4Continents.classList.add('country__info__label');
        h4Continents.textContent = "Continents";

        const parrafoContinents = document.createElement('p');
        parrafoContinents.classList.add('country__info__description');
        parrafoContinents.textContent = `${datos[0].continents}`;

        divContinents.appendChild(h4Continents);
        divContinents.appendChild(parrafoContinents);

        container.appendChild(divContinents);

        const divneig = document.createElement('div');
        divneig.classList.add('country__info__flexbox');

        const h4neig = document.createElement('h4');
        h4neig.classList.add('country__info__label');
        h4neig.textContent = "Neighbouring Countries";

        divneig.appendChild(h4neig);
        container.appendChild(divneig);

        if(datos[0].borders) {
            buscarPaisesLimitrofes(datos[0].borders);
        }
    }

    function arrayAString(obj) {
        let lenguajes = Object.values(obj);
        let idioms = ''

        for( i = 0; i < lenguajes.length; i++) {
            if(i == 0) {
                idioms = lenguajes[i];
            } else {
                idioms = idioms + ', ' + lenguajes[i];
            }
        }

        return idioms;
    }

    async function buscarPaisesLimitrofes(datos) {
        const container = document.querySelector('.country__info');
        const containerNeighbouring = document.createElement('div');
        containerNeighbouring.classList.add('country__info__neighbouring');

        for(i = 0; i < datos.length; i++) {
            let url = `https://restcountries.com/v3.1/alpha/${datos[i]}`;

            try {
                const respuesta = await fetch(url);
                const resultado = await respuesta.json();
                mostrarPaisesLimitrofes(resultado, container, containerNeighbouring)
            } catch(error) {
                console.log(error);
            }    
        }
    }

    function mostrarPaisesLimitrofes(dato, container, neighbouring) {
        const aCard = document.createElement('a');
        aCard.classList.add('country__card');
        aCard.href = `country.html?id=${dato[0].cca2}`;

        const containerCard = document.createElement('div');
        containerCard.classList.add('country__card__imagen');

        const imgCard = document.createElement('img');
        imgCard.classList.add('country__card__img');
        imgCard.src = `${dato[0].flags.svg}`;
        imgCard.alt = 'flags';

        containerCard.appendChild(imgCard);

        const parrafoCard = document.createElement('p');
        parrafoCard.classList.add('country__card__name');
        parrafoCard.textContent = `${dato[0].name.common}`;

        aCard.appendChild(containerCard);
        aCard.appendChild(parrafoCard);

        neighbouring.appendChild(aCard);
        container.appendChild(neighbouring);
    }

    function Spinner() {
        const contenido = document.querySelector('.country__info');
        const divSpinner = document.createElement('div');
        divSpinner.classList.add('sk-fading-circle');

        divSpinner.innerHTML = `
            <div class="sk-circle1 sk-circle"></div>
            <div class="sk-circle2 sk-circle"></div>
            <div class="sk-circle3 sk-circle"></div>
            <div class="sk-circle4 sk-circle"></div>
            <div class="sk-circle5 sk-circle"></div>
            <div class="sk-circle6 sk-circle"></div>
            <div class="sk-circle7 sk-circle"></div>
            <div class="sk-circle8 sk-circle"></div>
            <div class="sk-circle9 sk-circle"></div>
            <div class="sk-circle10 sk-circle"></div>
            <div class="sk-circle11 sk-circle"></div>
            <div class="sk-circle12 sk-circle"></div>
        `;

        contenido.appendChild(divSpinner);
    }

    function limpiarHTML() {
        const country = document.querySelector('.country__info');

        // Eliminar el Spinner
        const spinner = document.querySelector('.sk-fading-circle');
        if(spinner) {
            country.removeChild(spinner);
        }
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const search = document.querySelector('.found__input');
    const select = document.querySelector('.filter__option');

    /* Regiones */
    const americas = document.querySelector('#americas');
    const antarctic = document.querySelector('#antarctic');
    const africa = document.querySelector('#africa');
    const asia = document.querySelector('#asia');
    const europe = document.querySelector('#europe');
    const oceania = document.querySelector('#oceania');

    /* Checkbox */
    const member = document.querySelector('#member');
    const independent = document.querySelector('#independent');

    /* Objecto Filtro */
    const filtro = {
        palabra : '',
        ordenar: 'population',
        region: ['Americas', 'Africa', 'Asia', 'Europe'],
        member: false,
        independent: true
    };

    consultarBD();

    /* Event listeneter */

    search.addEventListener('input', function(e) {
        let palabra = e.target.value;

        // Cambio el filtro de la propiedad palabra
        filtro.palabra = palabra.toLowerCase();

        // Consultar a la API
        consultarBD();
    });

    select.addEventListener('change', function(e) {
        let ordenar =  e.target.value;

        // Cambio el filtro de la propiedad ordenar
        filtro.ordenar = ordenar;

        // Consultar a la API
        consultarBD();
    });

    americas.addEventListener('click', function(e) {
        let americas = e.target;

        if(filtro.region.includes('Americas')) {
            // Lo tenemos que sacar del array
            let newFiltro = filtro.region.filter(reg => reg !== 'Americas');
            filtro.region = newFiltro;

            americas.classList.remove('filter__boton--active');
            americas.classList.add('filter__boton'); 
        } else {
            // Lo tenemos que agregar al array
            filtro.region.push('Americas');

            americas.classList.remove('filter__boton');
            americas.classList.add('filter__boton--active');
        }

        // Consultar a la API
        consultarBD();
    });

    antarctic.addEventListener('click', function(e) {
        let antarctic = e.target;

        if(filtro.region.includes('Antarctic')) {
            // Lo tenemos que sacar del array
            let newFiltro = filtro.region.filter(reg => reg !== 'Antarctic');
            filtro.region = newFiltro;

            antarctic.classList.remove('filter__boton--active');
            antarctic.classList.add('filter__boton');
        } else {
            // Lo tenemos que agregar al array
            filtro.region.push('Antarctic');

            antarctic.classList.remove('filter__boton');
            antarctic.classList.add('filter__boton--active');
        }

        // Consultar a la API
        consultarBD();
    });

    africa.addEventListener('click', function(e) {
        let africa = e.target;

        if(filtro.region.includes('Africa')) {
            // Lo tenemos que sacar del array
            let newFiltro = filtro.region.filter(reg => reg !== 'Africa');
            filtro.region = newFiltro;

            africa.classList.remove('filter__boton--active');
            africa.classList.add('filter__boton');
        } else {
            // Lo tenemos que agregar al array
            filtro.region.push('Africa');

            africa.classList.remove('filter__boton');
            africa.classList.add('filter__boton--active');
        }

        // Consultar a la API
        consultarBD();
    });

    asia.addEventListener('click', function(e) {
        let asia = e.target;

        if(filtro.region.includes('Asia')) {
            // Lo tenemos que sacar del array
            let newFiltro = filtro.region.filter(reg => reg !== 'Asia');
            filtro.region = newFiltro;

            asia.classList.remove('filter__boton--active');
            asia.classList.add('filter__boton');
        } else {
            // Lo tenemos que agregar al array
            filtro.region.push('Asia');

            asia.classList.remove('filter__boton');
            asia.classList.add('filter__boton--active');
        }

        // Consultar a la API
        consultarBD();
    });

    europe.addEventListener('click', function(e) {
        let europe = e.target;

        if(filtro.region.includes('Europe')) {
            // Lo tenemos que sacar del array
            let newFiltro = filtro.region.filter(reg => reg !== 'Europe');
            filtro.region = newFiltro;

            europe.classList.remove('filter__boton--active');
            europe.classList.add('filter__boton');
        } else {
            // Lo tenemos que agregar al array
            filtro.region.push('Europe');

            europe.classList.remove('filter__boton');
            europe.classList.add('filter__boton--active');
        }

        // Consultar a la API
        consultarBD();
    });

    oceania.addEventListener('click', function(e) {
        let oceania = e.target;

        if(filtro.region.includes('Oceania')) {
            // Lo tenemos que sacar del array
            let newFiltro = filtro.region.filter(reg => reg !== 'Oceania');
            filtro.region = newFiltro;

            oceania.classList.remove('filter__boton--active');
            oceania.classList.add('filter__boton');
        } else {
            // Lo tenemos que agregar al array
            filtro.region.push('Oceania');

            oceania.classList.remove('filter__boton');
            oceania.classList.add('filter__boton--active');
        }

        // Consultar a la API
        consultarBD();
    });

    member.addEventListener('click', function(e) {
        let member = e.target;

        if(member.checked) {
            // Debe pasarse a false
            member.checked = false;
            filtro.member = false;
            member.classList.remove('filter__checkbox--active');
            member.classList.add('filter__checkbox');
        } else {
            // Debe pasarse a true
            member.checked = true;
            filtro.member = true;
            member.classList.remove('filter__checkbox');
            member.classList.add('filter__checkbox--active');
        }

        // Consultar a la API
        consultarBD();
    });

    independent.addEventListener('click', function(e) {
        let independent = e.target;

        if(independent.checked) {
            // Debe pasarse a false
            independent.checked = false;
            filtro.independent = false;
            independent.classList.remove('filter__checkbox--active');
            independent.classList.add('filter__checkbox');
        } else {
            // Debe pasarse a true
            independent.checked = true;
            filtro.independent = true;
            independent.classList.remove('filter__checkbox');
            independent.classList.add('filter__checkbox--active');
        }
        
        // Consultar a la API
        consultarBD();
    });

    /* URL API: https://restcountries.com/v3.1/all?fields=name,population,area,region,flags,unMember,independent,subregion */

    async function consultarBD() {
        const { population } = filtro;
        const url = `https://restcountries.com/v3.1/all?sort=${population}`;

        Spinner();

        try {
            const respuesta = await fetch(url);
            const resultado = await respuesta.json();
            filtrarDatos(resultado)
        } catch(error) {
            console.log(error);
            mostrarError();
        }   
    }

    function mostrarError() {
        const error = document.querySelector('.country__error');
        error.style.display = "block";
    }

    function filtrarDatos(datos) {
        const { palabra, region, member, independent } = filtro;

        const datosFiltrado = datos.filter(function(country) {
            let name = country.name.common.toLowerCase();
            let rg = country.region.toLowerCase();
            let srg = country.subregion !== undefined ? country.subregion.toLowerCase() : '';

            return (name.includes(palabra) || rg.includes(palabra) || srg.includes(palabra)) &&
                   region.includes(country.region) &&
                   (member === country.unMember ||
                   independent === country.independent);
        });
        
        mostrarHTML(datosFiltrado);
    }

    function mostrarHTML(datos) {
        limpiarHTML();

        const numeroCountry = document.querySelector('.found__heading');

        if(datos.length > 0) {
            numeroCountry.textContent = `Found ${datos.length} countries`;
        } else {
            numeroCountry.textContent = `Not Found countries`;
        }

        const contenido = document.querySelector('.country');

        datos.forEach(country => {
            const {flags, name, population, area, region, cca2} = country;

            let divContainer = document.createElement('a');
            divContainer.href = `country.html?id=${cca2}`;
            divContainer.classList.add('country__container');

            let divImagen = document.createElement('div');
            divImagen.classList.add('country__imagen');

            let divImg = document.createElement('img');
            divImg.classList.add('country__img');
            divImg.src = `${flags.svg}`;
            divImg.alt = "flag";

            divImagen.appendChild(divImg);
            divContainer.appendChild(divImagen);

            let h2Name = document.createElement('h2');
            h2Name.classList.add("country__name");
            h2Name.textContent = `${name.common}`;

            divContainer.appendChild(h2Name);

            let h2Population = document.createElement('h2');
            h2Population.classList.add("country__population");
            h2Population.textContent = agregarSeparadoresMiles(population);

            divContainer.appendChild(h2Population);

            let h2Area = document.createElement('h2');
            h2Area.classList.add("country__area");
            h2Area.textContent = agregarSeparadoresMiles(area);

            divContainer.appendChild(h2Area);

            let h2Region = document.createElement('h2');
            h2Region.classList.add("country__region");
            h2Region.textContent = `${region}`;

            divContainer.appendChild(h2Region);
            contenido.appendChild(divContainer);
        });

    }

    function agregarSeparadoresMiles(numero) {
        return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    
    function limpiarHTML() {
        const country = document.querySelector('.country');

        const countryContainer = document.querySelectorAll('.country__container');
        countryContainer.forEach(e => e.remove());

        // Eliminar el Spinner
        const spinner = document.querySelector('.sk-fading-circle');
        if(spinner) {
            country.removeChild(spinner);
        }
    }

    function Spinner() {
        limpiarHTML();

        const contenido = document.querySelector('.country');
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

});
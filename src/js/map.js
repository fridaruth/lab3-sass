import L from 'leaflet';
// importera ikoner
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

/** @type {L.Map} */
let map;
/** @type {L.Marker} */
let marker;

/**
 * Initierar kartan när sidan laddas.
 */
document.addEventListener('DOMContentLoaded', () => {
    initMap();

    const searchForm = document.getElementById('search-form');
    searchForm.addEventListener('submit', handleSearch);
});

/**
 * Skapar kartan och sätter startposition. 
 */
function initMap() {
    // Koordinater för startplats och zoom-nivå
    map = L.map('map').setView([59.1914, 18.0528], 6);

    L.tileLayer(`https://tile.openstreetmap.org/{z}/{x}/{y}.png`, {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
}

/** 
 * Hantera sökning
 * @async
 * @param {Event} event - Formulärhändelse
 */

async function handleSearch(event) {
    event.preventDefault();
    const query = document.getElementById('search-input').value;

    try {
        // Fetch till API för koordinater
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`);
        const data = await response.json();

        if(data.length > 0) {
            const { lat, lon, display_name } = data[0];
            updateMap(lat, lon, display_name);
        } else {
            alert("Kunde inte hitta platsen, försök igen!");
        }
    } catch (error) {
        console.error("Ett fel uppstod vid sökning:", error);
    }
}

/** 
 * Uppdatera kartans position och flytta markör
 * @param {string} lat - Latitud
 * @param {string} lon - Longitud
 * @param {string} name - Namn på plats
 */

function updateMap(lat, lon, name) {
    const coords = [lat, lon];

    // flytta karta
    map.setView(coords, 13);

    // ta bort gammal markör
    if (marker) {
        map.removeLayer(marker);
    }

    // skapa ny markör
    marker = L.marker(coords).addTo(map)
    .bindPopup(name)
    .openPopup();
}
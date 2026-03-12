import Chart from 'chart.js/auto'

/** 
 * Körs när sidan har laddats. Startar hämtning och rendering.
 */

document.addEventListener('DOMContentLoaded', () => {
    initCharts();
});

/** 
 * Hämtar data från JSON-filen och skickar vidare för sortering
 * @async
 */

async function initCharts() {
    try {
        const url = "https://mallarmiun.github.io/Frontend-baserad-webbutveckling/Moment%205%20-%20Dynamiska%20webbplatser/statistik_sokande_ht25.json"
        const response = await fetch(url);
        const data = await response.json();

        // bearbeta data
        renderCoursesChart(data);
        renderProgramsChart(data);
    } catch (error) {
        console.error("Kunde inte ladda diagrammen: ", error);
    }
}

/**
 * Filtrera fram mest sökta + skapa diagram
 * @param {Array} data - All statistik från JSON
 */

function renderCoursesChart(data) {
    // Filtrera fram kurser och sortera
    const topCourses = data
    .filter(item => item.type === "Kurs")
    .sort((a, b) => b.applicantsTotal - a.applicantsTotal)
    .slice(0, 6);

    const ctx = document.getElementById('coursesChart');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: topCourses.map(c => c.name),
            datasets: [{
                label: 'Antal sökande',
                data: topCourses.map(c => c.applicantsTotal),
                backgroundColor: ["#74354f", "#974567", "#b45b7f", "#c47e9b", "#d4a1b6", "#d3aebdff"],
                borderWidth: 2,
                borderColor: "#FFFFFF"
            }]
        }
    });
};

/**
 * Filtrera fram mest sökta programmen och skapa cirkeldiagram
 * @param {Array} data - all statistik från JSON
 */

function renderProgramsChart(data) {
    const topPrograms = data
    .filter(item => item.type === "Program")
    .sort((a,b) => b.applicantsTotal - a.applicantsTotal)
    .slice(0, 5)

    const ctx = document.getElementById("programsChart");
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: topPrograms.map(p => p.name),
            datasets: [{
                data: topPrograms.map(p => p.applicantsTotal),
                backgroundColor: ["#74354f", "#974567", "#b45b7f", "#c47e9b", "#d4a1b6"]
            }]
        }
    });
}
//get theme from local storage
var theme = localStorage.getItem('theme');
if (theme) {
    document.getElementById('themeSelect').value = theme;
    document.getElementById('themeStylesheet').href = theme + '.css';
}


document.getElementById('themeSelect').addEventListener('change', function () {
    var theme = this.value;
    var stylesheet = document.getElementById('themeStylesheet');

    stylesheet.href = theme + '.css';

    //add theme to local storage
    localStorage.setItem('theme', theme);
});

fetch('en.json')
    .then(response => response.json())
    .then(data => {
        const resume = document.getElementById('resume');

        const { basics, sections } = data;

        // Header
        const header = document.createElement('div');
        header.className = 'header';
        header.innerHTML = `
            <img src="${basics.picture.url}" alt="${basics.name}" />
            <div>
                <h1 class="glitch" data-text="${basics.name}">${basics.name}</h1>
                <p>${basics.headline}</p>
                <p>${basics.email} | ${basics.phone} | ${basics.location}</p>
                <p><a href="${basics.url.href}" target="_blank">Website</a></p>
            </div>
        `;
        resume.appendChild(header);

        // Summary

        // Loop through all sections where item length is greater than 0
        for (let section in sections) {
            const sectionData = sections[section];

            const sectionElement = document.createElement('div');
            sectionElement.className = 'section';
            sectionElement.innerHTML = `
                <h2>${section}</h2>
            `;

            console.log(sectionData.items);

            for (let item in sectionData.items) {
                const itemData = sectionData.items[item];
                const itemElement = document.createElement('div');
                itemElement.className = 'item';
                itemElement.innerHTML = `
                    <div class="subtitle">
                        <h3>${itemData.title || ''}</h3>
                        <h4>${itemData.subtitle || ''}</h4>
                    </div>
                    <div class="subtitle">
                        <p>${itemData.date || ''}</p>
                        <p>${itemData.location || ''}</p>
                    </div>
                    <p>${itemData.score || ''}</p>
                    <p>${itemData.description || ''}</p>
                `;

                sectionElement.appendChild(itemElement);
            }

            resume.appendChild(sectionElement);
        }
    })
    .catch(error => console.error('Error fetching resume data:', error));

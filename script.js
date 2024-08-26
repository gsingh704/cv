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

    

            for (let item in sectionData.items) {
                const itemData = sectionData.items[item];
                const itemElement = document.createElement('div');
                itemElement.className = 'item';
                const url = itemData.url;
                
                itemElement.innerHTML = `
                <div class="subtitle">
                ${url && url.href ? `<a href="${url.href}" target="_blank">` : ''}
                    ${itemData.title ? `<h3>${itemData.title}</h3>` : ''}
                    ${itemData.subtitle ? `<h4>${itemData.subtitle}</h4>` : ''}
                ${url && url.href ? `</a>` : ''}
            </div>
            <div class="subtitle">
                ${itemData.date ? `<p>${itemData.date}</p>` : ''}
                ${itemData.location ? `<p>${itemData.location}</p>` : ''}
            </div>
            ${itemData.score ? `<p>${itemData.score}</p>` : ''}
            ${itemData.img ? `<div class="item-image">${itemData.img.map(img => `<img src="${img.src}" alt="${img.alt}" />`).join('')}</div>` : ''}
            ${itemData.description ? `<p>${itemData.description}</p>` : ''}
                `;
                
                sectionElement.appendChild(itemElement);
            }

            resume.appendChild(sectionElement);
        }
    })
    .catch(error => console.error('Error fetching resume data:', error));

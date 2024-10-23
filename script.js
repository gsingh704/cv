//get theme from local storage
var theme = localStorage.getItem('theme');
if (theme) {
    document.getElementById('themeSelect').value = theme;
    document.getElementById('themeStylesheet').href = 'css/' + theme + '.css';
} else {
    document.getElementById('themeSelect').value = 'default';
    document.getElementById('themeStylesheet').href = 'css/default.css';
}


document.getElementById('themeSelect').addEventListener('change', function () {
    var theme = this.value;
    var stylesheet = document.getElementById('themeStylesheet');

    stylesheet.href = 'css/' + theme + '.css';

    //add theme to local storage
    localStorage.setItem('theme', theme);
});
fetch('en.json')
    .then(response => response.json())
    .then(data => {
        const resume = document.getElementById('resume');

        const { header, main } = data;

        // headerDiv
        const headerDiv = document.createElement('div');
        headerDiv.className = 'headerDiv';
        headerDiv.innerHTML = `
            <img src="${header.picture.url}" alt="${header.name}" />
            <div class="header-details">
                <h1 class="glitch" data-text="${header.name}">${header.name}</h1>
                <p>${header.headline}</p>
                <a href="mailto:${header.email}">${header.email}</a> | <a href="tel:${header.phone}">${header.phone}</a> | ${header.location}
                <p class="links">
                    ${header.links.map(link => `<a href="${link.href}" target="_blank">${link.label}</a>`).join('')}
                </p>
            </div>
        `;
        resume.appendChild(headerDiv);

        // Summary

        // Loop through all main where item length is greater than 0
        for (let section in main) {
            const sectionData = main[section];

            const sectionElement = document.createElement('div');
            sectionElement.className = 'section';
            sectionElement.classList.add('section', section);
            sectionElement.innerHTML = `
                <h2>${section}</h2>
            `;

            // Create the item_list container
            const itemListElement = document.createElement('div');
            itemListElement.className = 'item_list';

            for (let item in sectionData.items) {
                const itemData = sectionData.items[item];
                const itemElement = document.createElement('div');
                itemElement.className = 'item';
                const url = itemData.url;

                itemElement.innerHTML = `
                <div class="subtitle">
                    ${url ? `<a href="${url}" target="_blank">` : ''}
                        ${itemData.title ? `<h3>${itemData.title}</h3>` : ''}
                    ${url ? `</a>` : ''}
                    ${url ? `<a href="${url}" target="_blank">` : ''}
                        ${itemData.subtitle ? `<h3 class="sub">${itemData.subtitle}</h3>` : ''}
                    ${url ? `</a>` : ''}
                    ${itemData.tags ? 
                        `<div class="item-tags"> ${itemData.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div> ` 
                        : ''}
                </div>
                <div class="subtitle">
                    ${itemData.date ? `<p>${itemData.date}</p>` : ''}
                    ${itemData.location ? `<p>${itemData.location}</p>` : ''}
                </div>
                ${itemData.score ? `<p>${itemData.score}</p>` : ''}
                ${itemData.img ? `<div class="item-image">${itemData.img.map(img => `<img src="${img.src}" alt="${img.alt}" class="${img.class}" />`).join('')}</div>` : ''}
                ${itemData.description ? `<p>${itemData.description}</p>` : ''}
                ${itemData.links ? `<p class="links">
                ${itemData.links.map(link => `<a href="${link.href}" target="_blank">${link.label}</a>`).join('')}
               </p>` : ''}
                `;

                // Append each itemElement to the item_list
                itemListElement.appendChild(itemElement);
            }

            // Append the item_list to the sectionElement
            sectionElement.appendChild(itemListElement);

            // Append the sectionElement to the resume
            resume.appendChild(sectionElement);
        }
    })
    .catch(error => console.error('Error fetching resume data:', error));

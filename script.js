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
            <img src="${header.picture.href}" alt="${header.picture.alt}" />
            <div class="header-details">
                <h1 class="glitch" data-text="${header.name}">${header.name}</h1>
                <p>${header.headline}</p>
                <a class="nowrap" href="mailto:${header.email}">${header.email}</a> | 
                <a href="tel:${header.phone}" class="nowrap">${header.phone}</a> | 
                <span class="nowrap">${header.location}</span>
                <p class="links">
                    ${header.links.map(link => `<a href="${link.href}" target="_blank">${link.label}</a>`).join('')}
                </p>
                <p class="summary">${header.summary}</p>
            </div>
        `;
        resume.appendChild(headerDiv);

        // Render main sections
        Object.keys(main).forEach(sectionKey => {
            const sectionData = main[sectionKey];
            const sectionElement = document.createElement('div');
            sectionElement.className = `section ${sectionKey}`;
            sectionElement.innerHTML = `<h2>${sectionKey}</h2>`;

            const itemListElement = document.createElement('div');
            itemListElement.className = 'item_list';

            sectionData.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.className = 'item';

                itemElement.innerHTML = `
                    <div class="subtitle">
                        ${item.href ? `<a href="${item.href}" target="_blank"><h3>${item.title}</h3></a>` : `<h3>${item.title}</h3>`}
                        ${item.subtitle ? `<h4 class="sub">${item.subtitle}</h4>` : ''}
                    </div>
                    ${item.date ? `<p>${item.date}</p>` : ''}
                    ${item.location ? `<p>${item.location}</p>` : ''}
                    ${item.description ? `<p>${item.description}</p>` : ''}
                    ${item.tags ? `<div class="item-tags">${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>` : ''}
                    ${item.img ? `<div class="item-image">${item.img.map(img => `<img src="${img.src}" alt="${img.alt}" class="${img.class}" />`).join('')}</div>` : ''}
                    ${item.links ? `<p class="links">${item.links.map(link => `<a href="${link.href}" target="_blank">${link.label}</a>`).join('')}</p>` : ''}
                    `;

                itemListElement.appendChild(itemElement);
            });

            sectionElement.appendChild(itemListElement);
            resume.appendChild(sectionElement);
        });
    })

    .catch(error => console.error('Error fetching resume data:', error));

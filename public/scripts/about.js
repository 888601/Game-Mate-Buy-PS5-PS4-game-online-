document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('cofounders-container');

    fetch('/data/about.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            return response.json();
        })
        .then(data => {
            const cofounders = data.cofounders;
            cofounders.forEach(cofounder => {
                const cofounderDiv = document.createElement('div');
                cofounderDiv.classList.add('cofounder');

                const image = document.createElement('img');
                image.src = cofounder.image;
                image.alt = cofounder.name + "'s image";
                cofounderDiv.appendChild(image);

                const name = document.createElement('p');
                name.textContent = cofounder.name;
                name.style.fontWeight = 'bold';
                cofounderDiv.appendChild(name);

                const position = document.createElement('p');
                position.textContent = cofounder.position;
                cofounderDiv.appendChild(position);

                const linkedin = document.createElement('a');
                linkedin.href = cofounder.linkedin;
                linkedin.target = '_blank';

                const linkedinIcon = document.createElement('i');
                linkedinIcon.classList.add('fab', 'fa-linkedin');
                linkedin.appendChild(linkedinIcon);

                cofounderDiv.appendChild(linkedin);

                container.appendChild(cofounderDiv);
            });
        })
        .catch(error => console.error('Error fetching or processing data:', error));
});

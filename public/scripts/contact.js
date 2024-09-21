document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('data-container');

    fetch('/data/contact.json')
        .then(response => response.json())
        .then(data => {
            // Process data and render content
            const items = data.items;
            items.forEach(item => {
                const sectionContainer = document.createElement('div');
                const listItem = document.createElement('div');
                const icon = document.createElement('i');
                const link = document.createElement('a');

                // Check if item icon contains valid classes
                const iconClasses = item.icon.split(' ');
                iconClasses.forEach(className => {
                    if (className.includes(' ')) {
                        console.error(`Invalid class name: ${className}`);
                    }
                });

                sectionContainer.classList.add('section-container');
                listItem.classList.add('item');
                iconClasses.forEach(className => icon.classList.add(className));
                link.textContent = item.text;
                link.href = item.link;

                // Append the elements
                listItem.appendChild(link);
                sectionContainer.appendChild(listItem);
                container.appendChild(sectionContainer);
                listItem.appendChild(icon); // Append icon after text
            });
        })
        .catch(error => console.error('Error fetching or processing data:', error));
});

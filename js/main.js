function handleClick(direction) {
  const list = document.querySelector(".carousel-list");
  const item = document.querySelector(".item");
  const itemWidth = item.offsetWidth;
  
  if (direction === "previous") {
    list.scrollBy({ left: -itemWidth, behavior: "smooth" });
  } else {
    list.scrollBy({ left: itemWidth, behavior: "smooth" });
  }
}

async function renderCommissions() {
  const requestURL = '../data/portfolio.json';
  const commissionsList = document.getElementById('commissions-list');
  const loader = document.getElementById('loader');

  try {
      const response = await fetch(requestURL);

      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();

      data.sections.forEach(section => {        
        const li = document.createElement('li');
        li.className = 'item';

        const card = document.createElement('div');
        card.className = 'card';

        const cardContent = document.createElement('div');
        cardContent.className = 'card-content';

        const h1 = document.createElement('h1');
        h1.className = 'card-header-title is-centered mb-0 mt-2';
        h1.textContent = `${section.label} - ${section.price}`;

        const desc = document.createElement('p');
        desc.className = 'mb-0';
        desc.textContent = section.description;

        const cardHeader = document.createElement('header');
        cardHeader.className = 'card-header';

        // const cardFooter = document.createElement('div');
        // cardFooter.className = 'card-footer is-justify-content-center is-border-top-none';

        const button = document.createElement('button');
        button.href = `/portfolio#${section.id}`;
        button.target = '_blank';
        button.rel = 'noopener noreferrer'
        button.className = 'button is-small is-black my-2'
        button.textContent = 'See more examples';

        const img = document.createElement('img');
        // img.className = 'example';
        img.src = section.images[section.exampleIndex].file;

        cardHeader.appendChild(h1);
        card.appendChild(cardHeader);
        cardContent.appendChild(img);
        // cardContent.appendChild(desc);
        // cardContent.appendChild(button);

        card.appendChild(cardContent);

        li.appendChild(card);
        commissionsList.appendChild(li);
      });

  } catch (error) {
      console.error('Error fetching image data:', error);
      galleryContainer.innerHTML = '<p>Failed to load images.</p>';
  }

  loader.remove();
}

async function renderPortfolio() {
  const requestURL = '../data/portfolio.json';
  const galleryContainer = document.getElementById('portfolio-gallery');
  const loader = document.getElementById('loader');

  try {
      const response = await fetch(requestURL);

      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();

      data.sections.forEach(section => {
        const sectionContainer = document.createElement('div');
        sectionContainer.id = section.id;
        sectionContainer.className = 'section-container';

        const header = document.createElement('h2');
        header.textContent = `${section.label}`;

        const imageSection = document.createElement('div');
        imageSection.className = 'is-flex is-flex-direction-row is-flex-wrap-wrap is-justify-content-space-around gap-4';

        galleryContainer.appendChild(sectionContainer);
        sectionContainer.appendChild(header);
        sectionContainer.appendChild(imageSection);

        section.images.forEach(image => {
          const imgContainer = document.createElement('div');
          imgContainer.className = 'thumbnail-container';
          
          const imgElement = document.createElement('img');
          imgElement.src = image.file;
          imgElement.alt = image.alt;
          imgElement.title = image.title;
          imgElement.className = image.position;

          imgContainer.appendChild(imgElement);
          imageSection.appendChild(imgContainer);
        });
      });

  } catch (error) {
      console.error('Error fetching image data:', error);
      galleryContainer.innerHTML = '<p>Failed to load images.</p>';
  }

  loader.remove();
}

window.addEventListener('load', function() {
  if (window.location.hash) {
    const targetElement = document.querySelector(window.location.hash);
    if (targetElement) {
      setTimeout(() => {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }, 100); 
    }
  }
});
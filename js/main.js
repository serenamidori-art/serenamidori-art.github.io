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

        const cardHeader = document.createElement('div');
        cardHeader.className = 'card-header';

        const h2 = document.createElement('h2');
        h2.className = 'center-text mb-0 mt-2';
        h2.textContent = `${section.label} - ${section.price}`;

        const img = document.createElement('img');
        img.src = section.images[section.exampleIndex].file;
        img.className = 'card-img-top';
        img.alt = '...';

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body d-flex flex-column align-items-center justify-content-between';

        const b = document.createElement('b');
        b.textContent = '(+$45 for each additional character)';

        const p = document.createElement('p');
        p.className = 'card-text';
        p.textContent = section.description;
        
        const a = document.createElement('a');
        // a.href = `/portfolio#${section.id}`;
        // a.target = '_blank';
        // a.rel = 'noopener noreferrer'
        a.className = 'btn btn-dark';
        a.textContent = 'Learn More';

        cardHeader.appendChild(h2);
        // cardBody.appendChild(b);
        // cardBody.appendChild(p);
        cardBody.appendChild(img);
        cardBody.appendChild(a);
        card.appendChild(cardHeader);
        card.appendChild(cardBody);
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
        imageSection.className = 'd-flex flex-row flex-wrap justify-content-around gap-4';

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
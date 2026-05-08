function handleClick(direction) {
  const list = document.querySelector('.carousel-list');
  const item = document.querySelector('.item');
  const itemWidth = item.offsetWidth;
  
  if (direction === "previous") {
    list.scrollBy({ left: -itemWidth, behavior: "smooth" });
  } else {
    list.scrollBy({ left: itemWidth, behavior: "smooth" });
  }
}

async function loadPortfolio() {
    const url = '../data/portfolio.json';
    const response = await fetch(url);
    
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(`HTTP ${response.status}`);
    }
}

async function renderCommissions() {
  const commissionsList = document.getElementById('commissions-list');
  const modalContainer = document.getElementById('modal-container');

  try {
      const data = await loadPortfolio();
      const frag = document.createDocumentFragment();
      const modalFrag = document.createDocumentFragment();

      data.sections.forEach(section => {
        const li = document.createElement('li');
        li.className = 'item col-10 col-md-6 col-lg-4 col-xxl-3';

        const card = document.createElement('div');
        card.className = 'card';

        const cardHeader = document.createElement('div');
        cardHeader.className = 'card-header';

        const h2 = document.createElement('h2');
        h2.className = 'center-text mb-0 mt-3 fw-bold';
        h2.textContent = `${section.label} - ${section.price}`;

        const img = document.createElement('img');
        img.src = section.images[section.exampleIndex].file;
        img.className = 'card-img-top';
        img.alt = '...';

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body d-flex flex-column align-items-center';

        const b = document.createElement('b');
        b.textContent = '(+$45 for each additional character)';

        const p = document.createElement('p');
        p.className = 'card-text';
        p.textContent = section.description;

        const imgWrapper = document.createElement('div');
        imgWrapper.className = 'd-flex flex-grow-1 align-items-center justify-content-center w-100';
        imgWrapper.appendChild(img);

        const button = document.createElement('button');
        button.className = 'btn btn-dark mb-2';
        button.textContent = 'Learn More';
        button.dataset.bsToggle = 'modal';
        button.dataset.bsTarget = `#${section.id}Modal`;

        cardHeader.appendChild(h2);
        cardBody.appendChild(imgWrapper);
        cardBody.appendChild(button);
        card.appendChild(cardHeader);
        card.appendChild(cardBody);
        li.appendChild(card);
        commissionsList.appendChild(li);

        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.id = `${section.id}Modal`;
        modal.tabIndex = -1;
        modal.setAttribute('aria-labelledby', `${section.id}ModalLabel`);
        modal.setAttribute('aria-hidden', 'true');

        const modalDialog = document.createElement('div');
        modalDialog.className = 'modal-dialog modal-dialog-centered modal-lg';

        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';

        const modalHeader = document.createElement('div');
        modalHeader.className = 'modal-header';

        const h1 = document.createElement('h1');
        h1.className = 'modal-title fs-5';
        h1.id = `${section.id}ModalLabel`;
        h1.textContent = `${section.label}`;

        const closeButton = document.createElement('button');
        closeButton.type = 'button';
        closeButton.className = 'btn-close';
        closeButton.dataset.bsDismiss = 'modal';
        closeButton.setAttribute('aria-label', 'Close');

        const modalBody = document.createElement('div');
        modalBody.className = 'modal-body d-flex flex-column align-items-center';
  
        const modalPrices = document.createElement('h4');
        modalPrices.textContent = `Price starts at ${section.price}`;
              
        const modalDesc = document.createElement('p');
        modalDesc.innerHTML = section.description;
        
        const modalButton = document.createElement('a');
        modalButton.className = 'btn btn-dark';
        modalButton.innerHTML = 'See more examples <i class="ps-1 bi bi-box-arrow-up-right"></i>';
        modalButton.href = `/portfolio#${section.id}`;
        modalButton.target = '_blank';
        modalButton.rel = 'noopener noreferrer';

        const a = document.createElement('a');
        a.className = 'btn btn-dark';
        a.innerHTML = 'Start Commission <i class="ps-1 bi bi-box-arrow-up-right"></i>';
        a.href = section.formLink;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';

        const buttonRow = document.createElement('div');
        buttonRow.className = 'd-flex gap-3';
        buttonRow.appendChild(modalButton);
        buttonRow.appendChild(a);

        modalBody.appendChild(modalPrices);
        modalBody.appendChild(modalDesc);
        modalBody.appendChild(buttonRow);
        modalHeader.appendChild(h1);
        modalHeader.appendChild(closeButton);
        modalContent.appendChild(modalHeader);
        modalContent.appendChild(modalBody);
        modalDialog.appendChild(modalContent);
        modal.appendChild(modalDialog);
        modalContainer.appendChild(modal);
      });

      commissionsList.appendChild(frag);
      modalContainer.appendChild(modalFrag);
  } catch (error) {
      console.error('Error fetching image data:', error);
      commissionsList.innerHTML = '<p>Failed to load commissions.</p>';
  }

  const loader = document.getElementById('loader');
  loader?.remove();
}

async function renderPortfolio() {
  const galleryContainer = document.getElementById('portfolio-gallery');

  // Create a single shared modal
  const modal = document.createElement('div');
  modal.className = 'modal fade';
  modal.id = 'portfolioModal';
  modal.tabIndex = -1;
  modal.setAttribute('aria-labelledby', 'portfolioModalLabel');
  modal.setAttribute('aria-hidden', 'true');

  const modalDialog = document.createElement('div');
  modalDialog.className = 'modal-dialog modal-dialog-centered';

  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';

  const modalHeader = document.createElement('div');
  modalHeader.className = 'modal-header';

  const modalTitle = document.createElement('h1');
  modalTitle.className = 'modal-title fs-5';
  modalTitle.id = 'portfolioModalLabel';

  const closeButton = document.createElement('button');
  closeButton.type = 'button';
  closeButton.className = 'btn-close';
  closeButton.dataset.bsDismiss = 'modal';
  closeButton.setAttribute('aria-label', 'Close');

  const modalBody = document.createElement('div');
  modalBody.className = 'modal-body d-flex flex-column align-items-center';

  const modalImg = document.createElement('img');
  modalImg.className = 'img-fluid';

  modalBody.appendChild(modalImg);
  modalHeader.appendChild(modalTitle);
  modalHeader.appendChild(closeButton);
  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalBody);
  modalDialog.appendChild(modalContent);
  modal.appendChild(modalDialog);
  document.body.appendChild(modal);

  const bsModal = new bootstrap.Modal(modal);

  try {
      const data = await loadPortfolio();

      data.sections.forEach(section => {
        const sectionContainer = document.createElement('div');
        sectionContainer.id = section.id;
        sectionContainer.className = 'section-container';

        const header = document.createElement('h2');
        header.textContent = `${section.label}`;

        const imageSection = document.createElement('div');
        imageSection.className = 'row g-3';

        galleryContainer.appendChild(sectionContainer);
        sectionContainer.appendChild(header);
        sectionContainer.appendChild(imageSection);

        section.images.forEach(image => {
          const colDiv = document.createElement('div');
          colDiv.className = 'col-6 col-md-4 col-lg-3 col-xxl-2';

          const imgContainer = document.createElement('div');
          imgContainer.className = 'thumbnail-container';

          imgContainer.addEventListener('click', () => {
            modalImg.src = image.file;
            modalImg.alt = image.alt;
            modalTitle.textContent = image.title;
            bsModal.show();
          });

          const imgElement = document.createElement('img');
          imgElement.src = image.file;
          imgElement.alt = image.alt;
          imgElement.className = image.position;

          imgContainer.appendChild(imgElement);
          colDiv.appendChild(imgContainer);
          imageSection.appendChild(colDiv);
        });
      });

  } catch (error) {
      console.error('Error fetching image data:', error);
      galleryContainer.innerHTML = '<p>Failed to load images.</p>';
  }

  const loader = document.getElementById('loader');
  loader?.remove();
  scrollToSection();
}

function scrollToSection() {
  if (window.location.hash) {
    const targetElement = document.querySelector(window.location.hash);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
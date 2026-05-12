async function loadProjects() {
  try {
    const response = await fetch('projects.json');
    const projects = await response.json();

    const container = document.getElementById('projects');

    projects.forEach(project => {
      const card = document.createElement('article');
      card.className = 'project-card';

      let mediaHTML = '';

      if (project.thumbnail.type === 'image') {
        mediaHTML = `
          <img src="${project.thumbnail.src}" alt="${project.title}">
        `;
      }

      if (project.thumbnail.type === 'video') {
        mediaHTML = `
          <video autoplay muted loop playsinline>
            <source src="${project.thumbnail.src}">
          </video>
        `;
      }

      card.innerHTML = `
        <a href="project.html?id=${project.id}">
          ${mediaHTML}

          <div class="project-info">
            <h2>${project.title}</h2>
            <p>${project.year}</p>
          </div>
        </a>
      `;

      container.appendChild(card);
    });
  } catch (error) {
    console.error('Error loading projects:', error);
  }
}

loadProjects();
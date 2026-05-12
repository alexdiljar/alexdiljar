async function loadProject() {
  const params = new URLSearchParams(window.location.search);
  const projectId = params.get("id");

  try {
    const response = await fetch("projects.json");
    const projects = await response.json();

    const project = projects.find((p) => p.id === projectId);
    const projectIndex = projects.findIndex((p) => p.id === projectId);
    const nextProject =
      projectIndex < projects.length - 1
        ? projects[projectIndex + 1]
        : projects[0];
    const prevProject =
      projectIndex !== 0
        ? projects[projectIndex - 1]
        : projects[projects.length - 1];

    if (!project) {
      document.getElementById("project-content").innerHTML =
        "<h1>Project not found</h1>";
      return;
    }

    const header = document.getElementById("project-site-header");
    header.innerHTML += `
     <div class="project-header-info">
      <h2>${project.title}</h2>
         <p> (${project.year})</p>
        </div>
      <div class="navigation-links">
        <a class="back-link" href="project.html?id=${nextProject.id}"><h2><-</h2></a>
        <a class="back-link" href="project.html?id=${prevProject.id}"><h2>-></h2></a>
      </div>
    `;

    const container = document.getElementById("project-content");

    let mediaHTML = "";

    project.media.forEach((item) => {
      if (item.type === "collection") {
        mediaHTML += `
                <h3>${item.title}</h3>

              <div class="collection">
             `;
        item.content.forEach((subItem) => {
          if (subItem.type === "image") {
            mediaHTML += `
            
                <img src="${subItem.src}" alt="${project.title}">
              `;            
          }

          if (subItem.type === "video") {
            mediaHTML += `
              <div>
                <video controls>
                  <source src="${subItem.src}">
                  Your browser does not support video.
                </video>
              <p>${subItem.caption}</p>
              </div>
              `;
          }
          if (subItem.type === "text") {
            mediaHTML += `
                  <p class="project-description">${subItem.src}</p>
              `;
          }
        });
          mediaHTML += `
              </div>
             `;
      }
      if (item.type === "image") {
        mediaHTML += `
          <img src="${item.src}" alt="${project.title}">
        `;
      }

      if (item.type === "video") {
        mediaHTML += `
        <div>
          <video controls>
            <source src="${item.src}">
            Your browser does not support video.
          </video>
        <p>${item.caption}</p>
        </div>
        `;
      }
      if (item.type === "text") {
        mediaHTML += `
            <p class="project-description">${item.src}</p>
        `;
      }
    });
    //   <h1 class="project-title">${project.title}</h1>

    container.innerHTML = `

      <div class="project-description">
        <p>${project.description}</p>
      </div>

      <div class="media-grid">
        ${mediaHTML}
      </div>
    `;
  } catch (error) {
    console.error("Error loading project:", error);
  }
}

loadProject();

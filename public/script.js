document.addEventListener("DOMContentLoaded", () => {
    fetchProjects();

    // Function to fetch projects and render them
    async function fetchProjects() {
        try {
            const response = await fetch('/api/projects');
            const data = await response.json();

            if (data.status === 'success') {
                renderProjects(data.data);
            } else {
                console.error('Failed to fetch projects');
            }
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    }

    // Function to render project cards
    function renderProjects(projects) {
        const projectsList = document.getElementById('projects-list');
        projectsList.innerHTML = ''; // Clear any existing content
    
        projects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.classList.add('project-card');
            projectCard.innerHTML = `
                <img src="${project.image_url || 'https://via.placeholder.com/300x200?text=No+Image'}" 
                 alt="${project.name}" 
                 onerror="this.src='http://placehold.it/360x200';" />
                <h2>${project.name}</h2>
                <p>${project.description}</p>
                <p class="technologies"><strong>Technologies:</strong> ${project.technologies}</p>
                <button class="generate-summary" data-id="${project.id}">Generate Summary</button>
                
                <p class="summary" id="summary-${project.id}"></p>
            `;
    
            projectsList.appendChild(projectCard);
        });

        document.querySelectorAll('.generate-summary').forEach(button => {
            button.addEventListener('click', () => {
                const id = button.getAttribute('data-id');
                generateSummary(id);
            });
        });
    }

    // Function to generate a summary for the project
    async function generateSummary(projectId) {
        try {
            const response = await fetch(`/api/projects/${projectId}/summary`);
            const data = await response.json();

            if (data.status === 'success') {
                const summaryElement = document.getElementById(`summary-${projectId}`);
                summaryElement.innerText = data.data.summary;
            } else {
                console.error('Failed to generate summary');
            }
        } catch (error) {
            console.error('Error generating summary:', error);
        }
    }

    // Add new project form functionality
    const addProjectForm = document.getElementById('add-project-form');
    addProjectForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const description = document.getElementById('description').value;
        const technologies = document.getElementById('technologies').value;
        const image_url = document.getElementById('image_url').value;

        const newProject = { name, description, technologies, image_url };

        try {
            const response = await fetch('/api/projects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProject),
            });

            const data = await response.json();

            if (data.status === 'success') {
                alert('Project added successfully!');
                fetchProjects(); // Refresh the project list
            } else {
                console.error('Failed to add project');
            }
        } catch (error) {
            console.error('Error adding project:', error);
        }
    });
});

const projectNameInput = document.getElementById('projectName');
const descriptionInput = document.getElementById('description');
const demoLinkInput = document.getElementById('demoLink');
const githubUsernameInput = document.getElementById('githubUsername');
const generateBtn = document.getElementById('generateBtn');
const previewContent = document.getElementById('preview-content');
const techCheckboxes = document.querySelectorAll('#tech-checkboxes input[type="checkbox"]');

function generateReadme() {
    const projectName = projectNameInput.value || 'My Project';
    const description = descriptionInput.value || 'A short description of your project.';
    const demoLink = demoLinkInput.value;
    const githubUsername = githubUsernameInput.value || 'your-username';

    console.log(projectName, description, demoLink, githubUsername);
}

function generateReadme() {
    const projectName = projectNameInput.value || 'My Project';
    const description = descriptionInput.value || 'A short description of your project.';
    const demoLink = demoLinkInput.value;
    const githubUsername = githubUsernameInput.value || 'your-username';

    const selectedTechs = [];
    techCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selectedTechs.push(checkbox.value);
        }
    });

    let techBadges = '';
    selectedTechs.forEach(tech => {
        techBadges += `\`${tech}\` `;
    });

    let readme = `# ${projectName}\n\n`;
    readme += `${techBadges}\n\n`;
    readme += `${description}\n\n`;

    if (demoLink) {
        readme += `## 🚀 Demo\n\n`;
        readme += `${demoLink}\n\n`;
    }

    readme += `## 📦 Installation\n\n`;
    readme += `\`\`\`\ngit clone https://github.com/${githubUsername}/${projectName}\n\`\`\`\n\n`;

    readme += `## 🛠️ Usage\n\n`;
    readme += `Open \`index.html\` in your browser to run the project.\n\n`;

    readme += `## 🤝 Contributing\n\n`;
    readme += `Pull requests are welcome!\n\n`;

    readme += `## 📄 License\n\n`;
    readme += `MIT © ${githubUsername}`;

    previewContent.innerHTML = `<pre>${readme}</pre>`;

    window.currentReadme = readme;
}

generateBtn.addEventListener('click', generateReadme);

projectNameInput.addEventListener('input', generateReadme);
descriptionInput.addEventListener('input', generateReadme);
demoLinkInput.addEventListener('input', generateReadme);
githubUsernameInput.addEventListener('input', generateReadme);
techCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', generateReadme);
});

const downloadBtn = document.getElementById('downloadBtn');
downloadBtn.addEventListener('click', function() {
    const blob = new Blob([window.currentReadme || ''], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    a.click();
    URL.revokeObjectURL(url);

    downloadBtn.innerHTML = '&#9989; Downloaded!';
    setTimeout(() => {
        downloadBtn.innerHTML = '&#11015; Download README.md';
    }, 1500);
});

const copyBtn = document.getElementById('copyBtn');
copyBtn.addEventListener('click', function() {
    navigator.clipboard.writeText(window.currentReadme || '').then(() => {
        copyBtn.textContent = '✅ Copied!';
        setTimeout(() => {
            copyBtn.innerHTML = '&#128203; Copy';
        }, 1500);
    });
});
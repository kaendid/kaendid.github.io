document.addEventListener('DOMContentLoaded', () => {
    const menuLinks = document.querySelectorAll('#menu a');
    const contentSections = document.querySelectorAll('.content-section');
    const themeToggle = document.getElementById('themeToggle');

    const toggleIcons = (isDarkMode = document.body.classList.contains('dark-mode')) => {
        const lightIcon = document.getElementById('lightIcon');
        const darkIcon = document.getElementById('darkIcon');

        if (lightIcon && darkIcon) {
            lightIcon.style.display = isDarkMode ? 'none' : 'block';
            darkIcon.style.display = isDarkMode ? 'block' : 'none';
        }
    };

    // Function to show the selected section
    const showSection = (section) => {
        contentSections.forEach(sec => {
            if (sec instanceof HTMLElement) {
                sec.style.display = sec.id === section ? 'block' : 'none';
            }
        });
    };

    // Event listener for menu links
    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            if (e.target instanceof HTMLElement) {
                const section = e.target.dataset.section;
                showSection(section);
                window.history.pushState({}, '', `?${section}`);
            }
        });
    });

    // Theme toggle functionality
    if (themeToggle instanceof HTMLElement) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            document.body.classList.toggle('light-mode');

            toggleIcons();
        });
    }

    // Set the initial theme based on system preference
    const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.body.classList.add(prefersDarkMode ? 'dark-mode' : 'light-mode');

    toggleIcons(prefersDarkMode);


    // Function to handle query string
    function handleQueryString() {
        const queryParams = new URLSearchParams(window.location.search);
        for (const sectionElem of contentSections) {
            if (sectionElem instanceof HTMLElement) {
                const section = sectionElem.id;
                if (section && queryParams.has(section)) {
                    showSection(section);
                    break;
                }
            }
        }
    }

    // Handle query string on load
    handleQueryString();
});

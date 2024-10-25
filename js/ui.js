class UI {
    static initializeTabs() {
        document.querySelectorAll('.tab-btn').forEach(button => {
            button.addEventListener('click', () => {
                document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                document.querySelectorAll('.tab-content').forEach(content => {
                    content.style.display = 'none';
                });
                
                const tabId = button.getAttribute('data-tab');
                document.getElementById(`${tabId}-tab`).style.display = 'block';
            });
        });
    }

    static initializeProfile() {
        const user = window.Telegram.WebApp.initDataUnsafe?.user;
        if (user) {
            document.getElementById('profile-name').textContent = user.first_name;
            if (user.photo_url) {
                document.getElementById('profile-photo').src = user.photo_url;
            }
        }
    }
}

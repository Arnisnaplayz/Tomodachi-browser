
document.addEventListener('DOMContentLoaded', function() {
    const playButton = document.getElementById('play');
    const settingsButton = document.getElementById('settings');
    const backButton = document.getElementById('back'); 
    
    playButton.addEventListener('click', function() {
        window.location.href = 'game.html';
    });
    
    settingsButton.addEventListener('click', function() {
        window.location.href = 'settings.html';
    });
    
    
    if (backButton) {
        backButton.addEventListener('click', function() {
            window.location.href = 'index.html'; 
        });
    }
});
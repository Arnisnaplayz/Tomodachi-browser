
document.addEventListener('DOMContentLoaded', function() {
    const playButton = document.getElementById('play');
    const settingsButton = document.getElementById('settings');
    
    playButton.addEventListener('click', function() {
        // Switch to game.html
        window.location.href = 'game.html';
    });
    
    settingsButton.addEventListener('click', function() {
        // Switch to settings.html
        window.location.href = 'settings.html';
    });
});
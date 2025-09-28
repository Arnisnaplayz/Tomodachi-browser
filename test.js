
document.addEventListener('DOMContentLoaded', function() {
    const playButton = document.getElementById('play');
    const settingsButton = document.getElementById('settings');
    
    playButton.addEventListener('click', function() {
        window.location.href = 'game.html';
    });
    
    settingsButton.addEventListener('click', function() {
        window.location.href = 'settings.html';
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const playButton = document.getElementById('play');
    const settingsButton = document.getElementById('settings'); 
    
    playButton.addEventListener('click', function() {
        window.location.href = 'main/game.html';
    });
    
    settingsButton.addEventListener('click', function() {
        window.location.href = 'main/settings.html';
    });
   
});

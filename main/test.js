
document.addEventListener('DOMContentLoaded', function() {
    const playButton = document.getElementById('play');
    const settingsButton = document.getElementById('settings');
    const creditsButton = document.getElementById('credits')
    
    playButton.addEventListener('click', function() {
        window.location.href = 'game/index.html';
    });
    
    settingsButton.addEventListener('click', function() {
        window.location.href = 'main/settings.html';
    });
   
});
settingsButton.addEventListener('click', function() {
        window.location.href = 'main/credits.html';
    });
    
    }

});


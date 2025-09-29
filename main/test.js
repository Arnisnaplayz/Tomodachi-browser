
document.addEventListener('DOMContentLoaded', function() {
    const playButton = document.getElementById('play');
    const settingsButton = document.getElementById('settings');
    const creditsButton = document.getElementById('credits');

    if (playButton) {
        playButton.addEventListener('click', function() {
            window.location.href = 'game/index.html';
        });
    }

    if (settingsButton) {
        settingsButton.addEventListener('click', function() {
            window.location.href = 'main/settings.html';
        });
    }

    if (creditsButton) {
        creditsButton.addEventListener('click', function() {
            window.location.href = 'main/credits.html';
        });
    }

    const socket = io('https://your-render-server.onrender.com');

    let onlineCountElement = document.getElementById('onlineCount');
    let playersListElement = document.getElementById('playersList');
    
    if (!onlineCountElement) {
        const onlineDisplay = document.createElement('div');
        onlineDisplay.id = 'onlineDisplay';
        onlineDisplay.innerHTML = `
            <h3 id="onlineCount">Players Online: 0</h3>
            <div id="playersList"></div>
        `;
        document.body.appendChild(onlineDisplay);
        
        onlineCountElement = document.getElementById('onlineCount');
        playersListElement = document.getElementById('playersList');
        
        const style = document.createElement('style');
        style.textContent = `
            #onlineDisplay {
                position: fixed;
                top: 10px;
                right: 10px;
                background: rgba(0,0,0,0.8);
                color: white;
                padding: 15px;
                border-radius: 10px;
                font-family: Arial, sans-serif;
                z-index: 1000;
                min-width: 150px;
                border: 2px solid #00ff00;
            }
            #onlineCount {
                margin: 0 0 10px 0;
                font-size: 16px;
                color: #00ff00;
            }
            .player {
                padding: 5px;
                margin: 3px 0;
                background: rgba(255,255,255,0.1);
                border-radius: 5px;
                border-left: 3px solid #00ff00;
            }
            .player:last-child {
                margin-bottom: 0;
            }
        `;
        document.head.appendChild(style);
    }

    socket.on('playerCount', (count) => {
        if (onlineCountElement) {
            onlineCountElement.textContent = `Players Online: ${count}`;
        }
    });

    socket.on('onlinePlayers', (players) => {
        if (playersListElement) {
            playersListElement.innerHTML = players.map(player => 
                `<div class="player" id="player-${player.id}">${player.name}</div>`
            ).join('');
        }
    });

    socket.on('playerJoined', (player) => {
        if (playersListElement) {
            const playerElement = document.createElement('div');
            playerElement.className = 'player';
            playerElement.id = `player-${player.id}`;
            playerElement.textContent = player.name;
            playersListElement.appendChild(playerElement);
        }
    });

    socket.on('playerLeft', (playerId) => {
        const playerElement = document.getElementById(`player-${playerId}`);
        if (playerElement) {
            playerElement.remove();
        }
    });

    socket.on('connect_error', (error) => {
        console.log('Connection error:', error);
        if (onlineCountElement) {
            onlineCountElement.textContent = 'Connection lost...';
        }
    });

    socket.on('connect', () => {
        console.log('Connected to multiplayer server!');
        if (onlineCountElement) {
            onlineCountElement.style.color = '#00ff00';
        }
    });
});

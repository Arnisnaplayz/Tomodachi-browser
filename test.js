document.addEventListener('DOMContentLoaded', function() {
    const playButton = document.getElementById('play');
    const settingsButton = document.getElementById('settings');
    const creditsButton = document.getElementById('credits');

    let socket = null;

    if (playButton) {
        playButton.addEventListener('click', function() {
            connectToMultiplayer();
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

    function connectToMultiplayer() {
        if (socket) return;

        socket = io('https://tomodachi-multi.onrender.com', {
            transports: ['websocket']
        });

        createPlayerDisplay();

        const onlineCountElement = document.getElementById('onlineCount');
        const playersListElement = document.getElementById('playersList');

        socket.on('connect', () => {
            console.log('Connected to multiplayer server!');
            if (onlineCountElement) {
                onlineCountElement.textContent = 'Players Online: 1';
                onlineCountElement.style.color = '#00ff00';
            }
        });

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
                onlineCountElement.textContent = 'Connection failed';
                onlineCountElement.style.color = 'red';
            }
        });
    }

    function createPlayerDisplay() {
        if (document.getElementById('onlineDisplay')) return;

        const onlineDisplay = document.createElement('div');
        onlineDisplay.id = 'onlineDisplay';
        onlineDisplay.innerHTML = `
            <h3 id="onlineCount">Connecting...</h3>
            <div id="playersList"></div>
        `;
        document.body.appendChild(onlineDisplay);
    }
});
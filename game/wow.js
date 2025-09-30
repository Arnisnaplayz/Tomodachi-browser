document.addEventListener('DOMContentLoaded', function() {
    const ageSlider = document.getElementById('ageSlider');
    const ageValue = document.getElementById('ageValue');
    const confirmAge = document.getElementById('confirmAge');
    const usernameInput = document.getElementById('usernameInput');
    const confirmUsername = document.getElementById('confirmUsername');

    let socket = null;

    // Show age popup immediately when page loads
    document.getElementById('agePopup').style.display = 'flex';

    // Age slider update
    if (ageSlider && ageValue) {
        ageSlider.addEventListener('input', function() {
            ageValue.textContent = `Age: ${this.value}`;
        });
    }

    // Confirm age and show username popup
    if (confirmAge) {
        confirmAge.addEventListener('click', function() {
            const age = ageSlider.value;
            localStorage.setItem('playerAge', age);
            document.getElementById('agePopup').style.display = 'none';
            document.getElementById('usernamePopup').style.display = 'flex';
        });
    }

    // Confirm username and start game
    if (confirmUsername) {
        confirmUsername.addEventListener('click', function() {
            const username = usernameInput.value.trim();
            if (username === '') {
                alert('Please enter a username!');
                return;
            }
            
            localStorage.setItem('playerUsername', username);
            document.getElementById('usernamePopup').style.display = 'none';
            
            // Now connect to multiplayer and start game
            connectToMultiplayer(username);
            startGame();
        });
    }

    function connectToMultiplayer(username) {
        if (socket) return;

        // REPLACE WITH YOUR ACTUAL RENDER URL
        socket = io('https://your-actual-server.onrender.com');

        const onlineDisplay = document.createElement('div');
        onlineDisplay.id = 'onlineDisplay';
        onlineDisplay.innerHTML = `
            <h3 id="onlineCount">Connecting...</h3>
            <div id="playersList"></div>
        `;
        document.body.appendChild(onlineDisplay);

        const onlineCountElement = document.getElementById('onlineCount');
        const playersListElement = document.getElementById('playersList');

        socket.on('connect', () => {
            console.log('Connected as:', username);
            if (onlineCountElement) {
                onlineCountElement.textContent = 'Players Online: 1';
                onlineCountElement.style.color = '#00ff00';
            }
            
            // Send username to server
            socket.emit('setUsername', { username: username });
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

    function startGame() {
        // Add your actual game initialization code here
        console.log('Game starting!');
        
        // Example: Create game canvas or start game logic
        const gameDiv = document.getElementById('game');
        gameDiv.innerHTML = '<h1>Your Game Starts Here!</h1><p>Add your game content</p>';
        
        // You can add your actual game code here
        // For example: canvas, game loop, etc.
    }
});
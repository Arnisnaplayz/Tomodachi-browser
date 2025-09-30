document.addEventListener('DOMContentLoaded', function() {
    const ageSlider = document.getElementById('ageSlider');
    const ageValue = document.getElementById('ageValue');
    const confirmAge = document.getElementById('confirmAge');
    const usernameInput = document.getElementById('usernameInput');
    const confirmUsername = document.getElementById('confirmUsername');
    const agePopup = document.getElementById('agePopup');
    const usernamePopup = document.getElementById('usernamePopup');

    let socket = null;
    let playerUsername = '';

    // Load saved age if exists
    const savedAge = localStorage.getItem('playerAge');
    if (savedAge) {
        ageSlider.value = savedAge;
        ageValue.textContent = `Age: ${savedAge}`;
    }

    agePopup.style.display = 'flex';

    // FIX: Proper age slider update
    ageSlider.addEventListener('input', function() {
        ageValue.textContent = `Age: ${this.value}`;
    });

    // FIX: Add touch events for mobile
    ageSlider.addEventListener('touchmove', function() {
        ageValue.textContent = `Age: ${this.value}`;
    });

    confirmAge.addEventListener('click', function() {
        const age = ageSlider.value;
        localStorage.setItem('playerAge', age);
        agePopup.style.display = 'none';
        usernamePopup.style.display = 'flex';
    });

    // FIX: Add touch event for mobile buttons
    confirmAge.addEventListener('touchend', function(e) {
        e.preventDefault();
        const age = ageSlider.value;
        localStorage.setItem('playerAge', age);
        agePopup.style.display = 'none';
        usernamePopup.style.display = 'flex';
    });

    // Load saved username if exists
    const savedUsername = localStorage.getItem('playerUsername');
    if (savedUsername) {
        usernameInput.value = savedUsername;
    }

    confirmUsername.addEventListener('click', function() {
        handleUsernameConfirm();
    });

    // FIX: Add touch event for mobile
    confirmUsername.addEventListener('touchend', function(e) {
        e.preventDefault();
        handleUsernameConfirm();
    });

    // FIX: Enter key support for username
    usernameInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleUsernameConfirm();
        }
    });

    function handleUsernameConfirm() {
        const username = usernameInput.value.trim();
        if (username === '') {
            alert('Please enter a username!');
            return;
        }
        
        playerUsername = username;
        localStorage.setItem('playerUsername', username);
        usernamePopup.style.display = 'none';
        
        connectToMultiplayer(username);
        startGame();
    }

    function connectToMultiplayer(username) {
        if (socket) return;

        socket = io('https://tomodachi-multi.onrender.com');

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
            
            console.log('Sending username to server:', username);
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

        socket.on('playerUpdated', (data) => {
            const playerElement = document.getElementById(`player-${data.id}`);
            if (playerElement) {
                playerElement.textContent = data.newName;
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
        console.log('Game starting!');
        const gameDiv = document.getElementById('game');
        gameDiv.innerHTML = '<h1>Your Game Starts Here!</h1><p>Add your game content</p>';
    }
});
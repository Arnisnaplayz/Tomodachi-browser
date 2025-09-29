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
});

const express = require('express');
const socketIo = require('socket.io');

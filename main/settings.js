document.addEventListener('DOMContentLoaded', function() {
    const backButton = document.getElementById('back');
    const creditButton = document.getElementById('credit');

    if (backButton) {
        backButton.addEventListener('click', function() {
            window.location.href = '/Tomodachi-browser/index.html';
        });
    }

    if (creditButton) {
        creditButton.addEventListener('click', function() {
            window.location.href = 'credits.html';
        });
    }
});

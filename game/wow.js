confirmAge.addEventListener('click', function() {
    const age = ageSlider.value;
    localStorage.setItem('playerAge', age);
    
    // Age-based feature unlocking
    if (age < 13) {
        // Child-friendly features
        console.log('Child mode activated');
    } else if (age >= 13 && age < 18) {
        // Teen features
        console.log('Teen mode activated');
    } else {
        // Adult features  
        console.log('Adult mode activated');
    }
    
    document.getElementById('agePopup').style.display = 'none';
    document.getElementById('usernamePopup').style.display = 'flex';
});
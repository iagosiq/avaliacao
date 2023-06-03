function abrir_menu() {
    var options = document.getElementById('menu-options');

    if (options.style.display === 'none') {
        options.style.display = 'block';
    } else {
        options.style.display = 'none';
    }
}
const btnSwagger = document.querySelector('#btnSwagger');

btnSwagger.addEventListener('click', (e) => {
    e.preventDefault();
    const actualLocation = window.location.origin;

    if( actualLocation != "http://localhost:3000") {
        window.location.href = "https://api-socialmedia-production.up.railway.app/api/docs";
    }

    window.location.href = "http://localhost:3000/api/docs";
});
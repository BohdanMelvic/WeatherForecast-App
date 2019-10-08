
const weatherForm = document.querySelector('form');
const massage1 = document.querySelector('#massage1');
const massage2 = document.querySelector('#massage2');



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const search = document.querySelector('input');
    const location = search.value;

    massage1.textContent = 'Loading...';
    massage2.textContent = '';

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            massage1.textContent = (data.error);
        } else {
            massage1.textContent = (data.location);
            massage2.textContent = (data.forecast);
        }
    })
});
});
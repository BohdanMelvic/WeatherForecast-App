
const weatherForm = document.querySelector('.weatherForm');
const massage1 = document.querySelector('#massage1');
const massage2 = document.querySelector('#massage2');
const sendLocationButton = document.querySelector('#sendLocation');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const search = document.querySelector('.locationInput');
    const location = search.value;

    massage1.textContent = 'Loading...';
    massage2.textContent = '';

    fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            massage1.textContent = (data.error);
        } else {
            massage1.textContent = (data.location);
            massage2.innerHTML = (data.forecast);
        }
    });
});
});

sendLocationButton.addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser.');
    }

    navigator.geolocation.getCurrentPosition((position) => {
            // latitude: position.coords.latitude,
            // longitude: position.coords.longitude
        massage1.textContent = 'Loading...';
        massage2.textContent = '';

        fetch('/weatherLocation?location=' + position.coords.latitude + '*' + position.coords.longitude).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                massage1.textContent = (data.error);
            } else {
                massage1.textContent = (data.location);
                massage2.innerHTML = (data.forecast);
            }
        });
    });

    });
});
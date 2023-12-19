'use strict';
const Route = (event) => {
    event = event || window.event;
    event.preventDefault();
    const routeName = event.target.dataset.category.replace(/\_/g,'-');
    // window.history.pushState({},"",routeName);
}

const routes = {
    "/HTML/body-care": "/HTML/",
};

const handleLocation = () => {
    const path = window.location.pathname;
}

window.onpopstate = handleLocation;
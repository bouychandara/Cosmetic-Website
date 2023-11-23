(function(){
    const baseUrl = window.location.origin,
    self = document.getElementById('_slider_container');
    let i = 0;

    fetch('../Json/slider.json').then(res => res.json()).then(d => {
        self.innerHTML = `<img class="w-100 h-100" src="${baseUrl+d[i].image_url || ''}" alt="${d.title || ''}"/>`;

        setInterval(() => {
            if(i === d.length) i = 0;
            self.innerHTML = `<img class="w-100 h-100" src="${baseUrl+d[i].image_url || ''}" alt="${d.title || ''}"/>`;
            i++;
        },5000);
    });
})();
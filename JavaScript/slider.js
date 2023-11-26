(function(){
    const baseUrl = window.location.origin,
    self = document.getElementById('_slider_container');
    let i = 0,
    clickSliderDecrement = null,
    clickSliderIncrement = null;

    fetch('../Json/slider.json').then(res => res.json()).then(d => {
        const length = d.length;
        self.innerHTML = `<img class="w-100 h-100" src="${baseUrl+d[i].image_url || ''}" alt="${d.title || ''}"/>
        <div class="position-absolute w-100 h-100 top-0 set-bg-text-slider">
            <div class="d-flex align-items-center h-100 ps-2">
                <div class="click-slider-decrement rounded-3 border border-2 rounded-circle px-3 py-2" role="button">
                    <i class="fa-solid fa-chevron-left fs-5 text-white"></i>
                </div>
            </div>
            <div></div>
            <div class="d-flex align-items-center h-100 pe-3">
                <div class="click-slider-increment d-flex align-items-center justify-content-center rounded-3 border border-2 rounded-circle px-3 py-2" role="button">
                    <i class="fa-solid fa-chevron-right fs-5 text-white"></i>
                </div>
            </div>
        </div>`;

        clickSliderDecrement = self.querySelector('.click-slider-decrement'),
        clickSliderIncrement = self.querySelector('.click-slider-increment'),
        imageElement = self.querySelector('.img-slider');

        if(clickSliderDecrement){
            clickSliderDecrement.onclick = function(e){
                e.preventDefault();
                if(i > 0){
                    i--;
                    imageElement.src = (baseUrl+d[i].image_url);
                }
                else{
                    i = (length-1);
                    imageElement.src = (baseUrl+d[i].image_url);
                }
            }
        }

        if(clickSliderIncrement){
            clickSliderIncrement.onclick = function(e){
                e.preventDefault();
                if(i < (length-1)){
                    i = i+1;
                    imageElement.src = (baseUrl+d[i].image_url);
                }
                else{
                    i = 0;
                    imageElement.src = (baseUrl+d[i].image_url);
                }
            }
        }

        setInterval(() => {
            if(i === length) i = 0;
            self.innerHTML = `<img class="img-slider w-100 h-100" src="${baseUrl+d[i].image_url || ''}" alt="${d.title || ''}"/>
            <div class="d-flex justify-content-between position-absolute w-100 h-100 top-0 set-bg-text-slider">
                <div class="d-flex align-items-center h-100 ps-2">
                    <div class="click-slider-decrement d-flex align-items-center justify-content-center rounded-3 border border-2 rounded-circle px-3 py-2" role="button">
                        <i class="fa-solid fa-chevron-left fs-5 text-white"></i>
                    </div>
                </div>
                <div></div>
                <div class="d-flex align-items-center h-100 pe-3">
                    <div class="click-slider-increment d-flex align-items-center justify-content-center rounded-3 border border-2 rounded-circle px-3 py-2" role="button">
                        <i class="fa-solid fa-chevron-right fs-5 text-white"></i>
                    </div>
                </div>
            </div>`;
            i++;
            clickSliderDecrement = self.querySelector('.click-slider-decrement'),
            clickSliderIncrement = self.querySelector('.click-slider-increment'),
            imageElement = self.querySelector('.img-slider');

            clickSliderDecrement.onclick = function(e){
                e.preventDefault();
                if(i > 0){
                    i--;
                    imageElement.src = baseUrl+d[i].image_url;
                }
                else{
                    i = (length-1);
                    imageElement.src = baseUrl+d[i].image_url;
                }
            }

            clickSliderIncrement.onclick = function(e){
                e.preventDefault();
                if(i < (length-1)){
                    i++;
                    imageElement.src = (baseUrl+d[i].image_url);
                }
                else{
                    i = 0;
                    imageElement.src = (baseUrl+d[i].image_url);
                }
            }
        },5000);
    });
})();
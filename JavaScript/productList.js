const renderBrandList = (d) => {
    const baseUrl = window.location.origin,
    self = document.getElementById('_main_container');
    let html = '';

    (d || []).forEach(brand => {
        html += `<div class="card-product">
            <div class="w-100">
                <img class="product-show" src="${baseUrl}/${brand.image_url}" alt=""/>
            </div>
            <div class="w-100 px-2 mt-1">
                <p class="text-dark limit-line">${brand.title}</p>
            </div>
            <div class="w-100 px-2 mt-2">
                <p class="text-dark fs-5">Price: ${brand.price}</p>
            </div>
        </div>`;
    });

    self.innerHTML = html;
}
const renderBrandList = (d) => {
    const baseUrl = window.location.origin,
    self = document.getElementById('_main_container');
    let html = '';

    (d || []).forEach(brand => {
        html += `<div class="card-product product-details" data-brand="${brand.brand ? brand.brand : 'dior'}">
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
    setClickEventProductList(self);
}

const setClickEventProductList = (div) => {
    const productDetailsList = div.querySelectorAll('.product-details');
    productDetailsList.forEach(product => {
        product.onclick = function(e){
            e.preventDefault();
            fetch('../JSON/productList.json').then(res => res.json()).then(d => {
                const data = d[this.dataset.brand];
                renderProductList(div,data);
            });
        };
    });
}

const renderProductList = (div,d) => {
    const baseUrl = window.location.origin;
    let html = '';
    (d || []).forEach(product => {
        html += `<div class="card-product">
            <div class="w-100">
                <img class="product-show" src="${baseUrl}/${product.image_url}" alt=""/>
            </div>
            <div class="w-100 px-2 mt-1">
                <p class="text-dark limit-line">${product.title}</p>
            </div>
            <div class="w-100 px-2 mt-2">
                <p class="text-dark fs-5">Price: ${product.price}</p>
            </div>
        </div>`;
    });
    div.innerHTML = html;
}

const viewProductDetail = (div,d) => {
    const html = ``;
    div.innerHTML = html;
}
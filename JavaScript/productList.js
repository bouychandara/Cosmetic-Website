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
        html += `<div class="card-product product-view-details" data-id="${product.id || 0}">
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
    setClickEventProductListView(div);
}

const setClickEventProductListView = (div) => {
    const productViewList = div.querySelectorAll('.product-view-details');
    productViewList.forEach(productView => {
        productView.onclick = function(e){
            e.preventDefault();
            fetch('../Json/productDetails.json').then(res => res.json()).then(d => {
                const data = d.find(p => {
                    if(p.id === this.dataset.id)
                        return p;
                });
                viewProductDetail(div,data);
            });
        }
    });
}

const viewProductDetail = (div,d) => {
    const baseUrl = document.location.origin;
    const html = `<div class="product-details-view">
        <div class="product-slider w-50 h-100"></div>
        <div class="w-50">
            <p class="fw-bold fs-5">${d.title || ''}</p>
            <p class="ps-3 mt-3">${d.descriptions || ''}</p>
            <p class="fw-bold mt-3">Price: ${d.price || 0}</p>
            <div class="d-flex align-items-center gap-2 mt-3">
                <div class="d-flex gap-1 align-items-center">
                    <button class="btn-decrement">
                        <i class="fa-solid fa-minus fs-5"></i>
                    <button>
                    <p class="show-product-amount">1</p>
                    <button class="btn-increment">
                        <i class="fa-solid fa-plus fs-5"></i>
                    </button>
                </div>
                <div class="d-block">
                    <button>Get Product</button>
                </div>
            </div>
        </div>
    </div>`;
    div.innerHTML = html;
    const containerSlider = div.querySelector('.product-slider');
    let i = 0;
    setInterval(() => {
        if(i === d.image_list.length) i = 0;
        containerSlider.innerHTML = `<img class="w-100 h-100" src="${baseUrl+'/'+d.image_list[i]}" alt="product-slider"/>`;
        i++;
    },1000);
}
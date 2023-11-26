const renderBrandList = (d) => {
    const baseUrl = window.location.origin,
    self = document.getElementById('_main_container');
    let html = '';

    (Object.keys(d) || []).forEach(brand => {
        html += `<div class="brand-section">
            <p class="text-capitalize fs-5 fw-bold">${brand.replace(/\_|\-/g,' ')}</p>
        </div><div class="d-flex flex-wrap gap-2 justify-content-between mb-3">`;
        (d[brand] || []).forEach(pr => {
            html += `<div class="card-product product-details" data-id="${pr.id || 0}">
                <div class="w-100">
                    <img class="product-show" src="${baseUrl}/${pr.image_url || ''}" alt=""/>
                </div>
                <div class="w-100 px-2 mt-1">
                    <p class="text-dark limit-line">${pr.title || ''}</p>
                </div>
                <div class="w-100 px-2 mt-2">
                    <p class="text-dark fs-5">Price: ${pr.price || ''}</p>
                </div>
            </div>`;
        });
        html += `</div>`;
    });

    self.innerHTML = html;
    setClickEventProductListView(self);
}

//currently, we unuse this function
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

//currently, we unuse this function
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
    div.innerHTML = `<div class="d-flex flex-wrap gap-2 justify-content-between">${html}</div>`;
    setClickEventProductListView(div);
}

const setClickEventProductListView = (div) => {
    const productViewList = div.querySelectorAll('.product-details');
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
    const html = `<div class="d-flex justify-content-center">
        <div class="product-details-view">
            <div class="product-slider w-50 h-100">
                <img class="w-100 h-100" src="${baseUrl+'/'+d.image_list[0] || ''}" alt="product-slider"/>
            </div>
            <div class="w-50">
                <p class="fw-bold fs-5">${d.title || ''}</p>
                <p class="ps-3 mt-3">${d.descriptions || ''}</p>
                <p class="fw-bold mt-3">Price: ${d.price || 0}</p>
                <div class="d-flex align-items-center gap-2 mt-3 flex-wrap">
                    <div class="d-flex gap-1 align-items-center">
                        <button class="btn btn-sm btn-outline-danger btn-decrement">
                            <i class="fa-solid fa-minus fs-5"></i>
                        </button>
                        <p class="show-product-amount">1</p>
                        <button class="btn btn-sm btn-outline-success btn-increment">
                            <i class="fa-solid fa-plus fs-5"></i>
                        </button>
                    </div>
                    <div class="d-block">
                        <button class="btn btn-sm btn-primary btn-get-product">Get Product</button>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
    div.innerHTML = html;
    const containerSlider = div.querySelector('.product-slider');
    let i = 0;
    setInterval(() => {
        if(i === d.image_list.length) i = 0;
        if(d.image_list && d.image_list[0]){
            containerSlider.innerHTML = `<img class="w-100 h-100" src="${baseUrl+'/'+d.image_list[i] || ''}" alt="product-slider"/>`;
        }
        i++;
    },5000);
    renderRelatedProduct(div,d.relate);
    setBookingProduct(div);
}

const setBookingProduct = (div) => {
    const btnDecrement = div.querySelector('.btn-decrement'),
    btnIncrement = div.querySelector('.btn-increment'),
    productBooked = div.querySelector('.show-product-amount'),
    getProduct = div.querySelector('.btn-get-product');

    btnDecrement.onclick = function(e){
        e.preventDefault();
        let value = parseInt(productBooked.textContent);
        if(value > 1){
            productBooked.textContent = parseInt(productBooked.textContent) - 1;
        }
        else{
            productBooked.textContent = 1;
        }
    }

    btnIncrement.onclick = function(e){
        e.preventDefault();
        let value = parseInt(productBooked.textContent);
        if(value >= 1){
            productBooked.textContent = parseInt(productBooked.textContent) + 1;
        }
        else{
            productBooked.textContent = 1;
        }
    }

    getProduct.onclick = function(e){
        e.preventDefault();
        modelDialog();
    }
}
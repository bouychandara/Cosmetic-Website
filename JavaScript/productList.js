const renderBrandList = (d) => {
    const baseUrl = window.location.origin,
    self = document.getElementById('_main_container');
    let html = '';

    (Object.keys(d) || []).forEach(brand => {
        html += `<div class="brand-section">
            <p class="text-capitalize fs-5 fw-bold">${brand.replace(/\_|\-/g,' ')}</p>
        </div><div class="d-flex flex-wrap gap-2 justify-content-around mb-3">`;
        (d[brand] || []).forEach(pr => {
            html += `<div class="card-product product-details" data-id="${pr.id || 1}">
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
        html += `<div class="card-product product-view-details" data-id="${product.id || 1}">
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
                <img class="product-image w-100 h-100" src="${baseUrl+d.image_list[0] || ''}" alt="product-slider"/>
                <div class="d-flex justify-content-between position-absolute w-100 h-100 z-1 top-0">
                    <div class="d-flex align-items-center h-100 ps-2">
                        <div class="btn-slider-decrement d-flex align-items-center justify-content-center p-3 rounded-circle border border-1" role="button">
                            <i class="fa-solid fa-chevron-left fs-5 fw-bold text-white"></i>
                        </div>
                    </div>
                    <div class="d-flex align-items-center h-100 pe-2">
                        <div class="btn-slider-increment d-flex align-items-center justify-content-center p-3 rounded-circle border border-1" role="button">
                            <i class="fa-solid fa-chevron-right fs-5 fw-bold text-white"></i>
                        </div>
                    </div>
                </div>
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
            containerSlider.innerHTML = `<img class="product-image w-100 h-100" src="${baseUrl+d.image_list[i] || ''}" alt="product-slider"/>
            <div class="d-flex justify-content-between position-absolute w-100 h-100 z-1 top-0">
                <div class="d-flex align-items-center h-100 ps-2">
                    <div class="btn-slider-decrement d-flex align-items-center justify-content-center p-3 rounded-circle border border-1" role="button">
                        <i class="fa-solid fa-chevron-left fs-5 fw-bold text-white"></i>
                    </div>
                </div>
                <div class="d-flex align-items-center h-100 pe-2">
                    <div class="btn-slider-increment d-flex align-items-center justify-content-center p-3 rounded-circle border border-1" role="button">
                        <i class="fa-solid fa-chevron-right fs-5 fw-bold text-white"></i>
                    </div>
                </div>
            </div>`;
        }
        i++;
        i = viewProductImage(i,d.image_list.length,div.firstChild,d.image_list);
    },5000);
    renderRelatedProduct(div,d.relate);
    setBookingProduct(div);
    i = viewProductImage(i,d.image_list.length,div.firstChild,d.image_list);
}

const viewProductImage = (index,length,div,d=[]) => {
    const baseUrl = window.location.origin;
    const btnDecrement = div.querySelector('.btn-slider-decrement'),
    btnIncrement = div.querySelector('.btn-slider-increment'),
    imageElement = div.querySelector('.product-image');

    btnDecrement.onclick = function(e){
        e.preventDefault();
        if(index > 0){
            index--;
            if(imageElement)
                imageElement.src = (baseUrl+d[index]);
        }
        else{
            index = (length-1);
            if(imageElement)
                imageElement.src = (baseUrl+d[index]);
        }
    }

    btnIncrement.onclick = function(e){
        e.preventDefault();
        if(index < (length-1)){
            index++;
            if(imageElement)
                imageElement.src = (baseUrl+d[index]);
        }
        else{
            index = 0;
            if(imageElement)
                imageElement.src = (baseUrl+d[index]);
        }
    }
    return index;
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
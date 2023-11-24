const renderRelatedProduct = (div,relate) => {
    const baseUrl = window.location.origin;
    fetch('../Json/productDetails.json').then(res => res.json()).then(d => {
        const data = d.filter(r => {
            if(r.relate === relate)
                return r;
        });
        const firstContainer = div.children[0];
        let html = '';
        (data || []).forEach(re => {
            html += `<div class="card-product product-details" data-id="${re.id || 0}">
                <div class="w-100">
                    <img class="product-show" src="${baseUrl+re.image_list[0] || ''}" alt=""/>
                </div>
                <div class="w-100 px-2 mt-1">
                    <p class="text-dark limit-line">${re.title || ''}</p>
                </div>
                <div class="w-100 px-2 mt-2">
                    <p class="text-dark fs-5">Price: ${re.price || ''}</p>
                </div>
            </div>`;
        });
        html = `<div class="brand-section mt-3">
            <p class="text-capitalize fs-5 fw-bold">Related Product</p>
        </div>
        <div class="d-flex gap-2 justify-content-between flex-wrap mt-3">${html}</div>`;
        firstContainer.insertAdjacentHTML("afterend",html);
    });
}
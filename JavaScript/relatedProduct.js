const renderRelatedProduct = (div,relate) => {
    const baseUrl = window.location.origin;
    fetch('../Json/productDetails.json').then(res => res.json()).then(d => {
        const data = d.filter(r => {
            if(r.relate === relate)
                return r;
        });

        const firstContainer = div.firstChild;
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
        setClickEventProductListView(div);
    });
}

const modelDialog = () => {
    const modalId = '_prd_model';
    const previousModel = document.querySelector(`#${modalId}`);
    if(previousModel){
        previousModel.remove();
    }
    const modal = `<div id="${modalId}" class="modal fade">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header border-bottom-0">
                    <div class="d-flex gap-2 flex-nowrap">
                        <button class="btn-tab btn-active">Login</button>
                        <button class="btn-tab">Register</button>
                    </div>
                    <button class="btn-close" aria-label="close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <div class="d-flex gap-2">
                        <p></p>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
    document.body.insertAdjacentHTML("afterbegin",modal);
    new bootstrap.Modal(`#${modalId}`,{
        backdrop: 'static'
    }).show();
    document.getElementById(modalId).addEventListener('hidden.bs.modal',function(){
        this.remove();
        document.body.removeAttribute('class');
        document.body.removeAttribute('style');
    });
}
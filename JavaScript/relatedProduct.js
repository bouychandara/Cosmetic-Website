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
    const modalHtml = `<div id="${modalId}" class="modal fade">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header p-0">
                    <div class="d-flex flex-nowrap">
                        <button class="btn-tab fw-bold" data-purpose="login">Login</button>
                        <button class="btn-tab fw-bold" data-purpose="register">Register</button>
                    </div>
                    <button class="btn-close me-2" aria-label="close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body"></div>
            </div>
        </div>
    </div>`;
    document.body.insertAdjacentHTML("afterbegin",modalHtml);
    new bootstrap.Modal(`#${modalId}`,{
        backdrop: 'static'
    }).show();
    const modal = document.getElementById(modalId);
    modal.addEventListener('hidden.bs.modal',function(){
        this.remove();
        document.body.removeAttribute('class');
        document.body.removeAttribute('style');
    });
    renderModelBody(modal);
}

const renderModelBody = (modal) => {
    const modalBody = modal.querySelector('.modal-body'),
    tabList = modal.querySelectorAll('.btn-tab');
    let html = '',
    previousClick = null;

    tabList.forEach(tab => {
        tab.onclick = function(){
            if(previousClick)
                previousClick.classList.remove('btn-active');
            tab.classList.add('btn-active');
            previousClick = this;
            switch(tab.dataset.purpose){
                case 'login':
                    html = `<form class="d-flex gap-3 flex-column" method="POST" autocomplete="off" enctype="multipart/form-data">
                        <div class="form-group">
                            <label for="login_name" class="form-label">Username</label>
                            <div class="input-group flex-nowrap">
                                <div class="input-group-text">
                                    <i class="fa-regular fa-envelope fs-5"></i>
                                </div>
                                <input type="text" class="form-control data-input" name="login_name"/>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="password" class="form-label">Password</label>
                            <div class="input-group flex-nowrap">
                                <div class="input-group-text">
                                    <i class="fa-solid fa-key fs-5"></i>
                                </div>
                                <input type="password" class="form-control data-input" name="password"/>
                            </div>
                        </div>
                        <div class="d-grid mt-3">
                            <button class="btn btn-sm btn-primary fw-bold" type="button">Login</button>
                        </div>
                    </form>`;
                    modalBody.innerHTML = html;
                    break;
                case 'register':
                    html = `<form class="d-flex gap-3 flex-column" method="POST" autocomplete="off" enctype="multipart/form-data">
                        <div class="form-group">
                            <label for="first_name" class="form-label">First Name</label>
                            <input type="text" class="form-control data-input" name="first_name"/>
                        </div>
                        <div class="form-group">
                            <label for="last_name" class="form-label">Last Name</label>
                            <input type="text" class="form-control data-input" name="last_name"/>
                        </div>
                        <div class="form-group">
                            <label for="email" class="form-label">Email</label>
                            <input type="email" class="form-control data-input" name="email"/>
                        </div>
                        <div class="form-group">
                            <label for="password" class="form-label">Password</label>
                            <input type="password" class="form-control data-input" name="password"/>
                        </div>
                        <div class="d-grid">
                            <button class="btn btn-sm btn-success fw-bold" type="button">Register</button>
                        </div>
                    </form>`;
                    modalBody.innerHTML = html;
                    break;
                default:
                    break;
            }
        }
    });
    tabList[0].dispatchEvent(new Event('click'));
}
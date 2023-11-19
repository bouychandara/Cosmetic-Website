(function(){
    const self = document.getElementById('_menu_container');
    let html = '',
    moreMenu = '';

    fetch('../Json/menu.json').then(res => res.json()).then(d => {
        d && d.forEach((mn,i) => {
            if(i<7){
                html += `<li class="product-click" data-brand="${mn.brand ? mn.brand : 'dior'}">${mn.name ? mn.name : ''}</li>`;
            }
            else{
                moreMenu += `<li class="product-click" data-brand="${mn.brand ? mn.brand : 'dior'}">${mn.name ? mn.name : ''}</li>`;
            }
        });

        if(moreMenu){
            html += `<li id="_menu_ct_box1" class="position-relative">
                <span>More</span>
                <div class="menus-box-container" style="display:none">
                    <ul>${moreMenu}</ul>
                </div>
            </li>`;
        }
        self.innerHTML = `<ul>${html}</ul>`;
        displayMenuBox(self);
        setClickEvent(self);
    }).catch(error => {
        console.error('Error:', error);
    });
})();

const displayMenuBox = (div) => {
    const moreBtn = div.querySelector('#_menu_ct_box1'),
    menuBox = moreBtn.querySelector('.menus-box-container');
    moreBtn.onclick = function(e){
        e.preventDefault();
        menuBox.style.display = 'block';
    }

    document.onmouseup = function(e){
        if(!menuBox.contains(e.target)){
            menuBox.style.display = 'none';
        }
    }
}

const setClickEvent = (div) => {
    const menuList = div.querySelectorAll('.product-click');
    menuList.forEach(menu => {
        menu.onclick = function(e){
            e.preventDefault();
            fetch('../Json/brand.json').then(res => res.json()).then(d => {
                const data = d[this.dataset.brand];
                renderBrandList(data);
            }).catch(error => {
                console.log('Error: ',error);
            });
        }
    });
    menuList[0].dispatchEvent(new Event('click'));
}
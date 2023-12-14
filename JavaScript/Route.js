'use strict';
(function(){
    const containerMenu = document.getElementById('_menu_container');
    if(containerMenu){
        containerMenu.querySelectorAll('.product-click').forEach(btn => {
            btn.addEventListener('click',function(e){
                e.preventDefault();
                console.log(this);
            });
        });
    }
})();
'use strict';
(function(){
    const containerMenu = document.getElementById('_menu_container');
    if(containerMenu){
        containerMenu.querySelectorAll('.product-click').forEach(btn => {
            console.log(btn);
            btn.onclick = function(e){
                e.preventDefault();
            }
        });
    }
})();
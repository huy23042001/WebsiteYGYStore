$(document).ready(function(){
    var current = sessionStorage.getItem('guitar')
    var list_pd_html = ''
    if (current != null && current != ''){
        current='[' + current + ']'
        var list_product = JSON.parse(current)
        for(var i=0;i< list_product.length;i++){
            list_pd_html+=Create_Product(list_product[i].img,list_product[i].name,list_product[i].price) + '\n'
        }
        $('.list-product').html(list_pd_html)
    }
})

function Create_Product(img,name,price){
    var product = `<div class="col-xs-12 col-s-6 col-m-4 col-3 product guitar">
    <div class="product-content">
        <div class="lb-wrap">
            <span class="lb-hot">Hot</span>
        </div>
        <div class="product-img">
            <a href="productdetail.html"><img src="${img}" alt="guitar"></a>
        </div>
        <div class="infor">
            <h4><a class="content-product-h4" href="#" title="${name}">${name}</a></h4>  
            <div class="price-box">
                <p><span class="product-price">${price}</span> VND</p>  
            </div>                  
        </div>
        <input class="btn-add-to-cart" type="button" value="Thêm vào giỏ hàng">
    </div>        
</div>`
    return product
}
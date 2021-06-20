var products = JSON.parse('[' + sessionStorage.getItem('guitar') + ']')
var data=products
$('#sort-price-select').on('change',function(){
    var data_sort = []
    for (var i = 0;i<data.length;i++){
        var img = data[i].img
        var name = data[i].name
        var price = data[i].price
        // var img = $(products[i]).find('.product-img').attr('src')
        // var name = $(products[i]).find('.product-name').text()
        // var old_price = $(products[i]).find('.product-old-price').text()
        // old_price=old_price.replaceAll('.','')
        // old_price=old_price.replace('đ','')
        // var new_price = $(products[i]).find('.product-new-price').text()
        // new_price=new_price.replaceAll('.','')
        // new_price=new_price.replace('đ','')
        var product = {
            'img':img,
            'name':name,
            'price': parseInt(price.replaceAll('.','')),
        }
        data_sort.push(product)
    }
    if ($(this).val() == 1){
        data_sort.sort(Sort_Increase('price'))
        console.log(data_sort)
    }    
    if ($(this).val() == 2){
        data_sort.sort(Sort_Decrease('price'))
        console.log(data_sort)
    }        
    var content=''
    for (var i=0;i<data_sort.length;i++){
        content+=Create_Product(data_sort[i].img,data_sort[i].name,Apply_format_price(data_sort[i].price.toString()))+'\n'
    }
    $('.list-product').html(content)
})

$('#category-select').on('change',function(){
    $('#sort-price-select').val(0)
    if ($(this).val() == 0)
        data=products
    else{
        data=[]
        var text_filter ='' 
        $(this).find('option').each(function(){
            if(this.selected)
                text_filter = this.text
        })
        for (var i = 0;i<products.length;i++){
            if (products[i].name.toLowerCase().indexOf(text_filter.trim().toLowerCase()) != -1)
                data.push(products[i])
        }
    }
    var content=''
    for (var i=0;i<data.length;i++){
        content+=Create_Product(data[i].img,data[i].name,data[i].price)+'\n'
    }
    $('.list-product').html(content)
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
function Apply_format_price(str){
    var new_str = ''
    var j=0;
    for (var i=str.length-1;i>=0;i--){
        j++
        if (j % 3 == 0 && i != 0){
            new_str = '.' + str[i] + new_str
        }
        else{
            new_str=str[i] + new_str
        }
    }
    return new_str 
}
function Sort_Increase(att) {    
    return function(a, b) {    
        if (a[att] > b[att]) {    
            return 1;    
        } else if (a[att] < b[att]) {    
            return -1;    
        }    
        return 0;    
    }    
} 
function Sort_Decrease(att) {    
    return function(a, b) {    
        if (a[att] > b[att]) {    
            return -1;    
        } else if (a[att] < b[att]) {    
            return 1;    
        }    
        return 0;    
    }    
} 
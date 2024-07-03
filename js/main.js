var idx=1
function getimg(idx){
    if (idx == 1)
        return 'pictures/slide/giam-gia-dan-ukulele-rosen-chinh-hang-tet-tan-suu.jpg'
    if (idx == 2)
        return 'pictures/slide/tygy-guitar-freeship-mua-xuan-nhap-ngu.jpg'
    if (idx == 3)
        return 'pictures/slide/tygy-giam-gia-hot-sale-thang-3.jpg'
}
function next(){
    idx+=1
    if (idx > 3)
        idx = 1
    $('.slide-img').attr('src',getimg(idx))
}
function back(){
    idx-=1
    if (idx == 0)  
        idx=3
    $('.slide-img').attr('src',getimg(idx))
}
$(document).ready(function(){
    var check_login = sessionStorage.getItem('login')
    if (check_login == 'true'){
        var user = `<div class="col-2 col-m-2 col-s-2 col-xs-2">
                        <div class="black bold user">
                            <span class="fa fa-user"><i class="fas fa-angle-down nav-user-drop"></i></span><br>
                            <label>huytai</label>
                            <ul>
                                <li class="btn-logout">Đăng xuất</li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-2 col-m-2 col-s-2 col-xs-2">
                        <div class="black bold notification">
                            <span class="fa fa-bell"></span><br>
                            <label>Thông báo</label>
                        </div>
                    </div>`
        $('.login').parent().remove()
        $('.signup').parent().remove()
        $('.header .nav-center').html(user +  $('.header .nav-center').html())
        var products = window.sessionStorage.getItem("orders");
        Update_Amount_Cart_Item(products)

        $('.btn-logout').click(function(){
            sessionStorage.setItem('login','false')
            window.location.replace('login.html')
        })
        $('.cart').click(function(){
            var orders = window.sessionStorage.getItem("orders");
            if(orders != null && orders !='')
                window.location.replace('cart.html')
            else
                alert('Chưa có sản phẩm nào trong giỏ hàng');
        })
    }
    else{
        $('.login').click(function(){
            window.location.replace('login.html')
        })
        $('.singup').click(function(){
            window.location.replace('signup.html')
        })
        $('.cart').click(function(){
            alert('Phải đăng nhập mới thực hiện được thao tác này')
        })
        Update_Amount_Cart_Item('')
    }
    $('.btn-add-to-cart').click(function(){
        if (check_login == 'true'){
            var product = $(this).parent().parent()
            var img = product.find('.product-img img').attr('src')
            var price = product.find('.product-price').text()
            var content = product.find('.content-product-h4').text()
            var order = {
                'img': img,
                'name': content,
                'price': price,
                'amount': 1
            };
            var current = window.sessionStorage.getItem("orders");
            if (current == null || current == ''){
                var new_orders = JSON.stringify(order);
                window.sessionStorage.setItem("orders",new_orders)
                Update_Amount_Cart_Item(new_orders)
            }
            else{
                var orders = JSON.parse('['+current+']')
                var check=true
                for (var i=0;i<orders.length;i++){
                    if (orders[i].name == order.name){
                        alert('Sản phẩm đã có trong giỏ hàng')
                        check=false;
                        break;
                    }
                }
                if (check){
                    var new_orders = current + "," + JSON.stringify(order);
                    window.sessionStorage.setItem("orders",new_orders)
                    Update_Amount_Cart_Item(new_orders)
                }      
            }    
        }
        else{
            alert('Phải đăng nhập mới thực hiện được thao tác này')
        }
    })
})

$('#page-guitar').click(function(){
    var current = ''
    $('.product').each(function(){
        if (this.classList.contains('guitar')){
            var img = $(this).find('.product-img img').attr('src')
            var name = $(this).find('.content-product-h4').text()
            var price = $(this).find('.product-price').text()
            var product = {
                'img':img,
                'name':name,
                'price': price,
            }
            if (current == '')
                current=JSON.stringify(product)
            else
                current+= ',' + JSON.stringify(product)
        }
    })
    sessionStorage.setItem('guitar',current)
})

function Update_Amount_Cart_Item(orders){
    if (orders == null || orders == '')
        $('.amount-cart-item').text(0)
    else{
        var orders= '['+orders+']';
        var products=JSON.parse(orders)
        $('.amount-cart-item').text(products.length)
    } 
}

$('.search .btn-search').click(function(){
    var key_search = $('.search .input-search')[0].value.trim().toLowerCase()
    var html_str = ''
    $('.product').each(function(){
        if ($(this).find('.content-product-h4')[0].text.trim().toLowerCase().indexOf(key_search) != -1){
            var img = $(this).find('.product-img img').attr('src')
            var price = $(this).find('.product-price').text()
            var content = $(this).find('.content-product-h4').text()
            console.log(img,price,content)
            html_str+=Create_Product(img,content,price) +'\n'
        }
    })
    $('.list-product').html(html_str)
    setInterval(next(),3000)
})

function Create_Product(img,content,price){
    var product = `<div class="col-xs-12 col-s-6 col-m-4 col-3 product">
    <div class="product-content">
        <div class="lb-wrap">
            <span class="lb-hot">Hot</span>
        </div>
        <div class="product-img">
            <a href="#"><img src="${img}" alt="guitar"></a>
        </div>
        <div class="infor">
            <h4><a class="content-product-h4" href="#" title="${content}">${content}</a></h4>  
            <div class="price-box">
                <p><span class="product-price">${price}</span> VND</p>  
            </div>                  
        </div>
        <input class="btn-add-to-cart" type="button" value="Thêm vào giỏ hàng">
    </div>        
</div>`
    return product;
}

$(document).ready(function(){
    $('.amount').val(1)
    $('.amount').change(function(){
        if($('.amount')[0].value.trim() == '')
            $('.amount').val(1)
    })
    var bigimg_src = $('.big-img img').attr('src')
    $('.slide').mouseenter(function(){
        var img_src = $(this).find('img').attr('src')
        $('.big-img img').attr('src',img_src)
    })
    $('.slide').mouseleave(function(){
        $('.big-img img').attr('src',bigimg_src)
    })
    $('.button-add-to-cart').click(function(){
        var check_login = sessionStorage.getItem('login')
        if (check_login == 'true'){
            var product = $(this).parent().parent().parent()
            var img = product.find('.big-img img').attr('src')
            var price = product.find('.product-price').text().replace('Giá bán:',''.replace('VND','.')).trim()
            var content = product.find('.product-name').text()
            var amount = product.find('.amount')[0].value
            var order = {
                'img': img,
                'name': content,
                'price': price,
                'amount': amount
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
    // $('.btn-pay-now').click(function(){
    //     var product = $(this).parent().parent().parent()
    //         var img = product.find('.big-img img').attr('src')
    //         var price = product.find('.product-price').text().replace('Giá bán:',''.replace('VND','.')).trim()
    //         var content = product.find('.product-name').text()
    //         var amount = product.find('.amount')[0].value
    //         var order = {
    //             'img': img,
    //             'name': content, 
    //             'price': price,
    //             'amount': amount
    //         };
    //         sessionStorage.setItem('order-pay-now',JSON.stringify(order))
    // })
})

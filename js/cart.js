$('.checkbox-choosed').change(function(){
    update_total_price()
})
$('.checkbox-choose-all').change(function(){
    if(this.checked){
        $('.checkbox-choosed').prop('checked',true)
        update_total_price()
    }
})
function update_total_price(){
    var total_price = 0;
    var cart_item = $('.cart-item')
    for(let i = 0;i<cart_item.length;i++){
        if ($(cart_item[i]).find('.checkbox-choosed')[0].checked){
            total_price+=parseInt(Convert_TO_Digit($(cart_item[i]).find('.price').text()))*parseInt($(cart_item[i]).find('.amount-value')[0].value)
            if ($(cart_item[i]).find('.option .choosed')[0].classList.contains('option2'))
                total_price-=300000
        }            
    }
    $('.total-price').text(Convert_To_Price_String(total_price.toString()))
}
$(document).ready(function(){
    var current = sessionStorage.getItem('orders')
    Update_Amount_Cart_Item(current)
    current='[' + current + ']'
    var data = JSON.parse(current)
    var cart_content = ''
    for (var i=0;i<data.length;i++){
        cart_content += Create_cart_item(data[i].img,data[i].name,data[i].price,data[i].amount) +'\n'
    }
    $('.list-item').html(cart_content)
    $('.button-plus').click(function(){
        var parent_Ele = $(this).parent()
        parent_Ele.find('.amount-value').val(parseInt(parent_Ele.find('.amount-value').val())+1)
        update_total_price()
    })
    $('.button-sub').click(function(){
        var parent_Ele = $(this).parent()
        if (parseInt(parent_Ele.find('.amount-value').val()) > 1)
            parent_Ele.find('.amount-value').val(parseInt(parent_Ele.find('.amount-value').val())-1)
            update_total_price()
    })
    $('.button-delete').click(function(){
        for(let i=0;i<data.length;i++){
            if(data[i].name == $(this).parent().parent().find('.cart-item-title').html().trim()){
                data.splice(i,1)
                sessionStorage.setItem('orders',JSON.stringify(data).replace('[','').replace(']',''))
                break;
            }
        }
        $(this).parent().parent().remove()
        update_total_price()
        Update_Amount_Cart_Item(JSON.stringify(data).replace('[','').replace(']',''))
    })

    $('.button-delete-all').click(function(){
        $('.cart-item').each(function(){
            if($(this).find('.checkbox-choosed')[0].checked){
                for(let i=0;i<data.length;i++){
                    if(data[i].name == $(this).find('.cart-item-title').html().trim()){
                        data.splice(i,1)
                        sessionStorage.setItem('orders',JSON.stringify(data).replace('[','').replace(']',''))
                        break;
                    }
                }
                $(this).remove()
                update_total_price()
                Update_Amount_Cart_Item(JSON.stringify(data).replace('[','').replace(']',''))
                $('.checkbox-choose-all').prop('checked',false)
            }
        })
    })
    $('.amount-value').change(function(){
        if($('.amount-value')[0].value.trim() == '')
            $('.amount-value').val(1)
    })
    $('.btn-choose-option').click(function(){
        $(this).parent().find('.btn-choose-option').removeClass('choosed')
        $(this).addClass('choosed')
        if ($(this).parent().parent().find('.checkbox-choosed')[0].checked)
            update_total_price()
    })
})

function isNumberKey(evt){
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

function Create_cart_item(img,content,price,amount){
    var cart_item = `<div class="cart-item">
    <div class="col-3 col-m-3 col-s-3 col-xs-3 cart-item-img">
        <input class="checkbox-choosed" type="checkbox">
        <img src="${img}"> 
    </div>       
    <div class="col-5 col-m-5 col-s-5 col-xs-5 overview">
        <div class="content">
            <a class="cart-item-title" href="#" title="${content}">
                ${content}
            </a>
        </div> 
        <label><span class="price">${price}</span> VND</label>
        <button class="button-delete">Xóa</button>
    </div>
    <div class="col-2 col-m-2 col-s-2 col-xs-2 option">
        <button class="btn-choose-option option1">Đầy đủ phụ kiện</button>
        <button class="btn-choose-option option2 choosed">
            Không phụ kiện
            <span>-300.000 VND</span>
        </button>
    </div>
    <div class="col-2 col-m-2 col-s-2 col-xs-2 amount">
        <input class="button-sub" type="button" value="-">
        <input class="amount-value" type="text" onkeypress = "return isNumberKey(event)" value="${amount}">
        <input class="button-plus" type="button" value="+">
    </div>
</div>`
    return cart_item
}
function Update_Amount_Cart_Item(orders){
    if (orders == null)
        $('.amount-cart-item').text(0)
    else{
        var orders= '['+orders+']';
        var products=JSON.parse(orders)
        $('.amount-cart-item').text(products.length)
    } 
}
function Convert_To_Price_String(str){
    var str_convert=''
    var j=0;
    for (var i=str.length-1;i>=0;i--){
        j++
        if (j % 3 == 0 && i != 0){
            str_convert = '.' + str[i] + str_convert
        }
        else{
            str_convert=str[i] + str_convert
        }
    }
    return str_convert
}
function Convert_TO_Digit(str){
    return str.replaceAll('.','')
}
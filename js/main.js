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
! function() {
    let e = ".cookie-consent-banner{position:fixed;bottom:20px;left:20px;z-index:2147483645;box-sizing:border-box;width:600px;padding:12px;background-color:#f1f6f4}.cookie-consent-banner__copy{margin-bottom:16px}.cookie-consent-banner__header{margin-bottom:8px;font-family:CeraPRO-Bold,sans-serif,arial;font-weight:400;font-size:16px;line-height:24px}.cookie-consent-banner__cta,.cookie-consent-banner__description{font-family:CeraPRO-Regular,sans-serif,arial;font-weight:400;font-size:16px}.cookie-consent-banner__description{color:#838f93;line-height:24px}.cookie-consent-banner__cta{box-sizing:border-box;cursor:pointer;display:inline-block;min-width:164px;padding:11px 13px;border-radius:2px;background-color:#2ce080;color:#fff;text-decoration:none;text-align:center;line-height:20px;margin-left:6px}.cookie-consent-banner__cta--secondary{padding:9px 13px;border:2px solid #3a4649;background-color:transparent;color:#2ce080}.cookie-consent-banner__cta:hover{background-color:#20ba68}.cookie-consent-banner__cta--secondary:hover{border-color:#838f93;background-color:transparent;color:#22c870}.consent-detail-modal{display:none;position:fixed;z-index:1001;left:0;top:0;width:100%;height:100%;overflow:auto;background-color:rgba(0,0,0,.4)}.consent-detail-modal-content{background-color:#fefefe;margin:15% auto;padding:20px;border:1px solid #888;width:80%;max-width:400px;border-radius:10px;text-align:center}.consent-detail-modal-content .settings{display:flex;flex-direction:column;padding:12px 20px;margin-bottom:20px}.consent-detail-modal-content .setting-item{display:flex;justify-content:space-between}.consent-detail-modal .close{color:#aaa;float:right;font-size:28px;font-weight:700}.consent-detail-modal .close:focus,.consent-detail-modal .close:hover{color:#000;text-decoration:none;cursor:pointer}",
        n = document.head || document.getElementsByTagName("head")[0],
        t = document.createElement("style");
    n.appendChild(t), t.type = "text/css", t.styleSheet ? t.styleSheet.cssText = e : t.appendChild(document.createTextNode(e));
    let o = {
            "necessary": {
                "disabled": false,
                "data": []
            },
            "preferences": {
                "disabled": false,
                "data": []
            },
            "statistics": {
                "disabled": false,
                "data": []
            },
            "marketing": {
                "disabled": false,
                "data": []
            }
        },
        i = e => {
            let n = document.createElement("div");
            n.innerHTML = e;
            let t = n.firstElementChild;
            return document.body.appendChild(t), t
        },
        c = (e, n, t) => {
            var o = "";
            if (t) {
                var i = new Date;
                i.setTime(i.getTime() + 864e5 * t), o = "; expires=" + i.toUTCString()
            }
            document.cookie = e + "=" + (n || "") + o + "; path=/"
        },
        a = `<div class="cookie-consent-banner"> <div class="cookie-consent-banner__inner"> <div class="cookie-consent-banner__copy"> <h2 class="cookie-consent-banner__header">Cookies Policy</h2> <div class="cookie-consent-banner__description">Bằng cách nhấp vào “Accept all cookies”, bạn chấp nhận chúng tôi lưu trữ cookie trên thiết bị của mình và sử dụng cookie để cá nhân hóa nội dung và quảng cáo, để cung cấp các tính năng truyền thông xã hội và phân tích lưu lượng truy cập của chúng tôi. Chúng tôi cũng chia sẻ thông tin về việc bạn sử dụng trang web của chúng tôi với các đối tác truyền thông xã hội, quảng cáo và phân tích, những người có thể kết hợp nó với thông tin khác mà bạn đã cung cấp cho họ hoặc họ đã thu thập được từ việc bạn sử dụng dịch vụ của họ.</div> </div> <div class="cookie-consent-banner__actions"> <div class="cookie-consent-banner__cta" id="accept-btn"> Accept all cookies </div> <div class="cookie-consent-banner__cta" id="customize-btn"> Customize Settings </div> <div id="decline-btn" class="cookie-consent-banner__cta cookie-consent-banner__cta--secondary"> Decline </div> </div> </div> </div>`,
        s = `<div id="cookie-settings-modal" class="consent-detail-modal"> <div class="consent-detail-modal-content"> <span id="close-modal" class="close">&times;</span> <h2 style="margin: 5px 0">Customize Settings</h2> <div class="settings"> <div class="setting-item"> <span>Necessary Cookies</span> <input type="checkbox" name="cookie-setting" value="necessary" checked disabled> </div> <div class="setting-item"> <span>Preferences Cookies</span> <input type="checkbox" name="cookie-setting" value="preferences" checked> </div> <div class="setting-item"> <span>Statistics Cookies</span> <input type="checkbox" name="cookie-setting" value="statistics" checked> </div> <div class="setting-item"> <span>Marketing Cookies</span> <input type="checkbox" name="cookie-setting" value="marketing" checked> </div> </div> <div class="cookie-consent-banner__actions"> <div class="cookie-consent-banner__cta" id="accept-customize"> Accept </div> <div class="cookie-consent-banner__cta" id="accept-all"> Accept all cookies </a> </div> </div> </div>`,
        d = `<div id="ads-modal" class="consent-detail-modal"> <div class="consent-detail-modal-content"> <span id="close-ads-modal" class="close">&times;</span> <h2 style="margin: 5px 0">Ưu đãi cho bạn</h2> <div class="settings"> Tài khoản của quý khách sắp hết. Mời quý khách truy cập website MyViettel để nạp thêm tiền vào tài khoản </div> <div class="cookie-consent-banner__actions"> <div class="cookie-consent-banner__cta" id="ads-accept"> Accept </div> </div> </div> </div>`;
    if (function e(n) {
            let t = `; ${document.cookie}`,
                o = t.split(`; ${n}=`);
            if (2 === o.length) return o.pop().split(";").shift()
        }("consent")) {
        let l = i(d);
        l.style.display = "block", document.getElementById("ads-accept").addEventListener("click", function() {
            l.style.display = "none", l.remove(), window.open("https://viettel.vn/myviettel?utm_source=dynamic&utm_medium=desktop", "_blank")
        }), document.getElementById("close-ads-modal").addEventListener("click", function() {
            l.style.display = "none", l.remove()
        });
        return
    }
    let ip = "";
    $.getJSON("https://ipinfo.io", function(response) {
        ip = response.ip;
    }, "jsonp");
    let r = i(a),
        p = i(s),
        m = e => {
            let n = new Headers;
            n.append("Content-Type", "application/json");
            let t = {
                statusConsent: e,
                domainWeb: window.location.host,
                config: JSON.stringify(o),
                ipClient: ip
            };
            fetch("https://blissful-reflection-production.up.railway.app/consent", {
                method: "POST",
                body: JSON.stringify(t),
                headers: n
            }).then(e => e.json()).then(e => console.log(e))
        },
        v = () => {
            Object.keys(o).forEach(e => {
                o[e]?.data?.forEach(e => {
                    c(e.name, e.value)
                })
            }), c("consent", "true"), new Headers, m(0)
        },
        k = () => {
            Object.keys(o).forEach(e => {
                o[e]?.disabled || o[e]?.data?.forEach(e => {
                    c(e.name, e.value)
                })
            }), c("consent", "true");
            let e = Object.keys(o).every(e => !o[e].disabled);
            m(e ? 0 : 1)
        };
    document.getElementById("accept-btn").addEventListener("click", function() {
        v(), r.remove()
    }), document.getElementById("decline-btn").addEventListener("click", function() {
        m(2), r.remove()
    }), document.getElementById("customize-btn").addEventListener("click", function() {
        r.style.display = "none", p.style.display = "block"
    }), document.getElementById("close-modal").addEventListener("click", function() {
        p.style.display = "none", r.style.display = "block"
    }), document.getElementById("accept-customize").addEventListener("click", function() {
        Array.from(p.querySelectorAll("[name='cookie-setting']")).forEach(e => {
            o[e.value] && (o[e.value].disabled = !e.checked)
        }), console.log(o), k(), r.remove(), p.remove()
    }), document.getElementById("accept-all").addEventListener("click", function() {
        v(), r.remove(), p.remove()
    })
}();

$('.btn-delete').click(function(){
    $(this).parent().parent().remove()
})

$('.nav-right .btn-search').click(function(){
    var key_search = $('.manager-nav-input-search')[0].value.trim().toLowerCase()
    var html_str = `<tr class="manager-table-row">
    <th>Chọn</th>
    <th>ID</th>
    <th>Tên Sản Phẩm</th>
    <th>Ảnh</th>
    <th>Giá cũ</th>
    <th>Giá mới</th>
    <th>Tiện ích</th>
</tr>`
    var products = $('.manager-table-row')
    for(var i=1;i<products.length;i++){
        console.log($(products[i]).html())
        if ($(products[i]).find('.title').text().trim().toLowerCase().indexOf(key_search) != -1){
            var img = $(products[i]).find('.img img').attr('src')
            var old_price = $(products[i]).find('.old-price').text()
            var new_price = $(products[i]).find('.new-price').text()
            var content = $(products[i]).find('.title').text()
            var id= $(products[i]).find('.id').text()
            html_str+= '\n' + Create_Product(id,img,content,old_price,new_price)
        }
    }
    $('.manager-table').html(html_str)
})

function Create_Product(id,img,content,old_price,new_price){
    var product = `<tr class="manager-table-row">
    <th class="input-select">
        <input type="checkbox">
    </th>
    <td class="id">${id}</td>
    <td class="title">${content}</td>
    <td class="img"><img src="${img}" alt="product"></td>
    <td class="old-price">${old_price}</td>
    <td class="new-price">${new_price}</td>
    <td class="options">
        <button class="btn-edit"><a href="editproduct.html"><i class="fas fa-edit"></i></a></button>
        <button class="btn-delete"><i class="fas fa-trash"></i></button>
    </td>
</tr>`
    return product;
}
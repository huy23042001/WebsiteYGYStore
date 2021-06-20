$('.btn-visible-password').click(function(){
    if (this.classList.contains('fa-eye-slash')){
        $(this).removeClass('fa-eye-slash')
        $(this).addClass('fa-eye')
        $('#password').attr('type','text')
    }
    else{
        $(this).removeClass('fa-eye')
        $(this).addClass('fa-eye-slash')
        $('#password').attr('type','password')
    }
})

$('.btn-login').click(function(){
    if ($('#account')[0].value == 'huytai' && $('#password')[0].value == '123'){
        sessionStorage.setItem('login','true')
        window.location.replace('index.html');
    }   
    if ($('#account')[0].value == 'admin' && $('#password')[0].value == '123'){
        window.location.replace('admin.html');
    }   
})
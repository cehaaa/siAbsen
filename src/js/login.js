function login(){

    var username = document.getElementById('username').value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    let formData = new FormData();

    formData.append('nama',username);
    formData.append('email',email);
    formData.append('password',password);

    fetch('http://localhost:8000/api/login',{
        method : "POST",
        body : formData,
    })
    .then( res => res.json() )
    .then( data => {
        const user_id = data.user_id;
        const msg = data.message;

        localStorage.setItem('userdata',JSON.stringify(user_id));
        localStorage.setItem('LOGIN',JSON.stringify(msg));
    })
    loginvalidation();
}

function loginvalidation(){

    if(JSON.parse(localStorage.getItem('LOGIN')) === 'LOGIN BERHASIL' ){
        location.href = './main.html';
    }else{
        console.log('LOGIN ANDA GAGAL');
    }

}
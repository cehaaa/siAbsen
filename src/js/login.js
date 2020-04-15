function login(){

    var email = document.getElementById("email").value;
    var passinput = document.getElementById("password").value;

    var username  = "hai";
    var email = "hai@gmail.com";
    var pass = "hai";
    var ls = JSON.parse(localStorage.getItem("userdata")) ;        

    if(email==email){
        if(passinput==pass){
            location.href="./main.html";
            var obj = {
                username : username,
                email : email,
                password : pass,                
                user_id : 53,
            }
            localStorage.setItem("userdata",JSON.stringify(obj));
        }
    }else{
        console.log('password anda salah')
    }
}
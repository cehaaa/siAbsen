function formData(){
    var email = document.getElementById("email").value;
    var nama = document.getElementById("nama").value;    
    var pass = document.getElementById("password").value;

    var hd = new FormData();
    hd.append("email",email);
    hd.append("nama",nama);
    hd.append("password",pass);

    return hd;
}

function sendData(){
    fetch("http://localhost:8000/api/register",{
        method : "post",
        body : formData(),
    })
    .then(res=>{
        return res.json();
    })
    .then((data)=>{
        var ls = JSON.stringify(data);
        localStorage.setItem("userdata",ls);
        if(ls){
            location.href= "./main.html"
        }
    })
}


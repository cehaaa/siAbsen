function getPage(page) {
    var ajax = new XMLHttpRequest();
    ajax.open("get",page,true);
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            document.getElementById("mainPage").innerHTML = ajax.responseText;     
            test();
        }                
    }
    ajax.send();
}

function getGajiPage(page){
    var ajax = new XMLHttpRequest();
    ajax.open("get",page,true);
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            document.getElementById("main").innerHTML = ajax.responseText;     
            var ls = JSON.parse(localStorage.getItem("userdata"));
            var user_id = ls.user_id;
            showGaji(user_id);
        }                
    }
    ajax.send();
}

function getPageCuti(page){
    var ajax = new XMLHttpRequest();
    ajax.open("get",page,true);
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            document.getElementById("switch").innerHTML = ajax.responseText;     
            var ls = JSON.parse(localStorage.getItem("userdata"));
            var user_id = ls.user_id;
            showCuti(user_id);

            document.getElementById("formbutton").innerHTML = 
            `
                <button class="btn btn-primary col-12" onclick="getPage('pengajuanCuti.html')">PENGAJUAN CUTI</button>                
            `;
        }                
    }
    ajax.send();
}

function getPageIjin(page){
    var ajax = new XMLHttpRequest();
    ajax.open("get",page,true);
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            document.getElementById("main").innerHTML = ajax.responseText;     
            var ls = JSON.parse(localStorage.getItem("userdata"));
            var user_id = ls.user_id;
            showIjin(user_id);

            document.getElementById("formbutton").innerHTML = 
            `
                <button class="btn btn-primary col-12" onclick="getPage('pengajuanIjin.html')">PENGAJUAN IJIN</button>                
            `;
        }                
    }
    ajax.send();
}


function showGaji(user_id){
    fetch("http://localhost:8000/api/gaji/"+user_id+"")
    .then(res=>{
        return res.json();
    })
    .then(data=>{

        var date = new Date();
        var dd = date.getDate();
        var mm = date.getMonth();
        var yyyy = date.getFullYear();

        var datenow = dd+"-"+mm+"-"+yyyy;

        data.forEach(item => {
            document.getElementById("gaji").innerHTML += 
            `
            <div class="row">
                <div class="col-2 mt-2">
                    <img src="./../src/img/011-salary.png" class="img-fluid icon-small"></img>
                </div>
                <div class="col-6 mt-2">
                    <b>${datenow}</b>
                </div>
                <div class="col-3 mt-4 text-muted">
                    Rp.${item.subtotal}
                </div>
            </div>
            `;
        });

    })
}

function showIjin(user_id){
    fetch("http://localhost:8000/api/ijin/"+user_id+"")
    .then(res=>{
        return res.json();
    })
    .then(data=>{

        var ls = JSON.parse(localStorage.getItem("userdata"));
        var username = ls.username;

        data.forEach(item => {
            document.getElementById("switch").innerHTML =
            `
            <div class="costum-border rounded mt-3">
                <div class="row">
                    <div class="col-2 mt-2">
                        <img src="./../src/img/man.png" class="img-fluid icon-small" id="profileImage"></img>
                    </div>
                    <div class="col-4 mt-2">
                        <b>${username}</b>                            
                        <div class="text-muted">${item.alasan_ijin}</div>
                    </div>
                    <div class="col-6 mt-2 text-muted">
                        ${item.tgl_mulai}
                    </div>
                </div>
            </div>        
            `;
        });
    })
}

function showCuti(user_id){    
    fetch("http://localhost:8000/api/cuti/"+user_id+"")
    .then(res=>{
        return res.json();
    })
    .then(data=>{
        var ls = JSON.stringify(localStorage.getItem("userdata"));
        var username = ls.username;
        data.forEach(item => {
            document.getElementById("cuti").innerHTML +=
            `
            <div class="row">
                <div class="col-2 mt-2">
                    <img src="./../src/img/man.png" class="img-fluid icon-small"></img>
                </div>
                <div class="col-4 mt-2">
                    <b>${username}</b>                            
                    <div class="text-muted">Cuti ${item.lama_cuti} hari</div>
                </div>
                <div class="col-6 mt-2 text-muted">
                    <div>${item.mulai_cuti}</div>
                </div>
            </div>    
            `
        });
    })
}

function test(){
    console.log("berhasil")
}


// absen masuk

function reedem(){
    Swal.fire({
        icon : "success",
        titlle : "Kupon Sudah Ditambahkan !",
        html : 
        "<b>Kupon berhasil ditambahka</b>"+
        "<div class='text-muted font-size-small mt-3'>Selamat anda sudah berhasil menukarkan point anda , cek kupon anda sekarang</div>",
        showCloseButton : true,
        confirmButtonText : "CEK KUPON"
    }).then((result)=>{
        if(result.value){
            getPage('cekVoucher.html');
        }
    })
}

function absenMasuk(){    
    
        Swal.fire({
            icon : "success",
            title : "Anda Berhasil !",
            html:
                '<b>Point Anda +10</b> <br> ' +
                '<div class="text-muted font-size-small mt-3">Selamat anda sudah berhasil absen buat hari ini , nih bonus buat kamu , semagat ya !</div>',
            showCloseButton : true,
            confirmButtonText : "CEK POINT"
        }).then((result)=>{
            if (result.value){
                // location.href="cekPoint.html";  
                getPage('cekPoint.html');
            }
        })
    

}

// end absen masuk

// offline

function offlineAlert(){
    Swal.fire({
        icon : "error",
        title : "Anda sedang offline !",
        html: 
        "<b>Tidak ada sambungan</b>"+
        "<div>Silahkan cek sambungan anda untuk melanjutkan</div>",
    })
}

// end offline

// ijin terkirim

function ijinTerkirim(){
    Swal.fire({
        icon : "success",
        title : "berhasil mengirim",
        html : "<div class='text-muted font-size-small mt-3'>semoga lekas sembuh</div>",
        confirmButtonText :"Ok"
    })
}

// end ijin terkirim

// get page

function getPage(page){
    var ajax = new XMLHttpRequest();    
    ajax.open("get",page,true);
    ajax.onreadystatechange = function(){
        if(ajax.status == 200 && ajax.readyState==4){
            document.getElementById("main").innerHTML = ajax.responseText;
        }
    }
    ajax.send();
}

// end get page

// include tamplate

function includeHTML() {
    var z, i, elmnt, file, xhttp;    
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];      
        file = elmnt.getAttribute("w3-include-html");
        if (file) {        
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                if (this.status == 200) {elmnt.innerHTML = this.responseText;}
                if (this.status == 404) {elmnt.innerHTML = "Page not found.";}            
                elmnt.removeAttribute("w3-include-html");
                includeHTML();
            }
        }
            xhttp.open("GET", file, true);
            xhttp.send();
            return;
        }
    }
}

includeHTML();

// end include tamplate

// link to 
function redirect(page){
    location.href = page;
}
// end link 

// open camera

function camera(){
    
    const player = document.getElementById("player");
    const captureButton = document.getElementById("capture-button");
    const outputCanvas = document.getElementById("output");
    const context = outputCanvas.getContext("2d");

    captureButton.style = "block";

    navigator.mediaDevices
    .getUserMedia({video:true})
        .then((stream)=>{
            player.srcObject = stream;
        }).catch(error=>{
            console.log("error")
        })

    captureButton.addEventListener('click',function(){
        const imageHeight = player.offsetHeight;
        const imageWidth = player.offsetWidth;

        outputCanvas.width = imageWidth;
        outputCanvas.height = imageHeight;

        context.drawImage(player,0,0,imageWidth,imageHeight);

        const downloadLink = document.createElement('a');
        downloadLink.setAttribute('download','filename.png');

        captureButton.style.display="none";
        player.style.display="none";

        //show save and cancle button
        document.getElementById('save').style.display = "block";
        document.getElementById('cancle').style.display = "block";

        // download img file when press button save
        document.getElementById('save').addEventListener('click',function(){                
            Swal.fire({
                icon : "success",
                title : "Anda Berhasil !",
                html:
                    '<b>Point Anda +10</b> <br> ' +
                    '<div class="text-muted font-size-small mt-3">Selamat anda sudah berhasil absen buat hari ini , nih bonus buat kamu , semagat ya !</div>',
                showCloseButton : true,
                confirmButtonText : "BACK"
            }).then((result)=>{
                if (result.value){
                    redirect('./../../pages/main.html');
                }
            })            
        })
    
    });
}

// end open camera

//change absen pict

function changeAbsenPict(){
    //reload page when cancle pict
    window.location.reload(false);
}

//end absen pict

//register

function registerData(){
    var fd = new FormData();
    var nama = document.getElementById("nama").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    fd.set("nama",nama);
    fd.set("email",email);
    fd.set("password",password);
    return fd;
}

function ijinData(){
    var tgl = new Date();
    var dd = String(tgl.getDate()).padStart(2, '0');
    var mm = String(tgl.getMonth() + 1).padStart(2, '0'); 
    var yyyy = tgl.getFullYear();

    
    var ls = JSON.parse(localStorage.getItem("userdata"));    

    var alasan = document.getElementById("alasanIjin").value;
    var lamahari = document.getElementById("lamaHari").value;
    var tglmulai = tgl = yyyy + '-' + mm + '-' + dd;
    var detail = document.getElementById("detail").value;
    var id_user = ls.user_id;    

    var form = new FormData()
    form.set("alasan_ijin",alasan);
    form.set("lama_hari",lamahari);
    form.set("tgl_mulai",tglmulai)
    form.set("desc",detail)
    form.set("id_user",id_user)

    return form;
}

function cutiData(){
    var tgl = new Date();
    var dd = String(tgl.getDate()).padStart(2, '0');
    var mm = String(tgl.getMonth() + 1).padStart(2, '0'); 
    var yyyy = tgl.getFullYear();

    var ls = JSON.parse(localStorage.getItem("userdata"));

    var namacuti = document.getElementById("namaCuti").value;
    var lamacuti = document.getElementById("lamaCuti").value;
    var mulaicuti = document.getElementById("mulaiCuti").value;
    var detail = document.getElementById("detail").value;
    var tglmulai = tgl = yyyy + '-' + mm + '-' + dd;
    var id_user = ls.user_id;    

    var form = new FormData();
    form.set("nama_cuti",namacuti);
    form.set("lama_cuti",lamacuti);
    form.set("mulai_cuti",mulaicuti);
    form.set("alasan",detail);
    form.set("id_user",id_user);
    form.set("tgl_ajukan",tglmulai);    

    return form;
}


function sendijin(){
    
    var ls = JSON.parse(localStorage.getItem("userdata"));    
    var id_user = ls.user_id;    

    fetch("http://localhost:8000/api/ijin/"+id_user+"",{
        method : "post",
        body : ijinData(),
    })
    .then(res=>{
        return res.json();
    })
    .then(data=>{
        console.log('data anda')
    })
}

function sendcuti(){
    var ls = JSON.parse(localStorage.getItem("userdata"));    
    var id_user = ls.user_id;    

    fetch("http://localhost:8000/api/cuti/"+id_user+"",{
        method : "post",
        body : cutiData(),
    })
    
    console.log('data anda sudah dikirim');
}

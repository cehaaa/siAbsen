function getPage(page) {
    var ajax = new XMLHttpRequest();
    ajax.open("get",page,true);
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            document.getElementById("mainPage").innerHTML = ajax.responseText;      
        }
    }
    ajax.send();
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

    var offline = window.onoffline;

    if(window == offline){
        offlineAlert();
    }else{
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
                outputCanvas.toBlob((blob)=>{
                downloadLink.setAttribute('href',URL.createObjectURL(blob));
                downloadLink.click();
            });
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
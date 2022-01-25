// import
import Products from "../models/ad-Products.js"
import SPServices from "../services/ad-ProServices.js"
import Validation from "../services/Validation.js"

let spServices = new SPServices();
let validation = new Validation();
let mangSP = [];


// Hiển thị sản phẩm
let hienThiTable = (mang) => {
    let content = "";
    for(let food of mang) {
        let {id,name,price,img,type} = food;

        content += `
            <tr>
                <td>${id}</td>
                <td>${name}</td>
                <td>${price} $</td>
                <td>
                    <img src="${img}">
                </td>
                <td>${type}</td>
                <td>
                    <button class="btn btn-danger" onclick="xoaSP('${id}')">Xóa</button>
                    <button class="btn btn-info" onclick="xemSP('${id}')" data-toggle="modal" data-target="#myModal">Xem</button>
                </td>
            </tr>
        `
    }
    document.getElementById("tblDanhSachSP").innerHTML = content;
}

// Lấy dữ liệu từ axios
let layDS = () => {
    spServices.layDSSP()
    .then((result) => {
        hienThiTable(result.data)
    })
    .catch((error) => {
        console.log(error);
    })
}
layDS();

// Set LocalStorage
let setLocal = () => {
    spServices.layDSSP()
    .then((result) => {
        let DSSP = result.data;
        let mangInfoSP = DSSP.map((product) => {
            let infoSP = {
                id: product.id,
                tenSP: product.name,
            }
            return infoSP;
        })
        localStorage.setItem("DSSP",JSON.stringify(mangInfoSP));
    })
    .catch((error) => {
        console.log(error);
    });
    
    if(localStorage.getItem("DSSP") != null) {
        mangSP = JSON.parse(localStorage.getItem("DSSP"));
    }
}
setLocal();

// Click vào button Thêm Mới
document.getElementById("btnThemSP").onclick = () => {
    document.getElementById("tenSP").disabled = false;
    document.getElementById("info__form").reset();
    document.getElementById("btnThem").style.display = "block";
    document.getElementById("btnCapNhat").style.display = "none";
    let Nodelist = document.querySelectorAll(".spanForm");
    for (let span of Nodelist) {
        span.style.display = "none";
    }
    setLocal();
}

// Thêm sản phẩm vào dữ liệu
let themSP = () => {

    let tenSP = document.getElementById("tenSP").value;
    let giaSP = document.getElementById("giaSP").value;
    let screenSP = document.getElementById("screenSP").value;
    let backCam = document.getElementById("backCam").value;
    let frontCam = document.getElementById("frontCam").value;
    let hinhSP = document.getElementById("hinhSP").value;
    let moTaSP = document.getElementById("moTaSP").value;
    let loaiSP = document.getElementById("loaiSP").value;

    let isValid = true;
    isValid = validation.checkEmpty(tenSP,"spanTen","Ô này không được để trống")
    && validation.checkExist(tenSP,"spanTen","Tên sản phẩm không được trùng",mangSP);
    isValid &= validation.checkEmpty(giaSP,"spanGia","Ô này không được để trống")
    && validation.checkPrice(giaSP,"spanGia","Giá sản phẩm phải lớn hơn 0");
    isValid &= validation.checkEmpty(screenSP,"spanScreen","Ô này không được để trống");
    isValid &= validation.checkEmpty(backCam,"spanBack","Ô này không được để trống");
    isValid &= validation.checkEmpty(frontCam,"spanFront","Ô này không được để trống");
    isValid &= validation.checkEmpty(hinhSP,"spanImg","Ô này không được để trống");
    isValid &= validation.checkSelect("loaiSP","spanLoai","Chọn loại sản phẩm");
    isValid &= validation.checkEmpty(moTaSP,"spanMoTa","Ô này không được để trống")
    && validation.checkLength(moTaSP,"spanMoTa","Không được nhập quá 60 ký tự");

    if(isValid) {
        let products = new Products(tenSP,giaSP,screenSP,backCam,frontCam,hinhSP,moTaSP,loaiSP);
        // console.log(products);
        spServices.themProduct(products)
        .then((result) => {
            layDS();
            setLocal();
            document.querySelector("#myModal .close").click();
        })
        .catch((error => {
            console.log(error);
        }))
    }
}
window.themSP = themSP;
document.getElementById("btnThem").onclick = themSP;

// Xóa sản phẩm
let xoaSP = (id) => {
    spServices.xoaProduct(id)
    .then((result) => {
        layDS();
        setLocal();
    })
    .catch((error) => {
        console.log(error);
    })
}
window.xoaSP = xoaSP;

// Xem sản phẩm
let xemSP = (id) => {
    let Nodelist = document.querySelectorAll(".spanForm");
    for (let span of Nodelist) {
        span.style.display = "none";
    }
    setLocal();
        
    spServices.xemProduct(id)
    .then((result) => {
        document.getElementById("btnCapNhat").style.display = "block";
        document.getElementById("btnThem").style.display = "none";

        // Lấy data hiển thị lên form
        let {name,price,screen,backCamera,frontCamera,img,desc,type} = result.data;

        document.getElementById("tenSP").value = name;
        document.getElementById("tenSP").disabled = true;
        document.getElementById("giaSP").value = price;
        document.getElementById("screenSP").value = screen;
        document.getElementById("backCam").value = backCamera;
        document.getElementById("frontCam").value = frontCamera;
        document.getElementById("hinhSP").value = img;
        document.getElementById("moTaSP").value = desc;
        document.getElementById("loaiSP").value = type;
    })
    .catch((error) => {
        console.log(error);
    })
}
window.xemSP = xemSP;

// Cập nhật sản phẩm
let capnhatSP = () => {
    // Lấy thông tin từ form
    let tenSP = document.getElementById("tenSP").value;
    let giaSP = document.getElementById("giaSP").value;
    let screenSP = document.getElementById("screenSP").value;
    let backCam = document.getElementById("backCam").value;
    let frontCam = document.getElementById("frontCam").value;
    let hinhSP = document.getElementById("hinhSP").value;
    let moTaSP = document.getElementById("moTaSP").value;
    let loaiSP = document.getElementById("loaiSP").value;
    let id = "";

    mangSP.map((sp) => {
        if(tenSP == sp.tenSP) {
            return id = sp.id;
        }
    })

    let isValid = true;
    
    isValid = validation.checkEmpty(giaSP,"spanGia","Ô này không được để trống")
    && validation.checkPrice(giaSP,"spanGia","Giá sản phẩm phải lớn hơn 0");
    isValid &= validation.checkEmpty(screenSP,"spanScreen","Ô này không được để trống");
    isValid &= validation.checkEmpty(backCam,"spanBack","Ô này không được để trống");
    isValid &= validation.checkEmpty(frontCam,"spanFront","Ô này không được để trống");
    isValid &= validation.checkEmpty(hinhSP,"spanImg","Ô này không được để trống");
    isValid &= validation.checkSelect("loaiSP","spanLoai","Chọn loại sản phẩm");
    isValid &= validation.checkEmpty(moTaSP,"spanMoTa","Ô này không được để trống")
    && validation.checkLength(moTaSP,"spanMoTa","Không được nhập quá 60 ký tự");

    if(isValid) {
        let products = new Products(tenSP,giaSP,screenSP,backCam,frontCam,hinhSP,moTaSP,loaiSP);
    
        spServices.capnhatProduct(id,products)
        .then((result) => {
            layDS();
            document.querySelector("#myModal .close").click();
        })
        .catch((error) => {
            console.log(error);
        })
    }
}
window.capnhatSP = capnhatSP;
document.getElementById("btnCapNhat").onclick = capnhatSP;

// Search sản phẩm
let searchName = () => {
    let keyword = document.getElementById("inputTK").value;
    spServices.search()
    .then((result) => {
        let mangSearch = [];
        let mangDSSP = result.data;
        let keywordLower = keyword.toLowerCase();
        mangDSSP.map((sp) => {
            let nameLower = sp.name.toLowerCase();
            let indexName = nameLower.indexOf(keywordLower);
            if(indexName > -1) {
                mangSearch.push(sp);
            }
        })
        hienThiTable(mangSearch);
    })
}

document.getElementById("basic-addon2").addEventListener("click",searchName);
document.getElementById("inputTK").addEventListener("keyup",searchName);
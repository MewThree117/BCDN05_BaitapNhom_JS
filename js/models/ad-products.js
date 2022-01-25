export default class Products {
    constructor(tenSP,giaSP,screenSP,backCam,frontCam,hinhSP,moTaSP,loaiSP) {
        this.name = tenSP;
        this.price = giaSP;
        this.screen = screenSP;
        this.backCamera = backCam;
        this.frontCamera = frontCam;
        this.img = hinhSP;
        this.desc = moTaSP;
        this.type = loaiSP;
    }
}

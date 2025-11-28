const imgInput1 = document.getElementById("img1");
const imgInput2 = document.getElementById("img2");
const combineBtn = document.getElementById("combineBtn");
const downloadBtn = document.getElementById("downloadBtn");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let image1 = null;
let image2 = null;

function loadFile(file, callback) {
    const reader = new FileReader();
    reader.onload = () => {
        const img = new Image();
        img.onload = () => callback(img);
        img.src = reader.result;
    };
    reader.readAsDataURL(file);
}

imgInput1.addEventListener("change", () => {
    const file = imgInput1.files[0];
    if (!file) return;

    loadFile(file, (img) => {
        image1 = img;
        checkReady();
    });
});

imgInput2.addEventListener("change", () => {
    const file = imgInput2.files[0];
    if (!file) return;

    loadFile(file, (img) => {
        image2 = img;
        checkReady();
    });
});

function checkReady() {
    combineBtn.disabled = !(image1 && image2);
}

combineBtn.addEventListener("click", () => {
    const width = image1.width + image2.width;
    const height = Math.max(image1.height, image2.height);

    canvas.width = width;
    canvas.height = height;

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(image1, 0, 0);
    ctx.drawImage(image2, image1.width, 0);

    downloadBtn.disabled = false;
});

downloadBtn.addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = "combined.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
});

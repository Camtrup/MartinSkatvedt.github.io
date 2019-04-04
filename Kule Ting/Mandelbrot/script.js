
let MinRe = document.getElementById("MinRe");
let MaxRe = document.getElementById("MaxRe");
let MaxIm = document.getElementById("MaxIm");
let MinIm = document.getElementById("MinIm");

let max = 50;
let a,b,n,z,ca,cb,aa,bb;

function setup() {
  createCanvas(500,500);
  pixelDensity(1);
  frameRate(1);

}



function draw() {
  loadPixels();

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      a = map(x, 0, width, Number(MinRe.value),  Number(MaxRe.value));
      b = map(y , 0, height, Number(MinIm.value), Number(MaxIm.value));

      n = 0, z = 0;
      ca = a, cb = b;

      while (n < max) {
        aa = (a * a) - (b * b);
        bb = 2 * a * b;
        a = aa + ca;
        b = bb + cb;
        if (abs(a + b) >= 2) break;
        n++;
      }

      let bright = map(n, 0, max, 100, 255);
      if (n == max) bright = 0;

      let pix = (x + y * width) * 4;
      pixels[pix + 0] = bright;
      pixels[pix + 1] = bright;
      pixels[pix + 2] = bright;
      pixels[pix + 3] = 255;
    }
  }
  updatePixels();
}

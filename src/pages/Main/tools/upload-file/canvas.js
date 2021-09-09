// createImage() {
//   return new Promise((resolve, reject) => {
//     let bgImage = new Image();
//     bgImage.setAttribute("crossOrigin", 'Anonymous')
//     // bgImage.src = this.userDetail.photo[0];
//     bgImage.src = "http://bfile.frees.fun/roleAuth/76b3ff91111611ecb66d88d7f679e379.jpg";
//     let bgW = null;
//     let bgH = null;
//     bgImage.onload = () => {
//       bgW = bgImage.naturalWidth;
//       bgH = bgImage.naturalHeight;
//       const canvas = document.createElement("canvas");
//       canvas.width = bgW;
//       canvas.height = bgH;
//       document.body.appendChild(canvas)
//       const ctx = canvas.getContext("2d");
//       ctx.drawImage(bgImage, 0, 0, bgW, bgH);
//       ctx.fillStyle = "#C3A698";
//       ctx.font = "20px Arial";
//       ctx.fillText('ddd', 180, 70);

//       ctx.fillStyle = "#E1CC87";
//       ctx.font = "32px Arial";
//       ctx.fillText('ddd', 300, 590);

//       ctx.fillStyle = "#E1CC87";
//       ctx.font = "32px Arial";
//       ctx.fillText(`为粉贝`, 270, 640);

//       ctx.fillStyle = "#60361E";
//       ctx.font = "20px Arial";
//       ctx.fillText('dsdsfsadf', 440, 1198);
//       let finallyImg = canvas.toDataURL('image/jpg');
//       let img = new Image();
//       img.src = finallyImg;
//       canvas.remove();
//       resolve(finallyImg)
//     }
//   })
// },
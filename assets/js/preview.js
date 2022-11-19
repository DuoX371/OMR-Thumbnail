
  let canvas, ctx;
  function drawImage(){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    
    const theBG = new Image();
    theBG.src = beatmapImage === undefined ? `https://t3.ftcdn.net/jpg/04/21/50/96/360_F_421509616_AW4LfRfbYST8T2ZT9gFGxGWfrCwr4qm4.jpg` : beatmapImage;
    beatmapObj.bg = theBG.src;
    theBG.onload = function () {
      ctx.drawImage(theBG, 0, 0, canvas.width, canvas.height);
      // Draw base images
      const base_image = new Image();
      base_image.src = 'assets/image/bg.png';
      base_image.onload = function(){
        ctx.drawImage(base_image, 0, 0, canvas.width, canvas.height);
        // Draw text
        ctx.fillStyle = 'white';
        // bottom left
        const username = $('#username').val();
        const acc = $('#accuracy').val();
        const pp = $('#pp').val();
        drawText(username, canvas.width/2, canvas.height-15, 'center', `bold 20px Arial`);
        if(acc) drawText(parseFloat(acc).toFixed(2)+'%', 10, canvas.height-15, 'left', `bold 18px Arial`);
        const status = $('input[type=radio][name=ppRadio]:checked').val();
        if(status === 'loved') drawText('LOVED', 10, canvas.height-35, 'left', `bold 20px Arial`);
        else if(status === 'ranked') drawText(parseInt(pp)+'PP', 10, canvas.height-35, 'left', `bold 20px Arial`);
        else if (status === 'unranked') drawText('--', 10, canvas.height-35, 'left', `bold 20px Arial`);

        // Draw mode
        const arr = ['osu','mania','taiko','fruits'];
        if(arr.includes($('#gamemode').val())){
          const mode_image = new Image();
          mode_image.src = `assets/image/${$('#gamemode').val()}.png`;
          mode_image.onload = function(){
            ctx.drawImage(mode_image, 398, 5, 33, 33);
          }
        }
        // Draw Mods
        const mods = $('#mods option:selected').toArray().map(item => item.value);
        for(let i = 0; i < mods.length; i++){
          const mod_image = new Image();
          mod_image.src = modSource(mods[i]);
          mod_image.onload = function(){
            ctx.drawImage(mod_image, 10+(i*30), canvas.height-68, mod_image.width/4.3, mod_image.height/4.3);
          }
        }

        // draw twitch
        if($('#twitch').prop('checked')){
          const twitch_image = new Image();
          twitch_image.src = 'assets/image/live on top left.png';
          twitch_image.onload = function(){
            // Draw on top left
            ctx.drawImage(twitch_image, 8, 0, twitch_image.width/4, twitch_image.height/4);
          }
        }
      }
    }
  }

  function drawText(text,centerX,centerY,textAlign,font){
    ctx.save();
    ctx.font = font;
    ctx.textAlign=textAlign;
    ctx.textBaseline='middle';
    ctx.fillText(text,centerX,centerY);
    ctx.restore();
  }

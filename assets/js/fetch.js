$(document).ready(function() {
  $('form').submit(async function(e) {
    e.preventDefault();
    var url = $('#url').val();
    if(url === '') return;
    const regex = /^(https?:\/\/)?osu.ppy.sh\/scores\/(osu|taiko|fruits|mania)\/([0-9]+)$/
    if(!regex.test(url)) return errorPop('Invalid url');
    // API Call
    //Disable search button
    $('button').addClass('disabled');
    $('.spinner-border').removeClass('d-none');
    const head = `https://api.yewonkim.tk/scores?url=${url}`
    const res = await $.ajax({
      url: head,
      type: 'GET',
      success: function(data) {
        if(data.code === 200){
          const score = data.data;
          // beatmapImage = `https://assets.ppy.sh/beatmaps/${score.beatmap.beatmapset_id}/covers/fullsize.jpg`
          beatmapImage = `https://subapi.nerinyan.moe/bg/${score.beatmap.beatmapset_id}`
          $('#username').val(score.user.username)
          $('#pp').val(score.pp)
          $('#accuracy').val(score.accuracy*100)
          $('#gamemode').val(score.beatmap.mode)
          const checkLoved = score.beatmap.status === 'loved' ? true : false;
          if(checkLoved) $('#loved').prop('checked', true).trigger('change');
          const mods = score.mods.map(mod => mod.acronym)
          if(mods.length === 0) mods.push('NM')
          const multiSelectInstance = mdb.Select.getInstance(document.querySelector('#mods'));
          multiSelectInstance.setValue(mods);
          beatmapObj.username = score.user.username
          beatmapObj.pp = score.pp
          beatmapObj.accuracy = score.accuracy*100
          beatmapObj.gamemode = score.beatmap.mode
          beatmapObj.mods = mods
          beatmapObj.loved = checkLoved
          drawImage()
        }
      },
      error: function(err) {
        errorPop(err.responseJSON.message);
      }
    });
    $('button').removeClass('disabled');
    $('.spinner-border').addClass('d-none');
  })
})
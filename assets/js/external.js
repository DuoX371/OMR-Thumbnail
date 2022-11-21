function errorPop(text){
  return Swal.fire({
    position: 'top-end',
    icon: 'error',
    title: text,
    showConfirmButton: false,
    timer: 1500
  })
}

function modSource(mod){
  switch(mod){
    case 'NM':
      return 'assets/image/nomod.png';
    case 'HR':
      return 'assets/image/hardrock.png';
    case 'HD':
      return 'assets/image/hidden.png';
    case 'DT':
      return 'assets/image/doubletime.png';
    case 'NC':
      return 'assets/image/nightcore.png';
    case 'NF':
      return 'assets/image/nofail.png';
    case 'FL':
      return 'assets/image/flashlight.png';
    case 'EZ':
      return 'assets/image/easy.png';
    case 'HT':
      return 'assets/image/halftime.png';
    case 'SD':
      return 'assets/image/suddendeath.png';
    case 'PF':
      return 'assets/image/perfect.png';
  }
}

function resetJcrop(){
  JcropApi = $('#previewUpload').data('Jcrop');
  if(JcropApi !== undefined) JcropApi.destroy();
}
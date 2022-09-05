exports.getFileBasePathByMimeType = mimetype => {
  let storagePath = '';
  switch(mimetype.split('/')[0]) {
    case 'video':
      storagePath = 'videos';
      break;
    case 'image':
    default:
      storagePath = 'images';
  }
  return storagePath;
}
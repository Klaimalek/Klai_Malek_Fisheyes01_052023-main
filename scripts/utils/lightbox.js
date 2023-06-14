/*var mediaediaId;
const lightBoxBlock = document.getElementById('lightBox');
const lightboxContent = document.querySelector('.lightBox-content');
const btnClose = document.getElementById('lightbox__close');
const nextMedia = document.getElementById('link__next__media');
const previousMedia = document.getElementById('link__previous__media');
const linkMedia = Array.from( document.querySelectorAll('a'));

//------------------openLightbox---------------------------------

function openLightbox(id) {
  displayMediaLightbox(id);
  lightBoxBlock.style.display = 'block';
}
//--------------------closeLightbox---------------------------------
btnClose.addEventListener('click', closeLightBox);
function closeLightBox() {
  lightBoxBlock.style.display = 'none';
  btnClose.focus();
}
// ----------placer l'iamge dans le conteneur lightbox-------------------
function displayMediaLightbox(id) {
  const media = document.querySelector(`[data-id='${id}']`);
  const mediaClone = media.cloneNode();
  if (media.nodeName == 'VIDEO') {
    mediaClone.setAttribute('controls', true);
  }
  lightboxContent.innerHTML = '';
  mediaClone.setAttribute('tabindex', '0');

  lightboxContent.appendChild(mediaClone);
  mediaClone.focus();
}

//------------------sliding media -----------------------------------------

// Recherche quelle media afficher
function changeMediaLightBox(index) {
  let indexListMedia = listMediaId.findIndex(
    (id) => id == lightboxContent.firstChild.dataset.id
  );
 
  if (indexListMedia + index < 0) {
    indexListMedia = listMediaId.length - 1;
  } else if (indexListMedia + index == listMediaId.length) {
    indexListMedia = 0;
  } else {
    indexListMedia += index;
  }
  displayMediaLightbox(listMediaId[indexListMedia]);
}
// ------------------ajout les events aux fleches de lightbox-----------

nextMedia.addEventListener('click',changeMediaLightBox(1));
previousMedia.addEventListener('click',changeMediaLightBox(-1));*/
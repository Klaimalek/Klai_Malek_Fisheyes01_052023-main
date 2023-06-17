(async function main() {
  await setDataProfil();
  manageLikes();
  displayDropdownFilter();
  handleSortMedia();
  initLightbox();
})();
var media = null;
var totalLikeCount = 0;
var listMediaId = [];
function urlGetParams(url) {
  let resultat = url.search;
  return resultat.substring(4);
}
//récupération des données
async function setDataProfil() {
  const idPhotoghrapher = urlGetParams(document.location);
  let response = await fetch('../data/photographers.json');
  if (!response.ok) {
    return 'error';
  }
  let data = await response.json();
  let photographer = data.photographers.find(
    (element) => element.id == idPhotoghrapher
  );

  media = data.media.filter((m) => m.photographerId == idPhotoghrapher);
  // récupérer les id des medias et mettre dans un tableau
  media.forEach((element) => {
    listMediaId.push(element.id);
  });
  console.log(listMediaId);
  setDataElement(photographer, media);
}
// display les données poor le photographer et media
function setDataElement(photographer, media) {
  setProfilPhotgrapher(photographer);
  setMedia(media);
  setSummeryGphotographer(photographer, media);
}

//Mettre info dans la presentation du photographe
function setProfilPhotgrapher(photographer) {
  document.getElementById('namePhotographer').innerText = photographer.name;
  document.getElementById(
    'photohrapherLocation'
  ).innerText = `${photographer.city}, ${photographer.country}`;
  document.getElementById('photographerTagligne').innerText =
    photographer.tagline;

  document.getElementById(
    'photographerImg'
  ).src = `assets/photographers/${photographer.portrait}`;
  // dispaly le nom et le prénom de phptpgraphe dans la modale contacte me
  const namePhptographerModal = document.getElementById('name-photogrpager-modale');
  namePhptographerModal.innerText=`${photographer.name}`;
  const modal = document.getElementById('contact_modal');
  modal.setAttribute('aria-label', 'contact me ' + `${photographer.name}`);
}

// display les medias

function setMedia(media) {
  const galleryMedia = document.querySelector('#profil__media');
  media.forEach((element) => {
    let media = mediaFactory(element);
    let article = media.getCardMedia();
    galleryMedia.innerHTML += article;
  });
  let listMedia = galleryMedia.childNodes;
  console.log(listMedia);
}

//mettre les données dans le bloc rouge

function setSummeryGphotographer(photographer, media) {
  const blocSummery = document.querySelector('#summery');
  let medias = summeryFactory(photographer);
  let div = medias.getCardBloc(photographer);
  blocSummery.innerHTML += div;
}

function summeryFactory(photographer) {
  getCardBloc(photographer);
  return { getCardBloc };
}

function getCardBloc(photographer) {
  const totalLike = document.querySelectorAll('.favorite');
  totalLikeCount = 0;
  totalLike.forEach((media) => {
    totalLikeCount += Number(media.textContent);
  });
  //console.log(totalLikeCount);
  const blocPhotographer = `
            <div id ="likesTotal" class="totalLikes"> ${totalLikeCount}    
            </div>
            <i class="fa-sharp fa-solid fa-heart"></i>
            <div class="pricePhotographer"> ${photographer.price} €/ jour</div>
          `;
  return blocPhotographer;
}
function manageLikes() {
  const btnLikes = document.getElementsByClassName('favorite');
  for (let btnLike of btnLikes) {
    btnLike.addEventListener('click', incrementLike);
  }
}
function incrementLike(event) {
  let parentElement = event.target.parentNode;
  let likeElement = parentElement.firstElementChild;
  let likeNumber = parseInt(likeElement.textContent);
  let HeartEmpty = likeElement.nextElementSibling;
  let HeartNotEmpty = HeartEmpty.nextElementSibling;
  let likes = document.getElementById('likesTotal');
  console.log(likes);
  if (parentElement.classList.contains('liked')) {
    likeNumber -= 1;
    likeElement.innerText = likeNumber;
    HeartEmpty.style.display = 'block';
    HeartNotEmpty.style.display = 'none';
    totalLikeCount -= 1;
    likes.innerHTML = totalLikeCount;
  } else {
    likeNumber += 1;
    likeElement.innerText = likeNumber;
    HeartEmpty.style.display = 'none';
    HeartNotEmpty.style.display = 'block';
    totalLikeCount += 1;
    likes.innerHTML = totalLikeCount;
  }
  parentElement.classList.toggle('liked');
}

// récupération de nobre total par id et ajouter +1

//------------------selection des options pour faire le tri ---------------------------
function displayDropdownFilter() {
  //récupérer les éléments de la liste déroulante
  const elementsDropdown = document.querySelectorAll('.dropdown');
  const chevron = document.getElementsByClassName('dropdown__chevron')[0];

  window.addEventListener('click', () => {
    elementsDropdown.forEach((elt) => {
      elt.classList.remove('active');
      chevron.classList.add('.active');
    });
  });

  elementsDropdown.forEach((elt) => {
    const btnValue = elt.querySelector('.dropdown-button');
    // dropdownInput  c'est la div qui englode les options
    const dropdownInput = elt.querySelector('.dropdown-input');
    // dropdownPanelOptions c'est le li de la liste
    const dropdownPanelOptions = elt.querySelectorAll('.dropdown-round ul li');
    dropdownInput.addEventListener('click', (event) => {
      event.stopPropagation();
      elt.classList.toggle('active');
    });
    dropdownPanelOptions.forEach((dropdownPanelOptionItem) => {
      dropdownPanelOptionItem.addEventListener('click', () => {
        dropdownInput.querySelector('input').value =
          dropdownPanelOptionItem.innerHTML;
        btnValue.value = dropdownPanelOptionItem.getAttribute('data-value');
      });
    });
  });
}
//------------------------------- trier-------------------------------------------
function handleSortMedia() {
  const sortPopularity = document.getElementById('popular');
  const sortDate = document.getElementById('date');
  const sortTitle = document.getElementById('title');
  sortPopularity.addEventListener('click', (e) => {
    functionSort(e.target);
  });

  sortDate.addEventListener('click', (e) => {
    functionSort(e.target);
  });
  sortTitle.addEventListener('click', (e) => {
    functionSort(e.target);
  });
}
function functionSort(data) {
  totalLikes = 0;
  document.getElementsByClassName('totalLikes').textContent;
  let resultSort = [];
  console.log(data.id);
  if (data.id == 'title') {
    let resultSort = media.sort((a, b) => a.title.localeCompare(b.title));
    //console.log(resultSort);
  } else if (data.id == 'date') {
    let resultSort = media.sort((a, b) => new Date(b.date) - new Date(a.date));
    //console.log(resultSort);
  } else {
    resultSort = media.sort((a, b) => b.likes - a.likes);
    console.log(resultSort);
  }
  const galleryConteneur = document.getElementById('profil__media');
  galleryConteneur.innerHTML = ''; // vider l'ancien conteneur pour afficher la nouvelle liste de media

  setMedia(media);
  initLightbox();
  manageLikes();
}
//---------------------------------lightbox--------------------------------------


//------------------openLightbox---------------------------------

function initLightbox() {
  const linkMedia = Array.from(document.getElementsByClassName('media__link'));
  const btnClose = document.getElementById('lightbox__close');
  const nextMedia = document.getElementById('link__next__media');
  const previousMedia = document.getElementById('link__previous__media');
  btnClose.addEventListener('click', closeLightBox);
  linkMedia.forEach(function (media) {
    media.addEventListener('click', openLightbox);
  });
  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' || e.key === 'Esc') {
      closeLightBox(e);
    }
  });
  nextMedia.addEventListener('click', function () {
    slidingLightBox(1);
  });
  previousMedia.addEventListener('click', function () {
    slidingLightBox(-1);
  });
  slidingClavier()
}

function openLightbox(event) {
  const id = event.target.getAttribute('data-id');
  const lightBoxBlock = document.getElementById('lightBox');
  const btnClose = document.getElementById('lightbox__close');
  displayMediaLightbox(id);
  lightBoxBlock.style.display = 'block';
  btnClose.focus();
}
//--------------------closeLightbox---------------------------------

function closeLightBox() {
  const lightBoxBlock = document.getElementById('lightBox');
  lightBoxBlock.style.display = 'none';
  lightBoxBlock.focus();
}

// ----------placer l'image dans le conteneur lightbox-------------------
function displayMediaLightbox(id) {
  const mediaModel = document.querySelector(`[data-id='${id}']`);
  const mediaClone = mediaModel.cloneNode();
  console.log(mediaModel);
  const lightboxContent = document.querySelector('.lightBox-content');
  const titleMedia = document.getElementsByClassName('title-lightbox');
  if (mediaModel.nodeName == 'VIDEO') {
    titleMedia[0].innerText = mediaModel.title;
    mediaClone.setAttribute('controls', true);
    // Création source
    const videoSource = document.createElement('source');
    if (mediaModel.firstElementChild != null) {
      videoSource.src = mediaModel.firstElementChild.src;
      videoSource.type = mediaModel.firstElementChild.type;
    }
    //mediaClone.src = mediaModel.outerHTML;
    mediaClone.appendChild(videoSource);
  }
  lightboxContent.innerHTML = '';
  //mediaClone.setAttribute('tabindex', '0');
  lightboxContent.appendChild(mediaClone);
  if (mediaModel.nodeName != 'VIDEO') {
    titleMedia[0].innerText = mediaModel.alt;
  }
}

//------------------sliding media -----------------------------------------

function slidingLightBox(index) {
  const lightboxContent = document.querySelector('.lightBox-content');
  if (listMediaId.length > 0) {
    let indexListMedia = listMediaId.findIndex(
      (id) => id == lightboxContent.firstChild.dataset.id
    );
    console.log(indexListMedia);
    if (indexListMedia + index < 0) {
      indexListMedia = listMediaId.length - 1;
    } else if (indexListMedia + index == listMediaId.length) {
      indexListMedia = 0;
    } else {
      indexListMedia += index;
    }

    displayMediaLightbox(listMediaId[indexListMedia]);
  }
}

// la navigation lightbox avec les flèches du clavier
function slidingClavier(){
document.addEventListener('keydown', (event) =>{
  const lightBoxBlock = document.getElementById('lightBox');
  const isLightboxActive = () => lightBoxBlock.style.display !== 'none';
  const key = event.key;

  if (isLightboxActive ) {
      switch (key) {
        case 'ArrowRight':
          slidingLightBox(1);
          break;
        case 'ArrowLeft':
          slidingLightBox(-1);
          break;
        default:
      }
    }
});
}
function mediaFactory(data) {
  let type = data.video ? 'video' : 'image';

  function getCardMedia() {
    let element;
    if (type == 'image') {
      element = `<img class="img_Media" src=assets/media/${data.photographerId}/${data.image} alt="${data.title}" data-id=${data.id}></img>`;
    } else if (type == 'video') {
      console.log(data.video);
      console.log(data.photographerId);
      element = `<video class="video_Media" preload="metadata" data-id='${data.id}' title="${data.title}"= controls>
        <source src="/assets/media/${data.photographerId}/${data.video}#t=0.1" type="video/mp4">
        </source>
        </video>`;
    }
   //#t=0.1 pour que le video s'affiche sur saffari
    const articleMedia = `
                <article class="media" >
                  <a href="#" class="media__link" data-id=' ${data.id}' >
                    ${element}
                  </a>
                  <div class="infoMedia">
                    <h3 class= "titleMedia">${data.title}</h3>
                    <button class="favorite"> 
                    <span id="${data.id}" class="number"> ${data.likes}</span>
                    <i class="fa-regular fa-heart" id="heartVide" aria-label="dislike"></i>
                    <i class="fa-solid fa-heart" id="heart" aria-label="likes"></i>
                   </button>
                  </div>
                </article>
              `;
    return articleMedia;
  }

  return { type, getCardMedia };

}

// -----------------fonction incrémentation de likes----------


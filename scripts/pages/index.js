async function getPhotographers() {
  // Récupèrer les données json grace à la méthode fetch
  const res = await fetch('./data/photographers.json');
  if (res.ok) {
    const data = await res.json();
    return data;
  } else {
    return 'erreur';
  }
}
//pour afficher les données dans le console
console.log(getPhotographers());

async function displayData(photographers) {
  const photographersSection = document.querySelector('.photographer_section');

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();

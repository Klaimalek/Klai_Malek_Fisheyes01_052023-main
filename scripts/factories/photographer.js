function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price,id } = data;

    const picture = `assets/photographers/${portrait}`;
    const pricePhotoghrapher = `${price}€/jour`;
    const PhotographerLocation = `${city}, ${country}`;
    const linkPhotographer = `photographer.html?id=${id}`;
    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const link = document.createElement('a');
        link.setAttribute('href',linkPhotographer );
        const img = document.createElement( 'img' );
        img.setAttribute('src', picture)
        img.setAttribute('alt',name)
        const h2 = document.createElement( 'h2' );
        h2.setAttribute('class','namePhotographer');
        const description = document.createElement('div');
        description.setAttribute('class','CardPhotographer');
        const location = document.createElement('p');
        location.setAttribute('class','location');
        const targlinePhotographer = document.createElement('p');
        targlinePhotographer.setAttribute('class','tagline');
        const priceDay = document.createElement('p');
        priceDay.setAttribute('class','priceDay');
        h2.textContent = name;
        location .textContent = PhotographerLocation;
        targlinePhotographer.textContent = tagline;
        priceDay. textContent = pricePhotoghrapher;
        link.appendChild(img);
        article.appendChild(link);
        link.appendChild(h2);
        description.appendChild(location);
        description.appendChild(targlinePhotographer);
        description.appendChild(priceDay);
        article.appendChild(description);
        return article;
    }
    return { name, picture, getUserCardDOM }
}


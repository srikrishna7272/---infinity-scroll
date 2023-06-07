const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded =0;
let totalImages = 0;
let photosArray = [];
// unsplash api
const count = 30;
const apiKey = 'kEjhLK6qpU_XmbiW_GkTzVxhF5m_A8l_MfueeCv0flQ';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//check if all images were loaded
function imageLoaded(){
    console.log('image loaded');
    imagesLoaded++;
    
    if(imageLoaded === totalImages){
        ready = true;
        loader.hidden = true;
        
    }
}

//helper function to set attributes on DOM elements

function setAttributes(element, attributes) {
    for(const key in attributes){
        element.setAttribute(key,attributes[key]);
    }
}

// create elements for links & photos, add to DOM

function displayPhotos(){
    imageLoaded = 0;
    totalImages = photosArray.length;
    console.log('total images ', totalImages);
    photosArray.forEach((photo) => {
        // create <a> to link to unsplash
        const item = document.createElement('a');
        setAttributes(item,{
            href:photo.links.html,
            target: '_blank',
        });
        const img = document.createElement('img');
        
        setAttributes(img,{
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        //Event listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);
        //put image inside anchor, then put both inside imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item);

    });
}
// Get photos from unspash api

async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    }catch(error){

    }

}

//check to see if scrolling near bottom of page, load more photos

window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});

getPhotos();
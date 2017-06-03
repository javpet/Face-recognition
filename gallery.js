var imageGallery;
var imageList = [
    "images/image_1.jpg",
    "images/image_2.jpg",
    "images/image_3.jpg"
]

window.onload = function(){
    imageGallery = createGallery(imageList);
    trackAllImages(imageGallery);
}

function trackImage(image){
    image.addEventListener("load", function(){
        var tracker = new tracking.ObjectTracker(["face", "eye", "mouth"]);
        tracker.setStepSize(1.7);
        tracking.track(image,tracker);
        tracker.on("track", function(event){
            event.data.forEach(function(box){
                window.plotBox(image, box.x, box.y, box.width, box.height);
            })
        })
    })
}

function trackAllImages(imageArray) {
    imageArray.forEach(function(image){
        trackImage(image);
    })
}

function createImage(src){
    var image = document.createElement("img");
    var div = document.createElement("div");
    div.classList.add("image-container");
    image.src = src;
    div.appendChild(image);
    document.body.appendChild(div);
    return image;
}

function createGallery(images){
    var imageObjects = [];
    images.forEach(function(image) {
        var imageobject = createImage(image);
        imageObjects.push(imageobject);
    })

    return imageObjects;
}


// Plot box over the image where the face found
function plotBox(element, x, y, w, h) {
    var box = document.createElement("div");
    element.parentNode.appendChild(box);
    box.classList.add("feature");
    box.style.width = w + "px";
    box.style.height = h + "px";
    box.style.left = (element.offsetLeft + x) + "px";
    box.style.top = (element.offsetTop + y) + "px";

}

var resizeTimer;
window.onresize = function(){
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout("retrackAllImages(imageGallery)", 500);
}

function retrackAllImages(imageArray){
    imageArray.forEach(function(image){
        image.dispatchEvent(new Event("load"));
    })
}

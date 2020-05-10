var apiKey = '{{YOUR_KEY_HERE}}';
var map;
var marker = '';
var predictions = [];
var mapElement = document.getElementById('map');
var findAddress = document.getElementById('findAddress');
var ulAddressEl = document.querySelector('#adressListUl');
var addressListDiv = document.querySelector('.main__addressListDiv');
var btnSubmit = document.getElementById('form');

var locationBrazil = {
    lat: -14.235004, lng: -51.92528
};

function initMap() {
  map = new google.maps.Map(mapElement, {
    center: locationBrazil,
    zoom: 4
  });
}

function getPredictions() {   
    predictions = []; 
    var inputObject = {
        input: findAddress.value
    };
    
    var googleAutoComplete = new google.maps.places.AutocompleteService();
    
    googleAutoComplete.getQueryPredictions(inputObject, function(results, status) {
        if(status === google.maps.places.PlacesServiceStatus.OK) {
            results.map(result => predictions.push(result));
            getGeocode(predictions[0].description, pointInMap);
            populatePredList(predictions);
        }
    });
}

function populatePredList(predictions) {

    addressListDiv.innerHTML = '';
    addressListDiv.insertAdjacentHTML('beforeend',
    `
        <ul class="main__addressListUl" id="adressListUl">
        </ul>
    `);

    var addressListUl = document.querySelector('.main__addressListUl');

    predictions.map((predition, i) => {
        addressListUl.insertAdjacentHTML('beforeend',`
            <li class="main__addressListLi ${i === 0 ? 'main__addressListLi-Highlight' : '' }" >
                <img class="main__addressListLi-img" src="assets/pin.png" />
                
                <span class="main__addressListLi-description">
                    ${predition.description}
                </span>
            </li>
        `);
    });

    addressListUl.childNodes.forEach(node => node.addEventListener('click', (e) =>  addressClick(e, node.textContent, pointInMap)));
}

function addressClick(e, address, pointInMap) {
    setHighlight(e);
    getGeocode(address, pointInMap);
}

function setHighlight(e) {
    var oldHighLighted = document.querySelector('.main__addressListLi-Highlight');
    if(!oldHighLighted) {
        return;
    }
    oldHighLighted.classList.remove('main__addressListLi-Highlight');
    
    var selectedAddress = e.target.tagName === "LI" ? e.target : e.target.parentElement;
    selectedAddress.classList.add('main__addressListLi-Highlight');
}

function pointInMap(location) {
    if(marker !== '') {
        marker.setMap(null);
    }
    var data = JSON.parse(location);

    marker = new google.maps.Marker({
        position: data.results[0].geometry.location,
        map: map,
    });

    map.setCenter(data.results[0].geometry.location);
    map.setZoom(15);
    info(data.results[0].formatted_address);
}

function info(location) {
    var info = new google.maps.InfoWindow({
        content: location
    });
    info.open(map, marker);
}

function getGeocode(address, resolve) {

    var xhr = new XMLHttpRequest();
    
    xhr.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
            if(this.status === 200){
                resolve(this.responseText);
            }else{
                alert("Erro ao realizar requisição, tente novamente.");
                console.log("Erro ao realizar requisição, tente novamente.");
            }
        }

    });
    
    xhr.open("GET", `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`);
    
    xhr.send();
}

btnSubmit.addEventListener('submit', e => {
    e.preventDefault(); 
    getPredictions();
});
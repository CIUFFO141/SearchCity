
// collegamento con HTML

let search = document.querySelector('#search');
let cancel = document.querySelector('#canc');

search.addEventListener('click', () => {
    let input = document.querySelector('#city');
    getCity(input.value)
})

cancel.addEventListener('click', () => {
    let input = document.querySelector('#city');
    input.value = '';
})

// fetch API

const options = {
    headers: {'Content-Type': 'application/json',},
};

function getCity(city){
    const Url = 'https://api.teleport.org/api/' ;

    fetch(Url, options)
    .then(result=> {
        return result.json();
    })
    .then(result => {
        let data = result['_links']['city:search']['href'];
        data = data.replace(/{.*}/,'');
        data = data + "?search=" + city + "&limit=1";
        Geoname(data)

    })
    .catch(error =>{
        console.error('si è verificato un errore durante la richiesta :', error.message)
    });
};

function Geoname(data){
    fetch(data, options)
    .then(result=> {
        return result.json();
    })
    .then(result => {
        let datiCity = result['_embedded']['city:search-results'][0]['_links']['city:item']['href']
        UrbanArea(datiCity)
    })
    .catch(error =>{
        console.error('si è verificato un errore durante la richiesta :', error.message)
    })
};

function UrbanArea (url){

    fetch(url, options)
    .then(result=> {
        return result.json();
    })
    .then(result => {
        let datiUrban = result['_links']['city:urban_area']['href']
        datiFinal(datiUrban)
    })
    .catch(error =>{
        console.error('si è verificato un errore durante la richiesta :', error.message)
    })
};

function  datiFinal(url){

    fetch(url, options)
    .then(result=> {
        return result.json();
    })
    .then(result => {
        let img = result['_links']['ua:images']['href']
        let scores = result['_links']['ua:scores']['href']
        getimg(img);
        getScores(scores);
    })
    .catch(error =>{
        console.error('si è verificato un errore durante la richiesta :', error.message)
    })
};

function getimg(url){
    fetch(url, options)
    .then(result=> {
        return result.json();
    })
    .then(result => {
        let img = result['_links']['self']['href'];
        backImg(img);
    })
    .catch(error =>{
        console.error('si è verificato un errore durante la richiesta :', error.message)
    })
}

function backImg(url){
    fetch(url, options)
    .then(result=> {
        return result.json();
    })
    .then(result => {
        let img = result['photos'][0]['image']['mobile'];
        console.log(img)
    })
    .catch(error =>{
        console.error('si è verificato un errore durante la richiesta :', error.message)
    })
}

function getScores(url){
    fetch(url, options)
    .then(result=> {
        return result.json();
    })
    .then(result => {
        let scores = result['categories']
        console.log(scores)
    })
    .catch(error =>{
        console.error('si è verificato un errore durante la richiesta :', error.message)
    })
}
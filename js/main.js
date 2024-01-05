function getimg(url){
    let  options = { headers: {'Content-Type': 'application/json'}, mode: "cors" };

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

    let  options = { headers: {'Content-Type': 'application/json'}, mode: "cors" };

    fetch(url, options)
    .then(result=> {
        return result.json();
    })
    .then(result => {
        let img = result['photos'][0]['image']['mobile'];
        document.querySelector('.contimg>img').src = img;
    })
    .catch(error =>{
        console.error('si è verificato un errore durante la richiesta :', error.message)
    })
}

function getScores(url, callback){
    const  options = { headers: {'Content-Type': 'application/json'}, mode: "cors" };

    fetch(url, options)
    .then(result=> {
        return result.json();
    })
    .then(result => {
        let summary = result['summary'];    
        let CitySCore = result['teleport_city_score'];

        document.querySelector('.totscore').innerHTML = 'Total Score : ' +  Math.round(CitySCore);
        document.querySelector('.summary').innerHTML = summary;

        let score = result['categories']                                                                                      
        callback(score)
        
    })
    .catch(error =>{
        console.error('si è verificato un errore durante la richiesta :', error.message)
    })
}

function createBox(){
    
    const body = document.querySelector('body');
    
    const container = document.getElementById('containerCity');
    const containerTot = document.createElement('div')
    const contImg = document.createElement('div');
    const img = document.createElement('img');                                       
    const contCity = document.createElement('div');
    const city = document.createElement('h1');
    const coordinate = document.createElement('div');
    const coolati = document.createElement('p');
    const coolongi= document.createElement('p');
    const totscore = document.createElement('p')
    const contBar = document.createElement('div');
    const Progress = document.createElement('div');
    const ProgressBar = document.createElement('div')
    const summary = document.createElement('div');
    
    containerTot.className = ('containerTot');
    contImg.className = ('contimg');
    contCity.className = ('contcity');
    city.className = ('city');
    coordinate.className = ('coordinate');
    coolati.className = ('latitudine');
    coolongi.className = ('longitudine');
    contBar.className = ('contScore');
    scores.className = ('scores')
    summary.className = ('summary');
    totscore.className = ('totscore')
    
    body.appendChild(container);
    container.appendChild(containerTot);
    containerTot.appendChild(contImg);
    containerTot.appendChild(contCity);
    containerTot.appendChild(contBar);
    contBar.appendChild(Progress)
    contBar.appendChild(ProgressBar)
    container.appendChild(summary);
    contImg.appendChild(img);
    contCity.appendChild(city);
    contCity.appendChild(coordinate);
    coordinate.appendChild(coolati);
    coordinate.appendChild(coolongi); 
    coordinate.appendChild(totscore)   

};

let search = document.querySelector('#search');
let cancel = document.querySelector('#canc');
let input = document.querySelector('#city');

search.addEventListener('click', () => {
    generateContainer(input.value);
});

input.addEventListener('keyup', (event) => {
    if(event.key === 'Enter'){
        generateContainer(input.value);
    }
});

cancel.addEventListener('click', () => {
    let input = document.querySelector('#city');
    input.value = '';
    container.innerHTML= '';
});

function generateContainer(city){

    createBox();

    const url = 'https://api.teleport.org/api/' ;
    const  options = { headers: {'Content-Type': 'application/json'}, mode: "cors" };

    fetch(url, options )
    .then(result=> {
        return result.json();
    })
    .then(result => {
        let data = result['_links']['city:search']['href'];
        data = data.replace(/{.*}/,'');
        data = data + "?search=" + city + "&limit=1";

        fetch(data, options)
        .then(result => {
            return result.json();
        })
        .then(result => {
            let cityData = result['_embedded']['city:search-results'][0]['_links']['city:item']['href']
            
            
            fetch(cityData, options)
            .then(result=> {
                return result.json();
            })
            .then(result => {
                let urbanData = result['_links']['city:urban_area']['href']
                
                let coolatiData = result['location']['latlon']['latitude'];      
                let coolangiData =  result['location']['latlon']['longitude'];

                document.querySelector('.latitudine').innerHTML = 'Latitude ' + coolatiData;
                document.querySelector('.longitudine').innerHTML = 'Longitudine ' + coolangiData;

                
                fetch(urbanData, options)
                .then(result=> {
                    return result.json();
                })
                .then(result => {
                    let img = result['_links']['ua:images']['href'];
                    let scores = result['_links']['ua:scores']['href'];  
                    let cityName = result['full_name'];

                    document.querySelector('.city').innerHTML = cityName;
                    getimg(img);
                    getScores(scores, function (score) {
                    // io gli passo scores e una call back di score 
                    
                    
                    
                })
                .catch(error =>{
                    console.error('si è verificato un errore durante la richiesta :', error.message)
                })
            })
            .catch(error =>{
                console.error('si è verificato un errore durante la richiesta :', error.message)
            })

        })
        .catch(error =>{
            console.error('si è verificato un errore durante la richiesta :', error.message)
        })
    })
    .catch(error =>{
        console.error('si è verificato un errore durante la richiesta :', error.message)
    });
    });
};

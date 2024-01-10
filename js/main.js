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
        document.getElementById('firstImg').src = img;
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

        document.getElementById('footerCard').innerHTML = 'Total Score : ' +  Math.round(CitySCore);
        document.getElementById('summary').innerHTML = summary;

        let score = result['categories']                                                                                      
        callback(score)
        
    })
    .catch(error =>{
        console.error('si è verificato un errore durante la richiesta :', error.message)
    })
}

function createBox(){
    
    const body = document.querySelector('body');
    
    const firstCard = document.createElement('div');
    const RowCard = document.createElement('div');
    const contImg = document.createElement('div');
    const firstImg = document.createElement('img');
    const ContBodyCard = document.createElement('div');
    const FirstBodyCard = document.createElement('div');
    const titleCard = document.createElement('h5');
    const firstTextCard = document.createElement('p');

    const secondCard = document.createElement('div');
    const headerCard = document.createElement('div');
    const SecondBodyCard = document.createElement('div');
    // const secodnTitleCard = document.createElement('h5');
    const secondTextCard =  document.createElement('div');
    const contScore = document.createElement('div');
    const footerCard = document.createElement('div');
    
    body.appendChild(firstCard);  
    firstCard.appendChild(RowCard);
    RowCard.appendChild(contImg);
    contImg.appendChild(firstImg);
    RowCard.appendChild(ContBodyCard);
    ContBodyCard.appendChild(FirstBodyCard);
    FirstBodyCard.appendChild(titleCard);
    FirstBodyCard.appendChild(firstTextCard);
    
    body.appendChild(secondCard);
    secondCard.appendChild(headerCard);
    secondCard.appendChild(SecondBodyCard);
    // SecondBodyCard.appendChild(secodnTitleCard);
    SecondBodyCard.appendChild(secondTextCard)
    secondCard.appendChild(footerCard);
    SecondBodyCard.appendChild(contScore)

    firstCard.className = 'card mb-3'; 
    RowCard.className = 'row g-0'; 
    contImg.className = 'col-md-4'; 
    firstImg.className = 'img-fluid rounded-start';
    ContBodyCard.className = 'col-md-8'; 
    FirstBodyCard.className = 'card-body'; 
    titleCard.className = 'card-title'; 
    firstTextCard.className = 'card-text'; 

    secondCard.className = 'card border-dark mb-3'; 
    headerCard.className = 'card-header bg-transparent border-dark'; 
    SecondBodyCard.className = 'card-body text-dark';
    secondTextCard.className = 'card-text';
    footerCard.className = 'card-footer bg-transparent border-dark';

    firstCard.style.maxWidth = '500px';
    firstCard.style.boxShadow = '3px 3px 3px black';
    // firstCard.style.opacity = '0.9';
    firstCard.style.height = 'fit-content';
    firstImg.style.height = '170px';
    firstImg.style.width = '170px';
    firstImg.style.borderRadius = '8px';
    firstImg.style.margin = '5px';

    firstImg.id = 'firstImg';
    headerCard.id = 'header';
    footerCard.id = 'footerCard';
    firstTextCard.id = 'summary';
    titleCard.id = 'titleCard';
    secondTextCard.id = 'TextSecond';
    contScore.id = 'Score';

    contScore.style.display = 'flex';
    contScore.style.minWidth = '200px';
    contScore.style.flexDirection = 'column';
    contScore.style.gap = '8px';
    contScore.style.justifyContent = 'center';

    secondTextCard.style.display = 'flex';
    // secondTextCard.style.minWidth = '200px';
    secondTextCard.style.flexDirection = 'column';
    

    secondCard.id = 'secondCard';
    secondCard.style.boxShadow = '3px 3px 3px black';
    // secondCard.style.opacity = '0.9';
    secondCard.style.border = 'none';
    SecondBodyCard.id = 'secondBody';
    SecondBodyCard.style.display = 'flex';
    SecondBodyCard.style.justifyContent = 'space-between';

};

let search = document.querySelector('#search');
let cancel = document.querySelector('#canc');
let input = document.querySelector('#input');

search.addEventListener('click', () => {
    generateContainer(input.value);
});

input.addEventListener('keyup', (event) => {
    if(event.key === 'Enter'){
        generateContainer(input.value);
    }
});

cancel.addEventListener('click', () => {
    let input = document.querySelector('#input');
    input.value = '';

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
                let urbanData = result['_links']['city:urban_area']['href'];
                
                let coolatiData = result['location']['latlon']['latitude'];      
                let coolongiData =  result['location']['latlon']['longitude'];

                document.getElementById('header').innerHTML = 'Latitude ' + coolatiData + ' Longitudine ' + coolongiData;
                
                fetch(urbanData, options)
                .then(result=> {
                    return result.json();
                })
                .then(result => {
                    let img = result['_links']['ua:images']['href'];
                    let scores = result['_links']['ua:scores']['href'];  
                    let cityName = result['full_name'];

                    document.getElementById('titleCard').innerHTML = cityName;
                    getimg(img);
                    getScores(scores, function (score) {
                        console.log(score);

                        const nome = score.map(elemento=> elemento.name);
                        const scoreElement = score.map(elemento=> elemento.score_out_of_10);

                        const ContText = document.getElementById('TextSecond');

                        nome.forEach(element => {
                            const innertest = document.createElement('div');
                            innertest.innerHTML = element ;
                            ContText.appendChild(innertest);
                        });

                        const ScoreContainer = document.getElementById('Score');

                        scoreElement.forEach((element) => {
                            
                            const Progress = document.createElement('div');
                            const ProgressBar = document.createElement('div');

                            Progress.className = 'progress';
                            ProgressBar.className = 'progress-bar text-bg-warning';

                            Progress.setAttribute('role', 'progressbar');
                            Progress.setAttribute('aria-label', 'basic');
                            Progress.setAttribute('aria-valuenow', '0');
                            Progress.setAttribute('aria-valuemin', '0');
                            Progress.setAttribute('aria-valuemax', "100");

                            ProgressBar.style.width = element*10 + '%';
                            ProgressBar.innerHTML = element.toFixed(2);

                            ScoreContainer.appendChild(Progress);
                            Progress.appendChild(ProgressBar);
                        });

                    });
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
    
};

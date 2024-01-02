// fetch API
const options = { 
    headers: {'Content-Type': 'application/json',},
}; 

function GetDati(data){
    fetch(data, options)
    .then(result=> { 
        return result.json(); 
    })
    .then(result => {
        console.log(result)
    })
    .catch(error =>{
        console.error('si è verificato un errore durante la richiesta :', error.message)
    });
}

// fetch search city

function getCity(city){
    const Url = 'https://api.teleport.org/api/' ;

    fetch(Url, options)
    .then(result=> { 
        return result.json(); 
    })
    .then(result => {
        let data = result['_links']['city:search']['href'];
        data = data.replace(/{.*}/,'');
        data = data + "?search=" + city;
        GetDati(data)
    })
    .catch(error =>{
        console.error('si è verificato un errore durante la richiesta :', error.message)
    });

};

getCity('Dublino');


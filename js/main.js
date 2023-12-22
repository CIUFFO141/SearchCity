// fetch API
 
const Url = 'https://api.teleport.org/api/' ;

const options = {
    headers: {
        'Content-Type': 'application/json',
    },
}; 

fetch(Url, options)
.then(res=> {
    console.log(res)
    return res.json(); 
})
.then(res => {
    console.log(res);
})
.catch(error =>{
    console.error('si è verificato un errore durante la richiesta :', error.message)
})

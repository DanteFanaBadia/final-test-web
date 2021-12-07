

const API_KEY = 'c7c6d7975d373b08f9e55590c864f08fbc00cc2e';


function getHeaders(){
    const headers = new Headers();
    headers.append("Accept", "application/json");
    return headers;
}


function getCommics(term){
    console.log(term);
    var url = `https://comicvine.gamespot.com/api/issues/?api_key=${API_KEY}&format=json&sort=cover_date:desc`;
    if (term) {
        url = `https://comicvine.gamespot.com/api/issues/?api_key=${API_KEY}&format=json&filter=name:${term}&sort=cover_date:desc`;
    }
    return fetch(url,{
        method: 'GET',
        headers: getHeaders(),
    }).then(response => response.json())
    .then(response => {
        return response.results.map(el => {
            return {
                name: el.name,
                description: el.description,
                image: el.image.original_url,
                date: el.cover_date
            }
        }).filter(el => el.name);
    })
    .catch(error => console.log('error', error));
}


function renderCommics(commics){
    $( "#main" ).empty()
    commics.forEach(el => {
        $( "#main" ).append(
            `
            <div class="col-sm-3 mt-5">
                <div class="card shadow-sm">
                    <img src="${el.image}"/>
                    <div class="card-body">
                        <h3 class="card-text">${el.name}</h3>
                        <div class="d-flex justify-content-between align-items-center">
                            <small class="text-muted">${el.date}</small>
                        </div>
                    </div>
                </div>
            </div>
            `
        );
    });
}


$(window).on("load", () => {
    getCommics().then(commics => renderCommics(commics));
    $('#search-btn').click(() => {
        var term = $('#search-text').val();
        getCommics(term).then(commics => renderCommics(commics))
    });    
});
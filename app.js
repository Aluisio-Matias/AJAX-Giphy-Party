console.log("Let's get this party started!");

const $gifDisplay = $('#gif-display');
const $searchInput = $('#search');

/* get ajax result from API to append random gifs to the page */

function appendGif(res) {
    let results = res.data.length;

    if(results) {
        let randomGif = Math.floor(Math.random() * results);
        let $newRow = $('<div>', { class: "container" });
        let $newGif = $('<img>', {
            src: res.data[randomGif].images.original.url,
            class: "container"
        });
        $newRow.append($newGif);
        $gifDisplay.append($newRow);
    }
}

/* eventHandling form submission: clear search box & make ajax call when form's submited */

$('form').on('submit', async function(event){
    event.preventDefault();

    let searchTerm = $searchInput.val();
    $searchInput.val("");

    const response = await axios.get("http://api.giphy.com/v1/gifs/search", {
        params: {
            q: searchTerm,
            api_key: "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym"
        }
    });
    appendGif(response.data);
});

//Remove images from the page when button is clicked

$('#remove').on('click', function() {
    $gifDisplay.empty();
})


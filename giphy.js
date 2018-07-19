const apiKey = ''; // ADD YOUR API KEY HERE

// This is the base URL for the Giphy API.
let url = 'http://api.giphy.com/v1/gifs/search';

// This function fetches a gif that matches the given searchTerm.
function fetchGif(searchTerm) {
  // This sets up our Giphy search with the given searchTerm.
  let query = `${url}?api_key=${apiKey}&q=${searchTerm}&limit=1`;

  // Fetch the data from the Giphy API...
  window.fetch(query).then(data => {
    return data.json();

  // Then try to turn the response into valid JSON...
  }).then(json => {
    // Then get the correct URL from the JSON and pass it to createImage.
    let results = json.data;
    let result = results[0];
    let imageUrl = result.images.downsized.url;
    createImage(imageUrl);
  });
}

// This function creates an image with the given URL and inserts it.
function createImage(url) {
  let image = document.createElement('img');
  image.src = url;
  document.body.appendChild(image);
}

// Set up the button and input box to listen for user input.
let go = document.querySelector('#go');
let input = document.querySelector('#q');
go.addEventListener('click', e => {
  let q = input.value;
  fetchGif(q);
});

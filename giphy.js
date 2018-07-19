const apiKey = ''; // ADD YOUR API KEY HERE

// This is the base URL for the Giphy API.
let url = 'http://api.giphy.com/v1/gifs/search';

// This function fetches a gif that matches the given searchTerm.
function fetchGif(searchTerm) {
  // This sets up our Giphy search with the given searchTerm.
  let query = `${url}?api_key=${apiKey}&q=${searchTerm}&limit=8`;

  // Fetch the data from the Giphy API...
  window.fetch(query).then(data => {
    return data.json();

  // Then try to turn the response into valid JSON...
  }).then(json => {
    // Then get the correct URL from the JSON and pass it to createImage.
    let results = json.data;
    results.forEach(result => {
      let imageUrl = result.images.downsized.url;
      createImage(imageUrl);
    });
  });
}

// This function creates an image with the given URL and inserts it.
function createImage(url) {
  let image = document.createElement('img');
  image.src = url;
  document.body.appendChild(image);
}

// Set up the button and input box to listen for user input.
let form = document.querySelector('#search-form');
let go = document.querySelector('#go');
let input = document.querySelector('#q');
form.addEventListener('submit', e => {
  e.preventDefault();  // Don't refresh the page.
  let q = input.value;
  if (q) {
    // Remove all the images.
    document.querySelectorAll('img').forEach(img => {
      img.remove();
    })
    input.value = '';  // Clear the input.
    fetchGif(q);  // Fetch the query.
  }
});

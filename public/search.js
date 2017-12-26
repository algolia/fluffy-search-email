$(document).ready(function() {
  var instantsearch = window.instantsearch;

  // create an instantsearch instance with our app id and api key
  var search = instantsearch({
    appId: window.glitchApp.algolia.app_id,
    apiKey: window.glitchApp.algolia.search_api_key,
    indexName: window.glitchApp.algolia.index_name,
    urlSync: true,
    searchParameters: {
      hitsPerPage: 3
    }
  });

// //conects the search input on your page to Algolia
search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#search-box',
    placeholder: 'Search for your favorite drink recipe'
  })
);
  // adds the results of your data, in your return statement you can change what you want shown
  search.addWidget(
    instantsearch.widgets.hits({
      container: '#hits',
      hitsPerPage: 12,
      templates: {
        empty: `<div class="col-md-12" style="text-align: center;"> We didn't find any results for the search <em>\"{{query}}\"</em></div`,
        item: function(hit) {
          try {
            return `
              <div class="col-md-4" style="text-align: center;">
                <p> 
                  <h2 class="hit-text">${hit._highlightResult.strDrink.value}</h2>
                  <img src="${hit.strDrinkThumb}" class="drink-images">
                </p>
                <p>
                <p>
                  <button class="btn btn-light" type="button" data-toggle="collapse" data-target="#collapseDrink${hit.idDrink}" aria-expanded="false" aria-controls="collapseDrink${hit.idDrink}">
                    Email me 💌
                  </button>
                  <div class="collapse" id="#collapseDrink${hit.idDrink}">
                    <div class="card card-body">
                    <form class="email-cocktail-form">
                      <div class="form-group">
                        <div class="input-group">
                          <input type="text" class="form-control" placeholder="Enter your email address">
                          <span class="input-group-addon"><a href="/email/${hit.objectID}">Email me: 💌‍ </a></span>
                        </div>
                      </form>
                    </div>
                  </div>
                </p>
              </div>
            `;
          } catch (e) {
            console.warn("Couldn't render hit", hit, e);
            return "";
          }
        }
      }
    })
  );

  // adds pagination past the results you set on line 33
  search.addWidget(
    instantsearch.widgets.pagination({
      container: '#pagination'
    })
  );

  search.start();
});
export default {
  name: "AboutContainer",

  data: () => ({}),

  render(h) {
    return (
      <div class="aboutContainer">
        <h3>About MeLOAR</h3>
        <p>
        The MeLOAR (Mediastram Library Open Access Repository) is designed to provide access to a large collection of Danish archaeological reports and documentation ("Beretningsarkiv for Arkæologiske Undersøgelser").
        <br/>
        <br/>
        This application offers both keyword and geographic search facilities of the collection, and displays the search results with facets (search-criteria), and maps (snippets hereof). Facets are also highlighted in the documents searched.
        <br/>
        <br/>
        The development team is headed by Katrine Hofmann Gasser of the Royal Danish Library. Bolette Ammitzbøl Jurik harvested the documents and constructed the repository, while Toke Eskildsen created the search engine. 
        Jesper Lauridsen and Jørn Thøgersen also contributed by creating the user-interface. The graphics are created by Ea Rasmussen of Moesgaard Museum.
        All data is provided by <a href="http://www.kulturarv.dk/fundogfortidsminder/">the Danish Agency for Culture and Palaces</a> and Jens-Bjørn Riis Andresen of Aarhus University, the Principal Investigator (PI) of this project.
        </p>
        <div class="router">
          <router-link to="/">Back to searching</router-link>
        </div>
      </div>
    );
  }
};

export default {
  name: "AboutContainer",

  data: () => ({}),

  render(h) {
    return (
      <div class="aboutContainer">
        <h3>About MeLOAR</h3>
        <p>
          MeLOAR is a dedicated front end for specific LOAR collections. This MeLOAR instance is for the LOAR collection
          "Beretningsarkiv for Arkæologiske Undersøgelser", which is an account archive for archaeological pdfs. MeLOAR
          offers keyword search and location search, shows the search results with facets, maps and highlights, and
          shows the highlights inside the pdfs as well.
        </p>
        <div class="router">
          <router-link to="/">Back to searching</router-link>
        </div>
      </div>
    );
  }
};

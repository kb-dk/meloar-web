export default {
  name: "AboutContainer",

  data: () => ({}),

  render(h) {
    return (
      <div class="aboutContainer">
        <h3>About MeLOAR Kirker</h3>
        <p>
          <br />
          This application offers both keyword and geographic search facilities of the collection, and displays the search results with facets
          (search-criteria), and maps (snippets hereof). Facets are also highlighted in the documents searched.
          <br />
          <br />
          The development team is headed by Katrine Hofmann Gasser of the Royal Danish Library. Bolette Ammitzbøl Jurik harvested the documents and
          constructed the repository, while Toke Eskildsen created the search engine. Jesper Lauridsen and Jørn Thøgersen also contributed by creating
          the user-interface.
          <br />
          If you have any suggestions for improvements for this service, please mail us at <a href="mailto:khg@kb.dk">khg@kb.dk</a>.
        </p>
        <div class="router">
          <router-link to="/">Back to searching</router-link>
        </div>
      </div>
    )
  }
}

import HighlightedChapter from "../components/HighlightedChapter";
import HighlightedContent from "../components/HighlightedContent";
import ResultMap from "../components/ResultMap";

export default {
  name: "SearchResult",
  data: () => ({ showingAllSnippets: false }),

  props: {
    result: {
      type: Object,
      required: true
    },
    queryString: {
      type: String,
      requred: true
    }
  },
  methods: {
    getRecordLink(id, page) {
      return page
        ? {
            path: "/record/",
            query: { page: true, id: encodeURIComponent(id), query: this.queryString }
          }
        : { path: "/record/", query: { id: encodeURIComponent(id), query: this.queryString } };
    },
    transformDate(date) {
      const convertedDate = new Date(date);
      const currentDate = new Date();
      const diffYears = currentDate.getFullYear() - convertedDate.getFullYear();
      return diffYears;
    },
    deliverTimeBetween(date) {
      const convertedDate = new Date(date);
      return convertedDate.getFullYear();
    },

    toggleMoreSnippetsVisibility() {
      this.showingAllSnippets = !this.showingAllSnippets;
    }
  },
  render(h) {
    //console.log("INDIVIDUAL SEARCH DATA");
    //console.log(this.result);
    const defaultVisibleSnippets = 4;
    let authors = this.result.doclist.docs["0"].author || ["Unknown"];
    return (
      <div class="searchResult" id={this.result.doclist.docs["0"].loar_id.replace(/:|\s|\//g, "-")}>
        <div class="generalInfo">
          <div class="overallInfo">
            <div class="resultTitle">
              <div class="pdfTitle">pdf title</div>
              <div class="pdfName">{this.result.doclist.docs["0"].title}</div>
            </div>
            <div class="resultInfo">Time</div>
            <div class="timeTitle" />
            <div class="resultDate">
              From approx <span>{this.transformDate(this.result.doclist.docs["0"].ctime)} </span>
              years ago ({this.deliverTimeBetween(this.result.doclist.docs["0"].ctime)})
            </div>
            <div class="placeTitle">Place</div>
            <div class="resultPlace">{this.result.doclist.docs["0"].place_name}</div>
            <div class="authorContainer">
              <div class="authorTitle">Authors:&nbsp;</div>
              {authors.map(function(name, i, arr) {
                if (arr.length - 1 === i) {
                  return <div class="authorName">{name}</div>;
                } else {
                  return (
                    <div class="authorName">
                      {name}
                      ,&nbsp;
                    </div>
                  );
                }
              })}
            </div>
          </div>
          <div class="mapContainer">
            <ResultMap
              id={this.result.doclist.docs["0"].id}
              coordinateSet={this.result.doclist.docs["0"].place_coordinates || "Unknown"}
            />
          </div>
        </div>
        {this.queryString.includes("&pt=") != true && (
          <div class="matches">
            <span class="numbersFound">{this.result.doclist.numFound}</span>
            {this.result.doclist.numFound > 1 ? <span> matches</span> : <span> match </span>}
            <span>found in pdf. Displaying </span>
            {this.result.doclist.docs.length < defaultVisibleSnippets ? (
              <span class="numbersFound">{this.result.doclist.docs.length}</span>
            ) : (
              <span class="numbersFound">{defaultVisibleSnippets}</span>
            )}
            .
            {this.result.doclist.docs.length > defaultVisibleSnippets && (
              <span class="seeAllSnippets" onClick={e => this.toggleMoreSnippetsVisibility()}>
                {this.showingAllSnippets ? <span>See less hits</span> : <span>See more hits</span>}
              </span>
            )}
          </div>
        )}

        {this.queryString.includes("&pt=") != true &&
          this.result.doclist.docs.map((snippets, index) => (
            <div
              class="snippet"
              style={
                index > defaultVisibleSnippets - 1 && !this.showingAllSnippets
                  ? "display:none"
                  : "display:block"
              }
            >
              <div class="chapterTitle">chapter </div>
              <HighlightedChapter chapterString={snippets.chapter} query={this.result.query} />
              <div class="pageTitle">page </div>
              {snippets.page == 0 ? (
                <div class="pageNumber">1</div>
              ) : (
                <div class="pageNumber">{snippets.page - 1}</div>
              )}
              <ul>
                <HighlightedContent
                  contentArray={snippets.highLightSnippets}
                  query={this.result.query}
                />
              </ul>
              <router-link to={this.getRecordLink(snippets.id, true, this.result.query)}>
                <span>⮊</span> Go to hit
              </router-link>
            </div>
          ))}
        <router-link
          class="entirePdfLink"
          to={this.getRecordLink(this.result.doclist.docs["0"].id, true, this.result.query)}
        >
          See entire pdf
        </router-link>
        {this.showingAllSnippets && (
          <div class="seeAllSnippetsBottomContainer">
            <span class="seeAllSnippets" onClick={e => this.toggleMoreSnippetsVisibility()}>
              {this.showingAllSnippets ? <span>See less hits</span> : <span>See more hits</span>}
            </span>
          </div>
        )}
      </div>
    );
  }
};

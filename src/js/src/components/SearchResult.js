import HighlightedChapter from "../components/HighlightedChapter";
import HighlightedContent from "../components/HighlightedContent";
import ResultMap from "../components/ResultMap";

export default {
  name: "SearchResult",
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
    getRecordLink(id, page, query) {
      return page
        ? { path: "/record/", query: { page: true, id: encodeURIComponent(id), query: query } }
        : { path: "/record/", query: { id: encodeURIComponent(id), query: query } };
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
    seeAllHitsInSnippet(arg) {
      if (arg.$el.getElementsByClassName("seeAllSnippets")[0].innerHTML === "See more hits") {
        var elements = arg.$el.getElementsByClassName("snippet");
        for (let i = 0; i < elements.length; i++) {
          elements[i].style.display = "block";
        }
        arg.$el.getElementsByClassName("seeAllSnippets")[0].innerHTML = "See less hits";
        arg.$el.getElementsByClassName("seeAllSnippets")[1].style.display = "block";
      } else {
        var elements = arg.$el.getElementsByClassName("snippet");
        for (let i = 0; i < elements.length; i++) {
          elements[i].style.display = "";
        }
        arg.$el.getElementsByClassName("seeAllSnippets")[0].innerHTML = "See more hits";
        arg.$el.getElementsByClassName("seeAllSnippets")[1].style.display = "none";
      }
      console.log(arg.$el);
    }
  },
  render(h) {
    //console.log("INDIVIDUAL SEARCH DATA");
    //console.log(this.result);
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
              From approx <span>{this.transformDate(this.result.doclist.docs["0"].ctime)}</span> years ago (
              {this.deliverTimeBetween(this.result.doclist.docs["0"].ctime)})
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
              coordinates={this.result.doclist.docs["0"].place_coordinates || "Unknown"}
            />
          </div>
        </div>
        {this.queryString.includes("&pt=") != true ? (
          <div class="matches">
            <span class="numbersFound">{this.result.doclist.numFound}</span>{" "}
            {this.result.doclist.numFound > 1 ? <span>matches</span> : <span>match</span>} found in pdf. Displaying{" "}
            {this.result.doclist.docs.length < 3 ? (
              <span class="numbersFound">{this.result.doclist.docs.length}</span>
            ) : (
              <span class="numbersFound">3</span>
            )}
            .{" "}
            {this.result.doclist.docs.length > 3 ? (
              <span class="seeAllSnippets" onClick={e => this.seeAllHitsInSnippet(this)}>
                See more hits
              </span>
            ) : (
              <span class="AllSnippets" />
            )}
          </div>
        ) : (
          <div />
        )}

        {this.queryString.includes("&pt=") != true ? (
          this.result.doclist.docs.map(snippets => (
            <div class="snippet">
              <div class="chapterTitle">chapter </div>
              <HighlightedChapter chapterString={snippets.chapter} query={this.result.query} />{" "}
              <div class="pageTitle">page </div>{" "}
              {snippets.page == 0 ? <div class="pageNumber">1</div> : <div class="pageNumber">{snippets.page - 1}</div>}
              <ul>
                <HighlightedContent contentArray={snippets.highLightSnippets} query={this.result.query} />
              </ul>
              <router-link to={this.getRecordLink(snippets.id, true, this.result.query)}>
                <span>⮊</span> Go to hit
              </router-link>
            </div>
          ))
        ) : (
          <div />
        )}
        <router-link class="entirePdfLink" to={this.getRecordLink(this.result.doclist.docs["0"].id)}>
          See entire pdf
        </router-link>
        <div class="seeAllSnippetsBottomContainer">
          <span class="seeAllSnippets" onClick={e => this.seeAllHitsInSnippet(this)}>
            See less hits
          </span>
        </div>
      </div>
    );
  }
};

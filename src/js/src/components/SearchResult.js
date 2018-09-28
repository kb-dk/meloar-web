import HighlightedChapter from "../components/HighlightedChapter";
import HighlightedContent from "../components/HighlightedContent";

export default {
  name: "SearchResult",
  props: {
    result: {
      type: Object,
      required: true
    }
  },
  methods: {
    getRecordLink(id) {
      return "/record/" + encodeURIComponent(id);
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
    }
  },
  render(h) {
    //console.log("INDIVIDUAL SEARCH DATA");
    //console.log(this.result);
    let authors = this.result.doclist.docs["0"].author || ["Unknown"];
    return (
      <div class="searchResult">
        <div class="generalInfo">
          <div class="resultTitle">
            <div class="pdfTitle">
              <span>pdf</span>
              <span>title</span>
            </div>
            {this.result.doclist.docs["0"].title}
          </div>
          <div class="resultInfo">
            <div resultDate>
              From approx <span>{this.transformDate(this.result.doclist.docs["0"].ctime)}</span> years ago (
              {this.deliverTimeBetween(this.result.doclist.docs["0"].ctime)})
            </div>
            <div class="resultPlace">
              At <span>{this.result.doclist.docs["0"].place_name}</span>
            </div>
          </div>
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
          <div class="matches">
            <span class="numbersFound">{this.result.doclist.numFound}</span>{" "}
            {this.result.doclist.numFound > 1 ? <span>matches</span> : <span>match</span>} found in pdf
          </div>
        </div>
        <div>
          <div class="title" />
          <div class="">{this.result.chapter}</div>
        </div>
        {this.result.doclist.docs.map(snippets => (
          <div class="snippet">
            <h5 class="chapterTitle">chapter:</h5>
            <HighlightedChapter chapterString={snippets.chapter} query={this.result.query} />
            <ul>
              <HighlightedContent contentArray={snippets.highLightSnippets} query={this.result.query} />
            </ul>
            <router-link to={this.getRecordLink(snippets.id)}>Go to quote.</router-link>
          </div>
        ))}
        <router-link to={this.getRecordLink(this.result.groupValue)}>See pdf.</router-link>
      </div>
    );
  }
};

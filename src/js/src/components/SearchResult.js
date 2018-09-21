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
    },
    splitAndHighlightWordInSnippet(array) {
      var query = this.result.query;
      console.log(array);
      return array;
    },
    splitAndHighlightWordInChapter(string) {
      var query = this.result.query;
      return string;
    }
  },
  render(h) {
    console.log("INDIVIDUAL SEARCH DATA");
    console.log(this.result);
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
          <div class="resultDate">
            From approx <span>{this.transformDate(this.result.doclist.docs["0"].ctime)}</span> years ago (
            {this.deliverTimeBetween(this.result.doclist.docs["0"].ctime)})
          </div>
          <div class="matches">
            <span class="numbersFound">{this.result.doclist.numFound}</span> matches found in pdf
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
              {/* <li>{this.splitAndHighlightWordInSnippet(snippets.highLightSnippets)}</li> */}
              <HighlightedContent contentArray={snippets.highLightSnippets} query={this.result.query} />
            </ul>
          </div>
        ))}
        <router-link to={this.getRecordLink(this.result.doclist.docs["0"].id)}>See pdf.</router-link>
      </div>
    );
  }
};

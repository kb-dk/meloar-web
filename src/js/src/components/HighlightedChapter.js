export default {
  name: "highlightedChapter",

  props: {
    chapterString: {
      type: String,
      required: true
    },
    query: {
      type: String,
      required: true
    }
  },

  data: () => ({ givenString: "" }),

  methods: {
    highlightString(arg, query) {
      if (arg === "null") {
        return "Unknown";
      }
      return arg.replace(new RegExp(query, "ig"), match => {
        return '<span class="highlightText">' + match + "</span>";
      });
    }
  },

  render(h) {
    return <div class="chapterName" domPropsInnerHTML={this.highlightString(this.chapterString, this.query)} />;
  }
};

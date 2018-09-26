export default {
  name: "highlightedContent",

  props: {
    contentArray: {
      type: Array,
      required: true
    },
    query: {
      type: String,
      required: true
    }
  },

  data: () => ({ givenString: "" }),

  methods: {
    highlightStrings(arg, query) {
      for (let i = 0; i < arg.length; i++) {
        return arg[i].replace(new RegExp(query, "ig"), match => {
          return '<span class="highlightText">' + match + "</span>";
        });
      }
    },
    isArrayEmpty(arg) {
      if (arg.length > 0) {
        return true;
      } else {
        return false;
      }
    }
  },

  render(h) {
    const isEmpty = this.isArrayEmpty(this.contentArray);
    return (
      <div class="renderedSnippet">
        {isEmpty === true ? (
          <ul>
            <li class="string" domPropsInnerHTML={this.highlightStrings(this.contentArray, this.query)} />
          </ul>
        ) : (
          <div class="empty" />
        )}
      </div>
    );
  }
};

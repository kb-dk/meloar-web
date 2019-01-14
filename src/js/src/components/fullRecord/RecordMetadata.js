export default {
  name: "RecordMetadata",

  props: {
    record: {
      type: Object
    }
  },

  methods: {
    getId: function() {
      return this.record.doc ? this.record.doc.id : "";
    },

    getTitle: function() {
      return this.record.doc ? this.record.doc.title : "";
    },

    getChapter: function() {
      return this.record.doc ? this.record.doc.chapter : "";
    },
    getPage: function() {
      return this.record.doc
        ? this.record.doc.page == 0
          ? this.record.doc.page
          : this.record.doc.page - 1
        : "";
    }
  },

  render(h) {
    return (
      <div id="pdfInformationTab">
        <div class="pdfMetadata">
          <div>
            <span>ID:</span>
            <span>{this.getId()}</span>
          </div>
          <div>
            <span>Title:</span>
            <span>{this.getTitle()}</span>
          </div>
          <div>
            <span>Chapter:</span>
            <span>{this.getChapter()}</span>
          </div>
          <div>
            <span>Page:</span>
            <span>{this.getPage()}</span>
          </div>
        </div>
      </div>
    );
  }
};

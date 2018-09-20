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
    }
  },

  render(h) {
    return (
      <div>
        <div>ID: {this.getId()}</div>
        <div>Title: {this.getTitle()}</div>
        <div>Chapter: {this.getChapter()}</div>
      </div>
    );
  }
};

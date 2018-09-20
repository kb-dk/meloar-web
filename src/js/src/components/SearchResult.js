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
    return (
      <div class="searchResult">
        <div>
          <div class="resultTitle">{this.result.title}</div>
          <div class="resultDate">
            From approx <span>{this.transformDate(this.result.ctime)}</span> years ago (
            {this.deliverTimeBetween(this.result.ctime)})
          </div>
        </div>
        <div>
          <div class="title" />
          <div class="">{this.result.chapter}</div>
        </div>
        <router-link to={this.getRecordLink(this.result.id)}>See more.</router-link>
      </div>
    );
  }
};

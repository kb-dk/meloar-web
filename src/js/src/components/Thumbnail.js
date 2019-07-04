export default {
  name: "Thumbnail",

  props: {
    URL: {
      type: String,
      required: true
    },
  },

  data: () => ({ hasURL: true }),
  
  methods: {
    
  },

  mounted() {
  },

  render(h) {
    return (
      <div class="simpleMapContainer">
        <div style={{ backgroundImage: `url(${this.URL})` }} class="thumbnailImage"></div>
      </div>
    );
  }
};

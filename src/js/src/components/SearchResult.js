export default {
  name: "SearchResult",
  props: {
    result: {
      type: Object,
      required: true
    }
  },
  methods: {

  },
  render(h) {
    return (
      <div class="searchResult">
      <div>
      <div class="title">Author:</div>
        {this.result.author.map(function(name, i, arr){
          if(arr.length -1 === i) {
            return <div class="author">{name}</div>;
          }
          else {
            return <div class="author">{name},</div>;
          }
        })}
        </div>
        <div>
        <div class="title">Chapter:</div>
        <div class="chapter">{this.result.chapter}</div>
        </div>
        <div>
        <div class="title">Content:</div>
        <div class="content">{this.result.content[0]}</div>
        </div>
        <div>
        <div class="title">Ressource:</div>
        <div class="external_ressource">{this.result.external_resource}</div>
        </div>

        <router-link to="{this.result.id}">See more.</router-link>
      </div>
    );
  }
};

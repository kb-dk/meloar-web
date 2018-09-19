
export default {
  name: "AboutContainer",

  data: () => ({}),

  render(h) {
    return (
      <div class="AboutContainer">
        <p>Lorem Ipsum about this great place!</p>
        <router-link to="/">Back to searching</router-link>
      </div>
    );
  }
};

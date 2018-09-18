
export default {
  name: "HomeContainer",

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

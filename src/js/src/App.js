import Home from "./containers/HomeContainer.js";

export default {
  name: "app",
  data: () => ({}),

  render(h) {
    return (
      <div id="app">
        <div>
          <router-view />
        </div>
      </div>
    );
  }
};

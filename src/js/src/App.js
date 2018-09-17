import SearchBox from "./components/SearchBox.js";
import Home from "./containers/HomeContainer.js";

export default {
  name: "app",
  data: () => ({}),

  render(h) {
    return (
      <div id="app">
        <div>
          <Home />
        </div>
      </div>
    );
  }
};

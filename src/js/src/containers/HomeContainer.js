import SearchBox from "../components/SearchBox";

/**
 * Home
 */
export default {
  name: "HomeContainer",

  data: () => ({}),

  render(h) {
    return (
      <div>
        <SearchBox />
        <div>Home sweet home</div>
      </div>
    );
  }
};

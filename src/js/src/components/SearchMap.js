import "../../node_modules/leaflet/dist/leaflet.css";
//import icon from "../../node_modules/leaflet/dist/images/marker-icon.png";
import iconShadow from "../../node_modules/leaflet/dist/images/marker-shadow.png";
import searchState from "../store/searchStore.js";

export default {
  name: "searchMap",

  data: () => ({
    searchRadius: 0,
    searchPosition: []
  }),

  methods: {
    initiateMap() {
      var _this = this;
      var coordinates = [56.1572, 10.2107];
      const L = require("leaflet");

      const icon = L.divIcon({
        className: "leafletMarker",
        iconAnchor: [0, 24],
        labelAnchor: [-6, 0],
        popupAnchor: [0, -36],
        html: `<span class='leafletMarker' />`
      });

      let DefaultIcon = L.icon({
        iconUrl: icon,
        shadowUrl: iconShadow
      });
      L.Marker.prototype.options.icon = DefaultIcon;
      let resultmap = L.map("searchMap", null, { zoomControl: false });
      resultmap.setView(coordinates, 7);
      L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
      }).addTo(resultmap);
      resultmap.dragging.disable();
      resultmap.touchZoom.disable();
      resultmap.doubleClickZoom.disable();
      resultmap.scrollWheelZoom.disable();
      let selectedArea;
      let selectAreaCenter;
      //let marker = L.marker(coordinates).addTo(resultmap);
      resultmap.on("mousedown", function(e) {
        console.log(selectedArea);
        if (selectedArea != undefined) {
          resultmap.removeLayer(selectedArea);
        }
        selectAreaCenter = [e.latlng.lat, e.latlng.lng];
        selectedArea = L.circle(selectAreaCenter, {
          color: "red",
          fillColor: "rgba(0, 245, 220, 0.69)",
          fillOpacity: 0.5,
          stroke: false,
          radius: 0
        }).addTo(resultmap);
        resultmap.on("mousemove", function(e) {
          document.getElementById("searchMap").ondragstart = function() {
            return false;
          };
          selectedArea.setRadius(_this.getDistance(selectAreaCenter, [e.latlng.lat, e.latlng.lng]));
          console.log(selectedArea._mRadius);
        });
      });
      resultmap.on("mouseup", function(e) {
        resultmap.off("mousemove");
        _this.searchRadius = _this.getDistance(selectAreaCenter, [e.latlng.lat, e.latlng.lng]);
        _this.searchPosition = selectAreaCenter;
      });
    },
    toggleMap() {
      document.getElementById("searchMapContainer").className === "searchMapContainer hidden"
        ? (document.getElementById("searchMapContainer").className = "searchMapContainer shown")
        : (document.getElementById("searchMapContainer").className = "searchMapContainer hidden");
    },
    getDistance(origin, destination) {
      // return distance in meters
      let lon1 = this.toRadian(origin[1]),
        lat1 = this.toRadian(origin[0]),
        lon2 = this.toRadian(destination[1]),
        lat2 = this.toRadian(destination[0]);

      let deltaLat = lat2 - lat1;
      let deltaLon = lon2 - lon1;

      let a =
        Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon / 2), 2);
      let c = 2 * Math.asin(Math.sqrt(a));
      let EARTH_RADIUS = 6371;
      return c * EARTH_RADIUS * 1000;
    },
    toRadian(degree) {
      return (degree * Math.PI) / 180;
    },
    fireSearch() {
      searchState.query =
        "*.*&d=" +
        this.searchRadius / 1000 +
        "&facet=on&fq={!geofilt%20sfield=place_coordinates}&group.field=loar_id&group=true&pt=" +
        this.searchPosition[1] +
        "," +
        this.searchPosition[0];
      this.$router.push({
        name: "search",
        params: {
          query:
            "*.*&d=" +
            this.searchRadius / 1000 +
            "&facet=on&fq={!geofilt%20sfield=place_coordinates}&group.field=loar_id&group=true&pt=" +
            this.searchPosition[1] +
            "," +
            this.searchPosition[0]
        }
      });
      console.log();
    }
  },

  mounted() {
    this.initiateMap(this.coordinates, this.id);
  },

  render(h) {
    return (
      <div>
        <div on-click={this.toggleMap} class="locationSearch">
          <span>Search by location</span>
        </div>
        <div id="searchMapContainer" class="searchMapContainer hidden">
          <div on-click={this.toggleMap} class="mapClose" />
          <div on-click={this.fireSearch} class="mapSearch">
            Search
          </div>
          <div class="searchMap" id="searchMap" />
        </div>
      </div>
    );
  }
};

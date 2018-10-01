import "../../node_modules/leaflet/dist/leaflet.css";
import icon from "../../node_modules/leaflet/dist/images/marker-icon.png";
import iconShadow from "../../node_modules/leaflet/dist/images/marker-shadow.png";

export default {
  name: "ResultMap",

  props: {
    coordinates: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  },

  data: () => ({}),

  methods: {
    createMap(coordinateSet, id) {
      if (coordinateSet === "Unknown" || undefined) {
        document.getElementById(this.fixedId(id)).innerHTML = "No coordinates to show :(";
      } else {
        var coordinates = coordinateSet.split(",").reverse();
        const L = require("leaflet");
        let DefaultIcon = L.icon({
          iconUrl: icon,
          shadowUrl: iconShadow
        });
        L.Marker.prototype.options.icon = DefaultIcon;
        let resultmap = L.map(this.fixedId(id));
        resultmap.setView(coordinates, 9);
        L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
        }).addTo(resultmap);
        let marker = L.marker(coordinates).addTo(resultmap);
      }
    },
    fixedId(id) {
      let returnValue;
      returnValue = id.replace(/\//g, "_");
      returnValue = returnValue.replace(/:/g, "_");
      return returnValue;
    }
  },

  mounted() {
    this.createMap(this.coordinates, this.id);
  },

  render(h) {
    return <div class="resultMap" id={this.fixedId(this.id)} />;
  }
};
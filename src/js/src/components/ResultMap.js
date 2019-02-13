import "../../node_modules/leaflet/dist/leaflet.css";
import icon from "../../node_modules/leaflet/dist/images/marker-icon.png";
import iconShadow from "../../node_modules/leaflet/dist/images/marker-shadow.png";

export default {
  name: "ResultMap",

  props: {
    coordinateSet: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  },

  data: () => ({ hasCoordinates: true }),

  methods: {
    createMap(coordinateSet, id) {
      if (coordinateSet === "Unknown" || undefined) {
        this.hasCoordinates = false;
      } else {
        let coordinates = coordinateSet.split(",").reverse();
        let mapNode = require("leaflet");
        let DefaultIcon = mapNode.icon({
          iconUrl: icon,
          shadowUrl: iconShadow
        });
        mapNode.Marker.prototype.options.icon = DefaultIcon;
        let resultmap = mapNode.map(this.fixedId(id));
        resultmap.setView(coordinates, 9);
        //If https problems occur, try https://a.tile.openstreetmap.org/{z}/{x}/{y}.png instead.
        mapNode
          .tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          })
          .addTo(resultmap);
        mapNode.marker(coordinates).addTo(resultmap);
      }
    },
    fixedId(id) {
      let returnValue;
      returnValue = id.replace(/\//g, "_");
      returnValue = returnValue.replace(/:/g, "_");
      return "mapId-" + returnValue;
    }
  },

  mounted() {
    this.createMap(this.coordinateSet, this.id);
  },

  render(h) {
    return (
      <div class="simpleMapContainer">
        {this.hasCoordinates ? (
          <div class="resultMap" id={this.fixedId(this.id)} />
        ) : (
          <div class="noShowMap">No coordinates to show :(</div>
        )}
      </div>
    );
  }
};

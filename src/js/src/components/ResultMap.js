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

  data: () => ({ mapNode: {}, resultmap: {}, marker: {} }),

  methods: {
    createMap(coordinateSet, id) {
      if (coordinateSet === "Unknown" || undefined) {
        document.getElementById(this.fixedId(id)).innerHTML = "<div class='noShowMap'>No coordinates to show :(</div>";
      } else {
        let coordinates = coordinateSet.split(",").reverse();
        this.mapNode = require("leaflet");
        let DefaultIcon = this.mapNode.icon({
          iconUrl: icon,
          shadowUrl: iconShadow
        });
        this.mapNode.Marker.prototype.options.icon = DefaultIcon;
        this.resultmap = this.mapNode.map(this.fixedId(id));
        this.resultmap.setView(coordinates, 9);
        this.mapNode
          .tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          })
          .addTo(this.resultmap);
        this.marker = this.mapNode.marker(coordinates).addTo(this.resultmap);
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
    this.createMap(this.coordinates, this.id);
  },

  watch: {
    coordinates: function() {
      let updatedCoordinates = this.coordinates.split(",").reverse();
      this.resultmap.setView(updatedCoordinates, 9);
      let newLatLng = new this.mapNode.LatLng(updatedCoordinates[0], updatedCoordinates[1]);
      this.marker.setLatLng(newLatLng);
    }
  },

  beforeMount() {
    if (document.getElementById(this.fixedId(this.id))) {
      var element = document.getElementById(this.fixedId(this.id));
      element.id = this.fixedId(this.id + "-obsolete");
    }
  },

  render(h) {
    return <div class="resultMap" id={this.fixedId(this.id)} data-set-coordinates={this.coordinates} />;
  }
};

<template>
  <the-menu
    @set-markers="addBusStopMarker"
    :busStopInfo="busStopInfo"
  ></the-menu>
  <div class="map" ref="map" id="map"></div>
</template>

<script>
import leaflet from "leaflet";
import busStopIconUrl from "../../../public/bus-stop.png";
import TheMenu from "@/components/layout/TheMenu";
import settings from "../../settings";

export default {
  components: {
    TheMenu,
  },
  data() {
    return {
      map: null,
      busStopMarkers: [],
      stopInfo: null,
    };
  },
  methods: {
    initializeMap() {
      this.map = leaflet
        .map(this.$refs.map, {
          zoomControl: false,
          zoomAnimation: false,
          fadeAnimation: true,
          markerZoomAnimation: true,
        })
        .setView([52.22977, 21.01178], 12);
      leaflet.control.zoom({ position: "bottomright" }).addTo(this.map);
      leaflet
        .tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        })
        .addTo(this.map);
    },
    async getAllStops() {
      await this.$store.dispatch("transport/loadStations");
    },
    addBusStopMarker() {
      this.busStopMarkers.forEach((marker) => {
        this.removeBusStopMarker(marker);
      });
      const busStops = this.$store.getters["transport/filteredStations"];
      let busStopMarker;
      busStops.forEach(async (busStop) => {
        const [lines, stringLines] = await this.getLinesForMarker(
          busStop.id,
          busStop.number
        );
        const busStopIcon = leaflet.icon({
          iconUrl: busStopIconUrl,
          iconSize: [32, 32],
        });
        if (busStop.lat != "null" && busStop.lng != "null") {
          this.map.flyTo([busStop.lat, busStop.lng], 17);
          busStopMarker = leaflet
            .marker([busStop.lat, busStop.lng], {
              icon: busStopIcon,
            })
            .addTo(this.map)
            .bindPopup(`${busStop.name} ${busStop.number}, <br> ${stringLines}`)
            .on("click", () => this.setBusInfo(busStop, lines));
        }
        this.busStopMarkers.push(busStopMarker);
      });
    },
    setBusInfo(busStop, lines) {
      this.stopInfo = {
        lines: lines,
        name: busStop.name,
        number: busStop.number,
        id: busStop.id,
      };
    },
    async getLinesForMarker(laneId, stopId) {
      const response = await fetch(
        `https://api.um.warszawa.pl/api/action/dbtimetable_get/?id=88cd555f-6f31-43ca-9de4-66c479ad5942&busstopId=${laneId}&busstopNr=${stopId}&apikey=${settings.API}`
      );
      const data = await response.json();
      const lines = data.result
        .map((e) => e.values)
        .map((values) => values[0].value);
      const stringLines = lines.join(", ");
      return [lines, stringLines];
    },
    removeBusStopMarker(marker) {
      this.map.removeLayer(marker);
    },
  },
  computed: {
    didFoundStations() {
      return this.$store.getters["transport/didFoundStations"];
    },
    foundStations() {
      return this.$store.getters["transport/foundStations"];
    },
    busStopInfo() {
      return this.stopInfo;
    },
  },
  mounted() {
    this.initializeMap();
    this.getAllStops();
  },
};
</script>

<style scoped>
.map {
  width: 100%;
  height: 100%;
  z-index: 1;
  position: fixed;
  left: 0;
  top: 0;
}
</style>

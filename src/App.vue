<template>
  <div class="container">
    <longdo-map id="map" ref=map :zoom="15" :lastView="false" :fullscreen="true" @load="getCurrentLocation" />
  </div>
</template>

<script>

export default {
  name: 'App',
  comments: {},
  watch: {
    currentLocation() {
      this.getDataLocation();
    }
  },
  data() {
    return {
      currentLocation: null,
    }
  },
  methods: {
    getCurrentLocation(map) {
      console.log('map :', map);
      // REMOVE TOOLBAR
      this.removeToolbar(map)
      // GET CURRENT LOCATION (LAT,LON )
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        this.currentLocation = { lat, lon };
        console.log('this.currentLocation :', this.currentLocation);
        // REDIRECT TO CURRENT LOCATION
        map.location(this.currentLocation, true);
        // CREATE MARKER
        const marker = new window.longdo.Marker(this.currentLocation, { draggable: true, clickable: true });
        map.Overlays.add(marker);
        // UPDATE LOCATION (DROP MARKER)
        this.updateLocation(marker);
      }, (error) => {
        console.log(error.message);
      });
    },
    async getDataLocation() {
      const { VUE_APP_MAP_URL, VUE_APP_API_KEY } = process.env;
      const { data } = await this.axios.get(`${VUE_APP_MAP_URL}?lon=${this.currentLocation.lon}&lat=${this.currentLocation.lat}&key=${VUE_APP_API_KEY}`);
      console.log('response data :', data);
    },
    removeToolbar(map) {
      map.Ui.DPad.visible(false);
      map.Ui.Scale.visible(false);
      map.Ui.Toolbar.visible(false);
      map.Ui.Zoombar.visible(false);
      map.Ui.Crosshair.visible(false);
      map.Ui.Geolocation.visible(false);
      map.Ui.LayerSelector.visible(false);
    },
    updateLocation(marker) {
      marker.event.bind('overlayDrop', (event) => {
        this.currentLocation = event.location();
      })
    },
  }
}
</script>

<style scoped>
.container {
  height: 100vh;
}

#map {
  width: 100%;
  height: 100%;
}
</style>

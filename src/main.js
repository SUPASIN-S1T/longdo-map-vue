import Vue from "vue";
import App from "./App.vue";
import LongdoMap from "longdo-map-vue";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(VueAxios, axios);

Vue.use(LongdoMap, {
  load: {
    apiKey: "2a6ae86c42d37ccd68ef6f52bc324493",
  },
});

Vue.config.productionTip = false;
new Vue({
  render: (h) => h(App),
}).$mount("#app");

import { createStore } from "vuex";
import storeJurnal from "../modules/daybook/store/journal";

export default createStore({
  modules: {
    journal: storeJurnal,
  },
});

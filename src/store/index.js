import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const localData = localStorage.getItem("data");
const nonce = localData ? JSON.parse(localData).nonce : 0;

export default new Vuex.Store({
  state: {
    nonce: nonce,
    history: [],
    localData: localData || null,
  },
  getters: {
    getHistory(state) {
      return state.history;
    },
    getLocalData(state) {
      return state.localData;
    },
  },
  mutations: {
    error(state, data) {
      state.nonce++;
      data.nonce = state.nonce;
      state.history.push(
        "Не удалось сохранить данные",
        "Было отправлено: " + JSON.stringify(data)
      );
    },
    save(state, data) {
      data.nonce = state.nonce;
      state.nonce++;
      const dataPrev = state.localData;
      const localData = JSON.stringify(data);
      localStorage.setItem("data", localData);
      state.localData = localData;
      state.history.push(
        "Данные сохраненны",
        "До: " + dataPrev,
        "После: " + localData
      );
    },
    addToHistory(state, msg) {
      state.history.push(msg);
    },
  },
  actions: {
    addToHistory({ commit }, msg) {
      commit("addToHistory", msg);
    },
    async saveToServer({ commit }, data) {
      return new Promise((resolve) => {
        setTimeout(() => {
          if (data.amount % 2 === 0) {
            commit("save", data);
            return resolve({ success: true });
          }
          commit("error", data);
          return resolve({ success: false });
        }, 1000);
      });
    },
  },
});

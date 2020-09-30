import Vue from 'vue'
import Vuex from 'vuex'
import players from './modules/players';
import teams from './modules/teams';
import games from './modules/games';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    players,
    games,
    teams
  }
})

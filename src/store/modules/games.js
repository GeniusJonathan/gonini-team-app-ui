import axios from 'axios';

const state = {
    games: []
};

const getters = {
    allGames : state => state.games
};

const actions = {
    async fetchGames({commit}) {
        await axios
            .get('http://localhost:8081/api/games')
            .then(res => commit('setGames', res.data))
            .catch(err => console.log(err + ': Unable to retrieve games'))
    },

    async addGame({commit}, game) {
        await axios
            .post('http://localhost:8081/api/games', game)
            .then(res => commit('newGame', res.data))
            .catch(err => console.log(err + ': Unable to add new game'))
    },

    async updateGame({commit}, game) {
        await axios
            .put(`http://localhost:8081/api/games/${game.id}`, game)
            .then(res => commit('editGame', res.data))
            .catch(error => console.log(error));
    },

    async deleteGame({commit}, id) {
        await axios
        .delete(`http://localhost:8081/api/games/${id}`)
        .then(() => commit('removeGame', id))
        .catch(error => console.log(error));
    }
};

const mutations = {
    setGames: (state, games) => (state.games = games),
    newGame: (state, game) => (state.games.unshift(game)),
    editGame: (state, game) => {
        const index = state.games.findIndex(p => p.id === game.id);
        if (index !== -1)
            state.games.splice(index, 1, game)
    },
    removeGame: (state, id) => (state.games = state.games.filter(x => x.id !== id))
};

export default {
	state,
	getters,
	actions,
	mutations
};
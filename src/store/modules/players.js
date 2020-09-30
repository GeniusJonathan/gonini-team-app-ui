import axios from 'axios';

const state = {
    players: []
};

const getters = {
    allPlayers : state => state.players
};

const actions = {
    async fetchPlayers({commit}) {
        await axios
            .get('http://localhost:8081/api/players')
            .then(res => commit('setPlayers', res.data))
            .catch(err => console.log(err + ': Unable to retrieve players'))
    },

    async addPlayer({commit}, player) {
        await axios
            .post('http://localhost:8081/api/players', player)
            .then(res => commit('newPlayer', res.data))
            .catch(err => console.log(err + ': Unable to add new player'))
    },

    async updatePlayer({commit}, player) {
        await axios
            .put(`http://localhost:8081/api/players/${player.id}`, player)
            .then(res => commit('editPlayer', res.data))
            .catch(error => console.log(error));
    },

    async deletePlayer({commit}, id) {
        await axios
        .delete(`http://localhost:8081/api/players/${id}`)
        .then(() => commit('removePlayer', id))
        .catch(error => console.log(error));
    }
};

const mutations = {
    setPlayers: (state, players) => (state.players = players),
    newPlayer: (state, player) => (state.players.unshift(player)),
    editPlayer: (state, player) => {
        const index = state.players.findIndex(p => p.id === player.id);
        if (index !== -1)
            state.players.splice(index, 1, player)
    },
    removePlayer: (state, id) => (state.players = state.players.filter(x => x.id !== id))
};

export default {
	state,
	getters,
	actions,
	mutations
};
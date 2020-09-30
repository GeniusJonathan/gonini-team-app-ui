import axios from 'axios';

const state = {
    teams: []
};

const getters = {
    allTeams : state => state.teams
};

const actions = {
    async fetchTeams({commit}) {
        await axios
            .get('http://localhost:8081/api/teams')
            .then(res => commit('setTeams', res.data))
            .catch(err => console.log(err + ': Unable to retrieve teams'))
    },

    async addTeam({commit}, team) {
        await axios
            .post('http://localhost:8081/api/teams', team)
            .then(res => commit('newTeam', res.data))
            .catch(err => console.log(err + ': Unable to add new team'))
    },

    async updateTeam({commit}, team) {
        await axios
            .put(`http://localhost:8081/api/teams/${team.id}`, team)
            .then(res => commit('editTeam', res.data))
            .catch(error => console.log(error));
    },

    async deleteTeam({commit}, id) {
        await axios
        .delete(`http://localhost:8081/api/teams/${id}`)
        .then(() => commit('removeTeam', id))
        .catch(error => console.log(error));
    }
};

const mutations = {
    setTeams: (state, teams) => (state.teams = teams),
    newTeam: (state, team) => (state.teams.unshift(team)),
    editTeam: (state, team) => {
        const index = state.teams.findIndex(p => p.id === team.id);
        if (index !== -1)
            state.teams.splice(index, 1, team)
    },
    removeTeam: (state, id) => (state.teams = state.teams.filter(x => x.id !== id))
};

export default {
	state,
	getters,
	actions,
	mutations
};
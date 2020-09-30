<template>
  <v-data-table
    :headers="headers"
    :items="allGames"
    :hide-default-footer="true"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on"
              >New Item</v-btn
            >
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-select
                      v-model="editedItem.homeTeam"
                      :items="allTeams"
                      item-text="name"
                      item-value="id"
                      label="Home Team"
                    ></v-select>
                  </v-col> </v-row
                ><v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-select
                      v-model="editedItem.awayTeam"
                      :items="allTeams"
                      item-text="name"
                      item-value="id"
                      label="Away Team"
                    ></v-select>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="editedItem.date"
                      label="Date"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="editedItem.time"
                      label="Time"
                    ></v-text-field>
                  </v-col> </v-row
                ><v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="editedItem.details"
                      label="Details"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.score="{ item }">
      <div>
        <v-btn :color="getResultColor(item.score, item.isWon)" medium>
          {{ item.score }}
        </v-btn>
      </div>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      <v-btn color="primary" style="margin-left:5px" small rounded> Game Stats</v-btn>
      <v-btn color="primary" style="margin-left:5px" small rounded>Player Availability</v-btn>
    </template>
    <!-- <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template> -->
  </v-data-table>
</template>


<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data: () => ({
    dialog: false,
    headers: [
      { text: "Home Team", value: "homeTeam.name" },
      { text: "Away Team", value: "awayTeam.name" },
      { text: "Date", value: "date" },
      { text: "Time", value: "time" },
      { text: "Score", value: "score" },
      { text: "Details", value: "details" },
      { text: "Actions", value: "actions" },
    ],
    games: [],
    editedIndex: -1,
    editedItem: {
      homeTeam: {},
      awayTeam: {},
      date: "",
      time: "",
      details: "",
    },
    defaultItem: {
      homeTeam: {},
      awayTeam: {},
      date: "",
      time: "",
      details: "",
    },
    selectedHomeTeam: "",
    selectedAwayTeam: "",
    resultColor: "warning",
  }),

  computed: {
    ...mapGetters(["allGames", "allTeams"]),
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.fetchGames();
    this.fetchTeams();
  },

  methods: {
    ...mapActions([
      "fetchGames",
      "fetchTeams",
      "addGame",
      "updateGame",
      "deleteGame",
    ]),

    addNewItem() {
      let game = {
        homeTeamId: this.editedItem.homeTeam,
        awayTeamId: this.editedItem.awayTeam,
        date: this.editedItem.date,
        time: this.editedItem.time,
        details: this.editedItem.details,
      };
      this.addGame(game);
      this.close();
    },

    modifyGame() {
      let game = {
        id: this.editedItem.id,
        homeTeamId: this.editedItem.homeTeam,
        awayTeamId: this.editedItem.awayTeam,
        date: this.editedItem.date,
        time: this.editedItem.time,
        details: this.editedItem.details,
      };
      if (isNaN(this.editedItem.homeTeam)) {
        game.homeTeamId = this.editedItem.homeTeam.id;
      }
      if (isNaN(this.editedItem.awayTeam)) {
        game.awayTeamId = this.editedItem.awayTeam.id;
      }
      this.updateGame(game);
      this.close();
    },

    editItem(item) {
      this.editedIndex = item.id;
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      let confirmDelete = confirm("Are you sure you want to delete this item?");
      if (confirmDelete) {
        this.deleteGame(item.id);
      }
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        // Modify Game
        this.modifyGame();
      } else {
        // Add New Game
        this.addNewItem();
      }
      this.close();
    },

    getResultColor(score, result) {
      let noScore = "00 - 00";
      if (score == noScore) {
        return "warning";
      }
      if (score != noScore && result) {
        return "success";
      } else {
        return "error";
      }
    },
  },
};
</script>
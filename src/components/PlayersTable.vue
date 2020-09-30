<template>
  <v-data-table :headers="headers" :items="allPlayers" :hide-default-footer="true" class="elevation-1">
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
                    <v-text-field
                      v-model="editedItem.firstName"
                      label="First Name"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="editedItem.lastName"
                      label="Last Name"
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
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
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
      { text: "First Name", value: "firstName" },
      { text: "Last Name", value: "lastName" },
      { text: "Actions", value: "actions" },
    ],
    players: [],
    editedIndex: -1,
    editedItem: {
      firstName: "",
      lastName: "",
    },
    defaultItem: {
      firstName: "",
      lastName: "",
    },
  }),

  computed: {
    ...mapGetters(["allPlayers"]),
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
    this.fetchPlayers();
  },

  methods: {
    ...mapActions([
      "fetchPlayers",
      "addPlayer",
      "updatePlayer",
      "deletePlayer",
    ]),

    addNewItem() {
      let player = {
        firstName: this.editedItem.firstName,
        lastName: this.editedItem.lastName,
      };
      this.addPlayer(player);
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
        this.deletePlayer(item.id);
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
        // Modify Platyer
        this.updatePlayer(this.editedItem);
        this.close();
      } else {
        // Add New Player
        this.addNewItem();
      }
      this.close();
    },
  },
};
</script>
<template>
  <v-data-table :headers="headers" :items="allTeams" :hide-default-footer="true" class="elevation-1">
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
                      v-model="editedItem.name"
                      label="Name"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="editedItem.address"
                      label="Address"
                    ></v-text-field>
                  </v-col>
                </v-row><v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="editedItem.city"
                      label="City"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="editedItem.postalCode"
                      label="Postal Code"
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
      { text: "Team Name", value: "name" },
      { text: "Address", value: "address" },
      { text: "City", value: "city" },
      { text: "PostalCode", value: "postalCode" },
      { text: "Actions", value: "actions" },
    ],
    teams: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      address: "",
      city: "",
      postalCode: "",
    },
    defaultItem: {
      name: "",
      address: "",
      city: "",
      postalCode: "",
    },
  }),

  computed: {
    ...mapGetters(["allTeams"]),
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
    this.fetchTeams();
  },

  methods: {
    ...mapActions([
      "fetchTeams",
      "addTeam",
      "updateTeam",
      "deleteTeam",
    ]),

    addNewItem() {
      let team = {
        name: this.editedItem.name,
        address: this.editedItem.address,
        city: this.editedItem.city,
        postalCode: this.editedItem.postalCode,
      };
      this.addTeam(team);
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
        this.deleteTeam(item.id);
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
        // Modify Team
        this.updateTeam(this.editedItem);
        this.close();
      } else {
        // Add New Team
        this.addNewItem();
      }
      this.close();
    },
  },
};
</script>
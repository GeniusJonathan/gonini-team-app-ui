<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item v-for="view in views" :key="view.title" :to="view.link" link>
          <v-list-item-action>
            <v-icon>{{view.icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{view.title}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-email</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Contact</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Top Toolbar -->
    <v-app-bar app clipped-left color="teal"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Gonini Basketball</v-toolbar-title>
    </v-app-bar>

    <!-- Main Content -->
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>

    <!-- Footer -->
    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    props: {
      source: String,
    },

    data: () => ({
      drawer: null,
      views: [
      { title: "Dashboard", icon: "mdi-view-dashboard", link: "/" },
      { title: "Players", icon: "mdi-account-multiple", link: "/players" },
      { title: "Teams", icon: "mdi-shield-home", link: "/teams" },
      { title: "Games", icon: "mdi-calendar", link: "/games" },
      { title: "Stats", icon: "mdi-chart-bar", link: "/stats" }
    ]
    }),
  }
</script>

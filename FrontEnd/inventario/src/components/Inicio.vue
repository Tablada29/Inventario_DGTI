<template>
    <v-card
    class="fill-height elevation-0"
  >
    <v-app-bar
      color="primary"
      dark
    >
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>Sistema de Inventario de Equipos y Software de la DGCIF</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Inicio</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-desktop-tower-monitor</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Equipos</v-list-item-title>
          </v-list-item>


          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-microsoft-windows-classic</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Software</v-list-item-title>
          </v-list-item>


          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-briefcase-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Reguardante</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-file-sign</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Licitaciones</v-list-item-title>
          </v-list-item>

          <v-divider
          ></v-divider>
          <v-list-item class="v-list-item--sub-group">
            <v-list-item-icon>
              <v-icon>mdi-exit-to-app</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Salir</v-list-item-title>
          </v-list-item>
        </v-list-item-group>

        
        
      </v-list>
    </v-navigation-drawer>
    </v-card>

</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      group: null,
    };
  },
};
</script>
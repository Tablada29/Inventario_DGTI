<template>
  <v-app>
    <v-card class="fill-height elevation-0">
      <v-app-bar color="primary" dark>
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

        <v-toolbar-title
          >Sistema de Inventario de Equipos y Software de la
          DGCIF (SIES)</v-toolbar-title
        >
      </v-app-bar>
      <v-navigation-drawer v-model="drawer" absolute temporary>
        <v-list nav dense>
          <v-list-item-group
            v-model="group"
            active-class="greenOrgfis"
          >

            <template>
              <router-link to="/" tag="v-list-item">
                <v-list-item-icon>
                  <v-icon>mdi-home</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Inicio</v-list-item-title>
              </router-link>
            </template>


            <template>
              <router-link to="/equipos" tag="v-list-item">
                <v-list-item-icon>
                  <v-icon>mdi-desktop-tower-monitor</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Inventario</v-list-item-title>
              </router-link>
            </template>


            <!-- <v-list-item>
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
            </v-list-item> -->

            <v-divider></v-divider>
            <v-list-item class="v-list-item--sub-group">
              <v-list-item-icon>
                <v-icon>mdi-exit-to-app</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Salir</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
      <v-main>
        <router-view/>
      </v-main>
    </v-card>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    drawer: false,
    group: null,
  }),
};
</script>

<template>
  <v-app height="windowHeight" width="windowWidth">
    <v-app-bar
      color="primary"
      dense
      dark
    >
    <v-row>
      <v-col>
      <v-row>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title class="pt-2">Sistema de Gestión de Datos de Salud</v-toolbar-title>
      </v-row>
      </v-col>

      <v-spacer></v-spacer>
        <router-link to="/" color="white">Home</router-link>
      <v-spacer></v-spacer>

      <v-btn outlined color="white">
        <router-link to="/about">About</router-link>
      </v-btn>

      <v-menu
        left
        bottom
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="n in 5"
            :key="n"
            @click="() => {}"
          >
            <v-list-item-title>Option {{ n }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-row>

    </v-app-bar>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/upload">Subir</router-link>
    </nav>
    <router-view/>
    <v-overlay
      v-if="loginAttemp"
    >
      <LoginComponent/>
    </v-overlay>
    <v-btn huge color="primary" @click="loginAttemp = true">Login</v-btn>
    <FooterComponent class="position:fixed; bottom:0;"></FooterComponent>
  </v-app>
</template>

<script>
import FooterComponent from "./components/FooterComponent.vue";
import LoginComponent from "./components/LoginComponent.vue";
  export default {
    components: {
      FooterComponent,
      LoginComponent
       },
    data: () => ({
      links: [
        'Home',
        'About Us',
        'Team',
        'Services',
        'Blog',
        'Contact Us',
      ],
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth,
      loginAttemp : false
    }),
  }
</script>

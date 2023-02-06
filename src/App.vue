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
      v-if="registerAttemp"
    >
      <RegisterUser/>
    </v-overlay>
    <v-overlay
      v-if="loginAttemp"
    >
      <LoginComponent @login="handleLogin"></LoginComponent>
    </v-overlay>
    <v-btn huge color="primary" @click="loginAttemp = true">Login</v-btn>
    <v-btn huge color="primary" @click="registerAttemp = true">Register</v-btn>
    <FooterComponent class="position:fixed; bottom:0;"></FooterComponent>
    <v-alert
      v-if="loginSucces"
      elevation="3"
      type="success"
    >Se ha autenticado correctamente</v-alert>
  </v-app>
</template>

<script>
import FooterComponent from "./components/FooterComponent.vue";
import LoginComponent from "./components/LoginComponent.vue";
import RegisterUser from "./components/RegisterUser.vue";
  export default {
    components: {
      FooterComponent,
      LoginComponent,
      RegisterUser
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
      loginAttemp : false,
      registerAttemp: false,
      loginSucces: false,
    }),
    methods: {
      handleLogin (login) {
        if (login == 'success') {
          this.loginSucces = true;
        }
        this.loginAttemp = false;
      }
    },
  }
</script>

<template>
  <v-app height="windowHeight" width="windowWidth">
    <v-system-bar
      dark
      color="primary"
      window
      height=60
    >
      <v-row>
        <v-col
        cols=12
        md=4
        >
        <v-btn text primary>Sistema de gestión de datos de sensado</v-btn>
        </v-col>
        <v-col
        cols=12
        md=1
        class="primary  py-4 text-center white--text"
        >
        <v-btn text primary @click="loginAttemp = true">Autenticarse</v-btn>
        </v-col>
        <v-col
        cols=12
        md=1
        class="primary  py-4 text-center white--text"
        >
        <v-btn text primary @click="registerAttemp = true">Registrarse</v-btn>
        </v-col>
        <v-col
        cols=12
        md=1
        class="primary  py-4 text-center white--text"
        >
        <v-btn text primary @click="$router.push('upload/')">Manejo de Datos</v-btn>
        </v-col>
        <v-col
        cols=12
        md=2
        class="primary  py-4 text-center white--text"
        >
        <v-btn text primary>Acerca de este sitio</v-btn>
        </v-col>
      </v-row>
    </v-system-bar>
    <v-card height='100%'>
      <v-dialog
      v-model="registerAttemp"
    >
      <RegisterUser @register="handleRegister"></RegisterUser>
      </v-dialog>
    <v-dialog
      v-model="loginAttemp"
      width="300"
    >
      <LoginComponent @login="handleLogin"></LoginComponent>
      </v-dialog>
     <router-view/>
    <v-alert
      v-if="loginSuccess"
      elevation="3"
      type="success"
      @click="loginSuccess = false"
    >Se ha autenticado correctamente
    </v-alert>
    <v-alert
      v-if="noBalance"
      elevation="3"
      type="error"
      @click="noBalance = false"
    >Se ha autenticado correctamente
    </v-alert>
    <FooterComponent></FooterComponent>
    </v-card>
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
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth,
      loginAttemp : false,
      registerAttemp: false,
      loginSuccess: false,
      noBalance: false
    }),
    methods: {
      handleLogin (login) {
        if (login == 'correct') {
          this.loginSuccess = true;
        }
        this.loginAttemp = false;
      },
      handleRegister (register) {
        if (register == 'correct') {
          this.registerAttemp = true;
        }
        this.registerAttemp = false;
      },
      handleBalance (balance) {
        this.noBalance = balance;
      },
    },
  }
</script>

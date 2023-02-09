<template>
<v-card>
  <v-form>
    <v-container>
      <v-col>
        <v-btn
        text
        primary
        class="text-align: left"
        width="100%"
        >Introduzca sus datos:</v-btn>
        <v-row
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="names"
            label="Nombres"
            required
          ></v-text-field>
        </v-row>
        <v-row
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="lastNames"
            label="Apellidos"
            required
          ></v-text-field>
        </v-row>
        <v-row
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="username"
            label="Nombre de usuario"
            required
          ></v-text-field>
        </v-row>

        <v-row
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="secret"
            type="password"
            label="Contraseña"
            required
          ></v-text-field>
        </v-row>
        <v-row
          cols="12"
          md="4"
        >
          <v-text-field
          v-model="role"
          label="Rol"
          value="Curador"
          disabled
        ></v-text-field>
        </v-row>
        <v-row
          cols="12"
          md="4"
        >
          <v-text-field
          v-model="balance"
          label="Crédito"
          value="100.00"
          prefix="$"
          disabled
        ></v-text-field>
        </v-row>
      </v-col>
    </v-container>
  </v-form>
  <v-card-actions>
    <v-spacer></v-spacer>
     <v-btn
    color="success"
    @click="registerUser"
    >
    Registrar
    </v-btn>
    <v-btn
    color="error"
    @click="incorrectData"
    >
    Cancelar
    </v-btn>
  </v-card-actions>
</v-card>
</template>

<script>
export default {
    data: () => ({
      names: '',
      lastNames: '',
      username: '',
      secret: '',
      role: 'Curador de datos',
      balance: 100,
      userData: Object,
    }),
    methods: {
        async registerUser () {
            this.userData = await this.$axios.post('users', {
                username: this.username,
                secret: this.secret,
                names: this.names,
                lastNames: this.lastNames,
                role: this.role,
                balance: this.balance
            })
            .then(function (response) {
                console.log(response, 'brute response');
                return response.data.newUser;
            })
            .catch(function (error) {
                console.log(error);
            });
            this.$store.state.userData = this.userData;
            console.log(this.$store.state.userData);

            if (typeof this.userData !== 'undefined') {
              this.$emit('register', 'correct');
            }
        },
        incorrectData () {
          this.$emit('register', 'cancelled');
        },
    },
}
</script>

<style>

</style>
<template>
<v-card>
  <v-form>
    <v-container>
      <v-col>
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
     <v-btn
    color="success"
    @click="registerUser"
    >
    Entrar
    </v-btn>
    <v-btn
    color="error"
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
      role: 'curator',
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
        },
    },
}
</script>

<style>

</style>
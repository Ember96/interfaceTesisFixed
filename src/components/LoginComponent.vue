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
            v-model="username"
            label="Usuario"
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
      </v-col>
    </v-container>
  </v-form>
  <v-card-actions>
     <v-btn
    color="success"
    @click="login"
    >
    Entrar
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
      username: '',
      secret: '',
      userData: Object
    }),
    methods: {
        async login () {
            this.userData = await this.$axios.post('login', {
                username: this.username,
                secret: this.secret
            })
            .then(function (response) {
                console.log(response);
                return response.data.usuarioDb
            })
            .catch(function (error) {
                console.log(error);
            });
            this.$store.state.userData = this.userData;
            console.log(this.$store.state.userData);
            this.$emit('login', 'correct');
        },
        incorrectData () {
          this.$emit('login', 'cancelled');
        }
    },
}
</script>

<style>

</style>
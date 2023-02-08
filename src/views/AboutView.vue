<template>
  <v-card :height=windowHeight width="900" class="mx-auto" flat>
    <v-card-title color="red">Alerta de EARLY BETA</v-card-title>
    <v-card-text class="font-class-name">
      Este sistema se encuentra en un estado de beta extendida. 
      Ello implica que algunas funcionalidades podrían verse afectadas sin previo aviso durante los procesos de actualización.
      De igual manera podrían aparecer nuevas funcionalidades cuyo comportamiento no ha podido ser probado de forma exhaustiva.
      Se ruega no manejar información sensible como datos personales o credenciales de inicio de sesión comunes a otras plataformas.
      Favor de dirigirse con el fin de recibir soporte técnico al siguiente correo: <email>joserc@cicese.edu.mx</email>
    </v-card-text>
  </v-card>
</template>
<script>

export default ({
  data() {
    this.windowHeight = window.innerHeight*0.82;
  },
})
</script>
<style scoped>
.font-class-name {
  font-size: 20px;
}
</style>

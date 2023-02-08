<template>
  <v-footer
    color="primary lighten-1"
    padless
  >
    <v-row
      justify="center"
      class="text-center white--text"
      no-gutters
    >Este sistema no está pensado para su uso fuera del ambiente de pruebas de viabilidad
     con la participación de los estudiantes de la asignatura Ciencia de Datos para Sensores
      del Dpto. de Ciencias Computacionales.<br>Absténgase de emplearlo con cualquier otro fin 
      y conste que las interacciones con el mismo generan registro en propiedad de la institución a pie de página.
      <v-col
        class="primary lighten-2 py-4 text-center white--text"
        cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>CICESE</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
    data: () => ({
      links: [
        'Home',
        'About Us',
        'Team',
        'Services',
        'Blog',
        'Contact Us',
      ],
    }),
}
</script>

<style>

</style>
<template>
  <div class="home">
    <HelloWorld></HelloWorld>
    <FooterComponent></FooterComponent>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import FooterComponent from "../components/FooterComponent.vue";

export default {
  name: 'HomeView',
  components: {
    HelloWorld,
    FooterComponent
  }
}
</script>

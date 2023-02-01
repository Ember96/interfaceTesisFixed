<template>
  <v-card
    max-width="400"
    class="mx-auto"
  >
    <v-container>
      <v-row dense>
        <v-col cols="12">
          <v-card
            color="#385F73"
            dark
          >
            <v-card-title class="text-h5">
              Unlimited music now
            </v-card-title>

            <v-card-subtitle>Listen to your favorite artists and albums whenever and wherever, online and offline.</v-card-subtitle>

            <v-card-actions>
              <v-btn text>
                Listen Now
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

        
      </v-row>
    </v-container>
  </v-card>
</template>

<script>

  export default {
    name: 'HelloWorld',

    mounted() {
        if(!this.readWallet()){
          this.createWallet()
        }
      },

    data: () => ({
      web3Addr: null,
    }),
    methods: {
      setWeb3Addr() {
        this.$web3Addr = this.web3Addr;
      },
      readWallet() {
        return false;
      },
      createWallet() {
        return false
      },
      deployContract() {
        return false
      },

  }
  }
</script>

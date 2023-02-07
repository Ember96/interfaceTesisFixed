<template>
    <v-card width="80%" class="mx-auto">
    <div class="text-center d-flex pb-4">
      <v-row>
        <v-col
        cols=8
        md=2
        class="ml-5"
        >
        <v-switch
        v-model="unfold"
        inset
        label="Expandir"
        @click="unfoldFiles"
        ></v-switch>
        </v-col>
        <v-col
        cols=10
        md=7
        >
        <v-btn text color='blue' class="mt-4">Contratos activos por usuario<v-icon>mdi-refresh</v-icon></v-btn>
        </v-col>
      </v-row>
    </div>
    <v-expansion-panels
      v-model="panel"
      multiple
    >
      <v-expansion-panel
        v-for="(item,i) in items"
        :key="i"
      >
        <v-expansion-panel-header>Header {{ item }}</v-expansion-panel-header>
        <v-expansion-panel-content>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    </v-card>
</template>

<script>

  export default {
    name: 'HelloWorld',

    mounted() {
        this.getAllUsers()
      },

    data: () => ({
      panel: [],
      items: 5,
      usersFull: [],
      unfold: false,
    }),
    methods: {
      setWeb3Addr() {
        return false;
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
      unfoldFiles () {
        if (this.unfold) this.panel = [...Array(this.items).keys()].map((k, i) => i)
        else this.panel = []
      },
      async getAllUsers () {
        this.usersFull = await this.$axios.get('users');
        console.log(this.usersFull, 'all users');
      },
  }
  }
</script>

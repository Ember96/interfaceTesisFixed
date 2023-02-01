<template>
  <v-app>
    <v-card :height="windowHeight" :width="windowWidth">
    <v-card
    class="float-left ml-5"
    width="48.5%"
    height="45%"
    elevation="5"
    outlined
    shaped
    >
    <v-app-bar
            flat
            color="blue"
    >
    <v-icon dark class="pr-2">mdi-list-box-outline</v-icon>

            <v-toolbar-title class="text-h6 white--text pl-0">
              Listado de archivos
            </v-toolbar-title>
            <v-card
            class="ma-auto"
            >
            </v-card>
            <v-spacer></v-spacer>
            <v-btn
              color="white"
              icon
            >
              <v-icon>mdi-refresh</v-icon>
            </v-btn>
    </v-app-bar>
    <v-list
    class="ma-2"
    >
      <v-list-item-group v-model="model">
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <v-card-actions>
      <v-spacer/>
    </v-card-actions>

    </v-card>
    <v-card
    class="float-right mr-5"
    width="48.5%"
    max-height="80%"
    min-height="45%"
    elevation="5"
    outlined
    shaped
    >
    <UploadData
    ></UploadData>
    </v-card>
    <v-card
    class="float-end ma-5"
    width="98%"
    height="25%"
    elevation="5"
    outlined
    >
      <ContractStarter></ContractStarter>
    </v-card>
    </v-card>
  </v-app>
</template>

<script>
import UploadData from "../components/UploadData.vue";
import ContractStarter from "../components/ContractStarter.vue";

export default {
    components: {
        UploadData,
        ContractStarter,
    },
    data: () => ({
      items: [
        {
          icon: 'mdi-file',
          text: 'Some files',
        },
      ],
      model: 1,
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth,
    }),
    methods: {
    },
    mounted () {
    }
  }
</script>

<style>

</style>
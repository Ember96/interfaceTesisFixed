<template>
  <v-card>
    <v-app-bar
            flat
            color="blue"
    >
    <v-icon dark class="pr-2">mdi-folder-arrow-up-outline</v-icon>

            <v-toolbar-title class="text-h6 white--text pl-0">
              Subir a IPFS
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
              <v-icon>mdi-power-plug-off</v-icon>
            </v-btn>
    </v-app-bar>
      
    <v-card
    flat
    class="pa-2"
    >
      <v-btn text color='blue' class="font-weight-black">Información del archivo</v-btn>
      <v-col no-gutters>
        <v-row>
          <v-btn text color='blue'>Nombre: {{ name }} </v-btn>
        </v-row>
        <v-row>
          <v-btn text color='blue'>Tamaño: {{  size  }}</v-btn>
        </v-row>
        <v-row>
          <v-btn text color='blue'>Tipo: {{ type }}</v-btn>
        </v-row>
      </v-col>
    </v-card>
    <v-file-input
      class="pa-10 mx-auto"
      color="blue"
      accept="*"
      label="Presione para seleccionar un archivo"
      v-model="uploadBtn"
      @change="captureFile(uploadBtn)"
    ></v-file-input>
    <v-card-actions>
      <v-spacer/>
      <v-btn 
      dark 
      color="primary"
      large
      class="mr-8"
      @click="onSubmit"
      >
      Subir
      <v-icon
        right
        dark
      >
        mdi-cloud-upload
      </v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import ipfs from '../ipfs';
import { Buffer } from 'buffer';

export default {
    data: () => ({
      uploadBtn: [],
      buffer: '',
      name: '',
      size: 0,
      type: '',
    }),
    methods: {
      async convertToBuffer(reader) {
        return Buffer.from(reader);
      },
      captureFile(file) {
        console.log(file);
        this.name = file.name;
        this.size = file.size;
        this.type = file.type;
      const reader = new FileReader();
      if (typeof file !== 'undefined') {
        reader.readAsArrayBuffer(file);
        reader.onloadend = async () => {
          this.buffer = await this.convertToBuffer(reader.result);
          //console.log(this.buffer + 'while capture');
        };
      } else {
        this.buffer = '';
        //console.log(this.buffer + 'after capture');
      }
      
    },
    async onSubmit() {
      alert('Uploading on IPFS...');
      this.$root.loading = true;
      //let imgHash;
      let added = await ipfs.add(this.buffer);
      console.log(added);
      this.$emit('fileData', [this.type, this.name, this.size, added.path])
    },
    /**
     * validates if image & captions
     * are filled before submission.
     */
    handleOk() {
      if (!this.buffer || !this.caption) {
        alert('Please fill in the information.');
      } else {
        this.onSubmit();
      }
    },
    },
    mounted () {
    }
  }
</script>

<style>

</style>
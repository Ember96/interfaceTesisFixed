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
              <v-icon @click="fillFileList">mdi-refresh</v-icon>
            </v-btn>
    </v-app-bar>
    <v-list
    class="ma-2"
    >
      <v-list-item-group v-model="model">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Tipo</v-list-item-title>
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-title>Nombre de archivo</v-list-item-title>
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-title>Tamaño de archivo</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-for="(file, i) in files"
          :key="i"
        >
          <v-list-item-icon>
            <v-icon v-text="file.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="file.name"></v-list-item-title>
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-title>{{ file.size }} kilobytes</v-list-item-title>
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
    @fileData="getFileData"
    ></UploadData>
    </v-card>
    <v-card
    class="float-end ma-5"
    width="98%"
    height="25%"
    elevation="5"
    outlined
    >
      <ContractStarter :fileData="fileData"></ContractStarter>
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
      files: [],
      model: 1,
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth,
      fileData: [],
      userFiles: []
    }),
    methods: {
      getFileData(fileData) {
        this.fileData = fileData
        console.log(fileData);
        let icon = ""
        if (fileData[0].slice(0,5) == "image") icon = "mdi-image"
        else if (fileData[0].slice(0,5) == "audio") icon = "mdi-music-box-outline"
        else if (fileData[0].slice(0,5) == "video") icon = "mdi-movie-open-outline"
        else icon = "mdi-file"
        this.files.push({icon: icon, name: fileData[1], size: fileData[2]})
      },
      fillFileList () {
        console.log(this.userFiles);
        let files = this.userFiles
        files.forEach(element => {
          let icon = ""
          if (element.dataFormat.slice(0,5) == "image") icon = "mdi-image"
          else if (element.dataFormat.slice(0,5) == "audio") icon = "mdi-music-box-outline"
          else if (element.dataFormat.slice(0,5) == "video") icon = "mdi-movie-open-outline"
          else icon = "mdi-file"
          this.files.push({icon: icon, name: element.fileName, size: element.fileSize})
        });
      },
      async getUserFiles () {
        let id = this.$store.state.userData._id
        console.log(id);
        this.userFiles = await this.$axios.get(`users/${id}`)
            .then(function (response) {
                console.log(response);
                return response.data.files
            })
            .catch(function (error) {
                console.log(error);
            });
            console.log(this.userFiles);
            this.fillFileList();
      },
    },
    mounted () {
      this.getUserFiles()
    }
  }
</script>

<style>

</style>
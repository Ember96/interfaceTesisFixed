<template>
  <v-app>
    <v-card height="windowHeight" :width="windowWidth" class="mt-3">
    <v-card
    class="float-left ml-5"
    width="48.5%"
    height="60%"
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
      <v-list-item-group v-model="model" class="overflow-auto">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title><v-btn text color='blue'>Tipo</v-btn></v-list-item-title>
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-title><v-btn text color='blue'>Nombre de archivo</v-btn></v-list-item-title>
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-title><v-btn text color='blue'>Tamaño de archivo</v-btn></v-list-item-title>
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-title><v-btn text color='blue'>Acciones</v-btn></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      <v-list-item>
        <v-divider></v-divider>
      </v-list-item>
        <v-list-item
          v-for="(file, i) in files"
          :key="i"
        >
          <v-list-item-content>
            <v-icon v-text="file.icon"></v-icon>
          </v-list-item-content>
          <v-divider vertical></v-divider>
          <v-list-item-content>
            <v-list-item-title><v-btn text color='blue'>{{ file.name }}</v-btn></v-list-item-title>
          </v-list-item-content>
          <v-divider vertical></v-divider>
          <v-list-item-content>
            <v-list-item-title><v-btn text color='blue'>{{ file.size }} kilobytes</v-btn></v-list-item-title>
          </v-list-item-content>
          <v-divider vertical></v-divider>
        <v-list-item-content>
        <v-list-item-icon>
          <v-icon class="mx-auto" @click="getIpfsFile(i)">mdi-download</v-icon>
          <v-icon class="mx-auto" @click="deleteContract(i)">mdi-delete</v-icon>
        </v-list-item-icon>
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
    max-height="60%"
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
//import ipfs from '../ipfs';
//import { Buffer } from 'buffer';

export default {
    components: {
        UploadData,
        ContractStarter,
    },
    data: () => ({
      files: [],
      model: 1,
      windowHeight: window.innerHeight*0.7,
      windowWidth: window.innerWidth,
      fileData: [],
      userFiles: []
    }),
    methods: {
      getFileData(fileData) {
        this.fileData = fileData
        console.log(fileData, 'data received from upload');
        let icon = ""
        if (fileData[0].slice(0,5) == "image") icon = "mdi-image"
        else if (fileData[0].slice(0,5) == "audio") icon = "mdi-music-box-outline"
        else if (fileData[0].slice(0,5) == "video") icon = "mdi-movie-open-outline"
        else icon = "mdi-file"
        this.files.push({icon: icon, name: fileData[1], size: fileData[2], addr: fileData[3]})
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
          this.files.push({icon: icon, name: element.fileName, size: element.fileSize, addr: element.ipfsAddr, id: element._id})
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
      async getIpfsFile (index) {
        //let downloaded = await ipfs.cat(this.files[index][3]);
                          /*.then(function (response) {
                              console.log(response);
                              return response.data;
                          })
                          .catch(function (error) {
                              console.log(error);
                          });*/
          /*let content = [];
          console.log(this.files, 'all files');
          console.log(this.files[index].addr, 'file to cat');
        for await (const chunk of ipfs.cat(this.files[index].addr)) {
          content = [...content, ...chunk];
        }
        console.log(content);
        console.log(Buffer.from(content).toString('base64'), 'buffer');*/
        window.open('https://tesis.infura-ipfs.io/ipfs/' + this.files[index].addr);
      },
      async deleteContract (index) {
        await this.$axios.post(`data/${this.files[index].id}`)
          .then(function (response) {
              console.log(response, 'file delete brute response');
          })
          .catch(function (error) {
              console.log(error);
          });
      }
    },
    mounted () {
      this.getUserFiles()
    }
  }
</script>

<style>

</style>
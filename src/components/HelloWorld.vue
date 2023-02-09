<template>
    <v-card width="80%" class="mx-auto my-3" elevation=6>
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
        <v-btn text color='blue' class="mt-4" @click="getAllUsers">Contratos activos por usuario<v-icon>mdi-refresh</v-icon></v-btn>
        </v-col>
      </v-row>
    </div>
       <v-alert
      v-if="noBalance"
      elevation="3"
      type="error"
      @click="noBalance = false"
    >Necesitas más créditos
    </v-alert>
    <v-card
      :height=windowHeight
      class="overflow-auto"
    >
    <v-expansion-panels
      v-model="panel"
      multiple
    >
      <v-expansion-panel
        v-for="(item,i) in usersFull"
        :key="i"
      >
        <v-expansion-panel-header>
          <v-row>
            <v-col
            cols=12
            md=2
            >
            <v-chip
            color="primary"
            >
            {{ item.role }}
            </v-chip>
            </v-col>
            <v-col
            cols=12
            md=4
            class="text-left"
            >
            <v-btn
              text
              color="blue"
              >
                {{ item.names }} {{ item.lastNames }}
            </v-btn>
            </v-col>
          </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content
          v-for="(file,j) in item.files"
          :key="j"
        >
          <v-row class="background-color: blue"><v-btn text color='white'>Información de los datos: </v-btn>
            <v-spacer></v-spacer>
            <v-btn
            text
            color='white'
            @click="buy(i,j)"
            >Comprar
            </v-btn>
          </v-row>
          <v-row>
            <v-col
            cols=12
            md=4
            >
            <v-btn text color='blue'>Nombre de archivo: {{ file.fileName.slice(0,30) }}</v-btn>
            </v-col>
            <v-col
            cols=12
            md=3
            class="text-center"
            >
            <v-btn text color='blue'>Tamaño de archivo: {{ file.fileSize }} B</v-btn>
            </v-col>
            <v-col
            cols=12
            md=3
            class="text-center"
            >
            <v-btn text color='blue'>Formato de archivo: {{ file.dataFormat }}</v-btn>
            </v-col>
          </v-row>
            <v-row
            cols=12
            md=8
            >
            <v-btn text color='blue' class="ml-3">Etiquetas:</v-btn> 
                      <v-chip
                        class="mx-2 my-1"
                        color="primary"
                        v-for="(dataType,k) in file.dataTypes"
                        :key="k"
                      >
                        {{ dataType }}
                      </v-chip>
            </v-row>
            <v-row>
            <v-col
            cols=12
            md=4
            >
            <v-btn text color='blue'>Precio: {{ file.remuneration }}</v-btn>
            </v-col>
            <v-col
            cols=12
            md=2
            class="text-center"
            >
            <v-btn text color='blue' class="ml-2">Paciente: {{ file.patientNames }} {{ file.patientLastNames }}</v-btn>
            </v-col>
          </v-row>
          <v-divider></v-divider>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    </v-card>
    </v-card>
</template>

<script>

  export default {
    name: 'HelloWorld',

    beforeMount() {
        this.getAllUsers();
        this.windowHeight = window.innerHeight*0.70;
    },
    data: () => ({
      panel: [],
      panelItems: 5,
      usersFull: [],
      unfold: false,
      contractChosen: Number,
      noBalance: false,
      windowHeight: 0,
      windowWidth: window.innerWidth,
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
        if (this.unfold) this.panel = [...Array(this.panelItems).keys()].map((k, i) => i)
        else this.panel = []
      },
      async getAllUsers () {
        this.usersFull = await this.$axios.get('users')
        .then(function (response) {
                return response.data;
            });
        console.log(this.usersFull, 'all users');
        this.panelItems = this.usersFull.length;
        
      },
      getPanelContent () {
        this.panelItems = this.usersFull;
      },
      async buy (seller, chosenFile) {
        console.log(seller, chosenFile);
        let buyerNewBalance = this.$store.state.userData.balance - this.usersFull[seller].files[chosenFile].remuneration;
        console.log(buyerNewBalance);
        let sellerNewBalance = this.usersFull[seller].balance + this.usersFull[seller].files[chosenFile].remuneration;
        console.log(sellerNewBalance);
        let buyerNewFiles = this.$store.state.userData.files;
        let newFile = this.usersFull[seller].files[chosenFile];
        buyerNewFiles.push(this.usersFull[seller].files[chosenFile]._id);
        let buyerID = this.$store.state.userData._id;
        let sellerID = this.usersFull[seller]._id;
        if (buyerNewBalance >= 0) {
          await this.$axios.put(`users/${buyerID}`, {
                balance: buyerNewBalance
            })
            .then(function (response) {
                console.log(response, 'buyer update brute response');
            })
            .catch(function (error) {
                console.log(error);
            });

          /*await this.$axios.post(`data/${this.usersFull[seller].files[chosenFile]._id}`, {
            user_id: this.usersFull[seller]._id
            })
          .then(function (response) {
              console.log(response, 'file delete brute response');
          })
          .catch(function (error) {
              console.log(error);
          });*/

          await this.$axios.post('data', {
                ipfsAddr: newFile.ipfsAddr,//this.fileData[3],
                fileName: newFile.fileName,
                fileSize: newFile.fileSize,
                dataFormat: newFile.dataFormat,
                remuneration: newFile.remuneration,
                dataTypes: newFile.dataTypes,
                patientNames: newFile.patientNames,
                patientLastNames: newFile.patientLastNames,
                user_id: buyerID
            })
            .then(function (response) {
                console.log(response, 'new file for buyer');
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });

            await this.$axios.put(`users/${sellerID}`, {
                balance: sellerNewBalance
            })
            .then(function (response) {
                console.log(response, 'seller update brute response');
            })
            .catch(function (error) {
                console.log(error);
            });

        } else this.noBalance = true;
        this.getAllUsers();
      }
  }
  }
</script>

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
        <v-btn text color='blue' class="mt-4">Contratos activos por usuario<v-icon>mdi-refresh</v-icon></v-btn>
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
      :max-height=windowHeight
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
        <v-expansion-panel-header>{{ item.role }} {{ item.names }} {{ item.lastNames }}</v-expansion-panel-header>
        <v-expansion-panel-content
          v-for="(file,j) in item.files"
          :key="j"
        >
          <v-row>Información de los datos: 
            <v-spacer></v-spacer>
            <v-btn
            text
            color='blue'
            @click="buy(i,j)"
            >Comprar
            </v-btn>
          </v-row>
          <v-row>
            <v-col
            cols=12
            md=4
            >
            Nombre de archivo: {{ file.fileName }}
            </v-col>
            <v-col
            cols=12
            md=2
            class="text-center"
            >
            Tamaño de archivo: {{ file.fileSize }}
            </v-col>
            <v-col
            cols=12
            md=2
            class="text-center"
            >
            Formato de archivo: {{ file.dataFormat }}
            </v-col>
          </v-row>
            <v-row
            cols=12
            md=12
            class="text-center"
            >
            Etiquetas: <v-chip
                        class="ma-2"
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
            md=2
            class="text-center"
            >
            Precio: {{ file.remuneration }}
            </v-col>
            <v-col
            cols=12
            md=2
            class="text-center"
            >
            Paciente: {{ file.patientNames }} {{ file.patientLastNames }}
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
        buyerNewFiles.push(this.usersFull[seller].files[chosenFile]._id);
        let buyerID = this.$store.state.userData._id;
        if (buyerNewBalance >= 0) {
          await this.$axios.put(`users/${buyerID}`, {
                balance: buyerNewBalance,
                files: buyerNewFiles
            })
            .then(function (response) {
                console.log(response, 'buyer update brute response');
            })
            .catch(function (error) {
                console.log(error);
            });

          await this.$axios.post(`data/${this.usersFull[seller].files[chosenFile]._id}`, {
            user_id: this.usersFull[seller]._id,
            fileIndex: chosenFile
            })
          .then(function (response) {
              console.log(response, 'file delete brute response');
          })
          .catch(function (error) {
              console.log(error);
          });
        } else this.noBalance = true;
        
      }
  }
  }
</script>

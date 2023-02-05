<template>
<v-card>
        <v-app-bar
            flat
            color="blue"
    >
    <v-icon dark class="pr-2">mdi-file-sign</v-icon>

            <v-toolbar-title class="text-h6 white--text pl-0">
              Carta de consentimiento
            </v-toolbar-title>
            <v-card
            class="ma-auto"
            >
            </v-card>
            <v-spacer></v-spacer>
            <v-btn outlined color="white" :disabled="!consentCheck" @click="signContract">Firmar<v-icon>mdi-draw-pen</v-icon></v-btn>
    </v-app-bar>
  <v-form v-model="valid">
        <v-container>
          <v-row>
            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="firstname"
                :rules="nameRules"
                label="Nombre(s) del paciente"
                required
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="lastname"
                :rules="nameRules"
                label="Apellido(s) del paciente"
                required
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
            <v-text-field
                v-model="payment"
                label="Remuneración esperada"
                value="00.00"
                prefix="$"
            ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-combobox
                v-model="dataType"
                :items="dataTypeItems"
                :search-input.sync="search"
                hide-selected
                hint="Máximo 5 etiquetas"
                label="¿Qué tipo de datos contiene?"
                multiple
                persistent-hint
                small-chips
                clearable
              >
                <template v-slot:no-data>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>
                        No se encuentra "<strong>{{ search }}</strong>". Presione <kbd>Enter</kbd> para agregar esta etiqueta
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </template>
              </v-combobox>
            </v-col>
            <!--<v-col>
              <v-select
                :items="dataFormatItems"
                label="Formato de los datos"
              ></v-select>
            </v-col>-->
            <v-col>
              <v-checkbox
              v-model="consentCheck"
              label="Al marcar esta casilla confirma haber leído y aceptado la carta de consentimiento de uso de datos que puede encontrar en este enlace"
              color="success"
              value="success"
              hide-details
            ></v-checkbox>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
</template>

<script>
export default {
    props: ['fileData'],
    data: () => ({
      consentCheck: false,
      valid: false,
      firstname: '',
      lastname: '',
      nameRules: [
        v => !!v || 'Se necesita un nombre',
        v => v.length >= 2 || 'Demasiado corto',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      dataTypeItems: ['Grabaciones de voz', 'Electrocardiograma', 'Trazas de movilidad', 'Historial médico'],
      //dataFormatItems: ['Audio', 'Video', 'Imagen', 'Documento', 'Otro'],
      dataType: [],
      search: null,
      payment: Number
    }),
    watch: {
      dataType (val) {
        if (val.length > 5) {
          this.$nextTick(() => this.dataType.pop())
        }
      },
    },
    methods: {
      async signContract () {
        console.log(this.fileData);
        await this.$axios.post('data', {
                ipfsAddr: 'me lo acabo de inventar',//this.fileData[3],
                fileName: this.fileData[1],
                fileSize: this.fileData[2],
                dataFormat: this.fileData[0],
                remuneration: this.payment,
                dataTypes: this.dataType,
                patientNames: this.firstname,
                patientLastNames: this.lastname,
                user_id: '63de24bc09fbd8f7689f55aa'
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
      }
    },
}
</script>

<style>

</style>
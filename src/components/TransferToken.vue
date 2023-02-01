<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
    max-width="900"
  >
    <v-text-field
      v-model="destinatario"
      :counter="42"
      :rules="emailRules"
      label="Destinatario"
      required
    ></v-text-field>

    <v-text-field
      v-model="amount"
      :rules="[v => !!v || 'Elija una cantidad']"
      label="Cantidad"
      required
    >
    <v-icon
      slot="append"
      color="red"
    >
      mdi-plus
    </v-icon>
    <v-icon
      slot="prepend"
      color="green"
    >
      mdi-minus
    </v-icon>
  </v-text-field>
    <v-checkbox
      v-model="checkbox"
      :rules="[v => !!v || 'Debe marcar la casilla para dar su consentimiento']"
      label="¿Entiende que esta operación es irreversible?"
      required
    ></v-checkbox>

    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="validate"
    >
      Transferir
    </v-btn>

    <v-btn
      color="error"
      class="mr-4"
      @click="reset"
    >
      Limpiar
    </v-btn>
    <br>
    <v-divider v-if="success"></v-divider>
    <br>
    <v-alert
      dense
      text
      type="success"
      v-if="success"
    >
      La transacción se completó <strong>correctamente</strong>
    </v-alert>
  </v-form>
</template>

<script>

import Web3 from "web3";
const web3 = new Web3('http://127.0.0.1:9933');

export default {
name: 'TransferToken',
data: () => ({
      valid: true,
      destinatario: '',
      amount: 0,
      emailRules: [
        v => !!v || 'Se requiere un destinatario',
      ],
      checkbox: false,
      success: false
    }),

    methods: {
      async validate () {
        const createTransaction = await web3.eth.accounts.signTransaction(
        {
         to: this.destinatario,
         value: web3.utils.toWei(this.amount, 'ether'),
         gas: 21000,
        },
      this.$privKey
      );
      const createReceipt = await web3.eth.sendSignedTransaction(
      createTransaction.rawTransaction
      );
      console.log(
          `Transaction successful with hash: ${createReceipt.transactionHash}`
      );
      this.success = true
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },

    },
}
</script>

<style>

</style>
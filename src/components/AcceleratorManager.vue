<template>
    <v-card>
        <v-card-title>
            <h2 class="indigo--text">Lectura del Acelerómetro</h2>
        </v-card-title>
        <v-card-text>
            <label class="indigo--text">Aceleración en el eje X: </label> <v-input type="number" v-model="accelerometer.x"></v-input>
            <label class="indigo--text">Aceleración en el eje Y: </label> <v-input type="number" v-model="accelerometer.y"></v-input>
            <label class="indigo--text">Aceleración en el eje Z: </label> <v-input type="number" v-model="accelerometer.z"></v-input>
            <label class="indigo--text">Timestamp: </label> <v-input type="number" v-model="accelTimestamp"></v-input>
        </v-card-text>
        <v-card-actions>
            <v-btn color="primary" @click="startAccelerator">Iniciar</v-btn>
            <v-btn color="warning" @click="stopAccelerator">Detener</v-btn>
            <v-btn color="error" @click="resetAccelerator">Reiniciar</v-btn>
            <v-btn color="success" @click="downloadAccelRec">Guardar</v-btn>
        </v-card-actions>
    </v-card>


</template>

<script>
export default {
    name: "AcceleratorManager",
    data() {
        return {
            accelerometer: {},
            accelRec: new String(),
            accelTimestamp: new String(),
        }
    },
    methods : {
        startAccelerator() {
            console.log("Iniciando el sensor de aceleración");
            this.accelerometer.start();
            console.log(this.accelerometer.x)
        },
        stopAccelerator() {
            console.log("Deteniendo el sensor de aceleración");
            this.accelerometer.stop();
        },
        resetAccelerator() {
            console.log("Reiniciando el sensor de aceleración");
            this.accelRec = new String();
        },
        downloadAccelRec() {
            let hiddenElement = document.createElement('a');
            hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(this.accelRec);
            hiddenElement.target = '_blank';
            hiddenElement.download = 'Accelerometer Record.csv';
            hiddenElement.click();
        },
        acceleratorInstance() {
            let accelerometer = new LinearAccelerationSensor({ frequency: 200 });
            let accelDate;
            accelerometer.addEventListener("reading", () => {
                this.accelerometer = accelerometer;
                accelDate = new Date();
                this.accelTimestamp = accelDate.getSeconds() + "." + accelDate.getMilliseconds();
                this.accelRec += this.accelerometer.x.toFixed(5) + "," + this.accelerometer.y.toFixed(5) + "," + this.accelerometer.z.toFixed(5) + "," + this.accelTimestamp
                this.accelRec += "\n";
            });
        }
    },
    mounted() {
        this.acceleratorInstance();
    }
}
</script>

<style scoped>

</style>
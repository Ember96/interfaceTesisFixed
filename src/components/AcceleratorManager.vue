<template>
    <v-card>
        <v-card-title>
            <h2 class="indigo--text">Lectura del Acelerómetro</h2>
        </v-card-title>
        <v-card-text>
            <ul>
                <v-col>
                    <v-row>
                        <v-col cols="8">
                            <label class="indigo--text">Aceleración en el eje X: </label>
                        </v-col>
                        <v-col cols="4">
                            <v-input type="number" v-model="accelX">{{ accelX }}</v-input>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="8">
                            <label class="indigo--text">Aceleración en el eje Y: </label>
                        </v-col>
                        <v-col cols="4">
                            <v-input type="number" v-model="accelY">{{ accelX }}</v-input>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="8">
                            <label class="indigo--text">Aceleración en el eje Z: </label>
                        </v-col>
                        <v-col cols="4">
                            <v-input type="number" v-model="accelZ">{{ accelX }}</v-input>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="8">
                            <label class="indigo--text">Timestamp: </label>
                        </v-col>
                        <v-col cols="4">
                            <v-input type="number" v-model="accelTimestamp">{{ accelX }}</v-input>
                        </v-col>
                    </v-row>
                </v-col>
            </ul>
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
            accelX: new Number(),
            accelY: new Number(),
            accelZ: new Number(),
            accelRec: new String(),
            accelTimestamp: new String(),
        }
    },
    methods : {
        startAccelerator() {
            console.log("Iniciando el sensor de aceleración");
            this.accelerometer.start();
            console.log(this.accelX)
        },
        stopAccelerator() {
            console.log("Deteniendo el sensor de aceleración");
            this.accelerometer.stop();
        },
        resetAccelerator() {
            console.log("Reiniciando el sensor de aceleración");
            this.accelRec = new String();
            this.accelX = new String();
            this.accelY = new String();
            this.accelZ = new String();
        },
        downloadAccelRec() {
            let hiddenElement = document.createElement('a');
            hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(this.accelRec);
            hiddenElement.target = '_blank';
            hiddenElement.download = 'Accelerometer Record.csv';
            hiddenElement.click();
        },
        acceleratorInstance() {
            this.accelerometer = new LinearAccelerationSensor({ frequency: 200 });
            let accelDate;
            this.accelerometer.addEventListener("reading", () => {
                accelDate = new Date();
                this.accelX = this.accelerometer.x.toFixed(5);
                this.accelY = this.accelerometer.y.toFixed(5);
                this.accelZ = this.accelerometer.z.toFixed(5);

                this.accelTimestamp = accelDate.getSeconds() + "." + accelDate.getMilliseconds();
                this.accelRec += this.accelX + "," + this.accelY + "," + this.accelZ + "," + this.accelTimestamp
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
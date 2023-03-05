<template>
    <v-card>
        <v-card-title>
            <h1>Lecturas del sensor de aceleración</h1>
        </v-card-title>
        <v-card-text>
            <label>Velocidad angular en el eje X: </label> <v-input type="number" v-model="angularSpeedX" />
            <label>Velocidad angular en el eje Y: </label> <v-input type="number" v-model="angularSpeedY" />
            <label>Velocidad angular en el eje Z: </label> <v-input type="number" v-model="angularSpeedZ" />
            <label>Timestamp: </label> <v-input type="number" v-model="accelTimestamp" />
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

let accelerometer = new LinearAccelerationSensor({ frequency: 200 });
let accelDate;
let accelTimestamp = new String();
let accelRec = new String();

accelerometer.addEventListener("reading", () => {
    accelDate = new Date();
    accelTimestamp = accelDate.getSeconds() + "." + accelDate.getMilliseconds();
    accelRec += accelerometer.x.toFixed(5) + "," + accelerometer.y.toFixed(5) + "," + accelerometer.z.toFixed(5) + "," + accelTimestamp
    accelRec += "\n";
});
export default {
    name: "AcceleratorManager",
    data() {
        return {
            angularSpeedX: accelerometer.x,
            angularSpeedY: accelerometer.y,
            angularSpeedZ: accelerometer.z,
            accelTimestamp: accelTimestamp
        }
    },
    methods : {
        startAccelerator() {
            console.log("Iniciando el sensor de aceleración");
            accelerometer.start();
        },
        stopAccelerator() {
            console.log("Deteniendo el sensor de aceleración");
            accelerometer.stop();
        },
        resetAccelerator() {
            console.log("Reiniciando el sensor de aceleración");
            accelRec = new String();
        },
        downloadAccelRec() {
            let hiddenElement = document.createElement('a');
            hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(accelRec);
            hiddenElement.target = '_blank';
            hiddenElement.download = 'Accelerometer Record.csv';
            hiddenElement.click();
        }
    }
}
</script>

<style scoped>

</style>
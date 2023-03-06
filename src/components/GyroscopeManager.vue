<template>
    <v-card>
        <v-card-title>
            <h2 class="blue--text">Lecturas del Giroscopio</h2>
        </v-card-title>
        <v-card-text>
            <label class="blue--text">Velocidad angular en el eje X: {{ gyroX }} RPS</label>
            <br>
            <label class="blue--text">Velocidad angular en el eje Y: {{ gyroY }} RPS</label>
            <br>
            <label class="blue--text">Velocidad angular en el eje Z: {{ gyroZ }} RPS</label>
            <br>
            <label class="blue--text">Timestamp: {{ gyroTimestamp }} segundos.milésimas</label>
        </v-card-text>
        <v-card-actions>
            <v-btn color="primary" @click="startGyroscope">Iniciar</v-btn>
            <v-btn color="warning" @click="stopGyroscope">Detener</v-btn>
            <v-btn color="error" @click="resetGyroscope">Reiniciar</v-btn>
            <v-btn color="success" @click="downloadGyroRec">Guardar</v-btn>
        </v-card-actions>
    </v-card>


</template>

<script>

let gyroscope = new Gyroscope({ frequency: 200 });
let gyroDate;
let gyroTimestamp = new String();
let gyroRec = new String();

gyroscope.addEventListener("reading", () => {
    gyroDate = new Date();
    gyroTimestamp = gyroDate.getSeconds() + "." + gyroDate.getMilliseconds();
    gyroRec += gyroscope.x.toFixed(5) + "," + gyroscope.y.toFixed(5) + "," + gyroscope.z.toFixed(5) + "," + gyroTimestamp
    gyroRec += "\n";
});
export default {
    name: "GyroscopeManager",
    data() {
        return {
            gyroX: gyroscope.x,
            gyroY: gyroscope.y,
            gyroZ: gyroscope.z,
            gyroTimestamp: gyroTimestamp
        }
    },
    methods : {
        startGyroscope() {
            console.log("Iniciando el giroscopio");
            gyroscope.start();
        },
        stopGyroscope() {
            console.log("Deteniendo el giroscopio");
            gyroscope.stop();
        },
        resetGyroscope() {
            console.log("Reiniciando el girosocpio");
            gyroRec = new String();
        },
        downloadGyroRec() {
            let hiddenElement = document.createElement('a');
            hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(gyroRec);
            hiddenElement.target = '_blank';
            hiddenElement.download = 'Gyroscope Record.csv';
            hiddenElement.click();
        }
    }
}
</script>

<style scoped>

</style>
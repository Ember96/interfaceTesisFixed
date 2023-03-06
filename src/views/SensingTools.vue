<template>
    <v-card>
    <v-tabs
        color="primary"
        v-model="tab"
        centered
    >
        <v-tabs-slider></v-tabs-slider>

        <v-tab>
            Acelerómetro
        </v-tab>

        <v-tab>
            Giroscopio
        </v-tab>

        <v-tab>
            Geolocalización
        </v-tab>
    </v-tabs>
        <v-tabs-items v-model="tab">
            <v-tab-item>
                <v-card flat class="mx-auto fit" >
                    <AcceleratorManager />
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card flat>
                    <GyroscopeManager class="mx-auto fit flat" />
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card flat>
                    geo
                </v-card>
            </v-tab-item>
        </v-tabs-items>
    </v-card>
</template>

<script>
import AcceleratorManager from '../components/AcceleratorManager.vue'
import GyroscopeManager from '../components/GyroscopeManager.vue'
export default {
    name: "SensingTools",
    components : {
        AcceleratorManager,
        GyroscopeManager
    },
    data() {
        return {
            tab: 0
        }
    }
}
</script>

<style scoped>
    .fit {
        width: min-content;
    }
</style>
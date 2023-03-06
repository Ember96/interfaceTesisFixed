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
            <v-icon>mdi-phone</v-icon>
        </v-tab>

        <v-tab>
            Giroscopio
            <v-icon>mdi-heart</v-icon>
        </v-tab>

        <v-tab>
            Geolocalización
            <v-icon>mdi-account-box</v-icon>
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
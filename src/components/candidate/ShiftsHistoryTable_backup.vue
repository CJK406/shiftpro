<!-- This example requires Tailwind CSS v2.0+ -->
<template>
<Loader :loader_flag="loader_flag" />

    <div class="grid lg:grid-cols-8 md:grid-cols-8 gap-1 mb-8 search-bar">
        <div class="lg:col-span-8 md:col-span-8 wrapper-select2">
            <Select2
                :placeholder="placeholder"
                v-model="myValue"
                :options="myOptions"
                :settings="{ settingOption: value, settingOption: value }"
                @change="myChangeEvent($event)"
                @select="mySelectEvent($event)"
            />
            <button
                @click="set_clear"
                class="p-2 ml-2 w-9 rounded-2xl text-center btn-cancel"
            >
                <img
                    class="w-8"
                    :src="require('../../assets/images/clear.png')"
                />
            </button>
            <!-- <button  @click="set_filter" class="p-2  rounded-2xl w-9 text-center"><img class="w-8" :src="require('../../assets/images/search.png')" /></button> -->
        </div>
        <div
            v-click-away="onClickAway"
             class="lg:col-span-4 md:col-span-4 flex items-center relative  justify-center"
        >
            <button
                class="flex secondary_button ml-8"
                v-on:click="filter_open"
            >
                Filters
                <ChevronDownIcon class="w-4 h-4 ml-2" />
            </button>
            <div class="filter-list" v-show="filterBox">
                <div class="rating pt-2.5 pb-2.5 filter_split">
                    <div
                        class="flex items-center cursor-pointer"
                        v-on:click="filter_star"
                    >
                        <p class="font-semibold filter-string">Star</p>
                        <ChevronDownIcon class="w-4 h-4 ml-2" />
                    </div>
                    <div v-show="filterStar">
                        <div class="flex items-center">
                            <input
                                type="radio"
                                name="rating"
                                v-bind:value="'4'"
                                v-model="starValue"
                            />
                            <p class="cursor-pointer pl-2.5 py-2.5 filter_value_string">4+</p>
                        </div>
                        <div class="flex items-center">
                            <input
                                type="radio"
                                name="rating"
                                v-bind:value="'3'"
                                v-model="starValue"
                            />
                            <p class="cursor-pointer pl-2.5 py-2.5 filter_value_string">3+</p>
                        </div>
                        <div class="flex items-center">
                            <input
                                type="radio"
                                name="rating"
                                v-bind:value="'2'"
                                v-model="starValue"
                            />
                            <p class="cursor-pointer pl-2.5 py-2.5 filter_value_string">2+</p>
                        </div>
                        <div class="flex items-center">
                            <input
                                type="radio"
                                name="rating"
                                v-bind:value="'0'"
                                v-model="starValue"
                            />
                            <p class="cursor-pointer pl-2.5 filter_value_string">No Star filter</p>
                        </div>
                    </div>
                </div>

                <div class="distance pt-2.5 pb-2.5 filter_split">
                    <div class="flex items-center" v-on:click="filter_rating">
                        <p class="font-semibold filter-string">Rate (£)</p>
                        <ChevronDownIcon class="w-4 h-4 ml-2" />
                    </div>
                    <div v-show="filterRating" class="pt-2.5 pb-2.5">
                        <div class="flex">
                            <div>
                                <input
                                    class="w-full"
                                    type="range"
                                    min="10"
                                    max="50"
                                    v-model="ratingValue"
                                />
                                <div class="flex justify-between">
                                    <p class="min filter_value_string">£8.00</p>
                                    <p class="max filter_value_string">£50.00</p>
                                </div>
                            </div>
                            <div class="ml-2">
                                <span class="filter_value_string">{{
                                    this.ratingValue
                                }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="distance pt-2.5 pb-2.5 filter_split">
                    <div class="flex items-center" v-on:click="filter_distance">
                        <p class="font-semibold filter-string">Distance</p>
                        <ChevronDownIcon class="w-4 h-4 ml-2" />
                    </div>
                    <div v-show="filterDistance" class="pt-2.5 pb-2.5">
                        <div class="flex">
                            <div>
                                <input
                                    class="w-full"
                                    type="range"
                                    min="1"
                                    max="20"
                                    v-model="distanceValue"
                                />
                                <div class="flex justify-between">
                                    <p class="min filter_value_string">1mi</p>
                                    <p class="max filter_value_string">20mi</p>
                                </div>
                            </div>
                            <div class="ml-2">
                                <span class="filter_value_string">{{
                                    this.distanceValue
                                }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="text-center apply pb-2.5 pt-2.5 pb-2.5">
                    <!-- <button v-on:click="filter">Apply</button> -->
                    <button class="main_button m-auto" v-on:click="filter"><span>Apply</span></button>

                </div>
            </div>
        </div>
    </div>

    <div class="flex flex-col">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div
                class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"
            >
                <div
                    class="overflow-hidden border-b border-gray-200 sm:rounded-lg"
                >
                    <table
                        id="datatable"
                        class="min-w-full divide-y divide-gray-200"
                    >
                        <Head />
                        <tbody>
                            <Row
                                v-for="shift in shift_data"
                                :key="shift.id"
                                :shift="shift"
                            />
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<style type="text/css">
@import "../../common.css";
</style>
<script>
import Head from "./ShiftsHistoryTable/Head.vue";
import Row from "./ShiftsHistoryTable/Row.vue";
import { mapGetters, mapActions } from "vuex";
import { mixin as VueClickAway } from "vue3-click-away";
import Loader from '@common/Loader.vue'

import Select2 from "vue3-select2-component";
import { ChevronDownIcon } from "@heroicons/vue/outline";
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
export default {
    components: {
        Head,
        Row,
        ChevronDownIcon,
        Select2,
        Loader
    },
    data: () => ({
        loader_flag: false,
        shift_data: [],
        table: "",
        filterBox: false,
        filterRating: false,
        filterStar: false,
        filterDistance: false,
        ratingValue: 50,
        starValue: "",
        distanceValue: 20,
        myValue: "",
        shift_filter: "",
    }),
    computed: {
        ...mapGetters({
            getShiftComplete: "candidate/getShiftComplete",
            shiftPanelData: "candidate/getCurrentPanel",
            getShiftRole: "candidate/getShiftRole",
        }),
    },
    watch: {
        getShiftComplete: function () {
            this.updateHandler();
        },
        getShiftRole: function () {
            this.changeKeyObject();
        },
    },
    mounted() {
        this.fetachShiftRole();
        this.FetchgetShiftsComplete();
        this.changeKeyObject();

        for (let i = 0; i < this.getShiftComplete.length; i++) {
            // let miles = parseFloat(this.getShiftComplete[i]['distance'].split(' miles')[0]);
            // if(parseFloat(this.distanceValue)>= miles)
            this.shift_data.push(this.getShiftComplete[i]);
        }
        setTimeout(() => {
            this.table = $("#datatable").DataTable({
                 language: {
                    paginate: {
                    previous: '&#x2039',
                    next: '&#x203A;'
                    }
                }
            });
        }, 10);
    },
    mixins: [VueClickAway],

    methods: {
        ...mapActions({
            FetchgetShiftsComplete: "candidate/FetchgetShiftsComplete",
            fetachShiftRole: "candidate/fetachShiftRole",
        }),
        updateHandler() {
            this.shift_data = [];
            if (this.table != "") {
                $("#datatable").DataTable().destroy();
            }
            for (let i = 0; i < this.getShiftComplete.length; i++) {
                if (
                    this.getShiftComplete[i]["role"]
                        .toLowerCase()
                        .includes(this.shift_filter.toLowerCase()) &&
                    parseFloat(this.ratingValue) >=
                        parseFloat(this.getShiftComplete[i]["rate"])
                )
                    this.shift_data.push(this.getShiftComplete[i]);
            }
            setTimeout(() => {
                this.table = $("#datatable").DataTable({
                     language: {
                    paginate: {
                    previous: '&#x2039',
                    next: '&#x203A;'
                    }
                }
                });
            }, 10);
        },
        //   set_filter (){
        //       this.loader_flag=true;
        //       this.updateHandler();
        //       setTimeout(() => {
        //       this.loader_flag=false
        //       }, 500);
        // },
        onClickAway() {
            this.filterBox = false;
        },
        set_clear() {
            this.loader_flag = true;
            this.myValue = "";
            this.shift_filter = "";
            this.updateHandler();
            setTimeout(() => {
                this.loader_flag = false;
            }, 500);
        },
        myChangeEvent() {},
        mySelectEvent({ id, role }) {
            this.shift_filter = role;
            this.myValue = id;
            this.loader_flag = true;
            this.updateHandler();
            setTimeout(() => {
                this.loader_flag = false;
            }, 500);
        },
        changeKeyObject() {
            let obj = this.getShiftRole;
            for (let i = 0; i < obj.length; i++) {
                obj[i]["text"] = obj[i]["role"];
            }
            this.myOptions = obj;
        },
        filter_open() {
            this.filterBox = !this.filterBox;
        },
        filter() {
            this.updateHandler();
            this.filterBox = !this.filterBox;
        },
        filter_rating() {
            this.filterRating = !this.filterRating;
        },
        filter_star() {
            this.filterStar = !this.filterStar;
        },
        filter_distance() {
            this.filterDistance = !this.filterDistance;
        },
    },
};
</script>

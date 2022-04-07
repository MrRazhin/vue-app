<template>
<el-container>
    <el-header>
        <el-menu :default-active="activeIndex" mode="horizontal" :router="true">
            <el-menu-item index="/" :route="{ name: 'Home' }">
                Главная страница
            </el-menu-item>
            <el-menu-item index="/login" :route="{ name: 'Login' }">
                Авторизация
            </el-menu-item>
            <el-menu-item index="/shop" :route="{ name: 'Shop' }">
                Магазин
            </el-menu-item>
        </el-menu>
    </el-header>

    <el-container>
        <el-aside style="width: 50%">
            <h2 style="text-align: center">Список пользователей</h2>

            <users-form :data="Users" v-if="usersLoading" :flag="{loading: true}"/>
            <users-form :data="Users" v-else :flag="null"/>


            <el-pagination
                background
                layout="prev, pager, next"
                @current-change="handleCurrentChange"
                :total="15"
                :page-size="pageSize"
                style="text-align: center; margin-top: 10px;">
            </el-pagination>
        </el-aside >

        <el-main style="width: 50%; padding-top: 0">
            <h2 style="text-align: center">События</h2>

            <events-form :data="EventsData" v-if="EventsData.length == 0" :flag="{loading: true}"/>
            <events-form :data="EventsData" v-else :flag="null"/>
        </el-main>

    </el-container>

</el-container>
</template>

<script>
import UsersForm from '../components/usersForm.vue';
import EventsForm from '../components/eventsForm.vue';
import axios from 'axios';
import VueNativeSock from 'vue-native-websocket';
import Vue from 'vue';

export default {

    components: { UsersForm, EventsForm },

    data() {
        return {
            usersLoading: false,

            activeIndex: '/',

            UsersData: [],
            Users: [],
            EventsData: [],

            page: 1,
            pageSize: 5,
            total: 0,
        }
    },

    methods: {
        loadUsers() {
            this.usersLoading = true;
            setTimeout(() => {
                axios.get('https://test.relabs.ru/api/users/list', {
                    params: {
                        limit: 5,
                        offset: (this.page-1) * 5,
                    }
                })
                    .then(resonse => this.UsersData = resonse.data)
                    .then(() => this.Users = this.UsersData.items)
                    .then(() => this.total = this.UsersData.total)
                    .then(this.usersLoading = false);
            }, 1000);

        },

        loadEvents() {
            Vue.use(VueNativeSock, 'wss://test.relabs.ru/event', {format: 'json'});
            console.log('Concting...')
            this.$options.sockets.onmessage = (resonse) => {
                this.EventsData.unshift(JSON.parse(resonse.data));
                }
        },

        handleCurrentChange(val) {
            this.page = val;
        },

        checkLogin() {
            let login = localStorage.getItem('login');
            console.log(login)
            if (login == 'false' || login == null) {
                this.$router.push('/login')
            }
        }

    },

    watch: {
        page() {
            this.loadUsers();
        }
    },

    created() {
        this.checkLogin();
        this.loadUsers();
        this.loadEvents();
    }
}
</script>
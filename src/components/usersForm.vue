<template>
    <el-table :data="data" v-loading="flag" empty-text="Таблица пуста">
        <el-table-column
            prop="id"
            label="ID"
            width="50">
        </el-table-column>
        <el-table-column
            prop="name"
            label="Имя">
        </el-table-column>
        <el-table-column
            prop="role"
            label="Роль">
        </el-table-column>
        <el-table-column
            prop="ctime"
            label="Дата создания">
            <template slot-scope="scope">
                {{  new Date(scope.row.ctime * 1000)
                    .toLocaleString('ru-RU',{
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                        timezone: 'UTC',
                        hour: 'numeric',
                        minute: 'numeric',
                    }) }}
            </template>
        </el-table-column>
        <el-table-column
            label="Действия">
            <template slot-scope="scope">
                <el-button type="danger" @click.prevent="deleteUser(scope.row.id)">Удалить</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
export default {
    props: ['data', 'flag'],

    methods: {
        deleteUser(id) {
            const idx = this.data.findIndex(t => t.id == id);
            const myIndex = this.data.indexOf(this.data[idx]);

            if (myIndex !== -1 ) {
                this.data.splice(myIndex,1);
            }
        }
    }
    
}
</script>
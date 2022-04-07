<template>
    <el-table :data="data" v-loading="flag" empty-text="Таблица пуста" height="500">    
        <el-table-column
            prop="ctime"
            label="Дата">
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
            prop="event"
            label="Событие">
        </el-table-column>
    </el-table>
</template>

<script>
export default {
    props: ['data', 'flag'],
}
</script>
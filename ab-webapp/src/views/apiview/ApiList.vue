<template>
    <div class="api-list">
        <el-card class="box-card">
            <el-table :data="apiList" border highlight-current-row style="width: 100%">
                <el-table-column prop="Name" label="接口名称">
                </el-table-column>
                <el-table-column prop="ServiceId" label="服务ID">
                </el-table-column>
                <el-table-column prop="Type" label="接口类型" width="95">
                    <template scope="scope">
                        <el-tag type="success">{{scope.row.Type}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="UpdateTime" sortable label="更新时间" width="185">
                </el-table-column>
                <el-table-column label="操作" width="140">
                    <template scope="scope">
                        <el-button size="small" @click="showApiDetail(scope.$index)">详情</el-button>
                        <el-button size="small" type="danger" @click="selectRow(scope.row,scope.$index);DelDialogVisible=true">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <!-- el-card END -->
        <el-dialog title="提示" :visible.sync="DelDialogVisible" size="tiny">
            <span>确认删除接口 <span style="color:#20a0ff">{{currentRow.Name}}</span>   ？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="DelDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="doDelApi();DelDialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
        <!-- el-dialog END -->
    </div>
</template>
<script>
import Util from '@/Util'
import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {
            DelDialogVisible: false,
            currentRow: {}
        }
    },
    computed: mapGetters([
        'apiList',
        'currentApiGroup'
    ]),
    methods: {
        ...mapActions([
            'getApiDetail',
            'delApi'
        ]),
        showApiDetail(index){
            this.getApiDetail(index);
            this.$emit("setShowApiDetail",true);
        },
        selectRow(row, index) {
            this.currentRow = Util.cloneObj(row);
            this.currentIndex = index;
        },
        doDelApi(){
            this.delApi({
                index: this.currentIndex,
                data: this.currentRow
            })
        }
    }
}
</script>
<style lang="scss">
.api-list {
}
</style>


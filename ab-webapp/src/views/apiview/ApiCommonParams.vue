<template>
    <div class="api-common-param">
        <div class="actions">
            <el-button type="info" size="mini" @click="ParamEditorVisible=true;isAdd=true;currentRow={}"> + 新增参数</el-button>
        </div>
        <!-- 公共参数 -->
        <el-table :data="commonParamList" border highlight-current-row style="width: 100%">
            <el-table-column prop="Name" label="字段名">
            </el-table-column>
            <!-- 字段名 END -->
            <el-table-column prop="ParamName" label="参数名">
            </el-table-column>
            <el-table-column prop="Length" label="长度" width="70">
            </el-table-column>
            <el-table-column prop="IsNotNull" label="必填" width="65">
            </el-table-column>
            <el-table-column prop="Desc" label="说明" width="280">
            </el-table-column>
            <el-table-column label="操作" width="80">
                <template scope="scope">
                    <div class="opers">
                        <span @click="selectRow(scope.row,scope.$index);isAdd=false;ParamEditorVisible = true">
                            <i class="el-icon-edit"></i>
                        </span>
                        <span class="del" @click="selectRow(scope.row,scope.$index);DelDialogVisible=true">
                            <i class="el-icon-delete"></i>
                        </span>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <!-- 公共参数 END -->
        <el-dialog :title="'公共参数' + (isAdd?'新增':'修改')" :visible.sync="ParamEditorVisible">
            <el-form :model="currentRow">
                <el-form-item label="字段名" label-width="80px">
                    <el-input v-model="currentRow.Name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="参数名" label-width="80px">
                    <el-input v-model="currentRow.ParamName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="长度" label-width="80px">
                    <el-input v-model="currentRow.Length" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="必填" label-width="80px">
                    <el-switch v-model="currentRow.IsNotNull" on-text="" off-text="">
                    </el-switch>
                </el-form-item>
                <el-form-item label="说明" label-width="80px">
                    <el-input type="textarea" v-model="currentRow.Desc"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="ParamEditorVisible=false">取 消</el-button>
                <el-button type="primary" @click="saveParam();ParamEditorVisible=false">确 定</el-button>
            </div>
        </el-dialog>
        <!-- el-dialog END -->
        <el-dialog title="提示" :visible.sync="DelDialogVisible" size="tiny">
            <span>确认删除字段
                <span style="color:#20a0ff">{{currentRow.Name}}</span> ？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="DelDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="delCommonParam(currentRow);DelDialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
        <!-- el-dialog END -->
    </div>
</template>
<script>
import Util from '@/Util'
import { mapGetters, mapActions } from 'vuex'

export default {
    components: {
    },
    data() {
        return {
            isAdd: false,
            ParamEditorVisible: false,
            DelDialogVisible: false,
            currentRow: {}
        }
    },
    computed: mapGetters([
        'commonParamList'
    ]),
    methods: {
        ...mapActions([
            'addCommonParam',
            'updateCommonParam',
            'delCommonParam'
        ]),
        selectRow(row, index) {
            this.currentRow = Util.cloneObj(row);
            this.currentRow.IsNotNull = this.currentRow.IsNotNull == 'true' ? true : false
            this.currentRow.index = index;
        },
        saveParam() {
            if (this.isAdd) {
                this.addCommonParam(this.currentRow);
            } else {
                this.updateCommonParam({
                    index: this.currentRow.index,
                    data: this.currentRow
                });
            }
        }
    }
}
</script>
<style lang="scss">
.api-common-param {
    .actions {
        margin-bottom: 10px
    }
    .opers {
        span {
            cursor: pointer;
            &:last-child {
                margin-left: 10px;
            }
            &:hover {
                color: #20a0ff
            }
            &.del:hover {
                color: #ff4949
            }
        }
    }
}
</style>


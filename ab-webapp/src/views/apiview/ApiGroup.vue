<template>
    <div class="api-group">
        <div class="actions">
            <el-button type="primary" size="small" @click="isAdd=true;ApiGroupEditorVisible=true;apiGroupForm={}"> + 新增分组</el-button>
        </div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>分组</span>
                <el-dropdown trigger="click" class="opers-menu" @command="handleCommand">
                    <div class="el-dropdown-link">
                        <i class="el-icon-setting" />
                    </div>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="update">修改当前分组</el-dropdown-item>
                        <el-dropdown-item command="del">删除当前分组</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            <el-table
                ref="apiGroupList"
                :data="apiGroupList"
                highlight-current-row
                :show-header="false"
                @current-change="handleCurrentChange"
                style="width: 100%">
                <el-table-column
                    property="Name"
                    label="">
                </el-table-column>
            </el-table>
        </el-card>
        <!-- 新增接口分组弹框 -->
        <el-dialog :title="(isAdd?'新增':'修改') + '接口分组'" :visible.sync="ApiGroupEditorVisible">
            <el-form :model="apiGroupForm" :rules="apiGroupFormRules" ref="apiGroupForm">
                <el-form-item label="分组名称" prop="Name" label-width="80px">
                    <el-input v-model="apiGroupForm.Name" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="ApiGroupEditorVisible=false">取 消</el-button>
                <el-button type="primary" @click="submitForm('apiGroupForm')">确 定</el-button>
            </div>
        </el-dialog>
        <!-- el-dialog END -->
        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="DelDialogVisible" size="tiny">
            <span>确认删除分组
                <span style="color:#20a0ff">{{apiGroupForm.Name}}</span> ？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="DelDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="delApiGroup(apiGroupForm);DelDialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
        <!-- el-dialog END -->
    </div>
</template>
<script>
import Util from '@/Util'
import { Message } from 'element-ui'
import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {
            DelDialogVisible: false,
            ApiGroupEditorVisible: false,
            isAdd: false,
            apiGroupForm: {},
            apiGroupFormRules: {
                Name: [
                    { required: true, message: '请输入分组名称', trigger: 'blur' },
                    { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
                ]
            }
        }
    },
    computed: mapGetters([
        'apiGroupList',
        'currentApiGroup'
    ]),
    mounted() {
        this.getApiGroupList()
    },
    watch:{
        apiGroupList(value){
            for(var i in this.apiGroupList){
                if(this.apiGroupList[i].GroupId == this.currentApiGroup.GroupId){
                    this.$refs.apiGroupList.setCurrentRow(this.apiGroupList[i])
                }
            }
        }
    },
    methods: {
        ...mapActions([
            'getApiGroupList',
            'getApiList',
            'addApiGroup',
            'delApiGroup',
            'updateApiGroup'
        ]),
        handleCurrentChange(apiGroupForm){
            if(!apiGroupForm || apiGroupForm.GroupId == this.currentApiGroup.GroupId || !apiGroupForm.GroupId){
                return;
            }
            this.getApiList(apiGroupForm);
            this.$emit("setShowApiDetail",false);
        },
        handleCommand(command){
            if(!this.currentApiGroup.GroupId) {
                Message({
                    showClose: true,
                    message: '未选择分组',
                    duration: 2000,
                    type: 'warning'
                });
                return;
            }
            switch(command){
                case 'update':
                    this.apiGroupForm = Util.cloneObj(this.currentApiGroup)
                    this.isAdd = false;
                    this.ApiGroupEditorVisible = true
                    break;
                case 'del':
                    this.apiGroupForm = Util.cloneObj(this.currentApiGroup)
                    this.DelDialogVisible = true
                    break;
            }
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) { //验证通过后执行
                    if(this.isAdd){
                        this.addApiGroup(this.apiGroupForm)
                        this.ApiGroupEditorVisible=false
                        this.$refs.apiGroupList.setCurrentRow();//取消高亮显示
                    } else {
                        // for(var i in this.apiGroupList){
                        //     if(this.apiGroupList[i].GroupId == this.apiGroupForm.GroupId) 
                        //         this.apiGroupForm.index = i;
                        // }
                        this.updateApiGroup(this.apiGroupForm)
                        this.ApiGroupEditorVisible=false
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    }
}
</script>
<style lang="scss">
.api-group {
    .box-card {
        margin-top: 10px;
        width: 200px;
        min-height: 350px;

        .el-card__header {
            padding: 0 10px;
            line-height: 42px;
            font-weight: 600;
        }
        .el-card__body {
            padding: 10px 0;
        }

        .el-table__row {
            cursor: pointer;
        }

        .opers-menu{
            float: right;
            color: #a3a3a3;
            cursor: pointer;
            &:hover {
                color: #000
            }
        }

        .item {
            &:hover {
                .opers{
                    display: inline-block;
                }
            }
            .opers {
                display: none;
                position: absolute;
                right: 5px;
                color: #a3a3a3;
                i:hover {
                    color: #20a0ff
                }
                .del:hover {
                    color: #ff4949
                }
            }
        }
    }
    .el-table,
    .el-table th,
    .el-table td {
        border: 0
    }
    .el-table:before,
    .el-table:after {
        background-color: unset;
    }
    .el-table .current-row {
        color: #20a0ff;
    }
}
</style>


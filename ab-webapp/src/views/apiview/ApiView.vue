<template>
    <div class="api-view">
        <api-group v-on:setShowApiDetail="setShowApiDetail"></api-group>
        <div class="api-board">
            <div class="actions">
                <el-button size="small" icon="arrow-left" v-if="isShowApiDetail" @click="setShowApiDetail(false)">返回列表</el-button>
                <el-button type="primary" size="small" v-if="!isShowApiDetail" @click="showAddDialog"> + 新增接口</el-button>
            </div>
            <div class="content">
                <api-list v-if="!isShowApiDetail" v-on:setShowApiDetail="setShowApiDetail"></api-list>
                <el-tabs type="border-card" class="box-tabs" v-if="isShowApiDetail">
                    <el-tab-pane label="接口详情">
                        <api-detail></api-detail>
                    </el-tab-pane>
                    <el-tab-pane label="公共报文头">
                        <api-common-params></api-common-params>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <!-- api-board END -->
        <!-- 新增接口弹框 -->
        <el-dialog title="新增接口" :visible.sync="ApiEditorVisible">
            <el-form :model="addApiForm" :rules="addApiFormRules" ref="addApiForm">
                <el-form-item label="当前分组:" label-width="85px">
                    {{currentApiGroup.Name}}
                </el-form-item>
                <el-form-item label="接口名称" prop="Name" label-width="80px">
                    <el-input v-model="addApiForm.Name"></el-input>
                </el-form-item>
                <el-form-item label="服务ID" prop="ServiceId" label-width="80px">
                    <el-input v-model="addApiForm.ServiceId"></el-input>
                </el-form-item>
                <el-form-item label="接口类型" prop="Type" label-width="80px">
                    <el-input v-model="addApiForm.Type"></el-input>
                </el-form-item>
                <el-form-item label="详细说明" label-width="80px">
                    <el-input type="textarea" v-model="addApiForm.Desc"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="ApiEditorVisible=false">取 消</el-button>
                <el-button type="primary" @click="submitForm('addApiForm')">确 定</el-button>
            </div>
        </el-dialog>
        <!-- el-dialog END -->
    </div>
</template>
<script>
import { Message } from 'element-ui'
import ApiGroup from './ApiGroup'
import ApiList from './ApiList'
import ApiDetail from './detail/ApiDetail'
import ApiCommonParams from './ApiCommonParams'
import { mapGetters, mapActions } from 'vuex'

export default {
    components: {
        ApiGroup,
        ApiList,
        ApiDetail,
        ApiCommonParams
    },
    data() {
        return {
            isShowApiDetail: false,
            ApiEditorVisible: false,
            addApiForm: {},
            addApiFormRules: {
                Name: [
                    { required: true, message: '请输入接口名称', trigger: 'blur' },
                    { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
                ],
                ServiceId: [
                    { required: true, message: '请输入服务ID', trigger: 'blur' },
                    { min: 1, max: 64, message: '长度在 1 到 64 个字符', trigger: 'blur' }
                ],
                Type: [
                    { required: true, message: '请输入接口类型', trigger: 'blur' },
                    { min: 1, max: 10, message: '长度在 1 到 6 个字符', trigger: 'blur' }
                ],
                Desc: [
                    { required: true, message: '请输入详细说明', trigger: 'blur' },
                    { min: 1, max: 128, message: '长度在 1 到 128 个字符', trigger: 'blur' }
                ]
            }
        }
    },
    computed:mapGetters([
        'currentApiGroup'
    ]),
    methods: {
        ...mapActions([
            'addApi'
        ]),
        setShowApiDetail(flag) {
            this.isShowApiDetail = flag;
        },
        showAddDialog(){
            if(!this.currentApiGroup.GroupId) {
                Message({
                    showClose: true,
                    message: '未选择分组',
                    duration: 2000,
                    type: 'warning'
                });
                return;
            }
            this.addApiForm={};
            this.ApiEditorVisible=true;
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) { //验证通过后执行
                    this.addApi(this.addApiForm);
                    this.ApiEditorVisible = false
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
.api-view {
    display: flex;

    &>div:first-child {
        margin-right: 10px;
    }
}

.api-board {
    flex-grow: 1;
    .content {
        margin-top: 10px;
    }
}
</style>


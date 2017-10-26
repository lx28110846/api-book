<template>
    <div class="api-detail">
        <el-card class="box-card title">
            <div slot="header" class="clearfix">
                <el-tag type="success">{{currentApiDetail.Type}}</el-tag>
                <span class="name">{{currentApiDetail.Name}}</span>
                <span class="part-line">/</span>
                <span>{{currentApiDetail.ServiceId}}</span>
                <span class="edit" @click="editDetail();DetailEditorVisible=true">
                    <i class="el-icon-edit"></i>
                </span>
                <span class="time">{{currentApiDetail.UpdateTime}}</span>
            </div>
            <div>
                <span>{{currentApiDetail.Desc}}</span>
            </div>
        </el-card>
        <!-- el-card END -->
        <params-table title="请求参数" :tableData="currentApiDetail.ReqParam" paramType="ReqParam"></params-table>
        <params-table title="响应参数" :tableData="currentApiDetail.ResParam" paramType="ResParam"></params-table>
        <!-- params END -->
        <el-dialog title="接口详情修改" :visible.sync="DetailEditorVisible">
            <el-form :model="detailFrom" :rules="detailFormRules" ref="detailForm">
                <el-form-item label="接口名称" label-width="80px" prop="Name">
                    <el-input v-model="detailFrom.Name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="服务ID" label-width="80px" prop="ServiceId">
                    <el-input v-model="detailFrom.ServiceId" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="接口类型" label-width="80px" prop="Type">
                    <el-input v-model="detailFrom.Type" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="详细说明" label-width="80px" prop="Desc">
                    <el-input type="textarea" v-model="detailFrom.Desc"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="DetailEditorVisible=false">取 消</el-button>
                <el-button type="primary" @click="submitForm('detailForm')">确 定</el-button>
            </div>
        </el-dialog>
        <!-- el-dialog END -->
    </div>
</template>
<script>
import ParamsTable from './ParamsTable'
import { mapGetters, mapActions } from 'vuex'

export default {
    components: {
        ParamsTable
    },
    data() {
        return {
            DetailEditorVisible: false,
            detailFrom: {},
            detailFormRules: {
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
    computed: mapGetters([
        'currentApiDetail'
    ]),
    methods: {
        ...mapActions([
            'updateApiDetail'
        ]),
        editDetail(){
            this.detailFrom.Id = this.currentApiDetail.Id;
            this.detailFrom.Name = this.currentApiDetail.Name;
            this.detailFrom.ServiceId = this.currentApiDetail.ServiceId;
            this.detailFrom.Type = this.currentApiDetail.Type;
            this.detailFrom.Desc = this.currentApiDetail.Desc;
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) { //验证通过后执行
                    this.updateApiDetail(this.detailFrom);
                    this.DetailEditorVisible=false
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
.api-detail {
    .box-card {
        margin-top: 15px;
        box-shadow: unset;

        .el-card__header {
            padding: 8px 10px;
            .edit {
                margin-left: 25px;
                color: #a3a3a3;
                cursor: pointer;
                &:hover {
                    color: #20a0ff;
                }
            }
        }

        &.title {
            .el-card__body {
                padding: 10px;
            }
            .name {
                margin-left: 10px;
            }
            .part-line {
                margin: 0 8px;
                color: #bfcbd9
            }
            .time {
                float: right;
                line-height: 22px;
                color: #a3a3a3
            }
        }
    }
    .box-card:first-child {
        margin-top: 0
    }
}
</style>


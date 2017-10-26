<template>
    <div class="box-card params-table">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>{{title}}</span>
                <!-- el-switch开关用的是blooean型，但数据中为了展示表格存储的是字符串型，这里需要初始化一下 -->
                <span class="add" @click="ParamEditorVisible=true;isAdd=true;paramForm={IsNotNull:false}">
                    <i class="el-icon-plus"></i>
                </span>
            </div>
            <el-table :data="tableData" border highlight-current-row style="width: 100%">
                <el-table-column prop="Name" label="字段名">
                    <template scope="scope">
                        <!-- 有子列表时，增加tooltips和popover -->
                        <div v-if="scope.row.Sublist">
                            <el-tooltip class="item" effect="dark" :content="SublistTips" placement="left">
                                <div class="expandable" v-popover:sublist @click="currentSublist=scope.row.Sublist;selectRow(scope.row,scope.$index)">
                                    <span class="">
                                        <i class="el-icon-arrow-right" /> {{scope.row.Name}}
                                    </span>
                                    <!-- 子列表 popover -->
                                    <el-popover ref="sublist" width="1100" trigger="click" placement="top-start">
                                        <el-table :data="scope.row.Sublist"  :max-height="sublistHeight" border highlight-current-row>
                                            <el-table-column prop="Name" label="字段名">
                                            </el-table-column>
                                            <el-table-column prop="ParamName" label="参数名">
                                            </el-table-column>
                                            <el-table-column prop="Length" label="长度" width="70">
                                            </el-table-column>
                                            <el-table-column prop="Desc" label="说明" width="450">
                                            </el-table-column>
                                        </el-table>
                                    </el-popover>
                                    <!-- 子列表 END -->
                                </div>
                            </el-tooltip>
                        </div>
                        <div v-else>{{scope.row.Name}}</div>
                    </template>
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
        </el-card>
        <!-- el-card END -->
        <el-dialog :title="title + (isAdd?'新增':'修改')" :visible.sync="ParamEditorVisible">
            <el-form :model="paramForm" :rules="paramFormRules" ref="paramForm">
                <el-form-item label="字段名" label-width="80px" prop="Name">
                    <el-input v-model="paramForm.Name"></el-input>
                </el-form-item>
                <el-form-item label="参数名" label-width="80px" prop="ParamName">
                    <el-input v-model="paramForm.ParamName"></el-input>
                </el-form-item>
                <el-form-item label="长度" label-width="80px" prop="Length">
                    <el-input v-model.number="paramForm.Length"></el-input>
                </el-form-item>
                <el-form-item label="必填" label-width="80px">
                    <el-switch v-model="paramForm.IsNotNull" on-text="" off-text="">
                    </el-switch>
                </el-form-item>
                <el-form-item label="说明" label-width="80px">
                    <el-input type="textarea" v-model="paramForm.Desc"></el-input>
                </el-form-item>
                <div v-if="paramForm.Sublist">
                    <div v-for="(item,index) in paramForm.Sublist" :key="item.SubParamId" class="editor-sublist">
                        <hr color="#bfcbd9" size="0" style="margin-bottom: 20px" />
                        <div class="opers" @click="delSublistItem(index)">
                            <i class="el-icon-delete del"></i>
                        </div>
                        <el-form :inline="true" :model="item" :rules="paramFormRules" ref="SublistFrom">
                            <el-form-item label="子项字段" label-width="80px" prop="Name">
                                <el-input v-model="item.Name"></el-input>
                            </el-form-item>
                            <el-form-item label="参数名" label-width="80px" prop="ParamName">
                                <el-input v-model="item.ParamName"></el-input>
                            </el-form-item>
                            <el-form-item label="长度" label-width="80px" prop="Length">
                                <el-input v-model.number="item.Length"></el-input>
                            </el-form-item>
                            <el-form-item label="说明" label-width="80px">
                                <el-input type="textarea" v-model="item.Desc"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
                <hr color="#bfcbd9" size="0" style="margin-bottom: 20px" />
                <el-button type="primary" size="small" @click="addSublistItem"> + 新增子项</el-button>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="ParamEditorVisible=false">取 消</el-button>
                <el-button type="primary" @click="submitForm('paramForm')">确 定</el-button>
            </div>
        </el-dialog>
        <!-- el-dialog END -->
        <el-dialog title="提示" :visible.sync="DelDialogVisible" size="tiny">
            <span>确认删除字段
                <span style="color:#20a0ff">{{paramForm.Name}}</span> ？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="DelDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="delParam();DelDialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
        <!-- el-dialog END -->
    </div>
</template>
<script>
import Vue from 'vue'
import Util from '@/Util'
import ParamsSublist from './ParamsSublist'
import { mapActions } from 'vuex'

export default {
    props: ['title', 'tableData', 'paramType'],//paramType请求/响应的字段名
    components: {
        ParamsSublist
    },
    data() {
        return {
            SublistTips: '点击查看列表项',
            ParamEditorVisible: false,
            DelDialogVisible: false,
            isAdd: false,
            currentSublist: [],
            sublistHeight: 300,
            paramForm: {},
            paramFormRules: {
                Name: [
                    { required: true, message: '请输入字段名', trigger: 'blur' },
                    { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
                ],
                ParamName: [
                    { required: true, message: '请输入参数名', trigger: 'blur' },
                    { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                ],
                Length: [
                    { type: 'number', required: true, message: '请输长度', trigger: 'blur' },
                    { type: 'number', min: 1, max: 1024, message: '长度在 1 到 1024', trigger: 'blur' }
                    
                ]
            }
        }
    },
    methods: {
        ...mapActions([
            'updateApiParam',
            'delApiParam',
            'addApiParam'
        ]),
        selectRow(row, index) {
            this.paramForm = Util.cloneObj(row);
            this.paramForm.IsNotNull = this.paramForm.IsNotNull == 'true' ? true : false
            this.paramForm.index = index;
            this.paramForm.paramType = this.paramType
        },
        saveParam() {
            if (this.isAdd) {
                this.paramForm.paramType = this.paramType
                this.addApiParam(this.paramForm);
            } else {
                this.updateApiParam(this.paramForm);
            }
            //el-popover 弹出的el-table组件是固定高度固定表头可以y轴滚动的
            //当改变这el-table的值时会造成整个组件显示不出来
            //这里把el-table的高度做一个动态的加减1的操作，使高度重新初始化，就可以显示出来组件了
            if(this.sublistHeight % 2 == 0) this.sublistHeight += 1;
            else this.sublistHeight -= 1;
        },
        validSublistForm() {
            var returnFlag = true;
            for(var i in this.paramForm.Sublist){
                this.$refs.SublistFrom[i].validate((valid) => {
                    if (valid) { //验证通过后执行
                        console.log('Success!')
                    } else {
                        console.log('error submit!!');
                        returnFlag = false;
                    }
                });
                
            }
            return returnFlag;
        },
        submitForm(formName) { //新增/修改提交验证
            this.$refs[formName].validate((valid) => {
                if (valid) { //验证通过后执行
                    if(!this.validSublistForm()) return;
                    this.saveParam();
                    this.ParamEditorVisible=false
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        delParam() {
            this.delApiParam({
                paramType: this.paramType,
                index: this.paramForm.index,
                data: this.paramForm
            });
        },
        addSublistItem() {
            if(!this.paramForm.Sublist){
                Vue.set(this.paramForm,'Sublist',[])
            }
            this.paramForm.Sublist.push({
                SubParamId: '',
                Name: '',
                ParamName: '',
                Length: '',
                Desc: ''
            });
        },
        delSublistItem(index){
            Vue.delete(this.paramForm.Sublist,index)
        }
    }
}
</script>
<style lang="scss">
.params-table {

    .el-card__header .add {
        margin-left: 25px;
        color: #a3a3a3;
        cursor: pointer;
        &:hover {
            color: #20a0ff
        }
    }

    .el-card__body {
        padding: unset;
    }
    .el-table__row {
        .expandable {
            cursor: pointer;
            i {
                color: #276be1
            }
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

    .el-table {
        border: 0
    }
    .el-table:before,
    .el-table:after {
        background-color: unset;
    }

    .editor-sublist {
        &:hover {
            .opers {
                opacity: 1;
            }
        }
        .opers {
            opacity: 0;
            float: right;
            cursor: pointer;
            .del:hover {
                color: #ff4949
            }
        }
    }
}
</style>


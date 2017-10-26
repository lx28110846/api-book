<template>
    <div class="params-sublist">
        sdfsdfsdfsdfds
    </div>
</template>
<script>
import Util from '@/Util'
import { mapActions } from 'vuex'

export default {
    props: ['title', 'tableData', 'paramType'],
    data() {
        return {
            SubListTips: '点击查看列表项',
            ParamEditorVisible: false,
            DelDialogVisible: false,
            currentRow: {},
            currentIndex: '',
            isAdd: false
        }
    },
    methods: {
        ...mapActions([
            'updateApiParam',
            'delApiParam',
            'addApiParam'
        ]),
        selectRow(row, index) {
            this.currentRow = Util.cloneObj(row);
            this.currentRow.IsNotNull = this.currentRow.IsNotNull == 'true' ? true : false
            this.currentIndex = index;
        },
        saveParam() {
            if (this.isAdd) {
                this.addApiParam({
                    paramType: this.paramType,
                    data: this.currentRow
                });
            }else{
                this.updateApiParam({
                    paramType: this.paramType,
                    index: this.currentIndex,
                    data: this.currentRow
                });
            }
        },
        delParam() {
            this.delApiParam({
                paramType: this.paramType,
                index: this.currentIndex,
                data: this.currentRow
            });
        }
    }
}
</script>
<style lang="scss">
.params-sublist {
    position: fixed;
    top: 0;
    background-color: #f0f0f0;
    width: 300px;
    height: 100px;
}
</style>


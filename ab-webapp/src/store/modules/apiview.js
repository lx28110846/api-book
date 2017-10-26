import * as apiview from '@/api/apiview'
import Util from '@/Util'
import Vue from 'vue'

const state = {
    apiGroupList: [], //接口分组
    currentApiGroup: {}, //当前组
    apiList: [], //接口列表
    currentApiIndex: {}, //当前接口在列表中的下标
    commonParamList: [] //公共报文头
}

const mutations = {
    setCommonParamList: (state,paramList) => {
        state.commonParamList = paramList
    },
    setApiGroupList: (state, list) => {
        state.apiGroupList = list
    },
    setApiList: (state, list) => {
        state.apiList = list
    },
    updateApiList: (state, apiDetail) => { //查询api详情后，更新至apiList中
        Vue.set(state.apiList,apiDetail.index,apiDetail)
    },
    setCurrentApiGroup: (state, group) => {
        state.currentApiGroup = group
    },
    setCurrentApiIndex: (state, index) => {
        state.currentApiIndex = index
    },
    updateCurrentApiDetail: (state, config) => { //修改当前接口详情中的属性
        for(var key in config){
            Vue.set(state.apiList[state.currentApiIndex], key, config[key])
        }
    },
    updateApiParam: (state, apiParam) => { //修改当前接口详情的参数
        Vue.set(state.apiList[state.currentApiIndex][apiParam.paramType], apiParam.index, apiParam)
    },
    delApiParam: (state, apiParam) => { //删除当前接口详情的参数
        Vue.delete(state.apiList[state.currentApiIndex][apiParam.paramType], apiParam.index)
    },
    addApiParam: (state, apiParam) => { //当前接口详情中新增参数
        state.apiList[state.currentApiIndex][apiParam.paramType].push(apiParam)
    },
    updateApiDetail: (state, apiDetail) => { //更新当前显示接口的详情，接口名、服务ID、类型、详细说明，同时将列表更新
        for (var key in apiDetail) {
            Vue.set(state.apiList[state.currentApiIndex], key, apiDetail[key])
        }
        Vue.set(state.apiList[state.currentApiIndex], 'Name', apiDetail['Name'])
        Vue.set(state.apiList[state.currentApiIndex], 'ServiceId', apiDetail['ServiceId'])
        Vue.set(state.apiList[state.currentApiIndex], 'Type', apiDetail['Type'])
        Vue.set(state.apiList[state.currentApiIndex], 'UpdateTime', apiDetail['UpdateTime'])
    },
    addApi: (state, api) => { //新增api列表项
        state.apiList.unshift(api)
    },
    delApi: (state, index) => { //删除api列表项
        Vue.delete(state.apiList, index)
    },
    addApiGroup: (state, apiGroup) => { //新增apiGroup列表项
        state.apiGroupList.unshift(apiGroup)
    },
    delApiGroup: (state, apiGroup) => { //删除apiGroup列表项
        for(var i in state.apiGroupList){
            if(state.apiGroupList[i].GroupId == apiGroup.GroupId) 
                Vue.delete(state.apiGroupList, i)
        }
    },
    updateApiGroup: (state, apiGroup) => { //修改apiGroup列表项
        for(var i in state.apiGroupList){
            if(state.apiGroupList[i].GroupId == apiGroup.GroupId){
                Vue.set(state.apiGroupList, i,apiGroup)
                break;
            }
        }
    },
    updateCommonParam: (state, commonParam) => { //修改公共报文头参数
        Vue.set(state.commonParamList, commonParam.index, commonParam)
    },
    delCommonParam: (state, commonParam) => { //删除公共报文头参数
        Vue.delete(state.commonParamList, commonParam.index)
    },
    addCommonParam: (state, commonParam) => { //新增公共报文头参数
        state.commonParamList.push(commonParam)
    },
}

const actions = {
    getApiGroupList: ({ commit }) => { //查询接口分组
        commit("setCurrentApiGroup", {});
        commit("setApiList", []);
        apiview.getApiGroupList().then(res => {
            commit("setApiGroupList", res.data.List);
        })
    },
    getApiList: ({ commit, state }, apiGroup) => { // 选择分组后调用api列表查询，同时返回公共报文头参数
        commit("setCurrentApiGroup", apiGroup);
        commit("setApiList", []);
        let params = {
            "GroupId": state.currentApiGroup.GroupId
        }
        apiview.getApiList(params).then(res => {
            commit("setApiList", res.data.List);
            commit("setCommonParamList", res.data.CommonParamList);
        })
    },
    getApiDetail: ({ commit, state }, index) => { //点击详情按钮查询api详情，记录当前api对象及在列表中的索引，用于修改api列表展示的信息
        commit("setCurrentApiIndex", null);
        let params = {
            "ServiceId": state.apiList[index].ServiceId
        }
        apiview.getApiDetail(params).then(res => {
            res.data.index = index;
            commit("updateApiList",res.data)
            commit("setCurrentApiIndex", index);
        })
    },
    updateApiParam: ({ commit }, apiParam) => { //更新请求/响应参数
        //el-switch开关用的是blooean型但无法展示在表格中，转换为字符串
        apiParam.IsNotNull = apiParam.IsNotNull == true ? 'true' : ''
        apiview.updateApiParam(apiParam).then(res => {
            commit("updateApiParam", apiParam);
            commit("updateCurrentApiDetail", {'UpdateTime':res.data.UpdateTime});
        })
    },
    delApiParam: ({ commit }, apiParam) => { //删除请求/响应参数
        apiview.delApiParam(apiParam).then(res => {
            commit("delApiParam", apiParam);
            commit("updateCurrentApiDetail", {'UpdateTime':res.data.UpdateTime});
        })
    },
    addApiParam: ({ commit,state }, apiParam) => { //新增请求/响应参数
        //el-switch开关用的是blooean型但无法展示在表格中，转换为字符串
        apiParam.IsNotNull = apiParam.IsNotNull == true ? 'true' : ''
        apiview.addApiParam(apiParam).then(res => {
            apiParam.ParamId = res.data.ParamId
            commit("addApiParam", apiParam);
            commit("updateCurrentApiDetail", {'UpdateTime':res.data.UpdateTime});
        })
    },
    updateApiDetail: ({ commit }, apiDetail) => { //更新详情，接口名、服务ID、类型、详细说明
        apiview.updateApiDetail(apiDetail).then(res => {
            apiDetail.UpdateTime = res.data.UpdateTime
            commit("updateApiDetail", apiDetail);
        })
    },
    addApi: ({ commit }, api) => { //新增api
        apiview.addApi(api).then(res => {
            api.ApiId = res.data.ApiId
            api.UpdateTime = res.data.UpdateTime
            commit("addApi", api);
        })
    },
    delApi: ({ commit }, api) => { //删除api
        apiview.delApi(api.data).then(res => {
            commit("delApi", api.index);
        })
    },
    addApiGroup: ({ commit }, apiGroup) => { //新增api分组
        apiview.addApiGroup(apiGroup).then(res => {
            apiGroup.GroupId = res.data.GroupId
            commit("addApiGroup", apiGroup);
            apiGroup.index = 0;
            commit("setCurrentApiGroup", apiGroup);
            commit("setApiList", []);
        }).catch(err => {
            commit("setCurrentApiGroup", {});
            commit("setApiList", []);
        })
    },
    delApiGroup: ({ commit,state }, apiGroup) => { //删除api分组
        apiview.delApiGroup(apiGroup).then(res => {
            commit("delApiGroup", apiGroup);
            if(apiGroup.GroupId == state.currentApiGroup.GroupId){
                commit("setCurrentApiGroup", {});
                commit("setApiList", []);
            }
        })
    },
    updateApiGroup: ({ commit }, apiGroup) => { //修改api分组
        apiview.updateApiGroup(apiGroup).then(res => {
            commit("updateApiGroup", apiGroup);
            if(apiGroup.GroupId == state.currentApiGroup.GroupId) {
                commit("setCurrentApiGroup", apiGroup);
            }
        })
    },
    addCommonParam: ({ commit }, param) => { //新增公共报文头参数
        apiview.addCommonParam(param).then(res => {
            param.ParamId = res.data.ParamId
            commit("addCommonParam", param);
            commit("updateCurrentApiDetail", {'UpdateTime':res.data.UpdateTime});
        })
    },
    delCommonParam: ({ commit }, param) => { //删除公共报文头参数
        apiview.delCommonParam(param).then(res => {
            commit("delCommonParam", param);
        })
    },
    updateCommonParam: ({ commit }, param) => { //修改公共报文头参数
        //el-switch开关用的是blooean型但无法展示在表格中，转换为字符串
        param.IsNotNull = param.IsNotNull == true ? 'true' : ''
        apiview.updateCommonParam(param).then(res => {
            commit("updateCommonParam", param);
        })
    }
}

const getters = {
    apiGroupList: state => { return state.apiGroupList; },
    currentApiGroup: state => { return state.currentApiGroup; },
    apiList: state => { return state.apiList; },
    currentApiDetail: state => { 
        if(state.currentApiIndex == null) return {}
        return state.apiList[state.currentApiIndex]; 
    },
    commonParamList: state => { return state.commonParamList; },
}

export default { state, mutations, actions, getters }
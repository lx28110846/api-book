import Mock from 'mockjs'

Mock.mock("/apiview/apiGroupList", {
    'ReturnCode': '0000',
    'ReturnMsg': 'success',
    'List|2-5': [{
        'GroupId': '@natural',
        'Name': '@cword(3,5)'
    }]
})

Mock.mock("/apiview/apiList", {
    'ReturnCode': '0000',
    'ReturnMsg': 'success',
    'CommonParamList|3-5': [{
        'ParamId': '@string("lower", 6, 15)',
        'Name': '@cword(3,8)',
        'ParamName': '@string("lower", 6, 15)',
        'Length|1-1000': 1,
        'IsNotNull|1': ['true',''],
        'Desc': '@csentence'
    }],
    'List|10-20': [{
        'GroupId': '@natural',
        'ApiId': '@string("lower", 6, 15)',
        'Name': '@cword(3,8)',
        'ServiceId': '@string("upper", 8, 20)',
        'Type': 'Dubbo',
        'UpdateTime': '@datetime()'
    }]
})

Mock.mock("/apiview/apiDetail", {
    'ReturnCode': '0000',
    'ReturnMsg': 'success',
    'ApiId': '@string("lower", 6, 15)',
    'Name': '@cword(3,8)',
    'ServiceId': '@string("upper", 8, 20)',
    'Type': 'Dubbo',
    'UpdateTime': '@datetime()',
    'GroupId': '@natural',
    'Desc': '@csentence',
    'ReqParam|2-5': [{
        'ParamId': '@string("lower", 6, 15)',
        'Name': '@cword(3,8)',
        'ParamName': '@string("lower", 6, 15)',
        'Length|1-1000': 1,
        'IsNotNull|1': ['true',''],
        'Desc': '@csentence'
    }],
    'ResParam|2-2': [{
        'ParamId': '@string("lower", 6, 15)',
        'Name': '@cword(3,8)',
        'ParamName': '@string("lower", 6, 15)',
        'Length|1-10000': 1,
        'IsNotNull|1': ['true',''],
        'Desc': '@csentence'
    },{
        'ParamId': '@string("lower", 6, 15)',
        'Name': '@cword(3,8)',
        'ParamName': '@string("lower", 6, 15)',
        'Length|1-1000': 1,
        'IsNotNull|1': ['true',''],
        'Desc': '@csentence',
        'Sublist|10-20': [{
            'SubParamId': '@string("lower", 6, 15)',
            'Name': '@cword(3,8)',
            'ParamName': '@string("lower", 6, 15)',
            'Length|1-1000': 1,
            'Desc': '@csentence'
        }]
    }]
})

Mock.mock("/apiview/updateApiParam", {
    'ReturnCode': '0000',
    'ReturnMsg': 'success',
    'UpdateTime': '@datetime()'
})

Mock.mock("/apiview/delApiParam", {
    'ReturnCode': '0000',
    'ReturnMsg': 'success',
    'UpdateTime': '@datetime()'
})

Mock.mock("/apiview/addApiParam", {
    'ReturnCode': '0000',
    'ReturnMsg': 'success',
    'ParamId': '@string("lower", 6, 15)',
    'UpdateTime': '@datetime()'
})

Mock.mock("/apiview/updateApiDetail", {
    'ReturnCode': '0000',
    'ReturnMsg': 'success',
    'UpdateTime': '@datetime()'
})

Mock.mock("/apiview/addApi", {
    'ReturnCode': '0000',
    'ReturnMsg': 'success',
    'ApiId': '@string("lower", 6, 15)',
    'UpdateTime': '@datetime()'
})

Mock.mock("/apiview/delApi", {
    'ReturnCode': '0000',
    'ReturnMsg': 'success'
})

Mock.mock("/apiview/addApiGroup", {
    'ReturnCode': '0000',
    'ReturnMsg': 'success',
    'GroupId': '@natural'
})

Mock.mock("/apiview/delApiGroup", {
    'ReturnCode': '0000',
    'ReturnMsg': 'success'
})

Mock.mock("/apiview/updateApiGroup", {
    'ReturnCode': '0000',
    'ReturnMsg': 'success'
})

Mock.mock("/apiview/updateCommonParam", {
    'ReturnCode': '0000',
    'ReturnMsg': 'success',
    'UpdateTime': '@datetime()'
})

Mock.mock("/apiview/addCommonParam", {
    'ReturnCode': '0000',
    'ReturnMsg': 'success',
    'ParamId': '@string("lower", 6, 15)',
    'UpdateTime': '@datetime()'
})

Mock.mock("/apiview/delCommonParam", {
    'ReturnCode': '0000',
    'ReturnMsg': 'success',
    'UpdateTime': '@datetime()'
})
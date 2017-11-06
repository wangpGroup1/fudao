'use strict';
/***************************************************************************/
//以下为已用数据库表
/**
 * 动态信息,已用
 */
const Dynamic = {
    name: 'Dynamic',
    primaryKey: 'id',
    properties: {
        id: 'string',// 动态ID
        content: 'string',// 动态内容
        path: {type: 'string', default: ''},
        user:{type:'User'},
        // time: 'int',
        time: 'string',
        createTime: 'int',// 发表时间,
        type: 'int',
        praises: {type: 'list', objectType: 'DynamicPraise'},
        comments: {type: 'list', objectType: 'DynamicComment'},
        show: {type: 'bool', optional: true, default: false},
        flag: {type: 'bool', optional: true, default: false}
    }
};

const User = {
    name: 'User',
    properties: {
        id: {type:'string',optional: true},// 用户ID
        nickname: {type:'string',optional: true},// 用户名
        phone: {type:'string',optional: true},
        friendremark: {type:'string',optional: true},
        photo: {type:'string',default:'/uploader/00/00/00/00/00/00/00/79.jpg'},// 头像
    }
};

/**
 * 动态的点赞信息,已用
 */
const DynamicPraise = {
    name: 'DynamicPraise',
    properties: {
        id: {type: 'string', optional: true},
        nickname: {type: 'string', optional: true},
        phone: {type:'string',optional: true},
        friendremark: {type:'string',optional: true},
        photo: {type: 'string', optional: true},
    }
};

/**
 * 动态的评论信息,已用
 */
const DynamicComment = {
    name: 'DynamicComment',
    properties: {
        id: {type: 'string', optional: true},
        user: {type: 'User', optional: true},
        content: 'string',
        atuser:{type: 'User', optional: true},
    }
};
/**
 * 我的问题,已用
 */
const MyQuestion = {
    name: 'MyQuestionSelected',
    properties: {
        title: 'string',
    }
};


module.exports = {
    schema: [Dynamic, DynamicPraise, DynamicComment, User],
    schemaVersion: 6,
    migration: () => {
    }
};

// 接口服务器地址
//const apiPath = 'http://103.254.113.10:8081/api/'; // 开发服务器（外网）
// const apiPath = 'http://192.168.10.69:9191/api/'; // 开发服务器（内网）
// const apiPath = 'http://103.254.113.10:9090/api/'; // 生产服务器（外网）
 //const apiPath = 'http://192.168.10.165:8088/api/'; // 生产服务器（内网）
 const apiPath = 'http://103.254.113.10:8088/api/'; // 生产服务器（内网）
// const apiPath = 'http://fudao.infcn.com.cn/api/'; // 生产服务器（外网）
// const apiPath = 'http://192.168.10.165:9191/api/'; // 生产服务器（内网）
// const apiPath = 'http://192.168.10.165:8081/api/'; // 生产服务器（内网）



// web服务器地址
// const webPath = 'http://103.254.113.11:9191/web/'; // 开发服务器（外网）
// const webPath = 'http://192.168.10.69:9191/web/'; // 开发服务器（内网）
//const webPath = 'http://103.254.113.10:9090/web/'; // 生产服务器（外网）//
// const webPath = 'http://192.168.10.165:9090/web/'; // 生产服务器（内网）
// const webPath = 'http://fudao.infcn.com.cn/web/'; // 生产服务器（外网）
// const webPath = 'http://192.168.10.165:9191/web/'; // 生产服务器（内网）

//
// 其他
// const webPath = 'http://192.168.3.137:3000/'; // 杨可可
  //const webPath = 'http://192.168.3.204:8080/'; // 王朋
// const webPath = 'http://192.168.3.173:3000/'; // zy
// const webPath = 'http://192.168.3.213:3000/'; // cxx
// const webPath = 'http://192.168.3.184:3000/'; // cxx
 const webPath = 'http://103.254.113.10:8088/web/';
//const webPath = 'http://192.168.10.165:8088/web/'



const urls = {
    apiPath,
    webPath,

    /**
     *  页面
     */
    pages: {
        //轮播图
        SWIPER: webPath + 'swiper.html',
        // 隐式声明
        DECLARE: webPath + 'declare.html',
        // 用户协议
        PROTOCOL: webPath + 'protocol.html',
        // echart
        ECHART: webPath + 'echart.html',
        // video
        VIDEO: webPath + 'plyr-master/demo/index.html',
        // 资讯详细
        ARTICLE_GETARTICLE: webPath + 'articleDetail.html',

       /* http://192.168.10.165:8081/api/ArticleApi/getArticle*/
        // 我的时间
        MY_TIME: webPath + 'myTime.html',
        //修改时间
        MODIFICATION_TIME: webPath + 'modificationTime.html',
        // 健康测评
        HEALTH_APPRAISAL: webPath + 'healthAppraisal.html',
        // 深度自诊
        DEEP_DIAGNOSIS: webPath + 'deepDiagnosis.html',
        // 测试题
        ASSESSMENT_TEST: webPath + 'assessmentTest.html',
        // 健康圈
        HEALTH_CIRCLE: webPath + 'healthCircle.html',
        // 生命周期
        LIFE_CYCLE: webPath + 'lifeCycle.html',
        // ??????
        MY_QUESTION_PERSON: webPath + 'myQuestionPerson.html',
        // 我的位置
        MY_LOCATION: webPath + 'myLocation.html',
        // 获取位置
        GRT_ADDRESS: webPath + 'getAddress.html',
        //首页
        HOME: webPath + 'home.html',
        //我的能量场
        MY_ENERGY: webPath + 'myEnergy.html',
        //自诊
        SELFDIAGNOSIS: webPath + 'selfDiagnosis.html',
        //商城
        SHOP: webPath + 'shop.html',
        // 检测新版本
        LATEST_VERSION: webPath + 'apk/version.json',
    },
    /**
     *  接口
     */
    apis: {
        // 图片接口(ok)
        IMAGE: apiPath + 'ImgApi/getImage',
        IMAGENEW: apiPath + 'ImgApi/getImageNew',
        VIDEONEW:'http://103.254.113.10:9099/videoApi/getVideo',
        VIDEO: apiPath + 'ImgApi/getVideo',
        IMAGE_UPLOAD: apiPath + 'ImgApi/upload',
        //获取用户当天分数。
        ACTIVITY_GETTHISDATESCORE: apiPath + 'ActivityApi/getThisDateScore',
        //获取当前用户一周所得总共分数（周活力值）
        ACTIVITY_GETTHISWEEKTOTALSCORE: apiPath + 'ActivityApi/getThisWeekTotallScore',
        //获取当前用户一周所得分数（周计划活力值：周一到周日）
        ACTIVITY_GETTHISWEEKSCORES: apiPath + 'ActivityApi/getThisWeekScores',
        //获取用户活动排行，按分值排序。
        ACTIVITY_GETUSERSCORELIST: apiPath + 'ActivityApi/getUserScoreList',
        //获取今日推荐的活动
        ACTIVITY_GETRECOMMENDACTIVITYLIST:apiPath + 'ActivityApi/getRecommendActivityList',
        //获取今日推荐的活动
        ACTIVITY_GETTHEMEACTIVITYLIST:apiPath + 'ActivityApi/getThemeActivityList',
        //获取今日组数
        ACTIVITY_GETACRTALLFORTHISDAY:apiPath + 'ActivityApi/getActTallForThisDay',
        //获取单个活动详情
        ACTIVITY_GETONEACTTIVITY:apiPath + 'ActivityApi/getOneActtivity',
        //主题场景类型类型获取主题列表数据。
        THEME_GETTHEMELIST:apiPath +'ThemeApi/getThemeList',
        //
        THEME_GETEVERYDAYRECOMMEND:apiPath + 'ThemeApi/getEveryDayRecommend',
        //用户运动完成后添加分数
        ACTIVITY_ADDACTSCORE: apiPath + 'ActivityApi/addActScore',
        //标语修改（占山诳语）。
        USER_CHANGESLOGAN :apiPath + 'UserApi/changeSlogan',
        //给当前好友点赞或者取消点赞
        ACTIVITY_ADDORREMOVEPRAISE :apiPath + 'ActivityApi/addOrRemovePraise',
        //活动付款。
        ACTIVITY_PAYTHEME:apiPath+'ActivityApi/payActivity',
        //主题场景付款。
        THEME_PAYTHEME: apiPath+'ThemeApi/payTheme',



        //天气-------------------------------------------------------------------------
		WEATHER_GETWEATHER: apiPath + 'WeatherApi/getWeather',
		WEATHER_GETPM25: apiPath + 'WeatherApi/getPM25',

        // 资讯 ----------------------------------------------------------------------

        //资讯列表
        //资讯列表(ok)
        ARTICLEAPI_GETARTICLELIST: apiPath + 'ArticleApi/getArticleList',




        // 我的收藏 ----------------------------------------------------------------------

        //获取我的收藏列表
        COLLECTIONAPI_GETMYCOLLECTIONLIST: apiPath + 'CollectionApi/getMyCollectionList',
        //删除(取消)我的收藏
        COLLECTIONAPI_DELETEMYCOLLECTION: apiPath + 'CollectionApi/deleteMyCollection',
        COLLECTIONAPI_DELETEMYCOLLECTIONBYSOURCEID: apiPath + 'CollectionApi/deleteMyCollectionBySourceId',
        //添加我的收藏
        COLLECTIONAPI_ADDMYCOLLECTION: apiPath + 'CollectionApi/addMyCollection',


        //获取活动主题列表
        THEMEAPI_GETTHEMELIST: apiPath + 'ThemeApi/getThemeList',



        //获取用户信息
        USER_DETAIL: apiPath + 'app/accountInfoAction!getUserInformationByUserId.action',
        //修改用户信息
        USER_UPDATEUSERINFO: apiPath + 'UserApi/updateUserInfo',
        //搜索用户
        USER_SEARCH: apiPath + 'UserApi/searchUser',
        //修改用户体检信息
        USER_CHECK: apiPath + 'app/userInformationAction!updateResult.action',

        // 好友 ----------------------------------------------------------------------

        //申请加为好友
        FRIEND_APPLYADDFRIEND: apiPath + 'FriendApi/applyAddFriend',
        //同意加为好友
        FRIEND_AGREEADDFRIEND: apiPath + 'FriendApi/agreeAddFriend',
        //好友申请列表
        FRIEND_GETMYFRIENDAPPLYLIST: apiPath + 'FriendApi/getMyFriendApplyList',
        //删除好友
        FRIEND_DELETEMYFRIEND: apiPath + 'FriendApi/deleteMyFriend',
        //我的好友列表
        FRIEND_GETMYFRIENDLIST: apiPath + 'FriendApi/getMyFriendList',
        //修改好友备注
        FRIEND_UPDATEFRIENDREMARK: apiPath + 'FriendApi/updateFriendRemark',
        //获取好友信息
        FRIEND_GETFRIEND: apiPath + 'UserApi/getFriend',
        //
        FRIENDAPI_GETMYFRIENDAPPLYISNOTREADY:apiPath+'FriendApi/getMyFriendApplyIsNotready',
        FRIENDAPI_CHANGEMYFRIENDAPPLYTOREADY:apiPath+'FriendApi/changeMyFriendApplyToready',


        //搜索------------------------------------------------------------------------
        //全部搜索
        SEARCH_ALL: apiPath + 'SearchApi/searchAll',
        SEARCH_SYMPTOMPROBLEM: apiPath + 'SearchApi/searchSymptomProblem',
        SEARCH_INFORMATION: apiPath + 'SearchApi/searchInformation',
        SEARCH_DAILYMETHOD: apiPath + 'SearchApi/searchDailyMethod',
        SEARCH_FRIENDCIRCLE: apiPath + 'SearchApi/searchFriendsCircle',

		// 注册登录(老)
		//验证手机号
		USER_CHECKPHONEREGISTERED: apiPath + 'UserApi/checkPhoneRegistered',
		//发送验证码
		USER_SENDCODE: apiPath + 'UserApi/sendCode',
		//验证验证码
		USER_CHECKCODE: apiPath + 'UserApi/checkCode',
		//注册
		USER_REGISTER: apiPath + "UserApi/register",
		//登录
		USER_LOGIN: apiPath + "UserApi/login",
        //绑定手机
        USER_SETUSERPHONE: apiPath + "UserApi/setUserPhone",
		//获取用户信息
		USER_GETLOGINUSER: apiPath + 'UserApi/getLoginUser',
		//获取指定用户信息
		USER_GETUSER: apiPath + 'UserApi/getUser',
		//重置密码
		USER_RESETPASSWORD: apiPath + "UserApi/resetPassword",
		//基本信息
		USER_SETUSERBASEINFO: apiPath + "UserApi/setUserBaseInfo",

		USER_OTHERPORTYLOGIN: apiPath + "UserApi/otherPortyLogin",

		// 注册登录(新)

        /*//检测用户是否存在
         CHECK_PHONE: apiPath + 'checkUserExists',
         //发送验证码
         SEND_CODE: apiPath + "sendMsg",
         //检测验证码
         CHECK_CODE: apiPath + "checkCodeIsOut",
         //用户注册
         REGISTER: apiPath + 'register',
         //用户登录
         LOGIN: apiPath + 'login',
         //修改用户信息
         SAVE_USERINFO: apiPath + 'saveUserInfo',
         //重设密码
         CHANGE_PASSWORD: apiPath + 'changePassword',
         //检测旧密码
         CHECK_PASSWORD: apiPath + 'checkPassword',
         //获取用户信息
         USER_INFO: apiPath + 'userinfo',*/

        // 动态 ---------------------------------------------------------
        //动态列表
        DYNAMIC_GETMYDYNAMICSLIST: apiPath + 'DynamicApi/getMyDynamicsList',
        //添加动态
        DYNAMIC_ADDDYNAMIC: apiPath + 'DynamicApi/addDynamic',
        //删除动态
        DYNAMIC_DELETEDYNAMIC: apiPath + 'DynamicApi/deleteDynamic',
        //添加评论
        DYNAMIC_ADDDYNAMICCOMMENT: apiPath + 'DynamicApi/addDynamicComment',
        //点赞
        DYNAMIC_ADDDYNAMICPRAISE: apiPath + 'DynamicApi/addDynamicPraise',
        //取消点赞
        DYNAMIC_DELETEDYNAMICPRAISE: apiPath + 'DynamicApi/deleteDynamicPraise',


        // 我的能量场 ---------------------------------------------------------

        //获取区县
        REGION_GETCOUNTYLIST: apiPath + 'RegionApi/getCountyList',
        //获取城市列表
        REGION_GETCITYLIST: apiPath + 'RegionApi/getCityList',

        // 意见反馈 ---------------------------------------------------------
        FEEDBACK_SUBMIT: apiPath + 'FeedbackApi/submit',
        //我的记录
        TIMEPERIODAPI_GETMYRECORD:apiPath+'TimePeriodApi/getMyRecord',

        ACTIVITYAPI_GETTHISWEEKTOTALLSCORE:apiPath+'ActivityApi/getThisWeekTotallScore',

    },
    // 获取图片完整路径
    getImage(filePath, width, height){
        let url = this.apis.IMAGENEW + '?filePath=' + filePath;
        if (width)
            url += '&w=' + width;
        if (height)
            url += '&h=' + height;
        // console.log(url);
        return url;
    },
};
export default urls;

<template>
    <el-container>
        <el-header align = "center">
            <el-button type="text" @click="goBack()">返回首页</el-button>
            个人中心
        </el-header>
        <el-container>
        <el-aside width="400px">
            <div class="user-icon" align = "center">
                <el-avatar
                :size="100"
                :src="user_info.src"
                align="center">
                </el-avatar>
            </div>
            <div class="user-name">
                <span style="text-align: center;display:block;">{{username}}</span> 
            </div>
            <div class="user-menu">
                <el-menu default-active="account" class="menu" >
                    <router-link :key="item.key" v-for="item of navs" :to="item.path">
                        <el-menu-item :index="item.key" class="menu-router">
                            <template>
                                <div style="border-bottom: 1px solid #D9D9D9;">
                                    <i :class="item.value"></i>
                                    <span slot="title">{{ item.name }}</span>
                                </div>
                            </template>
                        </el-menu-item>
                    </router-link>
	            </el-menu>
            </div>
        </el-aside>
        <el-main>
            <div class="content">
                <router-view></router-view>
            </div>
        </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
    data() {
        return {
            navs: [{
						name: '个人信息',
						path: '/center/userInfo',
						title: '个人信息',
						key: 'userInfo'
					},
					{
						name: '我的收藏',
						path: '/center/userFavor',
						value: 'iconfont icontabs_gerenzhongxin_wodexiaoxi',
						key: 'userFavor'
					},
					{
						name: '我的交易',
						path: '/center/userOrder',
						value: 'iconfont icontabs_gerenzhongxin_wodeshenqing',
						key: 'userOrder'
					},
					{
						name: '账号设置',
						path: '/center/settings',
						value: 'iconfont icontabs_gerenzhongxin_wodeshoucang',
						key: 'settings'
					}],
            user_info :
                {
                    name: "user1",
                    src:"https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
                }
            
        };
    },
    methods: {
        goBack() {
            this.$router.push('/home')
        }
    },
    computed: {
        username() {
            let username = localStorage.getItem('username');
            return username ? username : this.name;
        }
    },
    components: {
    },
};
</script>


<style>
.el-header {
    line-height: 80px;
    text-align: center;
    background-color: #b3c0d1;
}
.el-aside {
    line-height: 44px;
    text-align: center;
    background-color: #d3dce6;
    height:1000px;
    width:200px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
</style>
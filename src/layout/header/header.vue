<template>
    <div class="d-header">
        <div class="d-header-top">
            <div class="toggle-leftBar">
                <i @click="setCollapse(!isCollapse)" v-if="!isCollapse" class="el-icon-s-fold"></i>
                <i @click="setCollapse(!isCollapse)" v-else class="el-icon-s-unfold"></i>
                <el-breadcrumb separator="/">
                    <transition-group name="list" tag="span">
                        <template v-for="item in breadcrumb" :key="item.path">
                            <el-breadcrumb-item :to="{ path: item.path }" class="bread-item">
                                {{ item.name }}
                            </el-breadcrumb-item>
                        </template>
                    </transition-group>
                </el-breadcrumb>
            </div>
            <div class="d-header-profile">
                <span>{{ name }}</span>
                <div>
                    <el-dropdown @command="goProfile" trigger="click" class="d-profile">
                        <div>
                            <img class="d-img" v-if="headImg" :src="headImg" />
                            <span class="d-img"></span>
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </div>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item command="goProfile">个人中心</el-dropdown-item>
                                <el-dropdown-item command="logout" divided
                                    >退出登录</el-dropdown-item
                                >
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
            </div>
        </div>
        <div class="d-header-breadcrumb">
            <history-tabs></history-tabs>
        </div>
    </div>
</template>

<script>
import HistoryTabs from './components/historyTabs.vue'
import { mapMutations, mapState } from 'vuex'
export default {
    components: { HistoryTabs },
    setup() {},
    data() {
        return {
            breadcrumb: [],
            name: '',
        }
    },
    computed: {
        ...mapState('bread', ['isCollapse']),
        headImg() {
            if (this.$store.state.user.user) {
                return this.$store.state.user.user.headImg
            }
            return false
        },
    },
    created() {
        this.name = this.$store.state.user.name
    },
    methods: {
        ...mapMutations('bread', ['setCollapse']),
        goProfile(type) {
            if (type === 'goProfile') {
                this.$router.push('/profile')
            } else if (type == 'logout') {
                this.$store.dispatch('user/logout')
                this.$router.push('/login')
            }
        },
    },
    watch: {
        // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
        $route: {
            handler(newValue, oldName) {
                const matched = Array.from(newValue.matched)
                matched.splice(0, 1)
                this.breadcrumb = matched
                this.$store.commit('routes/setCurrentRoute', newValue)
            },
            immediate: true,
        },
    },
}
</script>

<style lang="less" scoped>
.d-header {
    height: 80px;
    .d-header-top {
        height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .toggle-leftBar {
            i {
                cursor: pointer;
            }
            & > * {
                display: inline-block;
                padding-right: 17px;
            }
        }
        .d-header-profile {
            display: flex;
            align-items: center;
            & > * {
                margin-left: 10px;
                .d-profile {
                    display: flex;
                    .d-img {
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        object-fit: cover;
                    }
                }
            }
        }
        .profile-image {
            width: 40px;
            height: 40px;
        }
    }
}
.bread-item {
    display: inline-block;
    transition: all 0.4s ease;
}
</style>

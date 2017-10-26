<template>
    <div class="app-sidebar">
        <div class="brand">
            <img src="~@/assets/images/my-logo.png" alt="">
        </div>
        <ul>
            <li>
                <router-link to="/apiview">
                    <iconfont href="#icon-api"></iconfont>
                </router-link>
            </li>
            <li>
                <router-link to="/dbtable">
                    <iconfont href="#icon-shujukubiao"></iconfont>
                </router-link>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
}
</script>
<style lang="scss">
$sidebar-color: #282828;
.app-sidebar {
    position: fixed;
    width: 50px;
    height: 100%;
    background-color: $sidebar-color;
    z-index: 1024;

    .brand {
        border: 6px solid $sidebar-color;
        border-radius: 50%;
        background-color: #FFF;
        height: 50px;
        overflow: hidden;
        cursor: pointer;
        img {
            position: relative;
            top: 50%;
            transform: translateY(-50%);
        }
    }

    ul {
        padding-top: 5px;
        border-top: 1px solid #666;
        li {
            padding: 5px 0;
            font-size: 28px;
            text-align: center;
            a {
                display: block;
                color: #AAA;
            }
            a:hover,
            a.is-active {
                color: #FFF;
            }
        }
    }
}
</style>

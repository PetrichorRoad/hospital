<template>
    <div class="bottom">
        <div class="container">
            <p class="title" style="color:#e55643;">
                <span>世</span><span>间</span><span>万</span><span>般</span><span>美</span><span>好</span><span>!</span><span>都</span><span>不</span><span>及</span><span>家</span><span>的</span><span>温</span><span>暖</span><span>，</span><span>欢</span><span>迎</span><span>回</span><span>家</span><span>！</span>
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
    const word = document.querySelectorAll('span')
    word.forEach((item, index) => {
        item.style.setProperty('--delay', `${index * 0.08}s`)

    })
})
</script>

<style lang="scss" scoped>
.bottom {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    box-shadow: inset 0 0 20px #fff, inset 10px 0 46px #eaf5fc, inset 80px 0 60px #efcde6, inset -20px -60px 100px #f9f6de, inset 0 50px 140px #f9f6de, 0 0 90px #fff;
    position: sticky;
    bottom: 0;
    z-index: 999;
    overflow: hidden;

    .container {
        width: 90%;
        display: flex;
        justify-content: center;
        align-items: center;

        .title {
            font-size: 30px;
            text-transform: uppercase;
            letter-spacing: 3px;
            transform: rotate(-1deg);
            display: flex;

            span {
                margin-left: 2px;
                transform: skew(-2deg);
                text-shadow: 1px 1px #533d4a, 2px 2px #533d4a;
                opacity: 0;
                // 贝塞尔曲线
                animation: move 2s cubic-bezier(0.56, 0.09, 0.49, 1.10) infinite var(--delay);
            }
        }

        @keyframes move {
            0% {
                opacity: 0;
                transform: skew(-2deg) translateY(300%);
            }

            50% {
                opacity: 1;
                transform: skew(-2deg) translateY(0);
            }

            100% {}
        }
    }
}</style>
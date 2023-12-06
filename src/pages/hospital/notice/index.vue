<template>
    <div class="notice">
        <h1>{{ hospitalDetailStore.HospitalDetailInfo.hospital?.hosname }}挂号须知</h1>
        <div class="prompt">
            为了便您早日就医康复，请认真阅读预约挂号须知
        </div>
        <div class="info">
            <h2 class="tip">一，预约实名制:</h2>
            <div class="text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione iste dolorem consequuntur veritatis dolores mollitia porro ut beatae, et culpa excepturi explicabo laborum quam, eius illum odit aperiam voluptas numquam?
            Iure asperiores cupiditate officiis unde maiores, quos laudantium accusamus. Aliquam voluptates dolor at rerum molestias voluptatum delectus, commodi voluptas eius, fuga reiciendis laboriosam iste perspiciatis exercitationem harum odit, incidunt quam.</div>
            <h2 class="tip">二，预约挂号</h2>
            <div class="text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit officiis nihil voluptate ut
                et fuga repellendus recusandae voluptatum, dicta neque. Magni animi sed ad cumque a quia voluptatibus nobis
                facilis.</div>
            <h2 class="tip">三，取消预约</h2>
            <div class="text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis, dolores rem ipsam cum fugit voluptatum expedita ut ratione consectetur deserunt quibusdam doloremque est nisi odit necessitatibus consequuntur dolor omnis. Architecto.
            Quos, minima maxime, eos voluptatum corrupti nesciunt eaque cupiditate rem vitae accusantium sapiente voluptates officiis reiciendis nostrum sunt quidem iste molestiae cum repudiandae velit dolores et sint! Magni, perferendis totam.
            Facere beatae fugit libero numquam esse in repellat id fugiat a nesciunt illo perferendis placeat laborum, ea natus quibusdam. Tempora dignissimos sequi enim dolores cupiditate ex incidunt perferendis inventore temporibus.</div>
            <h2 class="tip">四，爽约处理</h2>
            <div class="text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui tempore laboriosam suscipit, iure molestias tenetur earum repellendus ex reiciendis mollitia voluptas porro quos vitae. Quidem vitae reiciendis quae nihil consectetur?
            Provident consequuntur, voluptatum veniam, ipsam vel omnis sequi aliquid iusto quos dolores doloremque a deleniti laborum placeat nihil architecto odit corporis repudiandae est in! Autem accusantium expedita ut dolore totam?
            Dolorum soluta error eveniet nisi? Ducimus, vero! Fugit atque, at ratione deleniti, reiciendis voluptatum laborum, eveniet nulla culpa deserunt doloribus blanditiis? Saepe nulla accusantium sapiente nobis voluptatem repellat culpa. Ut!
            Aperiam quia vel doloremque rerum asperiores, recusandae similique cumque quo ad? Labore quam saepe asperiores, perspiciatis ex est quia quos dignissimos velit eius. Maxime error repellendus natus, iure accusantium consectetur.</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import useDetailStore from '@/store/modules/hospitalDetial';

let hospitalDetailStore = useDetailStore()
</script>

<style scoped lang="scss">
.notice {
    width: 100%;

    h1 {
        font-size: 28px;
        font-weight: 600;
        margin: 15px 0;
        text-align: center;
        width: 100%;
    }

    .prompt {
        color: #7f7f7f;
        margin: 10px 0;
    }

    .info {
        .tip {
            font-weight: 600;
            margin: 10px 0;
        }

        .text {
            font-size: 14px;
            color: #7f7f7f;
            line-height: 20px;
        }
    }
}</style>
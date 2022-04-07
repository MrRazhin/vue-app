<template>
    <el-container>
        <el-header>
            <el-menu :default-active="activeIndex" mode="horizontal" :router="true">
                <el-menu-item index="/" :route="{ name: 'Home' }">
                    Главная страница
                </el-menu-item>
                <el-menu-item index="/login" :route="{ name: 'Login' }">
                    Авторизация
                </el-menu-item>
                <el-menu-item index="/shop" :route="{ name: 'Shop' }">
                    Магазин
                </el-menu-item>
            </el-menu>
        </el-header>
        <el-main>
            <el-row :gutter="20">
                <el-col :span="4" class="grid-content" v-for="product in products" :key="product.id" style="margin-bottom: 10px;">
                    <el-card style="">
                        <el-image 
                            :src="product.url" 
                            style="width: 180px; height: 240px;"
                            >
                        </el-image>
                        <div style="margin-top: 15px; width: 180px; height: 100%; text-align: left;">

                            <span style="font-weight: bold; margin-right: 12px">{{ product.price }} ₽</span>
                            <span style="text-decoration: line-through; font-size: 14px; color: #b9b9b9;">{{ product.oldprice }}₽</span>

                            <p style="width: 180px; height: 100%; font-size: 14px; line-height: 18px; color: #b9b9b9;">
                                {{ product.brand }} /{{product.title}} /{{product.diagonal}} /{{product.screen}} /{{product.display}} /{{product.memory}}
                            </p>

                            <div style="display: flex;  margin-bottom: 5px;">
                                <el-rate
                                    v-model="value"
                                    disabled
                                    style="width: 100px;">
                                </el-rate>
                                <span style="color: #b9b9b9;">{{product.rate}}</span>
                            </div>

                            <div style="border-radius: 25px; padding: 5px; font-size: 12px; width: 120px; background: linear-gradient(to right, #d3ffe5 , #deffa6, #ecff4c);">
                                РАССРОЧКА 0-0-6
                            </div>

                            <div style="margin-top: 10px; display: flex; align-items: center;">
                                <el-button type="primary" style="background: #cb11ab; border: none; border-radius: 8px"> 
                                    В корзину
                                </el-button>
                                <span style="margin-left: 15px">
                                    <img src="../assets/Heart.svg" alt="">
                                </span>
                            </div>

                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
import products from '../data/products'

export default {
    data() {
        return {
            activeIndex: '/shop',

            products,
            value: 5,
        }
    }
}
</script>



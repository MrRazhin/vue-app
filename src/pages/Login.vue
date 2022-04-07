<template>
    <el-container style="width: 500px; border: 1px solid #eee; margin: auto; padding: 20px;">
        <el-form :label-position="labelPosition" label-width="100px" :model="login" ref="login" :rules="rules" style="width: 500px;">
            <h1 style="text-align: center">Авторизация</h1>
            <el-form-item label="Электронная почта" style="text-align: left;" prop="email">
                <el-input type="email" v-model="login.email" v-if="loginLoading == false"></el-input>
                <el-input type="email" v-else :placeholder="login.email" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="Пароль" style="text-align: left;" prop="password" >
                <el-input type="password" v-model.trim="login.password" show-password v-if="loginLoading == false"></el-input>
                <el-input type="password" :placeholder="'•'.repeat(login.password.length) " :disabled="true" show-password v-else></el-input>
            </el-form-item>
            <el-form-item style="text-align: center">
                <el-button type="primary" v-if="loginLoading == false" @click="submitForm('login')">Авторизация</el-button>
                <el-button type="primary" v-else :loading="true"> Загрузка</el-button>
            </el-form-item>
        </el-form>
    </el-container>
</template>

<script>
export default {
    data() {
        var validatePass = (rule, value, callback) => {
            if (value == '') {
                callback(new Error('Пожалуйста введите пароль'));
            } 
            else if (value.length < 8) {
                callback(new Error('Пароль должен быть длинее 8 знаков'));
            }
            else  if (value !== '') {
                let flag = false;
                value = value.split('');

                value.forEach(el => {
                    if (el === el.toUpperCase()) flag = true;
                });

                console.log(flag);

                if (!flag) {
                    callback(new Error('В пароле должна быть заглавная буква'));
                }
            }

            callback();
        }

        
        return {
            labelPosition: 'top',

            loginLoading: false,

            login: {
                email: '',
                password: '',
            },
            rules: {
                email: [
                    { required: true, message: 'Пожалуйста введите email', trigger: ['blur', 'change']  },
                    { type: 'email', message: 'Некорректный адрес электронной почты', trigger: ['blur', 'change'] },
                ],
                password: [
                    { required: true, validator: validatePass, trigger: ['blur', 'change']  },
                ],
            }
        }
    },

    methods: {
        submitForm(formName) {

            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.loginLoading = true;
                    setTimeout(()=> {
                        localStorage.setItem('login', 'true');
                        this.$router.push('/');   
                    }, 2000)

                } else {
                    localStorage.setItem('login', 'false');
                    console.log('Error');
                }
            }); 

        }
    }
}
</script>
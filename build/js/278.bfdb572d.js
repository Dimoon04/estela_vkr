"use strict";(self["webpackChunkestela_auth"]=self["webpackChunkestela_auth"]||[]).push([[278],{8278:function(t,s,a){a.r(s),a.d(s,{default:function(){return p}});var e=function(){var t=this,s=t._self._c;return s("div",{attrs:{id:"body"}},[s("div",{staticClass:"wrapper"},[s("form",{attrs:{action:""}},[s("h1",[t._v("Войти")]),s("div",{staticClass:"input-box"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.authInput.txtEmail,expression:"authInput.txtEmail"}],attrs:{type:"text",placeholder:"Имя пользователя",required:""},domProps:{value:t.authInput.txtEmail},on:{input:function(s){s.target.composing||t.$set(t.authInput,"txtEmail",s.target.value)}}}),s("i",{staticClass:"bx bx-user"})]),s("div",{staticClass:"input-box"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.authInput.txtPassword,expression:"authInput.txtPassword"}],attrs:{type:"password",placeholder:"Введите пароль",required:""},domProps:{value:t.authInput.txtPassword},on:{input:function(s){s.target.composing||t.$set(t.authInput,"txtPassword",s.target.value)}}}),s("i",{staticClass:"bx bxs-lock-alt"})]),s("button",{staticClass:"btn",on:{click:function(s){return t.login()}}},[t._v("Войти")]),s("div",{staticClass:"register-link"},[s("p",[t._v("Ещё не зарегистрированы? "),s("router-link",{attrs:{to:"/register"}},[t._v("Зарегистрироваться")])],1)])])])])},u=[],i=(a(4114),a(5479)),r={name:"login",data(){return{authInput:{txtEmail:"",txtPassword:""}}},computed:{user(){return i.M.state.user}},methods:{async login(){try{await i.M.dispatch("login",{email:this.authInput.txtEmail,password:this.authInput.txtPassword}),null!=this.user&&(await this.$router.push("/"),this.$message({type:"success",message:"Вход выполнен!"}))}catch(t){this.$message({message:"Неверный логин или пароль!",type:"warning"})}}}},n=r,l=a(1656),o=(0,l.A)(n,e,u,!1,null,null,null),p=o.exports}}]);
//# sourceMappingURL=278.bfdb572d.js.map
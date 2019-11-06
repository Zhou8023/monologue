<template>
  <div class="Login">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="账号" prop="username">
        <el-input placeholder="请输入账号" prefix-icon="el-icon-message" v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pwd">
        <el-input
          type="password"
          placeholder="请输入密码"
          prefix-icon="el-icon-star-off"
          v-model="ruleForm.pwd"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login } from "../../api/login/index";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      ruleForm: {
        username: "",
        pwd: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入账号" },
          { min: 3, max: 6, message: "长度在 3 到 6 个字符" }
        ],
        pwd: [
          { required: true, message: "请输入密码" },
          { min: 3, max: 12, message: "长度在 3 到 12 个字符" }
        ]
      }
    };
  },
  methods: {
    ...mapMutations(["setName"]),
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const url = "http://api.baxiaobu.com/index.php/home/v1/login";
          const params = this.ruleForm;
          login(url, params).then(({ data }) => {
            if (data.status === "200") {
              this.setName(data.data.user_name);
              this.$router.push("/home");
            } else {
              alert("账号密码错误");
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style>
.Login {
  height: 100%;
  background: #cccccc;
  display: flex;
  justify-content: center;
  align-items: center;
}
.demo-ruleForm {
  width: 400px;
  padding: 30px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 6px 6px 10px 0px #ffffff;
  box-sizing: border-box;
}
</style>
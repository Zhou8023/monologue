<template>
  <div class="Home">
    <el-button icon="el-icon-plus" @click="tablePush()">上传数据</el-button>
    <el-dialog
      title="提示"
      :visible.sync="$store.state.dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="供应商名称" prop="supplierName">
          <el-input v-model="ruleForm.supplierName"></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="supplierContact">
          <el-input v-model="ruleForm.supplierContact"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="ruleForm.address"></el-input>
        </el-form-item>
        <el-form-item label="描述信息" prop="description">
          <el-input v-model="ruleForm.description"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="ruleForm.status">
            <el-radio label="1">启用</el-radio>
            <el-radio label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button @click="cancelAdd('ruleForm')">取 消</el-button>
          <el-button type="primary" @click="confirmAdd('ruleForm')">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <template>
      <el-table :data="$store.state.tableData" border style="width: 100%">
        <el-table-column prop="supplierName" label="供应商名称"></el-table-column>
        <el-table-column prop="supplierContact" label="联系人"></el-table-column>
        <el-table-column prop="phone" label="联系电话"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column prop="description" label="描述信息"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text">删除</el-button>
            <el-button @click="tablePush(scope.row)" type="text">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      ruleForm: {
        supplierName: "",
        supplierContact: "",
        phone: "",
        address: "",
        description: "",
        status: ""
      },
      rules: {
        supplierName: [{ required: true, message: "请输入供应商名称" }],
        supplierContact: [{ required: true, message: "请输入联系人" }],
        phone: [{ required: true, message: "请输入联系电话" }]
      }
    };
  },
  created() {
    var url = "http://49.235.147.95:3001/api/supplier/list";
    this.setTable(url);
  },
  methods: {
    ...mapActions(["setTable"]),
    //这是删除按钮
    handleClick(row) {
      console.log(row);
    },
    //上传按钮
    tablePush(row) {
      console.log(row)
      this.ruleForm = row
      this.$store.state.dialogVisible = true;
    },
    //取消添加
    cancelAdd(formName) {
      this.$refs[formName].resetFields();
      this.$store.state.dialogVisible = false;
    },
    //确定添加
    confirmAdd(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store.state.dialogVisible = false;
          this.$refs[formName].resetFields();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  }
};
</script>

<style>
.Home {
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
}
</style>
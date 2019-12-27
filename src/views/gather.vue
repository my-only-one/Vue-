<template>
  <div class="home">
    <div class="page-title">坐标采集</div>
    <div class="select-box">
      <div class="con dis-flex clearfix pd-40">
        <span class="select-title">所 属 项 目：</span>
        <div class="select-val">
          <p class="select-res project-name" @click="selectProjectList">
            <span v-if="projectName != '' ">{{projectName}}</span>
            <span v-else="">请选择所属项目</span>
            <i class="daq-icon fr">&#xe82b;</i>
          </p>
          <ul v-show="isShowProject" class="animation-fade-in">
            <li @click='projectList(item)' v-for="item in listData1">
              {{item.name}}
            </li>
          </ul>
        </div>
      </div>
      <div class="con dis-flex clearfix pd-40 mt-40">
        <span class="select-title">选择设备：</span>
        <div class="select-val">
          <p class="select-res device-name" @click="selectDeviceList">
            <span v-if="deviceName != '' ">{{deviceName}}</span>
            <span v-else="">请选择设备</span>
            <i class="daq-icon fr">&#xe82b;</i>
          </p>
          <ul v-show="isShowDevice" class="animation-fade-in">
            <li @click='deviceList(item)' v-for="item in deviceData">
              {{item.name}}
            </li>
          </ul>
        </div>
      </div>
      <div class="con dis-flex clearfix pd-40 mt-40">
        <span class="select-title">已建作业组：</span>
        <div class="select-val">
          <p class="select-res task-name" @click="selectTaskList">
            <span v-if="taskName != '' ">{{taskName}}</span>
            <span v-else="">请选择作业组</span>
            <i class="daq-icon fr">&#xe82b;</i>
          </p>
          <ul v-show="isShowTask" class="animation-fade-in">
            <li @click='taskList(item)' v-for="item in listData2">
              {{item.name}}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="page-btn dis-flex">
      <a href="javascript:;" class="btn add-btn" @click="addBtn()"><i class="daq-icon">&#xe7ff;</i>添加作业组</a>
      <a href="javascript:;" class="btn next-btn" @click="step()">下一步</a>
    </div>
    <!--增加作业组弹窗-->
    <div class="daq-popUp task-popUp animation-fade-in" v-show="taskPopup">
      <div class="mask" @click="closeBtn()"></div>
      <div class="daq-popUp-content task-box">
        <h3 class="pd-30" @click="closeBtn()">添加作业组<i class="daq-icon fr">&#xe656;</i></h3>
        <div class="pd-30 task-info">
          <p class="mt-25 dis-flex">
            <span>作业组名称：</span>
            <input type="text" class="input-box" v-model="params.name" ref="name">
          </p>
          <p class="mt-25 dis-flex">
            <span>作业组编号：</span>
            <input type="text" class="input-box" v-model="params.code" ref="code">
          </p>
          <p class="mt-25 dis-flex">
            <span>作业路段：</span>
            <input type="text" class="input-box" v-model="params.workPath" ref="workPath">
          </p>
          <!--<p class="mt-25 dis-flex">
              <span>选择移动站：</span>
              <input type="text" class="input-box" v-model="params.mobileStation">
          </p>-->
          <p class="mt-25 dis-flex">
            <span>作业人员：</span>
            <input type="text" class="input-box" v-model="params.majorName" ref="majorName">
          </p>
          <p class="mt-25 dis-flex"><span>联系方式：</span>
            <input type="text" class="input-box" v-model="params.majorTel" ref="majorTel" maxlength="11">
          </p>
          <!--<p class="mt-25 dis-flex">
              <span>备注：</span>
              <input type="text" class="input-box" v-model="params.remarks" ref="remarks">
          </p>-->
          <p class="mt-25 dis-flex">
            <span>起始点	：</span>
            <input type="text" class="input-box" v-model="params.beginPoint" ref="beginPoint">
          </p>
          <p class="mt-25 dis-flex">
            <span>结束点	：</span>
            <input type="text" class="input-box" v-model="params.endPoint" ref="endPoint">
          </p>
        </div>
        <a class="save-btn mt-40" @click="saveBtn()">保 存</a>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import {Toast} from 'vant';

  Vue.use(Toast);
  export default {
    name: "gather",
    data() {
      return {
        listData1: [], // 所属项目组数据
        listData2: [], // 已建作业组数据
        deviceData: [], // 设备数据
        isShowProject: false, // 所属项目组是否显示
        isShowTask: false, // 已建作业组是否显示
        isShowDevice: false, // 设备列表显示
        taskPopup: false, // 作业组弹窗
        params: {
          name: '', // 作业组名称
          code: '', // 作业组编号
          workPath: '', // 作业路段
          // mobileStation: '', // 选择移动站
          majorName: '', // 作业人员
          majorTel: '', // 联系方式
          // remarks: '', // 备注
          beginPoint: '', // 起始点
          endPoint: '' // 结束点
        },
        projectParams: {
          topNum: 10,
          filter: '',
        },
        projectId: '', // 项目Id
        projectName: '',
        deviceId: '', // 设备Id
        lkjhhrzm: localStorage.getItem('lkjhhrzm'),
        deviceName: '',
        taskName: '',
        basePointParmas: { // 已知点列表参数
          pageIndex: 1,
          pageSize: 10,
          filter: ''
        },
        pointList: [], // // 已知点列表数据
        validateStatus: false

      }
    },
    created() {
      this.getProjectList()
    },
    methods: {
      selectProjectList() {
        this.isShowProject = true
        this.isShowTask = false
        this.isShowDevice = false
        this.projectId = ''
        this.taskName = ''
        this.deviceName = ''
      },
      // 所属项目组下拉列表
      projectList(item) {
        this.projectName = item.name
        this.projectId = item.id
        this.getTaskList() // 关联作业组
        this.getDeviceList() // 关联设备
        this.isShowProject = false
      },
      selectTaskList() {
        this.isShowProject = false
        if (this.projectId != '') {
          if (this.listData2.length > 0) {
            this.isShowTask = true
          } else {
            new geekMobile.Toast({
              message: '暂无作业组'
            })
          }
        } else {
          new geekMobile.Toast({
            message: '请先选择所属项目'
          })
        }
        this.isShowDevice = false
      },
      // 作业组下拉列表
      taskList(item) {
        this.taskName = item.name
        this.isShowTask = false
      },
      // 设备选择
      selectDeviceList() {
        this.isShowProject = false
        this.isShowTask = false
        if (this.projectId != '') {
          if (this.deviceData.length > 0) {
            this.isShowDevice = true
          } else {
            Toast('暂无设备')
          }
        } else {
          Toast('请先选择所属项目')
        }

      },
      // 设备下拉列表
      deviceList(item) {
        this.deviceName = item.name
        this.deviceId = item.id
        this.isShowDevice = false
      },

      // 添加祖业组
      addBtn() {
        if (this.projectId === '') {
          new geekMobile.Toast({
            message: '请先选择所属项目'
          })
          return false
        }
        this.getBasePointList()
        this.taskPopup = true
      },
      formValidation() {
        // 作业组名称
        if (this.params.name === '') {
          new geekMobile.Toast({
            message: '作业组名称不能为空'
          })
          this.$refs.name.focus();
          return false
        }
        // 作业组编号
        if (this.params.code === '') {
          new geekMobile.Toast({
            message: '作业组编号不能为空'
          })
          this.$refs.code.focus();
          return false
        }
        // 作业路段
        if (this.params.workPath === '') {
          new geekMobile.Toast({
            message: '作业路段不能为空'
          })
          this.$refs.workPath.focus();
          return false
        }
        // 作业人员
        if (this.params.majorName === '') {
          new geekMobile.Toast({
            message: '作业人员不能为空'
          })
          this.$refs.majorName.focus();
          return false
        }
        // 联系方式
        if (this.params.majorTel === '') {
          new geekMobile.Toast({
            message: '联系方式不能为空'
          })
          this.$refs.majorTel.focus();
          return false
        }
        let fixedTel = /^\d{3,4}-?\d{7,9}$/
        let mobileTel = /^1(3|4|5|7|8)\d{9}$/
        if (!(fixedTel.test(this.params.majorTel)) && !(mobileTel.test(this.params.majorTel))) {
          new geekMobile.Toast({
            duration: 3000,
            message: '请填写正确的联系方式'
          })
          this.$refs.majorTel.focus()
          return false
        }
        // 起始点
        if (this.params.beginPoint === '') {
          new geekMobile.Toast({
            message: '起始点不能为空'
          })
          this.$refs.beginPoint.focus();
          return false
        }
        // 起始点
        if (this.params.endPoint === '') {
          new geekMobile.Toast({
            message: '结束点不能为空'
          })
          this.$refs.endPoint.focus();
          return false
        }
        return true
      },

      // 保存作业组
      saveBtn() {
        if (!this.formValidation()) {
          return false
        }
        console.log(this.validateStatus)
        if (this.validateStatus) {
          this.taskPopup = false

          // 成功提交后，数据清空

          this.params.name = ''
          this.params.code = ''
          this.params.workPath = ''
          // this.params.mobileStation = ''
          this.params.majorName = ''
          this.params.majorTel = ''
          // this.params.remarks = ''
          this.params.beginPoint = ''
          this.params.endPoint = ''
        } else {
          this.taskPopup = true
        }
        this.addGroupFromPhone();

      },
      closeBtn() {
        this.taskPopup = false
      },
      // 获取项目列表接口(交通LKJ作业任务)

      getProjectList() {
        this.$axios.get(this.GLOBAL.host + 'Traffic/LKJ/Task/GetProjectList', {
          params: {
            lkjhhrzm: this.lkjhhrzm,
            topNum: this.projectParams.topNum,
            filter: this.projectParams.filter
          }
        }).then(response => {
          let datas = response.data
          this.listData1 = datas.result
          console.log(datas, '项目列表')
        });
      },
      // 获取作业组列表接口(交通LKJ作业任务)
      getTaskList() {
        this.$axios.get(this.GLOBAL.host + 'Traffic/LKJ/Task/GetWorkGroupList', {
          params: {
            lkjhhrzm: this.lkjhhrzm,
            topNum: this.projectParams.topNum,
            filter: this.projectParams.filter,
            projectId: this.projectId
          }
        }).then((response) => {
          let datas = response.data
          this.listData2 = datas.result
          console.log(datas, '作业组列表')
        }, (response) => {
          // 响应错误回调
        });
      },
      // 获取设备列表接口(交通LKJ作业任务)
      getDeviceList() {
        this.$axios.get(this.GLOBAL.host + 'Traffic/LKJ/Task/GetDeviceList', {
          params: {
            lkjhhrzm: this.lkjhhrzm,
            topNum: this.projectParams.topNum,
            filter: this.projectParams.filter,
            projectId: this.projectId
          }
        }).then((response) => {
          let datas = response.data
          this.deviceData = datas.result
          console.log(datas, '设备列表')
        }, (response) => {
          // 响应错误回调
        });
      },
      // 添加作业组接口(交通LKJ作业组)
      addGroupFromPhone() {
        this.$axios.post(this.GLOBAL.host + 'Traffic/LKJ/Group/AddGroupFromPhone',
          this.$qs.stringify({
            lkjhhrzm: this.lkjhhrzm,
            projectId: this.projectId,
            name: this.params.name,
            code: this.params.code,
            majorName: this.params.majorName, // 负责人姓名
            majorTel: this.params.majorTel, // 负责人电话
            workPath: this.params.workPath, // 作业路径
            // mobileStation: this.params.mobileStation, // 移动站
            // remarks: this.params.remarks, // 备注
            beginPoint: this.params.beginPoint, // 起始点
            endPoint: this.params.endPoint // 结束点
          })
        ).then((response) => {
          let datas = response.data
          if (datas.code === 400) {
            this.validateStatus = false
            Toast(datas.message)
            return false
          }
          this.validateStatus = true
          this.getTaskList()
          console.log(datas)
        }, (response) => {
          // 响应错误回调
        });
      },
      // 下一步,页面调准啊
      step() {
        if (this.projectId === '') {
          Toast('请选择所属项目')
          return false
        }
        if (this.deviceId === '') {
          Toast('请选择设备')
          return false
        }
        this.$router.push({path:'/gather-protal',query:{'deviceId':this.deviceId}})
        //window.location.href = 'gather-protal.html?deviceId=' + this.deviceId
      },
      // 获取已知点列表接口(交通LKJ已知点)
      getBasePointList() {
        this.$axios.get(this.GLOBAL.host + 'Traffic/LKJ/BasePoint/GetBasePointList', {
          params: {
            lkjhhrzm: this.lkjhhrzm,
            pageIndex: this.basePointParmas.pageIndex,
            pageSize: this.basePointParmas.pageSize,
            projectId: this.projectId,
            filter: this.basePointParmas.filter
          }
        }).then((response) => {
          let datas = response.data
          this.pointList = datas.result
          console.log(datas, '获取已知点列表接口')
        }, (response) => {
          // 响应错误回调
        });
      },
    }
  }
</script>

<style scoped>
  @import '/../assets/css/style.scss';
</style>

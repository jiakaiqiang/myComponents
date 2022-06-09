<template>
    <div class="hello">
        <!--    <ItemFrom
                :form-data="formInfo.data"
                :form-item="formInfo.formItem"
                :rules="formInfo.rules"
                :list-type-info="listTypeInfo"
                @handleEvent="handleEvent"
                ref="itemform"
        ></ItemFrom>

            <el-button @click="gettest"> 提交</el-button>-->
        <!-- <my-table :data.sync="tableData.data" :handle="tableData.handle" :showCheck="tableData.showCheck" :showIndex="tableData.showIndex" :field-list="tableData.fieldlList" :query="filter.query" @handleClick="handleClick">
             <template v-slot:col-www="scope">
                 {{scope}}
             </template>
         </my-table>-->
        <!-- <MyDialog :visible.sync="dialog.visible" :title="dialog.title" :fullscreen="dialog.fullscreen"
                  :bt-list="dialog.btList">
            sss
        </MyDialog>
        <el-button @click="dialog.visible=!dialog.visible">切换{{`${dialog.visible}`}}</el-button>
        <my-tree :treeData="treeInfo.data" :treeParamProps="treeInfo.paramsProps" :showCheckBox="treeInfo.showcheck"
                 :menuList="treeInfo.menuList" @handleClick="handleClick" @handleEvent="handleEvent">
            <template v-slot="{data,node}" >
                {{data.label}}--{{node.isLeaf}}
            </template>

        </my-tree>
        <TreeSelect v-model ='valueSelect' :treeData='treeInfo.data' :dataType='dataType'  @handleClick="handleClick">
        </TreeSelect> -->
        <!-- 测试编辑表格 -->
        <form-table :formTableInfo="formTableInfo"></form-table>
    </div>

</template>

<script>
    import ItemFrom from "@/commons/form/form";
    import MyTable from "@/commons/table/index";
    import MyDialog from "@/commons/dialog/index"
    import MyTree from "@/commons/tree/index"
    import TreeSelect from "@/commons/treeSelect/index"
    import formTable from  '@/commons/formTable/index'
    import '@/util/vaildate.js'


    export default {
        name: "HelloWorld",
        props: {
            msg: String,
        },
        components: {
            MyTable,
            MyDialog
            , MyTree,
            TreeSelect,
            formTable
            // ItemFrom,
        },
        data() {
            return {
                valueSelect:1,
                dataType:1,
                filter: {
                    query: {
                        pageSize: 30,
                        pageNum: 2,
                        test: 'q',
                        name: ['ww', 'wee']
                    }
                },
                listTypeInfo: {
                    nameList: [
                        {label: "ceshi", value: "1"},
                        {label: "测试2", value: "2"},
                    ],
                    checkBoxValueList: [{label: "ceshi", value: "1"},
                        {label: "测试2", value: "2"}, {label: "sdsd", value: 'eee'}],
                    radioValueList: [{label: "ceshi", value: "1"},
                        {label: "测试2", value: "2"}, {label: "sdsd", value: 'eee'}]
                },
                formInfo: {
                    rules: {},
                    data: {
                        test: "",
                        name: "",
                        textname: "",
                        timeSelectover: "",
                        DateSelectover: "",
                        DateSelectovers: "",
                        itemInputNumber: "",
                        itemSilder: 0,
                        dateTime: '',
                        dateTimes: '',
                        checkBoxValue: [],
                        radioValue: ''
                    },
                    formItem: [
                        {
                            formType: "itemInput",
                            value: "test",
                            label: "名称",
                            required: true,
                            show: true,
                            placeholder: "请输入名称",
                        },
                        {
                            formType: "itemSelect",
                            value: "name",
                            label: "名称21",
                            required: true,
                            show: true,
                            list: "nameList",
                            placeholder: "请选择名称21",
                        },
                        {
                            formType: "itemTextarea",
                            value: "textname",
                            label: "名称21sss",
                            required: true,
                            show: true,
                            placeholder: "请输入选择名称21",
                        },
                        {
                            formType: "itemTimeSelect",
                            value: "timeSelectover",
                            label: "时间选择",
                            required: true,
                            show: true,
                            "is-range": "is-range",
                            "range-separator": "至",
                            "start-placeholder": "开始时间",
                            "end-placeholder": "结束时间",
                            placeholder: "选择时间范围",
                        },
                        {
                            formType: "itemDateSelect",
                            value: "DateSelectover",
                            label: "日期",
                            type: "date",
                            required: true,
                            show: true,
                            align: "right",
                            "picker-options": {
                                disabledDate(time) {
                                    return time.getTime() > Date.now();
                                },
                                shortcuts: [
                                    {
                                        text: "今天",
                                        onClick(picker) {
                                            picker.$emit("pick", new Date());
                                        },
                                    },
                                    {
                                        text: "昨天",
                                        onClick(picker) {
                                            const date = new Date();
                                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                                            picker.$emit("pick", date);
                                        },
                                    },
                                    {
                                        text: "一周前",
                                        onClick(picker) {
                                            const date = new Date();
                                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                                            picker.$emit("pick", date);
                                        },
                                    },
                                ],
                            },
                            placeholder: "选择日期",
                        },
                        {
                            formType: "itemDateSelect",
                            value: "DateSelectovers",
                            label: "月份",
                            type: "monthrange",
                            required: true,
                            show: true,
                            align: "right",
                            "start-placeholder": '开始月份',
                            "end-placeholder": '结束月份',
                            "range-separator": "至",
                            'unlink-panels': 'unlink-panels',
                            "picker-options": {
                                shortcuts: [{
                                    text: '本月',
                                    onClick(picker) {
                                        picker.$emit('pick', [new Date(), new Date()]);
                                    }
                                }, {
                                    text: '今年至今',
                                    onClick(picker) {
                                        const end = new Date();
                                        const start = new Date(new Date().getFullYear(), 0);
                                        picker.$emit('pick', [start, end]);
                                    }
                                }, {
                                    text: '最近六个月',
                                    onClick(picker) {
                                        const end = new Date();
                                        const start = new Date();
                                        start.setMonth(start.getMonth() - 6);
                                        picker.$emit('pick', [start, end]);
                                    }
                                }]
                            },
                            placeholder: "选择日期",
                        },
                        {
                            formType: "itemInputNumber",
                            label: "数字输入",
                            value: "itemInputNumber",
                        }, {
                            formType: "itemSlider",
                            label: "滑块输入",
                            value: "itemSilder",
                            "show-input": 'show-input'
                        },
                        {
                            formType: 'itemDateSelect',
                            label: "日期时间",
                            value: "dateTime",
                            type: 'datetime',
                            required: true,
                            show: true,
                        },
                        {
                            formType: 'itemDateSelect',
                            label: "日期时间带有快捷方式",
                            value: "dateTimes",
                            type: 'datetimerange',
                            required: true,
                            show: true,
                            align: "right",
                            'range-separator': "至",
                            'start-placeholder': '开始日期',
                            'end-placeholder': "结束日期",
                            'picker-options': {
                                shortcuts: [{
                                    text: '最近一周',
                                    onClick(picker) {
                                        const end = new Date();
                                        const start = new Date();
                                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                                        picker.$emit('pick', [start, end]);
                                    }
                                }, {
                                    text: '最近一个月',
                                    onClick(picker) {
                                        const end = new Date();
                                        const start = new Date();
                                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                                        picker.$emit('pick', [start, end]);
                                    }
                                }, {
                                    text: '最近三个月',
                                    onClick(picker) {
                                        const end = new Date();
                                        const start = new Date();
                                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                                        picker.$emit('pick', [start, end]);
                                    }
                                }]
                            }

                        },
                        {
                            formType: "itemCheckBox",
                            label: "多选框测试",
                            value: "checkBoxValue",
                            list: "checkBoxValueList",
                            required: true
                        },
                        {
                            formType: "itemRadio",
                            label: "单选",
                            value: "radioValue",
                            required: true,
                            list: "radioValueList"
                        }
                    ],
                },
                /*table的数据*/
                tableData: {
                    data: [{name: "测试001", age: 12, sex: '男', address: "测试"}, {
                        name: "测试00q1",
                        age: 12,
                        sex: '男',
                        address: "测试"
                    }, {name: "测试00w1", age: 12, sex: '男', address: "测试"}, {
                        name: "测试0021",
                        age: 12,
                        sex: '男',
                        address: "测试"
                    }, {name: "sss", type: 'expand'}],
                    showCheck: true,
                    showIndex: true,
                    fieldlList: [{name: "www", type: 'expand', slot: true}, {name: "name", value: "名称"}, {
                        name: "age",
                        value: "年龄"
                    }, {name: "sex", value: "性别"}, {name: "address", value: "地址"}],
                    handle: {
                        fixed: 'right',
                        show: true,
                        label: "操作",
                        width: "400px",
                        btList: [{
                            label: '编辑',
                            event: "edit",
                            show: true,
                            icon: "el-icon-edit",
                            type: "text"
                        }, {label: '查看', event: "view", show: true, icon: "el-icon-view", type: 'text'}]
                    }
                },

                dialog: {
                    visible: false,
                    title: "ceshi ", fullscreen: false,
                    btList: [{
                        label: "确定", event: "save", size: 'small', type: 'primary'
                    }, {
                        label: '取消', event: "cancel", size: "small", type: 'danger'
                    }]
                },
                treeInfo: {
                    showcheck: true,
                    data: [
                        {
                            label: '一级 1',
                            id:1,
                            children: [{
                                id:4,
                                label: '二级 1-1',
                                children: [{
                                    id:5,
                                    label: '三级 1-1-1'
                                }]
                            }]
                        }, {
                            id:2,
                            label: '一级 2',
                            children: [{
                                id:6,
                                label: '二级 2-1',
                                children: [{
                                    label: '三级 2-1-1'
                                }]
                            }, {
                                id:7,
                                label: '二级 2-2',
                                children: [{
                                    label: '三级 2-2-1'
                                }]
                            }]
                        },
                        {
                            id:3,
                            label: '一级 3',
                            children: [{
                                id:8,
                                label: '二级 3-1',
                                children: [{
                                    label: '三级 3-1-1'
                                }]
                            }, {
                                id:9,
                                label: '二级 3-2',
                                children: [{
                                    label: '三级 3-2-1'
                                }]
                            }]
                        }
                    ],
                    paramsProps: {
                        label: "label",
                        children: 'children'
                    },
                    menuList: [{
                        label: 'ceshi',
                        event: 'refresh',
                        show: true
                    },{label:"测试",event:"delete",show:true}]
                },
                 formTableInfo:{
          data:[{ fileName:"",fileSum:"",chapterMain:"",chapterLocation:'',chapterSum:'',chapterType:''}],
          fieldList:[{label:"文件名称",type:'input',value:"fileName",required:true},{label:"文件份数",type:'input',value:"fileSum",required:true},
            {label:"用章主体",type:'input',value:"chapterMain",list:"chapterMainList",required:true},  {label:"用章类型",type:'input',value:"chapterType",required:true},
            {label:"用章位置",type:'input',value:"chapterLocation",list:'chapterLocationList',width:130,required:true},{label:"用章个数",value:"chapterSum",type:"input",width:100}],
          handle:{
            width:80,
            btList:[{
              label:"删除",icon:'el-icon-delete',type:"text",event:"delete",showText:true,disabled:false
            }]
          }
        }
            };
        },
        watch:{
         valueSelect(val){
             console.log(val,'wwww')
         }
        },
        created() {
            // this.formInfo.rules = this.$initRules(this.formInfo.formItem);
        },
        mounted() {
            // console.log(this.$refs.itemform.$refs.form);
        },

        methods: {
            gettest() {
                this.$refs.itemform.$refs.form.validate((vali) => {
                    if (vali) {
                        console.log("www");
                    }
                });
            },
            handleEvent(event, data) {
                console.log(event, data)
            },
            handleClick(event, data) {
               switch(event){
                case 'nodeClick':
                    console.log(data)
                    this.treeValue=data.label
                    return
         }
            }
        },
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

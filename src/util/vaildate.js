//判断变量类型
function variable(variable) {
    let variableTypeList = {};
    let List = [
        "String",
        "Null",
        "Undefined",
        "Boolean",
        "Number",
        "Array",
        "Object",
        "Array",
        "Date",
        "Function",
    ];
    let Type = Object.prototype.toString.call(variable);
    List.forEach((item) => {
        variableTypeList[`[object ${item}]`] = item.toLocaleLowerCase();
    });
    return variableTypeList[Type];
}

//数组去重
function repeatArray(array) {
    return Array.from(new Set(array));
}

//空对象
function isEmptyObj(obj) {
    if (Object.prototype.toString.call(obj) != "[object Object]") return false;
    return Object.keys(obj).length > 0 ? false : true;
}

//是否对象
function isObject(object) {
    return Object.prototype.toString.call(object) == "[object Object]";
}

//是否数组
function isArray(array) {
    return Array.isArray(array);
}

//深拷贝
function deepClone(obj) {
    let objArray;
    if (Object.prototype.toString.call(obj) == "[object Object]") {
        objArray = {};
    } else {
        objArray = [];
    }
    Object.keys(obj).forEach((item) => {
        if (Object.prototype.toString.call(item) == "[object Object]") {
            deepClone(item);
        } else {
            objArray[item] = obj[item];
        }
    });
    return objArray;
}

// //日期格式化
function format(time, type = "time") {
    let date = new Date(time);
    let year = date.getFullYear();
    let months = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let mintues = date.getMinutes();
    let second = date.getSeconds();
    switch (type) {
        case "year":
            return year;
            break;
        case "month":
            return `${year}-${String(months).padStart(2, "0")}`;
            break;
        case "day":
            return `${year}-${String(months).padStart(2, "0")}-${String(day).padStart(
                2,
                "0"
            )}`;
            break;
        case "time":
            return `${year}-${String(months).padStart(2, "0")}-${String(day).padStart(
                2,
                "0"
            )} ${String(hour).padStart(2, "0")}:${String(mintues).padStart(
                2,
                "0"
            )}:${String(second).padStart(2, "0")}`;
            break;
    }
}

//base64编码包含中文
function base64encode(code) {
    return window.btoa(unescape(encodeURIComponent(code)));
}

//bases64解码包含中文
function base64uncode(code) {
    return decodeURIComponent(escape(window.atob(code)));
}

//防抖(在规定的时间只触发一次)
function shake(fn, time) {
    let timer = null;
    return function () {
        timer && clearTimeout(timer);
        timer = setTimeout(() => {
            fn();
        }, time);
    };
}

//节流（按照规定的时间有序进行）
function decoure(fn, time) {
    let timer = false;

    return function () {
        if (timer) {
            return false;
        } else {
            setTimeout(() => {
                fn();
                timer = true;
            }, time);
        }
    };
}

//数组的map
function arrayMap(fn, context) {
    //复制this，调用数组
    let mapArr = [];
    let newAarray = Array.prototype.slice.call(this);
    for (const [key, value] of newAarray.entries()) {
        if (!newAarray.hasOwnProperty(key)) continue;
        mapArr[key] = fn.call(context, value, key, this);
    }

    return mapArr;
}

//数组的filter方法
function arrayFilter(fn, context) {
    let newAarray = Array.prototype.slice.call(this);
    let filterArr = [];
    for (const [key, value] of newAarray.entries()) {
        if (!newAarray.hasOwnProperty(key)) continue;
        fn.call(context, value, key, this) && filterArr.push(value);
    }
    return filterArr;
}

//实现some过滤
function arraySome(fn, context) {
    let newAarray = Array.prototype.slice.call(this);
    for (const [key, value] of newAarray.entries()) {
        if (!newAarray.hasOwnProperty(key)) continue;
        if (fn.call(context, value, key, this)) {
            return true;
        } else {
            return false;
        }
    }
}

//实现every
function arrayEvery(fn, context) {
    let boole = 1;
    let newAarray = Array.prototype.slice.call(this);
    for (const [key, value] of newAarray.entries()) {
        if (!newAarray.hasOwnProperty(key)) continue;
        if (fn.call(context, value, key, this)) {
            ++boole;
        }
    }
    return boole > newAarray.length;
}

//数组的扁平化
function arrayFlat(deeps = 1) {
    let newAarray = Array.prototype.slice.call(this);
    if (deeps === 0) return newAarray;
    return newAarray.reduce((pre, cur) => {
        if (Array.isArray(cur)) {
            return [...pre, ...arrayFlat.call(cur, deeps - 1)];
        } else {
            return [...pre, cur];
        }
    }, []);
}

//函数柯力化实现(原理:函数调用总返回一个函数)
function Curing() {
    //接收参数
    let arg = [...arguments];
    //定义返回的函数
    var fn = function () {
        //添加链式调用的函数参数
        arg.push(...arguments);
        return fn; //将自身返回用于下次调用
    };
    //调用函数的toString方法时候进行数据的累加
    fn.toString = function () {
        return arg.reduce((pre, cur) => {
            return pre + cur;
        });
    };
    return fn;
}

//手动实现bind
function mybind(context) {
    //存储自身的this，则是调用bind的对象
    const _self = this
    //截取传递进来的值
    const args = Array.prototype.slice.call(arguments, 1)
    //当bind后的函数作为构造函数的时候，需要指定this的指向
    const newFun = function () {
    }
    let bindfn = function () {
        //获取bind后的函数的参数
        let bindarg = Array.prototype.slice.call(arguments)
        //调用原有的fn(如果this是一个函数的话 则证明是由构造函数创建，否则是指定的对象)
        _self.apply(this instanceof newFun ? this : context, bindarg.concat(args))
    }
//保存当前函数的原型对象
    newFun.prototype = this.prototype
//利用实例对象阻断直接修改的原型
    bindfn.prototype = new newFun()
    return bindfn

}

//new 创建的过程
/**
 * 1、创建空对象实例
 * 2、挂载对象的属性
 * 3、指定this
 * 4、返回创建的实例对象
 *
 */
//模拟new
function newCreate() {
    //创建空对象

    let newobj = new Object()
    //获取构造函数
    let Constructor = [].shift.call(arguments)
//改变空对象的原型链 使其可以访问到构造函数的属性
    newobj.__proto__ = Constructor.prototype
//修改构造函数的this使其指向空对象
    let ret = Constructor.apply(newobj, arguments)
    return typeof ret === 'object' ? ret : newobj
}

Function.prototype.mybind = mybind
Array.prototype.arrayMap = arrayMap;
Array.prototype.arrayFilter = arrayFilter;

Array.prototype.arraySome = arraySome;
Array.prototype.arrayEvery = arrayEvery;
Array.prototype.arrayFlat = arrayFlat;
///proxy代理
let myobj = {name: "贾凯强", age: 23};
const myproxy = new Proxy(myobj, {
    get(target, name, property) {

        return Reflect.get(target, name, property) + 'tests';
    },
    set(target, name, property) {

        return Reflect.set(target, name, property) + 12;
    },
    ownKeys() {
        return
    },
    getPrototypeOf(val) {

        return val
    },
    setPrototypeOf(newValue) {

    },


})

myproxy.age = 12
Object.getPrototypeOf(myproxy)
const myfun = new Proxy(function () {
}, {
    construct() {

        return {}
    }
})
new myfun(1)

//promise
/**
 * promise的实现过程
 * 定义回调函数，成功的回调resolve和失败的回调reject  我们调用对应的回调的时候去改变执行的状态、
 * 将对应的值传递给data  完成同步promise then方法的调用 如果是成功的回调或者失败的回调 执行结束后，在then方法里面执行对应的回调方法  （同步执行）对于resolve或者reject是异步的时候，则在then中将其添加到
 * 指定的回调数组中  当异步执行完成的时候，在去调用即可.   链式编程   我们在then中去返回一个promise实例即可
 *
 */
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function myPromise(myfn) {
    //存储this
    const _this = this

    //定义状态
    this.status = PENDING
    this.value = undefined; //成功结果
    this.reason = undefined; //失败原因
    this.onFulfilled = [];//成功的回调
    this.onRejected = []; //失败的回调
    //执行传入的方法
    function resolve(value) {
        if (this.status == 'pending') {
            this.status = 'fulfilled'
            this.data = value
            //遍历异步添加的函数
            this.onFulfilled.forEach(item => {
                item(this.data)
            })

        }

    }

    function reject(respone) {
        if (this.status == 'pending') {
            this.status = 'rejected'
            this.data = respone
            this.onRejected.forEach(item => {
                item(this.data)
            })
        }
    }

    myfn(resolve, reject)

}

myPromise.prototype.then = function (onFulfilled, onRejected) {
    //实现链式调用
    return myPromise((resolve, reject) => {
        //执行同步
        if (this.status == 'fulfilled') {
            //如果获取的回调是一个promise则证明是进行了链式的调用

            let res = onFulfilled(this.data)
            if (res instanceof myPromise) {
                //将链式调用的成功回调 作为下一个then的回调函数传入
                res.then(resolve)
            } else {
                resolve(this.data)
            }

        } else {
            reject()
        }
        if (this.status == 'rejected') {
            let res = onRejected(this.data)
            if (res instanceof myPromise) {
                res.then(resolve)
            } else {
                resolve(this.data)
            }
        }
        //异步
        if (this.status == 'pending') {
            this.onFulfilled.push(onFulfilled)
            this.onRejected.push(onRejected)
        }
    })

}

/*对象格式化  删除空属性*/
function deleteEmtyAttr(object) {
    for (const [key, value] of Object.entries(object)) {
        !value && delete object[key]
    }
    return object

}

/*获取文件的类型*/
function getFileType(fileName) {
    if (fileName && typeof fileName == "string") {
        return fileName.split('.').pop().toLocaleLowerCase()
    } else {
        throw new Error('文件名称不对')
    }
}
console.log(getFileType('22222.111.text'))




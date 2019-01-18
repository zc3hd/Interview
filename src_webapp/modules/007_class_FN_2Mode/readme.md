### 10.设计模式

* 1.单例：
```
var obj = {name: 'michaelqin', age: 30};
```

* 2.工厂模式：就是同样形式参数返回不同的实例
```
function Person() { this.name = 'Person1'; }
function Animal() { this.name = 'Animal1'; }

function Factory() {}
Factory.prototype.getInstance = function(className) {
    return eval('new ' + className + '()');
}

var factory = new Factory();
var obj1 = factory.getInstance('Person');
var obj2 = factory.getInstance('Animal');
console.log(obj1.name); // Person1
console.log(obj2.name); // Animal1
```

* 3.代理：就是新建个类调用老类的接口,包一下
* 4.发布订阅者模式：
```
// 发布者
function Publisher() {
        this.listeners = [];
    }
Publisher.prototype = {
    'addListener': function(listener) {
        this.listeners.push(listener);
    },

    'removeListener': function(listener) {
        delete this.listeners[listener];
    },

    'notify': function(obj) {
        for(var i = 0; i < this.listeners.length; i++) {
            var listener = this.listeners[i];
            if (typeof listener !== 'undefined') {
                listener.process(obj);
            }
        }
    }
}; 

// 订阅者
function Subscriber() {

}
Subscriber.prototype = {
    'process': function(obj) {
        console.log(obj);
    }
};　


var publisher = new Publisher();
publisher.addListener(new Subscriber());
publisher.addListener(new Subscriber());
publisher.notify({name: 'michaelqin', ageo: 30}); // 发布一个对象到所有订阅者
publisher.notify('2 subscribers will both perform process'); // 发布一个字符串到所有订阅者
```

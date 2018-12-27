/**
 * draggable属性：设置元素是否可拖动。
 * 语法：<element draggable="true | false | auto" >
 * true: 可以拖动
 * false: 禁止拖动
 * auto: 跟随浏览器定义是否可以拖动
 * 
 * WARNING: 如果不设置这个属性，
 *          文本、图片和链接是默认可以拖放的，
 *           其他的不会触发拖拽事件
 * 
 * EVENT
 * dragstart  当用户开始拖动一个元素或选中的文本时触发。
 * drag  当拖动元素或选中的文本时触发。
 * dragend  在拖动操作完成时触发
 * dragenter  当被拖动元素进入目的地元素所占据的屏幕空间时触发
 * dragover  当被拖动元素在目的地元素内时触发
 * dragleave  当被拖动元素没有放下就离开目的地元素时触发
 * drop  当被拖动元素在目的地元素里放下时触发，一般需要取消浏览器的默认行为。
 * 
 * WARNING: dragenter 和 dragover 事件的默认行为是拒绝接受任何被拖放的元素。
 *          因此，我们必须阻止浏览器这种默认行为。
 *          e.preventDefault();
 * 
 * TODO:
 * 垃圾内部可以排序
 * 在排序的过程中，动画效果
 */

let dragElement;
const contentWrap = document.querySelector('.content-wrap');
const msg = document.querySelector('.msg');
const trashList = document.querySelectorAll('.trash');
const ashcan = document.querySelector('.ashcan');

const TRASH_EVENT = {
  dragstart(event) {
    console.log('----dragstart----');
    // 设置拖动时候的图像，一般使用默认
    // event.dataTransfer.setDragImage(event.target, 0, 0);
    event.dataTransfer.setData("text/plain", event.target.innerHTML);
    dragElement = event.target;
  },
  drag(event) {
    // console.log('drag', event);
  },
  dragend(event) {
    console.log('----dragend----');
    event.dataTransfer.clearData("text");
    dragElement = null;
  },
}

const ASHCAN_EVENT = {
  dragenter(event) {
    event.preventDefault();
    console.log('----dragenter----');
  },
  dragover(event) {
    event.preventDefault();
    // console.log('dragover', event);
  },
  dragleave(event) {
    console.log('----dragleave----');
  },
  drop(event) {
    event.preventDefault();
    console.log('----drop----');
    // event.dataTransfer.getData(); 只能在 drop 里面获取？
    var data = event.dataTransfer.getData("text/plain");
    dragElement.remove()
    msg.innerHTML = `${data} 被删除`;
  }
}

const CONTENT_EVENT = {
  dragenter(event) {
    event.preventDefault();
    event.stopPropagation();
    console.log('----dragenter----', event.target);
  },
  dragover(event) {
    event.preventDefault();
    // console.log('dragover', event);
  },
  dragleave(event) {
    console.log('----dragleave----', event.target);
  },
  drop(event) {
    event.preventDefault();
    console.log('----drop----');
  }
}

// 为每个垃圾添加拖拽事件
Array.prototype.forEach.call(trashList, element => {
  Object.keys(TRASH_EVENT).forEach(key => {
    element.addEventListener(key, TRASH_EVENT[key]);
  })
});

// 为垃圾桶添加拖拽事件
Object.keys(ASHCAN_EVENT).forEach(key => {
  ashcan.addEventListener(key, ASHCAN_EVENT[key]);
})

Object.keys(CONTENT_EVENT).forEach(key => {
  contentWrap.addEventListener(key, CONTENT_EVENT[key]);
})

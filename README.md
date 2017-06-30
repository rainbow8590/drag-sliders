# drag-sliders
## 左右拖拽的轮播图
### 实现功能
  1.按着鼠标左右拖拽，当拖拽的距离大于一定的值的时候，触发轮播图的运动；
  2.可以通过参数控制小圆点和左右箭头的显示和隐藏，当参数为true的时候，轮播图才会出现小圆点和左右箭头，左右箭头和小圆点是通过两个属性分别控制的，所以二者可以同时出现也可以只出现一个。
  
### 使用方法
##### 第一步：在html页面中  
```
  '<div id="wrap"></div>'; 
  
  <script src="jquery.min.js"></script> ;   
  
  <script src="dragSlider.js"></script> ;   
```
##### 第二步：配置参数  
```
    dragSlider({  
          //轮播图最外层容器的ID,不加#号  
          wrapId: 'wrap',  
          //轮播图内层包裹运动的ul容器的ID,不加#号  
          innerId:'inner',  
          //是否显示小圆点  
          showDot: true,  
          //小圆点外层的class,不加'.'   
          dotClass: 'dot',  
          //小圆点的样式，如果showDot为false,可以不写这个参数  
          dotSpanClass: 'cur',  
          //小圆点的背景颜色,支持所有颜色表达样式  
          bgcolor: '#fff',  
          //小圆点的宽度  
          dotSpanWidth: 12,  
          //小圆点的高度  
          dotSpanHeight: 12,  
          //小圆点之间的间隔(margin-right值)  
          dotSpanMargin: 10,  
          //容器的宽度 ,为了美观最好和图片的宽度一样  
          wrapWidth: 790,  
          //容器的高度,为了美观最好和图片的高度一样  
          wrapHeight: 340,  
          //图片的地址  
          slideImgs: ['images/slide-1.jpg','images/slide-2.jpg','images/slide-3.jpg','images/slide-4.jpg','images/slide-5.jpg'],  
          //图片的链接  
          slideImgLink: ['images/slide-1.html','images/slide-2.html','images/slide-3.html','images/slide-4.html','images/slide-5.html'],  
          //定时器间隔时间  
          time: 2000,  
          //是否显示箭头  
          showArrow: true,  
          //左箭头的class,不加'.' ,如果showArrow为false可不加  
          leftArrowClass: 'leftArrow',  
          //右箭头的class,不加'.' ,如果showArrow为false可不加  
          rightArrowClass: 'rightArrow',  
          //箭头的颜色  
          arrowColor:'#fff'  
      });
  ```
  

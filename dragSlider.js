function dragSlider(option){
    //设置外部容器的样式
    $('#'+option.wrapId).css({
        'width': option.wrapWidth,
        'height': option.wrapHeight,
        'border': '1px solid #ccc',
        'position': 'relative',
        '-webkit-user-select':'none',
        '-moz-user-select':'none',
        '-ms-user-select':'none',
        '-o-user-select':'none',
        '-khtml-user-select':'none',
        'user-select':'none',
    })
    //添加内部容器
     $('<div id="'+ option.innerId +'"></div>').appendTo('#'+option.wrapId);
    //设置内部容器的样式
    $('#'+option.innerId).css({
        'width': option.wrapWidth,
        'height': option.wrapHeight,
        'position': 'relative',
        'overflow': 'hidden'
    });

    //创建ul
    $('<ul></ul>').appendTo($('#'+option.innerId));

    //运动的ul
    var oUl = $('#'+option.innerId).find('ul');

    //创建Li
    $(option.slideImgs).each(function(index){
        $('<li><a href="'+ option.slideImgLink[index]+'"></a></li>').appendTo(oUl)
    });

    //设置ul的样式
    oUl.css({
        'position':'absolute',
        'left': -option.wrapWidth,
        'top': 0,
        'width': option.wrapWidth*(oUl.find('li').length + 3)
    });
    
    //设置li的css样式
    $.each(oUl.find('li'),function(index,item){
        $(item).css({
            'width':option.wrapWidth,
            'height':option.wrapHeight,
            'float':'left',
            'background':'url('+option.slideImgs[index]+')'
        });
    });
    //设置a的样式
    $.each(oUl.find('li a'),function(index,item){
        $(item).css({
            'display':'block',
            'width':option.wrapWidth,
            'height':option.wrapHeight
        });
    });

    //克隆第一张图片
    oUl.find('li').first().clone(true).appendTo(oUl);
    //克隆第二张图片
    oUl.find('li').eq(1).clone(true).appendTo(oUl);
    //克隆最后一张图片
    oUl.find('li').eq(oUl.find('li').length-3).clone(true).prependTo(oUl);

    //创建小圆点外层容器和小圆点
    $('<div class="'+ option.dotClass +'"></div>').appendTo($('#'+option.wrapId));
    $(option.slideImgs).each(function(index){
        $('<span></span>').appendTo($('.'+option.dotClass))
    })
    //设置小圆点css样式
    $('.'+option.dotClass).find('span').css({
        'display':'inline-block',
        'width':option.dotSpanWidth,
        'height':option.dotSpanHeight,
        'border-radius':'50%',
        'margin-right':option.dotSpanMargin,
        'background': option.bgcolor
    })
    //给第一个小圆点添加当前状态的class
    $('.'+option.dotClass).find('span').first().addClass(option.dotSpanClass);

    //设置小圆点容器的css样式
    $('.'+option.dotClass).css({
        'position':'absolute',
        'left':'50%',
        'bottom':'10px',
        'margin-left':-$('.'+option.dotClass).find('span').outerWidth(true)*$(option.slideImgs).length/2,
    })

    // 创建箭头
    // 左箭头
    $('<span class="'+ option.leftArrowClass +'">&lt;</span>').appendTo('#'+option.wrapId);
    // 有箭头
    $('<span class="'+ option.rightArrowClass +'">&gt;</span>').appendTo('#'+option.wrapId);

    //设置左右箭头共同的样式
    $('.'+option.leftArrowClass+','+'.'+option.rightArrowClass).css({
        'position':'absolute',
        'top':'50%',
        'width':60,
        'height':100,
        'margin-top':'-50px',
        'font-size':60,
        'text-align':'center',
        'line-height':'100px',
        'font-family':'宋体',
        'font-weight':'bold',
        'color': option.arrowColor,
        'opacity': 0,
        'cursor':'pointer'
    });
    //设置左箭头样式
    $('.'+option.leftArrowClass+'').css({
        'left':0
    });
    
    //设置右箭头样式
    $('.'+option.rightArrowClass+'').css({
        'right':0
    });


    //根据用户传递的showDot参数的值来判断是否显示小圆点
    if(option.showDot){
        $('.'+option.dotClass).css('display','block');
    }else{
        $('.'+option.dotClass).css('display','none');
    }

    //记录鼠标按下和移动时的X方向的位置
    var stX = edX = 0;
    //存放时移动时X方向的位置
    var arr = []  
    //判断是否触发move事件 默认没有触发
    var flag = false;
    //记录翻页的次数(页码)
    var num = 1; 
    //定时器
    var timer = null;

    timer = setInterval(play,option.time);


    //左箭头点击事件
    $('.'+option.leftArrowClass).on('click',function(){
        num--;
        move();;
    });

    //右箭头点击事件
    $('.'+option.rightArrowClass).on('click',function(e){
        // e.stopPropagation();
        num++;
        move();
    });



    //鼠标按下和鼠标移动
    $('#'+option.innerId).on('mousedown',function(e){
        e.stopPropagation();
        e.preventDefault();
        //鼠标按下的初始位置
        stX = e.clientX - $('#'+option.wrapId).offset().left ; 
        $('#'+option.innerId).on('mousemove',function(e){
            //触发mousemove事件就改变flag的状态
            flag = true;
            e.stopPropagation();
            e.preventDefault();
            //鼠标移动时的位置
            edX = e.clientX - $('#'+option.wrapId).offset().left;
            //鼠标移动时改变ul的left值
            oUl.css({'left': edX-stX - $('#'+option.wrapId).width()*num});
        });
    });

    //鼠标抬起
    $('#'+option.innerId).on('mouseup',function(e){ 
        //判断是否触发mousemove事件，如果没有触发，就把a的click事件取消掉
         if(flag == true){
            flag = false;
         }else{
            //取消a链接的阻止行为
            unAClick();
            flag = true;
         }
        e.stopPropagation();
        e.preventDefault();    
        //解除mousemove事件
        $('#'+option.innerId).off('mousemove');
       flg();
       console.log(11111)
    });
    //鼠标超出容器范围
    $('#'+option.wrapId).on('mouseleave',function(){
        wen = 1;
        $('#'+option.innerId).off('mousemove');
        timer = setInterval(play,option.time);
        //改变箭头的样式
        if(option.showArrow){
            $('.'+option.leftArrowClass+','+'.'+option.rightArrowClass).animate({
                'opacity':0
            },500)
        }
    });

    //鼠标经过容器 
    $('#'+option.wrapId).on('mouseover',function(){
        clearInterval(timer);
        //改变箭头的样式
        if(option.showArrow){
            $('.'+option.leftArrowClass+','+'.'+option.rightArrowClass).animate({
                'opacity':1
            },500);
        }
    });

    //点击小圆点事件
    $('.'+option.dotClass).find('span').on('click',function(){
        num = $(this).index();
        play();
    });

    

    //向左运动函数
    function play(){
        num++;
        move();
    }

    //判断鼠标按下和离开的距离
    function flg(){
        if(stX - edX > 200){  //向左运动
            num++;
            move();
        }else if(edX - stX > 200 ){ //向右运动
            num--;
            move();
        }else{ //没有超出设置的像素图片不切换
            move();  
        }
        //图片运动之后，让 stX=0 edX=0 防止拖拽时的影响（解决第一张和第二张之间的bug）
        stX = edX = 0;
    }

    function move(){
        //当图片走到倒数第二张的条件
        if(num > oUl.find('li').length-2){
            num = 2;
            oUl.css('left',-option.wrapWidth - (stX-edX));
        }
        //当图片第一张的条件
        if(num == 0){
            num = oUl.find('li').length - 3;
            oUl.css('left',-option.wrapWidth * (oUl.find('li').length - 2)+(edX-stX))
        }
        //小圆点状态变化的条件
        if(num == oUl.find('li').length-2){
            $('.dot span').eq(0).addClass(option.dotSpanClass).siblings().removeClass(option.dotSpanClass)
        }
        //ul运动
        oUl.stop().animate({'left':-option.wrapWidth *num},500);
        //小圆点状态改变
        $('.'+option.dotClass).find('span').eq(num-1).addClass(option.dotSpanClass).siblings().removeClass(option.dotSpanClass);  
    }

     //a链接点击事件
    aClick();
    function aClick(){
        oUl.find('a').each(function(index,item){
            $(item).on('click',function(){
                return false;
            })
        })
    }
    //解除绑定事件
    function unAClick(){
        oUl.find('a').each(function(index,item){
            $(item).off('click')
        })
    }
}
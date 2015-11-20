/**
 * Created by bird on 2015/10/22.
 */

/*
* troubles
* 1、精度问题（判断是否成功 随机出现的矩阵）
* 2、猴子问题 （距离有问题。）
* */

apiready = function(){
    var myWidth=document.documentElement.clientWidth;
    var myHeight=document.documentElement.clientHeight;
    window.onresize = function()
    {
        //alert("change");
        if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth)
        {
            myHeight = document.documentElement.clientHeight;
            myWidth = document.documentElement.clientWidth;
        }
        location.reload();
    };

    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext("2d");

   /* function changePic(){
        picWidth += 50.2222222;
        context.clearRect(-2,myHeight*2/3-myHeight*0.05,myWidth*0.1,myHeight*0.05);// ?清除画布大小时的问题。
        context.drawImage(bark,picWidth,0,50,64,width*0.2,myHeight*2/3-myHeight*0.055,myWidth*0.05,myHeight*0.05);
        if(picWidth >350)
        {
            picWidth = 50.2222222;
        }
    }*/


    var _distance;
    var _width;
    var width = myWidth*0.1;
    var flag = true;
    var flag1 = true;
    var flag2 = true;
    var i = 0;
    var speed = 1;
    var _speed = -1;
    var p = 0;
    var _count = 0;
    var _left = 0;
    var state = true;


    context.fillStyle = "black";
    context.font = "100px Courier New";
    context.fillText("0",myWidth/2-25, 100);


    //context .fillRect(0,350,50,250);
    context .fillRect(0,myHeight*2/3,width,myHeight/3);

    make_square();

    document.getElementById('myCanvas').onmousedown =  function (){
        //直线的上升
        if(state)
        {
            flag=true;
            setInterval(line_up,30);
            i= 0;
        }

    };

    document.getElementById('myCanvas').onmouseup = function(){
        //直线的下落
        if(state)
        {
            flag = false;
            flag1 = true;
            setInterval(line_off,20);
        }

    };

    document.getElementById('myCanvas').addEventListener('touchstart',function (){
        //直线的上升
        if(state)
        {
            event.preventDefault();
            flag=true;
            setInterval(line_up,30);
            i= 0;
        }

    },false);

    document.getElementById('myCanvas').addEventListener('touchend',function (){
        //直线的上升
        if(state)
        {
            event.preventDefault();
            flag = false;
            flag1 = true;
            setInterval(line_off,10);
        }

    },false);



    function make_square(){
        _distance = Math.floor( Math.random()*(myWidth*0.4)+myWidth*0.3);
        _width = Math.floor(Math.random()*(myWidth*0.2)+myWidth*0.05);
        context .fillRect(_distance,myHeight*2/3,_width,myHeight/3);

        context.save();
        context.fillStyle = "red";
        context .fillRect(_distance+_width/2-4,myHeight*2/3,8,2);
        context.restore();

    }

    function line_up ()
    {

        if(flag)
        {
            context.strokeStyle='#000';
            context.lineWidth=myWidth*0.01;
            context.lineCap='square';
            context.beginPath();
            context.moveTo(width-myWidth*0.015,myHeight*2/3);
            context.lineTo(width-myWidth*0.015,myHeight*2/3-i);
            context.stroke();
            context.closePath();
            i+=5;
        }
        else
        {
            //重写方法
            line_up = function(){
                return null;
            }
        }
    }

    function line_off()
    {

        if(flag1){
            state = false;
            context.clearRect(0,0,myWidth,myHeight*2/3);
            context.beginPath();
            context.moveTo(width-5,myHeight*2/3);
            context.lineTo(width-5+i*Math.sin(p*Math.PI/180),myHeight*2/3-i*Math.cos(p*Math.PI/180));
            context.stroke();
            context.closePath();

            if(_count >= 10)
            {
                context.fillText(_count.toString(),myWidth/2-50, 100);
            }
            else
            {
                context.fillText(_count.toString(),myWidth/2-25, 100);
            }

            p = p+10;
            if(p >90)
            {
                flag1=false;
                //两个矩形的左移
                p=0;

                if(i > _distance+_width/2-4-width+5-myWidth*0.01 && i <_distance+_width/2+4-width+5)
                {
                    showPerfect(); //立即显示perfect
                }

                var flag0 = true;
                setInterval(changePic,80);
                var _with = -139;
                function changePic(){
                    if(flag0)
                    {
                        _with += 15.44444444;
                        $("#myIco").css('background-position',_with+'px'+' 16px');
                    }
                    else
                    {
                        changePic = function()
                        {
                            return null;
                        };
                    }
                }


                var aa = setInterval(run,8);

                function run(){
                    _left+=1;
                    $("#myIco").css('margin-left',_left+'px');
                    if(_left == i+width-7)
                    {
                        flag0 = false;
                        clearInterval(aa);
                        //不管长短，先走完再判断
                        if(i < _distance-width+5 || i >_distance+_width-width+5-myWidth*0.01)
                        {
                            over();

                        }
                        else
                        {
                            context.clearRect(0,0,myWidth,myHeight*2/3-5);
                            if(i > _distance+_width/2-4-width+5-myWidth*0.01 && i <_distance+_width/2+4-width+5)
                            {

                                _count+=2;
                                if(_count >= 10)
                                {
                                    context.fillText(_count.toString(),myWidth/2-50, 100);
                                }
                                else
                                {
                                    context.fillText(_count.toString(),myWidth/2-25, 100);
                                }
                            }
                            else
                            {
                                _count++;
                                if(_count >= 10)
                                {
                                    context.fillText(_count.toString(),myWidth/2-50, 100);
                                }
                                else
                                {
                                    context.fillText(_count.toString(),myWidth/2-25, 100);
                                }
                            }

                            flag2=true;
                            setInterval(square_move,1);
                        }



                    }
                }



            }
        }
        else
        {
            line_off = function(){
                return null;
            }
        }
    }


    function over(){
        var k = 10;
        var mt = -182;
        var a = setInterval(function(){
            //$("#myIco").css('opacity',k*0.1);
            $("#myIco").css('margin-top',mt+k*2.9);
            mt = mt+k*2.9;
            k = k-1;
            if(k == 0)
            {
                $("#myIco").css('opacity',0);
            }
            if(k == -1)
            {
                clearInterval(a);
                shake();
                setTimeout(function(){
                    localStorage.setItem('myScore',_count);
                    gameover();
                },1000);
            }
        },10);
    }


    function shake(){
        $( "body" ).effect( "shake" , { times:1,direction:'up',distance:5 },100);
    }


    function showPerfect(){
        var k = 10;
        var a = setInterval(function(){
            $("#perfect").css('opacity',k*0.1);
            $("#perfect").css('margin-top',-360+k);
            k = k-1;
            if(k == -1)
            {
                clearInterval(a);
            }
        },50);
    }



    /*function showPerfect(){
        var bark = new Image();
        //bark.src = "../image/walk.png";
        bark.src = "../image/perfect.png";
        context.drawImage(bark,myWidth/2-75, 150);
        var imgdata=context.getImageData(0,150,640,64);

        var op=10;
        var s = null;
        bark.onload = function (){   //必须图片加载完成以后才能绘制
            s = setInterval(changeop,10);
            //setInterval(square_move,1);
        };

        function changeop(){
            op-=1;
            for(var i=0;i<imgdata.data.length;i++){
                imgdata.data[i+3]=imgdata.data[i+3]*op*0.1;
            }
            context.putImageData(imgdata,0,150);
            if(op==0){
                flag2=true;
                setInterval(square_move,1);
                clearInterval(s);
            }
        }

    }*/

    function square_move(){
        if(flag2){
            _left-=1;
            $("#myIco").css('margin-left',_left+'px');

            context.clearRect(0,myHeight*2/3-10,myWidth,myHeight/3+10);
            context.translate(_speed,0);
            context.fillStyle = "black";
            context .fillRect(0,myHeight*2/3,width,myHeight/3);
            context .fillRect(_distance,myHeight*2/3,_width,myHeight/3);
            context.beginPath();
            context.moveTo(width-5,myHeight*2/3);
            context.lineTo(width-5+i,myHeight*2/3);
            context.stroke();
            context.closePath();

            context.save();
            context.fillStyle = "red";
            context .fillRect(_distance+_width/2-4,myHeight*2/3,8,2);
            context.restore();

            if(speed == _distance)
            {
                state = true;
                flag2=false;
                context.translate(speed,0);
                //context .fillRect(300,350,100,250);
                width = _width;
                make_square();
                speed = 1;
            }
            else
            {
                speed++;
            }

        }
        else
        {
            square_move = function(){
                return null;
            }
        }
    }




    function gameover(){
        api.openWin({
            name: 'gameover',
            url: '../html/engPage.html',
            reload:true,
            animation:
            {
                type:'fade'
            }
        });
    }
};






////////////////////// header
TweenMax.set($("#header2"), {scale:0.7});
TweenMax.set($("#header3"), {scale:0.8});
TweenMax.set($("#header"), {backgroundColor:"rgba(255,255,255,1)"});

TweenMax.to($("#header"), 1, {scale:1,yoyo:true,repeat:-1,opacity:1}); 
TweenMax.to($("#header"), 5, {backgroundColor:"rgba(3,255,129,1)",yoyo:true, repeat:-1}); 

TweenMax.to($("#header2"), 1, {rotation:360,repeat:-1,opacity:1});
TweenMax.to($("#header2"), 2, {scale:1,yoyo:true,repeat:-1,});
TweenMax.to($("#header3"), 2, {rotation:720,repeat:-1,ease: Power0.easeNone, y: 0 });
TweenMax.to($("#header3"), 1, {scale:0.9,yoyo:true,repeat:-1,});
TweenMax.to($("#header3"), 2, {borderRadius:100,yoyo:true,repeat:-1,});



 $(function(){
    $('#type').click(function(){
        if( $(this).hasClass('beautiful') ){
            $(this).removeClass('beautiful').addClass('professional');
        } else if( $(this).hasClass('professional') ){
            $(this).removeClass('professional').addClass('impressive');
        } else if( $(this).hasClass('impressive') ){
            $(this).removeClass('impressive').addClass('clean');
        } else if( $(this).hasClass('clean') ){
            $(this).removeClass('clean').addClass('beautiful');
        } 
    });
 })
 
 var element = document.getElementById("type"), 
    states = [
      	"beautiful",
        "professional",
        "impressive",
        "clean"
    ],
    statesLength = states.length - 1,
    i = 0,
    currentState = 0;

window.setInterval(function () {
    element.className = "type";
    currentState = (currentState + 1 > statesLength) ? 0 : currentState + 1;
    element.classList.add(states[currentState]);
}, 2000);
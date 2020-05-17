import jQuery from 'jquery'
import { playPauseMusic as playPauseMusic } from './music'

class Tube {
    constructor() {
        this.balls = []
        this.completed = 0
    }
    popBall() {
        this.balls.pop()
        this.completed = 0
    }
    pushBall(ball) {
        this.balls.push(ball)
        let color = this.balls[0]
        let mateix = this.balls.filter(y => y === color);
        if(mateix.length==4) {
            this.completed=1
        }
    }
    lastBall(){
        return this.balls[this.balls.length-1]
    }
}

class Level {

    constructor() {
        this.balls = []
        this.tubes = []
        this.steps = []
        this.cheat = false;
        this.level = 2
        this.levels = {
            1: {
                colors: 7,
                tubes: 9
            },
            2: {
                colors: 9,
                tubes: 11
            },
            3: {
                colors: 12,
                tubes: 14
            }
        }
        this.multi = true
        this.timeleft = 40
        this.multiTimer
    }

    createLevel(level=2) {
        this.balls = []
        this.tubes = []
        this.steps = []
        this.cheat = false;
        this.level = level;
        this.multi = true;
        for (let i = 0; i < this.levels[level].tubes; i++) {
            this.tubes.push(new Tube())
        }
        for (let i = 0; i < this.levels[level].colors; i++) {
            for (let j = 0; j < 4; j++) {
                this.balls.push(i)
            }
        }
        this.balls.sort( () => Math.random() - 0.5);
        this.setBalls()
        this.echo()
        this.startTimer()
    }

    changeBall(origin,destiny) {

        if (this.tubes[destiny].balls.length<4) {

            let originBall = this.tubes[origin].lastBall();
            let destinyBall = this.tubes[destiny].lastBall();

            if(!this.tubes[destiny].balls.length || destinyBall == originBall) {

                this.tubes[destiny].pushBall(originBall)
                this.tubes[origin].popBall()

                this.steps.push([origin,destiny]);

                if(this.tubes.filter(t=>t.completed==1).length==this.balls.length/4) {
                    this.addCookie()
                }

                this.echo()

            }

        }
        
    }

    addTube() {
        if(!this.cheat) {
            this.tubes.push(new Tube())
            this.echo()
            this.cheat = true
        }
    }

    undo() {
        if(this.steps.length) {
            let lastStep = this.steps.pop()
            let origin = lastStep[0];
            let destiny = lastStep[1];
            this.tubes[origin].pushBall(this.tubes[destiny].lastBall())
            this.tubes[destiny].popBall();
            this.echo();
        }
    }

    echo() {
        jQuery(".game").empty();
        this.tubes.forEach((tube,i)=>{
            let $tube = jQuery("<div class='tube' data-tube='"+i+"'></div>");
            tube.balls.forEach(ball=>{
                $tube.append('<div class="ball color'+ball+'">'+ball+'</div>');
            })
            if(tube.completed){$tube.addClass("completed")}
            jQuery(".game").append($tube);
        })
    }

    setBalls() {
        let t = 0;
        this.balls.forEach(ball=>{
            let gi = Math.floor(t/4);
            this.tubes[gi].pushBall(ball)
            t++
        })
    }

    reset() {
        this.tubes.forEach(tube=>{
            tube.balls = []
            tube.completed = 0
        })
        this.steps = []
        this.setBalls()
        this.echo()
    }

    getCookies() {
        var cookies = localStorage.getItem('cookies');
        if (!cookies) {
            return 0
        }
        return parseInt(cookies)
    }

    addCookie() {
        let cookies = this.getCookies()+parseInt(game.points());
        localStorage.setItem('cookies',cookies)
        jQuery.post('http://eladisanchez.com/api/index.php',{
            nom: localStorage.getItem('user'),
            galetes: game.getCookies()
        },function(res){
            console.log(res);
            if(res) {
                var galetext = {
                    0: 'un aplauso',
                    1: 'una galeteta',
                    2: 'dues galetetes',
                    3: 'tres galetes',
                    4: '4 galetones',
                    5: '5 galetaques',
                    6: '6 galetotes',
                    8: '8 galetamens',
                    10: '10 galetamens\nEts el Déu de les galetes!'
                }
                setTimeout(()=>{
                    jQuery('<div class="winner"><div><h2>Molt bé</h2><p>Has guanyat '+galetext[game.points()]+'</p><p class="galeta">🍪</p></div></div>').appendTo('body').fadeIn();
                },500)
                jQuery(".cookies").html(res.galetes)
            } else {
                alert("No facis trampes, cochinoto!");
            }
        });
    }

    points() {
        let pointsByLevel  = {
            1: 1,
            2: 3,
            3: 5
        }
        var points = pointsByLevel[this.level]
        if (this.cheat) points -= 1
        if (this.multi) points *= 2
        return points
    }

    arrayTubes() {
        return this.tubes.map(tube=>{return tube.balls})
    }

    checkSteps() {
        jQuery.post('http://eladisanchez.com/api/checkSteps.php',{
            tubes: game.arrayTubes()
        },function(){
            
        });
    }

    startTimer() {
        this.timeleft = this.level * 40
        clearInterval(this.multiTimer)
        this.multiTimer = setInterval(function(){
            if(game.timeleft <= 0){
                game.multi = false
                clearInterval(game.multiTimer);
                document.getElementById("countdown").style.display = "none";
            } else {
                document.getElementById("countdown").style.display = "block";
                document.getElementById("countdown").innerHTML = "Multigaleta x2 🍪 " + game.timeleft + " segons";
            }
            game.timeleft -= 1;
        }, 1000);
    }

}

window.game = new Level();

game.createLevel();


jQuery(document).ready(function($){

    var user = localStorage.getItem('user')
    if(!user) {
        user = prompt('Hola, qui ets?');
        if(!user) {
            user = 'Ningú';
        }
        user = user.substring(0,20);
        localStorage.setItem('user',user);
    }
    $(".user").html(user);

    $(".cookies").html(game.getCookies())

    // Clicar provetes
    var eventBoles = 'ontouchstart' in document.documentElement ? 'touchstart' : 'click'
    jQuery("body").on(eventBoles,".tube",function(){
        if($(this).hasClass("checked")){
            $(this).removeClass("checked")
            return false;
        }
        if($(".checked").length) {
            let origin = $(".checked").attr("data-tube");
            let destiny = $(this).attr("data-tube");
            game.changeBall(origin,destiny);
            $(".checked").removeClass("checked")
        } else {
            $(this).addClass("checked");
        }
    })

    // Afegir proveta
    $(".btn-newtube").on("click",function(){
        if(game.cheat) {
            alert("Ja l'has fet servir!")
            return false;
        }
        game.addTube();
    })

    $(".btn-playpause").on("click",function(){
        playPauseMusic();
    })

    $(".btn-undo").on("click",function(){
        game.undo();
    })

    $(".btn-reset").on("click",function(){
        game.reset();
    })

    $(".btn-new").on("click",function(){
        game.createLevel(game.level);
    })

    $("body").on("click",".winner",function(){
        $(this).fadeOut(400,function(){
            $(".winner").remove();
        });
        game.createLevel(game.level);
    })

    $(".nivells span").on("click",function(){
        if(!$(this).hasClass("current")) {
            $(".nivells span.current").removeClass();
            $(this).addClass("current");
            game.createLevel(parseInt($(this).attr("data-level")))
        }
    });

    $(".btn-exit").on("click",function(){
        if(window.confirm("Que perdràs les galetes!")) {
            localStorage.clear()
            window.location.reload();
        }
    })

    $(".btn-ranking").on("click",function(){
        var $ranking = $('<div class="ranking-list"></div>');
        $.getJSON('http://eladisanchez.com/api/index.php',function(res){
            $.each(res,function(i,e){
                $ranking.append('<p><span class="pos">'+parseInt(i+1)+'. </span>'+'<strong'+(e.nom==user&&e.nom!='Ningú'?' class="tu"':'')+'>'+e.nom+'</strong> '+e.galetes+' '+(e.updated?'<small>'+e.updated+'</small></p>':''));
            })
            $(".ranking").append($ranking).fadeIn();
        })
    })

    $("body").on("click",".ranking",function(){
        $(this).fadeOut(400,function(){
            $(".ranking-list").remove();
        });
    })

    $(".btn-darkmode").on("click",function(){
        $("body").toggleClass("darkmode");
    })

    $(".btn-dracmode").on("click",function(){
        $("body").toggleClass("dracmode");
    })

});

/*

- Puntuació no acaba de furular

Hi ha un rumor al Vaticà que diu que el Papa fa una polla que Déu n'hi do @marcmontra




*/
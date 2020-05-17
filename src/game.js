import jQuery from 'jquery'
import { playPauseAudio } from './music'

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
    }

    createLevel(level=2) {
        this.balls = []
        this.tubes = []
        this.steps = []
        this.cheat = false;
        this.level = level;
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
    }

    changeBall(origin,destiny) {

        if (this.tubes[destiny].balls.length<4) {

            let originBall = this.tubes[origin].lastBall();
            let destinyBall = this.tubes[destiny].lastBall();

            if(!destinyBall || destinyBall == originBall) {

                this.tubes[destiny].pushBall(originBall)
                this.tubes[origin].popBall()

                this.steps.push([origin,destiny]);

                if(this.tubes.filter(t=>t.completed==1).length==this.balls.length/4) {
                    var galetext = {
                        0: 'un aplauso',
                        1: 'una galeteta',
                        2: 'dues galetes',
                        3: '3 galetaques'
                    }
                    jQuery('<div class="winner"><div><h2>Molt bé</h2><p>Has guanyat '+galetext[this.points()]+'</p><p class="galeta">🍪</p></div></div>').appendTo('body').fadeIn();
                    this.addCookie()
                    jQuery.post('http://eladisanchez.com/api/index.php',{
                        nom: localStorage.getItem('user'),
                        galetes: game.getCookies()
                    });
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
        let cookies = this.getCookies()+parseInt(this.points());
        localStorage.setItem('cookies',cookies)
        jQuery(".cookies").html(cookies)
    }

    points() {
        if(this.cheat) {
            return this.level-1
        }
        return this.level
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

}

window.game = new Level();

game.createLevel();


jQuery(document).ready(function($){

    var user = localStorage.getItem('user')
    if(!user) {
        user = prompt('Hola, qui polles ets?');
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
            alert("Ja l'has fet servir, puta")
            return false;
        }
        game.addTube();
    })

    $(".btn-playpause").on("click",function(){
        playPauseAudio();
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
                $ranking.append('<p><strong'+(e.nom==user&&e.nom!='Ningú'?' class="tu"':'')+'>'+parseInt(i+1)+'. '+e.nom+'</strong> '+e.galetes+' galetes</p>')
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
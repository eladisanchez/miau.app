export class Tube {
    constructor() {
        this.balls = [];
        this.completed = 0;
    }
    popBall() {
        this.balls.pop();
        this.completed = 0;
    }
    pushBall(ball) {
        this.balls.push(ball);
        let color = this.balls[0];
        let mateix = this.balls.filter(y => y === color);
        if (mateix.length == 4) {
            this.completed = 1;
        }
    }
    lastBall() {
        return this.balls[this.balls.length - 1];
    }
}

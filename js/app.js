new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns : []
    },
    methods: {
        starGame: function () {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        attack: function () {
            var damage = this.calculateDamage(3, 10);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlay: true,
                text: 'Player hits Monster for' + damage
            });
            if (this.checkWin()) {
                return;
            }
            this.monsterAttack();
        },
        specialAttack: function () {
            var damage = this.calculateDamage(10, 20)
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlay: true,
                text: 'Player hits Monster hard for ' + damage
            });
            if (this.checkWin()) {
                return;
            }
            this.monsterAttack();
        },
        heal: function () {
            if(this.playerHealth<=90){
                this.playerHealth+=15;
            }else{
                this.playerHealth =100;
            }
            this.turns.unshift({
            isPlay: true,
            text: 'Player heals for 15' 
            });
            this.monsterAttack();
        },
        giveUp: function () {
               this.gameIsRunning = false;        
        },
        monsterAttack:function(){
            var damage = this.calculateDamage(5, 12);
            this.playerHealth -= damage;
            this.turns.unshift({
                isPlay: false,
                text: 'Monster hits Player for' + damage
            });
            this.checkWin();
        },
        calculateDamage: function (max, min) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkWin: function () {
            if (this.monsterHealth <= 0) {
                if (confirm('You win! New Game?')) {
                    this.starGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            } else if (this.playerHealth <= 0) {
                if (confirm('You lost! New Game?')) {
                    this.starGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;
        }

    }
});
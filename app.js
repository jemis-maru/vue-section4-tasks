const app = Vue.createApp({
    data(){
        return{
            pHealth: 100,
            mHealth: 100,
            count: 2,
            pWon: 0,
            logMsgs: [],
        }
    },
    methods:{
        attackToMonster(){
            const mRandomNum = Math.floor(Math.random() * (10 - 5)) + 5;
            this.mHealth -= mRandomNum;
            this.addLogs('Player', 'attack', mRandomNum);
            this.attackToPlayer();
            this.count--;
        },
        attackToPlayer(){
            const pRandomNum = Math.floor(Math.random() * (15 - 6)) + 6;
            this.pHealth -= pRandomNum;
            this.addLogs('Monster', 'attack', pRandomNum);
        },
        specialAttackToMonster(){
            const mRandomNum = Math.floor(Math.random() * (20 - 9)) + 9;
            this.mHealth -= mRandomNum;
            this.addLogs('Player', 'special attack', mRandomNum);
            this.attackToPlayer();
            this.count = 2;
        },
        healToPerson(){
            this.count = 2;
            const pRandomNum = Math.floor(Math.random() * (15 - 6)) + 6;
            this.addLogs('Player', 'heal', pRandomNum);
            if(this.pHealth + pRandomNum < 100){
                this.pHealth += pRandomNum;
            }
            else{
                this.pHealth = 100;
            }
        },
        newGameFun(){
            this.pHealth = 100;
            this.mHealth = 100;
            this.count = 2;
            this.pWon = 0;
            this.logMsgs = [];
        },
        surrenderFun(){
            this.pWon = 2;
        },
        addLogs(who, what, value){
            this.logMsgs.unshift({
                actionBy: who,
                actionType: what,
                actionVal: value,
            });
        },
    },
    computed:{
        mBarStyle(){
            if(this.mHealth <= 0){
                return{
                    width: '0px'
                }
            }
            else{
                return {
                    width: this.mHealth + '%'
                }
            }
        },
        pBarStyle(){
            if(this.pHealth <= 0){
                return{
                    width: '0px'
                }
            }
            else{
                return {
                    width: this.pHealth + '%'
                }
            }
        },
        isDisabled(){
            if(this.count > 0){
                return true;
            }
            else{
                return false;
            }
        },
        gameOver(){
            if(this.pWon != 0){
                return true;
            }
            else{
                return false;
            }
        },
        pWonFun(){
            if(this.pWon === 3){
                return true;
            }
        },
        mWonFun(){
            if(this.pWon === 2){
                return true;
            }
        },
        drawFun(){
            if(this.pWon === 1){
                return true;
            }
        },
    },
    watch:{
        pHealth(value){
            if(value<=0 && this.mHealth<=0){
                this.pWon = 1;
            }
            else if(value<=0){
                this.pWon = 2;
            }
        },
        mHealth(value){
            if(value<=0 && this.pHealth<=0){
                this.pWon = 1;
            }
            else if(value<=0){
                this.pWon = 3;
            }
        }
    }
});

app.mount("#game");
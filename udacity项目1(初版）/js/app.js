// 游戏基本参数
const X = 4;//角色能移动的x轴块数
const Y = 5;//角色能移动的y轴块数
const widthX = 101;//x轴块数长度
const widthY = 83;//轴块数长度
// 敌人类
class Enemy{
  constructor(x ,y ,speed = 200){
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多
    this.x = x * widthX;
    this.y = y * widthY - 41.5;
    this.speed = speed;
    // 敌人的图片，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
  }

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
  update(dt) {
      // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
      // 都是以同样的速度运行的
      if(this.x <= widthX * (X+1) ){
        this.x += this.speed * dt;
        // console.log(this.x);
      }else{
        this.x = -1 * widthX;//超出游戏屏幕由左再出
      }
  }

  // 此为游戏必须的函数，用来在屏幕上画出敌人，
  render() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };
  //检查碰撞函数
  checkCrash(player){
    const radius = Math.abs(this.x - player.x);//设定碰撞半径
    if(this.y == player.y && radius < 50){
      player.y = widthY * Y - widthY/2;
      player.x = widthX * X ;
      alert(`crash`);
    }
  }
}

// 玩家类
class Player{
  constructor(x = 2,y = 5){
    this.x = x * widthX;
    this.y = y * widthY - widthY/2;
    // 敌人的图片，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/char-boy.png';
  }
  render(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  update(dt){}
  // 角色移动函数
  handleInput(move){
    switch (move) {
      case 'left': if (this.x > 0) {
                    this.x -= widthX;
                    } else {
                      this.x = 0
                    };console.log(this.y);break;
      case 'right': if (this.x < widthX * X ) {
                      this.x += widthX;
                    }else {
                      this.x = widthX * X;
                    };console.log(this.y); break;
      case 'up': if (this.y > widthY/2) {
                    this.y -= widthY;
                  }else {
                    this.y = widthY * Y - widthY/2;
                    this.x = widthX * X ;
                    alert('you have passed the game')
                  };break;
      case 'down': if (this.y < widthY * Y - widthY/2) {
                    this.y += widthY;
                  }else{
                    this.y = widthY * Y - widthY/2;
                  }; console.log(this.y);break;
    }
  }
}
// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
const enemy1 = new Enemy(0,1,100);
const enemy2 = new Enemy(0,2,50);
const enemy3 = new Enemy(0,3,300);
const enemy4 = new Enemy(0,1,400);
const enemy5 = new Enemy(0,2,500);
const enemy6 = new Enemy(0,3,600);
const allEnemies = [enemy1,enemy2,enemy3,enemy4,enemy5,enemy6];
const player = new Player(X,Y);
// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Player.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

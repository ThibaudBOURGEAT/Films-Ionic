export function getRandomID(){
  var randId:Number;
  var x:Number = 0;

  while(x < 1){
    randId = Math.floor(1000000 + Math.random() * 9000000)
    if(randId < 2404827) x = 1;
  }

  return randId;
}

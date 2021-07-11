//Create variables here
var dog, happyDog, database;
var foodS, foodStock;
//var dogImg1, dogImg2, dogImg3, dogImg4;
var sadDog, fedTime, lastFed, feed, addFood, foodObj;

function preload()
{
	//load images here
  // dogImg1 = loadImage("images/Dog.png");
  // dogImg2 = loadImage("images/dogImg.png");
  // dogImg3 = loadImage("images/dogImg1.png");
  // dogImg4 = loadImage("images/happydog.png");

  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}


function setup() {
	database = firebase.database();

  createCanvas(500, 500);
  //dog = createSprite(250,250);
  dog = createSprite(800,200.150,150);
  dog.addImage(sadDog);

  foodObj = new Food();

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
  
}


function draw() {  
  background(46,139,87);

  foodObj.display();

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
  
  // if(keyWentDown(UP_ARROW)){
  //   writeStock(foodS);
  //   dog.addimage(dogImg4);
  // }

  // drawSprites();
  // //add styles here
  // textSize = 10;
  // // textfill("red");
  // // textStroke = 5;
  // text("Note: Press UP_ARROW Key to feed Drago Milk!");


  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 350,30);
   }else if(lastFed==0){
     text("Last Feed : 12 AM",350,30);
   }else{
     text("Last Feed : "+ lastFed + " AM", 350,30);
   }
 
  drawSprites();
}

function readStock(data){
  food = data.val();
  foodObj.updateFoodStock(foodS);
}

// function writeStock(x){
//   if(x<=0){
//     x = 0;
//   } else{
//     x = x-1;
//   }

//   database.ref('/').update({
//     Food: x
//   })
// }

function feedDog(){
  dog.addImage(happyDog);
  
  if(foodObj.getFoodStock()<= 0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  }else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  }
  
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
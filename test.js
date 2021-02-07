function lvlPassed() {
  if (maplevel == 2 && minotaur.defeated) {
    return true;
  } else if (maplevel == 3 && eye.defeated){
    return true;
  } else if (maplevel== 4 && mushroom.defeated){
    return true;
  } else if (maplevel == 5 && alan.defeated){
    return true;
  } else if (maplevel == 6 && goblin.defeated){
    return true;
  } else{
    return false;
  }
}
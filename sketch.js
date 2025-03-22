// This example is also available online in the p5.js web editor:
// https://editor.p5js.org/gohai/sketches/X0XD9xvIR

let port;
let connectBtn;



function setup() {
  
  createCanvas(windowWidth, windowHeight);
  

  background(220);

  port = createSerial();

  // in setup, we can open ports we have used previously
  // without user interaction

    // any other ports can be opened via a dialog after
  // user interaction (see connectBtnClick below)

  connectBtn = createButton('Connect to Arduino');
  connectBtn.position(80, 200);
  connectBtn.mousePressed(connectBtnClick);
  connectBtn.style("border", "none")
  connectBtn.style("border-radius", "15px")
  connectBtn.style("padding", "30px")
}

function draw() {

  copy(0, 0, width, height, 0, -1, width, height);

  if (port.opened()){
    connectBtn.style('background-color', 'green');
   
    port.write("\n")
  
  }else{
    connectBtn.style('background-color', 'red');
  }
  let str = port.readUntil("\n");
  if (str.length > 0) {
    if (str == "requesting time"){
      port.write(str(floor(Date.now()/1000)-946684800-(offset*60)) + "\n");
    }
    if (str == 'done!'){
     
      text('Time sent', 100, 100)
      port.close();
    }

    text(str, 10, height-20);
  }

}

function connectBtnClick() {
  if (!port.opened()) {
    port.open('RaspberryPi', 9600);
   
  } else {
    port.close();
  }
}

function sendBtnClick() {
  let offset = new Date().getTimezoneOffset();
  text(offset*60, 100, 100)
  port.write(str(floor(Date.now()/1000)-946684800-(offset*60)) + "\n");
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

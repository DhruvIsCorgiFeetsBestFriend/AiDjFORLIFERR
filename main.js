song = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
function preload()
{
    song = loadSound("paris.mp3");
    song2 = loadSound("CC.mp3");
}

function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}


function modelLoaded() {
    console.log('PoseNet Is Initilized');
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);

        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreRightWrist = " + scoreRightWrist);
        
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX +" leftWristY ="+ leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX +" rightWristY ="+ rightWristY);
    }
}

function draw() {
    image(video, 0, 0, 600, 500);
  

    fill("#ADD8E6");
    stroke("#ADD8E6");
    
    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX,leftWristY,20);
        document.getElementById("song").innerHTML= "playing CC.mp3 = ";
        song2.play();
        song.stop();
    }

    if(scoreRightWrist > 0.2)
    {
        circle(rightWristX,rightWristY,20);
        document.getElementById("song").innerHTML = "playing paris.mp3 = ";
        song.play();
        song2.stop();
    }
    

}

function pause()
{
    song.pause();
    song2.pause();
}





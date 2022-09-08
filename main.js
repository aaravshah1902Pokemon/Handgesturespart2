https://teachablemachine.withgoogle.com/models/BeRdpENW8/
prediction1 ="";
prediction2="";
 
Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
}) ;

camera = document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="caputure_image" src="'+data_uri+'"/>';
    });

}

console.log('ml version',ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/BeRdpENW8/model.json',modelLoaded);

function modelLoaded(){
    console.log('model loaded')
};

function speak(){
    var synth=window.speechSynthesis;
    speakdata1="The First prediction is"+prediction1;
    speakdata2="And the second prediction is"+prediction2;
    var utterThis=new SpeechSynthesisUtterance(speakdata1+speakdata2);
    synth.speak(utterThis);

}

function check(){
    img=document.getElementById("caputure_image");
    classifier.classify(img,gotResult);
}

function gotResult(error,results){
    if (error){
        console.error(error);
    }
    else{
        console.log(results);
        prediction1=results[0].label;
        prediction2=results[1].label;
    }

}
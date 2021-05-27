let playing;
let volumevalue;
let filter;
let chorus;
let pingpongvalue;

//membrane synth
const synth = new Tone.Synth().toDestination();
const loop = new Tone.Loop(
  function(time) {
  synth.triggerAttackRelease("C4", "8n");
}, "4n").start(0);


//synth start stop
let startStop = document.getElementById("synth").addEventListener("click", function() {
    playing = !playing;

    if (playing) {
        Tone.Transport.start();
        document.getElementById("synth").innerHTML = "stop";
    } else {
        Tone.Transport.stop();
        document.getElementById("synth").innerHTML = "start";
    }
});

//volume slider
document.getElementById("volumeslider").addEventListener('mouseup', () => {
    volumevalue = document.getElementById('volumeslider').value;
    Number(volumevalue).toPrecision(2);
    var vol = new Tone.Volume(volumevalue);
console.log(vol);
synth.chain(vol, Tone.Master);
});

//autofilter start
document.getElementById('filterstart').addEventListener('click', () => {
    filter = new Tone.Filter(400, 'highpass').toDestination();
    synth.connect(filter);
});

//autofilter value control with slider
document.getElementById('autofilter').addEventListener('mouseup', () => {
    let filtervalue = document.getElementById('autofilter').value;
    Number(filtervalue).toPrecision(2);
    filter.frequency.value = filtervalue;
    console.log(filtervalue)
});

//chorus start
document.getElementById('chorus').addEventListener('click', () => {
 chorus = new Tone.Chorus(4,2.5,0.5)
 synth.connect(chorus);
})


//pingpong start
document.getElementById('pingpong').addEventListener('click', () => {
    let pingpong = new Tone.PingPongDelay('4n', pingpongvalue).toDestination();
    synth.connect(pingpong);
});

//pingpong value control slider
document.getElementById('pingpongslider').addEventListener('mouseup', () => {
    pingpongvalue - document.getElementById('pingpongslider').value;
})
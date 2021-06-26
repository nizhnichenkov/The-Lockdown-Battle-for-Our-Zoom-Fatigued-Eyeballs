function enableAnalyserForParticipant(peer_id) {

    // obtain the video element and mute the audio
    const video = document.getElementById(`vid_${peer_id}`);
    video.muted = true;

    // create the canvas itself
    let canvas = document.createElement("canvas");
    canvas.className = "analyser-canvas";
    canvas.id = `analyser-canvas-${video.id}`;
    canvas.width = 185;
    canvas.height = 70;
    canvases[peer_id] = canvas;
    canvases_ctx[peer_id] = canvas.getContext("2d");

    // obtain the main div wrapper of the remote stream
    // add the canvas and the button below the remote stream
    let wrapper_div = document.getElementById(`div_${video.id}`);
    wrapper_div.appendChild(canvas);

    // create a new audio context (if it doesn't exist already)
    if (!audioCtx) {
        audioCtx = new window.AudioContext();
    }

    // create an audio analyser and connect the source node
    // of the remote participant to it
    analysers[peer_id] = audioCtx.createAnalyser();
    sourceNodes[peer_id].connect(analysers[peer_id]);

    /**
     * Audio Visualisation in real time through Voice Activity Detection
     */

    // create a gain node for volume control
    let gainNode = audioCtx.createGain();
    gainNodes[peer_id] = gainNode;

    // connect the pan node to the gain node
    // then the gain node to the destination
    panNode[peer_id].connect(gainNodes[peer_id]);
    gainNodes[peer_id].connect(audioCtx.destination);

    // set minimum decibels threshold
    let min_decibels = -80;
    analysers[peer_id].minDecibels = min_decibels;


    // Barchart Visualisation
    analysers[peer_id].fftSize = 256;
    buffer_lengths[peer_id] = analysers[peer_id].frequencyBinCount;
    data_arrays[peer_id] = new Uint8Array(buffer_lengths[peer_id]);
    analysers[peer_id].getByteFrequencyData(data_arrays[peer_id]);

    function draw() {

        // stop drawing if vad is false
        if (!enable_vad[peer_id]) {
            // console.log('LINE 169: VAD not enabled');
            return;
        }

        requestAnimationFrame(draw);

        analysers[peer_id].getByteFrequencyData(data_arrays[peer_id]);

        canvases_ctx[peer_id].fillStyle = "rgb(0, 0, 0)";
        canvases_ctx[peer_id].fillRect(0, 0, canvases[peer_id].width, canvases[peer_id].height);

        let barWidth = (canvases[peer_id].width / buffer_lengths[peer_id]) * 2.5;
        let barHeight;
        let x = 0;

        for (let j = 0; j < buffer_lengths[peer_id]; j++) {
            barHeight = data_arrays[peer_id][j] / 2;

            canvases_ctx[peer_id].fillStyle = "rgb(" + (barHeight + 100) + ",50,50)";
            canvases_ctx[peer_id].fillRect(x, canvases[peer_id].height - barHeight / 2, barWidth, barHeight);

            x += barWidth + 1;
        }
    };

    // enable vad boolean and call analyser visualiser and speech detection functions
    enable_vad[peer_id] = true;
    draw();
}
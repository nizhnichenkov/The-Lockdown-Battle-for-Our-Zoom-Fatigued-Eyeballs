function enablePanningForParticipant(peer_id) {

    // obtain the video element and mute the audio
    const video = document.getElementById(`vid_${peer_id}`);
    video.muted = true;

    // create a new audio context if it doesn't exist already
    if (!audioCtx) {
        audioCtx = new window.AudioContext();
    }

    // create a source node from the video object node and a new panning node
    sourceNodes[peer_id] = audioCtx.createMediaStreamSource(video.srcObject);
    panNode[peer_id] = audioCtx.createStereoPanner();

    // connect the source node node (incoming audio) to the pan node
    // then, connect the pan node to the destination (user's headphones)
    sourceNodes[peer_id].connect(panNode[peer_id]);
}
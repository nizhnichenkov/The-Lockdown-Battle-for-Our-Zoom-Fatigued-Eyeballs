function resizeElement(div_to_resize) {

    // tokenize div_to_resize to get the peer_id
    var div_id = div_to_resize.id;
    var tokenized = div_id.split("_");
    var peer_id = tokenized[2];

    // add an event listener on double click action
    div_to_resize.addEventListener('dblclick', function (e) {

        //    obtain the video and visualiser (canvas) elements of the remote user
        //    and size them to half their current size (width and height)
        var video = document.getElementById(`vid_${peer_id}`);
        var visualiser = document.getElementById(`analyser-canvas-vid_${peer_id}`);

        // if the video of the remote is not resized - resize it
        if (!isVideoResized[peer_id]) {
            isVideoResized[peer_id] = true;

            video.style.width = "92.5px";
            video.style.height = "77.5px";

            visualiser.style.width = "92.5px";
            visualiser.style.height = "35px";

            // reduce the gain to 20%
            gainNodes[peer_id].gain.value = 0.2;

        } else {
            // if video/visualiser is already resized to half their size
            // bring them back to normal
            isVideoResized[peer_id] = false;

            video.style.width = "185px";
            video.style.height = "150px";

            visualiser.style.width = "185px";
            visualiser.style.height = "70px";

            // set the gain node back to full volume
            gainNodes[peer_id].gain.value = 1.0;
        }
    });
}
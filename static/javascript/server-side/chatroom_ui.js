document.addEventListener("DOMContentLoaded", (event) => {
    myVideo = document.getElementById("local_vid");
    myVideo.onloadeddata = () => {
        console.log("W,H: ", myVideo.videoWidth, ", ", myVideo.videoHeight);
    };

    // obtain the toolbox buttons from the html page
    muteBttn = document.getElementById("bttn_mute");
    muteVidBttn = document.getElementById("bttn_vid_mute");
    callEndBttn = document.getElementById("call_end");

    // add event listeners to each button
    muteBttn.addEventListener("click", (event) => {
        audioMuted = !audioMuted;
        setAudioMuteState(audioMuted);
    });

    muteVidBttn.addEventListener("click", (event) => {
        videoMuted = !videoMuted;
        setVideoMuteState(videoMuted);
    });

    callEndBttn.addEventListener("click", (event) => {
        window.location.replace("/");
    });

});

function makeVideoElement(element_id, display_name) {
    let wrapper_div = document.createElement("div");
    let vid = document.createElement("video");
    let name_text = document.createElement("p");

    // settings for the div that will contain
    // the name, video and canvas (visualiser) elements
    wrapper_div.id = "div_vid_" + element_id;
    wrapper_div.className = "shadow video-item";

    // settings for the video element that will contain
    // the video & audio of the remote stream(s)
    vid.id = "vid_" + element_id;
    vid.className = "allaudio";
    vid.width = 185; // width of the video element
    vid.height = 155; // height of the video element
    vid.autoplay = true;

    // settings of the paragraph element that
    // will have the name of the remote user
    name_text.className = "display-name";
    name_text.innerText = display_name;

    // wrap the video and paragraph elements within the div tag
    wrapper_div.appendChild(name_text);
    wrapper_div.appendChild(vid);

    return wrapper_div;
}

function addVideoElement(element_id, display_name) {
    // append the remote to one of the middle cells
    // check if the middle column is available
    for (const dropZone of document.querySelectorAll(".drop-zone-c3")) {
        if (isCellOccupied[dropZone.id]) {
        } else {
            dropZone.appendChild(makeVideoElement(element_id, display_name));
            isCellOccupied[dropZone.id] = true;
            break;
        }
    }

    // keep track of all participants in a call
    participants[element_id] = element_id;
}

function removeVideoElement(element_id) {
    //obtain the video object
    let v = getVideoObj(element_id);

    // stop all audio and video tracks (if playing)
    if (v.srcObject) {
        v.srcObject.getTracks().forEach(track => track.stop());
    }

    // remove attributes
    v.removeAttribute("srcObject");
    v.removeAttribute("src");

    // remove the video element
    document.getElementById("div_vid_" + element_id).remove();

    // disconnect all audio nodes left from the disconnected user
    disableFeatures(element_id);

    // remove the participant's id from the dictionary
    delete participants[element_id];

}

function getVideoObj(element_id) {
    return document.getElementById("vid_" + element_id);
}

function setAudioMuteState(flag) {
    let local_stream = myVideo.srcObject;
    local_stream.getAudioTracks().forEach((track) => {
        track.enabled = !flag;
    });
    // switch button icon
    document.getElementById("mute_icon").innerText = (flag) ? "mic_off" : "mic";
}

function setVideoMuteState(flag) {
    let local_stream = myVideo.srcObject;
    local_stream.getVideoTracks().forEach((track) => {
        track.enabled = !flag;
    });
    // switch button icon
    document.getElementById("vid_mute_icon").innerText = (flag) ? "videocam_off" : "videocam";
}
function disableFeaturesForParticipant(peer_id){

//   stop detecting speech and drawing the visualiser
    enable_vad[peer_id] = false;

    if(analyser_wrappers[peer_id]){
        analyser_wrappers[peer_id].remove();
        delete analyser_wrappers[peer_id];
    }

    if(canvases[peer_id]){
        canvases[peer_id].remove();
        delete canvases[peer_id];
    }

    if(canvases_ctx[peer_id]){
        delete canvases_ctx[peer_id];
    }

    if(gainNodes[peer_id] && panNode[peer_id] && sourceNodes[peer_id] && analysers[peer_id]){
        gainNodes[peer_id].disconnect(audioCtx.destination);
        panNode[peer_id].disconnect(gainNodes[peer_id]);
        delete gainNodes[peer_id];

        sourceNodes[peer_id].disconnect(panNode[peer_id]);
        sourceNodes[peer_id].disconnect(analysers[peer_id]);
        delete panNode[peer_id];
        delete sourceNodes[peer_id];
    }

    if(analysers[peer_id]){
        analysers[peer_id].disconnect();
        delete analysers[peer_id];
    }

    if(data_arrays[peer_id]){
        delete data_arrays[peer_id];
    }

    if(buffer_lengths[peer_id]){
        delete buffer_lengths[peer_id];
    }

}
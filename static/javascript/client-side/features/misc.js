/**
 * PANNING SPECIFIC VARIABLES
 */
var panNode = {};


/**
 * ANALYSER (VAD) SPECIFIC VARIABLES
 */
var analysers = {};
var canvases = {};
var canvases_ctx = {};
var buffer_lengths = {};
var data_arrays = {};
var analyser_wrappers = {};
var enable_vad = {};
var gainNodes = {};


/**
 * EXTRA VARIABLES (flags, booleans, globals, buttons, counters, etc.)
 */
var myVideo; // video of the participant's point of view
var audioCtx;
var sourceNodes = {}; // contains all participants streams (as objects)
var participants = {}; // keep track of all participants
var muteBttn;
var muteVidBttn;
var callEndBttn;
var handleTrackEventCount = 0; // when = 2, we can obtain the srcObject from the video element
var isVideoResized = {}; // identifies if a remote user's video has been resized


/**
 * DRAG AND DROP SPECIFIC VARIABLES
 */
// boolean to indicate if a cell is occupied
// will be used to identify whether dragging over a cell
// will make its opacity reduce by 50% indicating an element
// can be dropped inside
var isCellOccupied = {};
isCellOccupied['column-1.1'] = false;
isCellOccupied['column-1.2'] = false;
isCellOccupied['column-1.3'] = false;
isCellOccupied['column-2.1'] = false;
isCellOccupied['column-2.2'] = false;
isCellOccupied['column-2.3'] = false;
isCellOccupied['column-3.1'] = false;
isCellOccupied['column-3.2'] = false;
isCellOccupied['column-3.3'] = false;
isCellOccupied['column-4.1'] = false;
isCellOccupied['column-4.2'] = false;
isCellOccupied['column-4.3'] = false;
isCellOccupied['column-5.1'] = false;
isCellOccupied['column-5.2'] = false;
isCellOccupied['column-5.3'] = false;

// this variable holds the panning values that correspond to each cell
// value : position
// -1 : full left
// -0.5 : half left
// 0 : equal (left/right)
// 0.5 : half right
// 1 : full right
var applyPanning = {};

applyPanning['column-1.1'] = -1;
applyPanning['column-1.2'] = -1;
applyPanning['column-1.3'] = -1;

applyPanning['column-2.1'] = -0.5;
applyPanning['column-2.2'] = -0.5;
applyPanning['column-2.3'] = -0.5;

applyPanning['column-3.1'] = 0;
applyPanning['column-3.2'] = 0;
applyPanning['column-3.3'] = 0;

applyPanning['column-4.1'] = 0.5;
applyPanning['column-4.2'] = 0.5;
applyPanning['column-4.3'] = 0.5;

applyPanning['column-5.1'] = 1;
applyPanning['column-5.2'] = 1;
applyPanning['column-5.3'] = 1;


/**
 * HELPER FUNCTIONS
 */

function enableFeatures(peer_id) {
    // enable panning first
    enablePanningForParticipant(peer_id);

    // enable vad/analyser
    enableAnalyserForParticipant(peer_id);
}

function disableFeatures(peer_id) {
    // disable all features of a leaving user
    disableFeaturesForParticipant(peer_id);
}


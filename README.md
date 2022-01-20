# The Lockdown Battle For Our Zoom Fatigued Eyeballs

### *Repository for Final Year Project module [COMP30900](https://sisweb.ucd.ie/usis/!W_HU_MENU.P_PUBLISH?p_tag=MODULE&MODULE=COMP30900) / [COMP30910](https://sisweb.ucd.ie/usis/!W_HU_MENU.P_PUBLISH?p_tag=MODULE&MODULE=COMP30910) 2020/2021*

- The goal of this project is to develop a web platform that can be used to experiment with different video conferencing scenarios to enable researchers to explore the main factors contributing to Zoom fatigue and propose ideas to mitigate them.
- Design features include [voice activity detection (VAD) visualiser](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Visualizations_with_Web_Audio_API), [audio volume meter adjust](https://developer.mozilla.org/en-US/docs/Web/API/GainNode) and [audio panning](https://developer.mozilla.org/en-US/docs/Web/API/StereoPannerNode). 


Repository Structure
=================
- `root` - contains the WebRTC signalling server file made with [Flask](https://flask.palletsprojects.com/en/1.1.x/) (*server.py*) and other project-necessary files not concerned with the implementation.
- `templates` - contains HTML files related to the user interface (UI).
- `static`
   - `css` - contains cascading style sheet code to manipulate the view of the user interface.
    - `images` - contains the favicon of the web application.
    - `javascript`
      - `server-side` - contains javascript files concerned with the server side setting up of the application logic.
      - `client-side`
        - `features` - contains javascript files concerned with the implementation of the individual audio components relating to the user experience (UX) aspect.
    
  

Web Application Information
================

A [WebRTC](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API) video chat room with signaling server made using python [Flask](https://flask.palletsprojects.com/en/1.1.x/).

Different versions of the prototype can be tried out using the following: <br/>
`MVP Demo`: https://webrtc-mesh-py.herokuapp.com/ <br/>
`Final Version Demo`: https://webrtc-mesh-py-adv.herokuapp.com/

[Video Demo](https://drive.google.com/file/d/1nQNu6u9ZaqewbEN802YMnNR_mxZC2sTS/view?usp=sharing)

[Report](https://drive.google.com/file/d/1gw3Qevqzk-NegpM9dR7ZfqJaUukkm-O0/view?usp=sharing)

Installation
-------------
To run this on your machine, install the following:
#### Requirements:
* python 3.8
* Flask 1.1.2
* Flask-SocketIO 4.3.2
* eventlet (for websocket support while using SocketIO) 0.30.2
* python-socketio 4.6.0
* python-engineio 3.13.2
* gunicorn

Install requirements using pip3:
```
pip3 install Flask==1.1.2 Flask-SocketIO==4.3.2 eventlet==0.30.2 python-socketio==4.6.0 python-engineio==3.13.2 gunicorn
```

To start a server on localhost, navigate to the root directory and type:
```
python3 server.py
```

Open Firefox and navigate to:
```
127.0.0.1:5000
```

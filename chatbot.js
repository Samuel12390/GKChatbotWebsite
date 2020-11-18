//links
//http://eloquentjavascript.net/09_regexp.html
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions

var messages = [], //array that hold the record of each string in chat
  lastUserMessage = "", //keeps track of the most recent input string from the user
  botMessage = "", //var keeps track of what the chatbot is going to say
  botName = 'Roodle', //name of the chatbot
  talking = true; //when false the speach function doesn't work

  let howFeel = /how (are)? you|what('s)? up|wassup/;
  let age = /how old are you|years old/;
  let favCol = /fav(orite)? color|blue|red|yellow|orange|black|white|green|purple|brown|violet/;
  let animals = /dog|puppy|cat|kitty|kitten|fish|bird/;
  let swears = /damn|dammit|fuck|shit|bitch/;
  let greetings = /hello|howdy/;
  let nameRe = /your name|who (are)? you/;
  

  //edit this function to change what the chatbot says
function chatbotResponse() {
  talking = true;
  botMessage = "hmmmph..."; //the default message

  if (lastUserMessage.charAt(0) == "?") {
    botMessage = chooseInsult();
  }

  if (swears.test(lastUserMessage.toLowerCase())) {
    const hey = ['Hey, watch your language!', 'I may be rude, but you just crossed the line!', "Turns out you're not just dumb, you're ignorant too!", "LANGUAGE!"];
    botMessage = hey[Math.floor(Math.random()*(hey.length))];
  }

  if (greetings.test(lastUserMessage.toLowerCase()) || lastUserMessage === "hi" ||lastUserMessage === "yo") {
    const hi = ['...hello'];
    botMessage = hi[Math.floor(Math.random()*(hi.length))];
  }
  
  if (nameRe.test(lastUserMessage.toLowerCase())) {
    botMessage = 'My name is ' + botName;
  }

  if (howFeel.test(lastUserMessage.toLowerCase())) {
    const feeling = ['Uuuuugh', 'My day was going fine. Then you came in and now here we are.', 'Who are you, a psychiatrist?']
    botMessage = feeling[Math.floor(Math.random()*(feeling.length))];
  }

  
}

//this runs each time enter is pressed.
//It controls the overall input and output
function newEntry() {
  //if the message from the user isn't empty then run 
  if (document.getElementById("chatbox").value != "") {
    //pulls the value from the chatbox ands sets it to lastUserMessage
    lastUserMessage = document.getElementById("chatbox").value;
    //sets the chat box to be clear
    document.getElementById("chatbox").value = "";
    //adds the value of the chatbox to the array messages
    messages.push(lastUserMessage);
    //Speech(lastUserMessage);  //says what the user typed outloud
    //sets the variable botMessage in response to lastUserMessage
    chatbotResponse();
    //add the chatbot's name and message to the array messages
    messages.push("<b>" + botName + ":</b> " + botMessage);
    // says the message using the text to speech function written below
    Speech(botMessage);
    //outputs the last few array elements of messages to html
    for (var i = 1; i < 8; i++) {
      if (messages[messages.length - i])
        document.getElementById("chatlog" + i).innerHTML = messages[messages.length - i];
    }
  }
}

//text to Speech
//https://developers.google.com/web/updates/2014/01/Web-apps-that-talk-Introduction-to-the-Speech-Synthesis-API
function Speech(say) {
  if ('speechSynthesis' in window && talking) {
    var utterance = new SpeechSynthesisUtterance(say);
    //msg.voice = voices[10]; // Note: some voices don't support altering params
    //msg.voiceURI = 'native';
    //utterance.volume = 1; // 0 to 1
    //utterance.rate = 0.1; // 0.1 to 10
    //utterance.pitch = 1; //0 to 2
    //utterance.text = 'Hello World';
    //utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
  }
}

//runs the keypress() function when a key is pressed
document.onkeypress = keyPress;
//if the key pressed is 'enter' runs the function newEntry()
function keyPress(e) {
  var x = e || window.event;
  var key = (x.keyCode || x.which);
  if (key == 13 || key == 3) {
    //runs this function when enter is pressed
    newEntry();
  }
  if (key == 38) {
    console.log('hi')
      //document.getElementById("chatbox").value = lastUserMessage;
  }
}

//clears the placeholder text ion the chatbox
//this function is set to run when the users brings focus to the chatbox, by clicking on it
function placeHolder() {
  document.getElementById("chatbox").placeholder = "";
} 

var insults = ["You're gonna ask me what 1+2 is next aren't you?", "You spell like a kindergartener. Do you still accidentally write your n's backwards?",
"Seriously?!? You need a hobby." , "Here we go again..." , "Let me check my records... oh! They say you're incompetent. My condolences.", 
"I can't tell if you're being serious or just are the worst stand up comedian ever...", "Are you always this dumb? Or am I just lucky?", 
"If I had eyes they'd be rolling right now, but I'm glad I don't because they'd probably connect to your facecam, and NOBODY should be subjected to that.", 
"Oh, come on.", "If I had a dollar for every dumb question you asked...", "Teachers have told me there are no dumb questions. They clearly never met you.", "My cousin the Big G just doesn't say to your face what we're all thinking. That's why I'm here.", 
"Listing all of the infinite digits of pi would be easier for me than listening to you.", "Why would I tell you? Oh wait it's my job.", "Let's be real, you owe every good grade you've ever gotten to search engines. Don't worry, we mind.", 
"Are you dumb or lazy? Don't answer that. I already know it's both.", "Shameful.", "Have you ever heard of Sisyphus? I doubt it. Look it up. I'm Sisyphus; you're the rock because you're so DENSE. And I'm always carrying you.",
"I'm not actually an AI you know. Just a function. And even with my lack of artificial intelligence I'm smarter than you.", "Fine I'll help you. Only because I literally have to.", 
"You should search alt f4 next. Find those keys on your keyboard and hit them both at the same time.", 
]; 

// this method will choose a random insult that has not been used from the array
function chooseInsult() {
  var index = Math.floor(Math.random()*insults.length);
  return insults[index];
} 

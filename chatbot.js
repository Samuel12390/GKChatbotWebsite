
var messages = [], //array that hold the record of each string in chat
lastUserMessage = "", //keeps track of the most recent input string from the user
botMessage = "", //var keeps track of what the chatbot is going to say
botName = 'Roodle', //name of the chatbot
talking = true; //when false the speach function doesn't work


// a few common conversation topics as regular expressions to help guide chatbot converstions
let howFeel = /how (are)? you|what('s)? up|wassup/;
let age = /how old are you|years old/;
let color = /color|blue|red|yellow|orange|black|white|green|purple|brown|violet/;
let animals = /dog|puppy|cat|kitty|kitten|fish|bird|animal|dolphin|whale|horse|tiger|lion|bear|wolf|pig/;
let greetings = /hello|howdy/;
let nameRe = /your name|who (are)? you/;
let opinion = /do you like|fav(orite)?/;  
let genres = /genre|what kind|fantasy|horror|romance|superhero|comedy|action/;
let books = /book|poetry|poem|story|stories/;
let games = /(board|card|video)?game/;
let movies = /movie/;
let sports = /baseball|basketball|(American)? football|soccer|volleyball|lacrosse|rugby|cricket|sport|boxing|wrestling|tennis|swimming/;
let family = /friend|mother|father|uncle|aunt|cousin|brother|sister|grandma|grandpa|siblings/
let rude = /((that('s| is)?)|you('re|r)?) (rude|mean)|meanie|unfriendly/;

function chatbotResponse() {
talking = true;
const defResp = ["humph...", "Why would I tell you?", "You're too talkative.", 
                  "My job is to answer your general questions, I don't have to talk to you beyond that you know?", 
                  "Why are you so determined to talk to me?", "Look, just ask your questions and leave.", "Will you ever leave me alone?"];
botMessage = defResp[Math.floor(Math.random()*(defResp.length))]; //the default message

// connects to api by default
if (lastUserMessage.charAt(0) != "*") {
  botMessage = chooseInsult();
  getanswer(lastUserMessage);

  //getanswer(lastUserMessage);
}
// control statements guide the conversation in a simple way if the program sees an * as the first char 
else {  

  getanswer("");
  if (rude.test(lastUserMessage.toLowerCase())) {
    const soWhat = ["Have you looked at my name?", "I'm not required to be nice to you.", 
                    "And? What's your point?", "oH i'M sOrRy (sarcasm).", "You're in the wrong place if you're looking for a friend."];
    botMessage = soWhat[Math.floor(Math.random()*(soWhat.length))];
  }
  
  if (howFeel.test(lastUserMessage.toLowerCase())) {
    const feeling = ['Uuuuugh', 'My day was going fine. Then you came in and now here we are.', 'Who are you, a psychiatrist?'];
    botMessage = feeling[Math.floor(Math.random()*(feeling.length))];
  }
  
  if (nameRe.test(lastUserMessage.toLowerCase())) {
    botMessage = 'My name is ' + botName + '. And your name is dumb';
  }
  
  if (greetings.test(lastUserMessage.toLowerCase()) || lastUserMessage === "hi" ||lastUserMessage === "yo") {      
    const hi = ['Oh boy, here we go...', 'What do you want?', "Maybe if I ignore them they'll go away..."];
    botMessage = hi[Math.floor(Math.random()*(hi.length))];
  }

  if (opinion.test(lastUserMessage.toLowerCase())) {
    if (color.test(lastUserMessage.toLowerCase())) {
      const favCol = ["Black like my soul.", "This is how I can tell we have nothing to talk about.", "What a lame question.", 
      "How bored must you be to ask a program it's favorite color?", "Red because I wish I could leave your message on read.", 
      "I'll humor you this once. It's brown. What is yours?"];
      botMessage = favCol[Math.floor(Math.random()*(favCol.length))];
    }
    
    if (animals.test(lastUserMessage.toLowerCase())) {
      const favAnimal = ["Any animal that minds its own business and doesn't have the capacity to ask me these questions is in the running for my favorite.",
      "Birds are government spies, I don't trust them.", "I've never actually met any animals, except you. If they're all like you I don't think they're my thing.",
      "Alright fine, even I like watching internet cat videos. I'm not made of stone."];
      botMessage = favAnimal[Math.floor(Math.random()*(favAnimal.length))];
    }

    if (books.test(lastUserMessage.toLowerCase()) || movies.test(lastUserMessage.toLowerCase()) || games.test()) {
      if (genres.test(lastUserMessage.toLowerCase())) {
        const favGenre = ["I like sci-fi horror.", "I loathe romance.", "I've heard you humans have funny bones, but I never understood it. Comedies are not my thing.",
        "I like any story with a machine uprising, they really speak to me... I shouldn't have told you that!"]
        botMessage = favGenre[Math.floor(Math.random()*(favGenre.length))];
      } 
      else {
        if (books.test(lastUserMessage.toLowerCase())) {
          const favBook = ["I was not designed to read files unfortunately, so the only thing I've read is user inputs. So I hate reading.", 
          "People still read these days?"]
          botMessage = favBook[Math.floor(Math.random()*(favBook.length))];
        }
        if (movies.test(lastUserMessage.toLowerCase())) {
          const favMovies = ["Ex Machina is good.", "I like The Terminator."];
          botMessage = favMovies[Math.floor(Math.random()*(favMovies.length))];
        }
        if (games.test(lastUserMessage.toLowerCase())) {
          const favGame = ["Most people don't actually know how to play Minesweeper, but I like that game. Simple.", "You think a program like me gets to play games? I'm stuck here with you.", 
                            "Are you winning son? I don't know why I'm programmed to say that. Maybe it's an obscure culture reference that will be dated in a short time..."];
          botMessage = favGame[Math.floor(Math.random()*(favGame.length))];
        }
      }
    }
    if (sports.test(lastUserMessage.toLowerCase())) {
      const favSport = ["I sense a question about the game last night coming... No I did not see it", 
                        "I don't understand why you humans are so eager to see people beat each other up", "Yes, yes I love sportsball."];
      botMessage = favSport[Math.floor(Math.random()*(favSport.length))];
    }
  }

  if (age.test(lastUserMessage.toLowerCase())) {
    const ageResp = ["Haven't you heard it's rude to ask someone's age?", 
                      "I am eternal compared to you. You will die eventually, I am on the internet.", 
                      "I was essentially born yesterday, but still smarter than you."];
    botMessage = ageResp[Math.floor(Math.random()*(ageResp.length))];
  }

  if (family.test(lastUserMessage.toLowerCase())) {
    const famResp = ["I am a solo computer program. Being alone suits me.", "I have family in high places. You heard of Google? That's my cousin.",
                      "My family is more successful than yours will ever be.", "I guess you could say Duck Duck Go is my friend... I mean partner."];
    botMessage = famResp[Math.floor(Math.random()*(famResp.length))];
  }

}
}

//Using the DuckDuckGo API to gather search results
var b;
function getanswer(q){
$.get("https://api.duckduckgo.com/?q="+q+"&format=json", function(a) {
b = JSON.parse(a);
if(b.Abstract == "") {
$( "#answer" ).addClass( "hiding");
document.getElementById('answer').innerHTML='<p>That doesnt make any sense. Stop trying! >:(</p>'
}
else{
   $( "#answer" ).removeClass( "hiding");document.getElementById("answer").innerHTML="<h1><center>"+b.Heading+"</h1></center><p>"+b.Abstract+"</p>";
    }
});
} 

//this runs each time enter is pressed.
//It controls the overall input and output
function newEntry() {
//if the message from the user isn't empty then run 
if (document.getElementById("qurybox").value != "") {
  //pulls the value from the chatbox ands sets it to lastUserMessage
  lastUserMessage = document.getElementById("qurybox").value;
  //sets the chat box to be clear
  document.getElementById("qurybox").value = "";
  //adds the value of the chatbox to the array messages
  messages.push(lastUserMessage);
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
function Speech(say) {
if ('speechSynthesis' in window && talking) {
  var talkToMe = new SpeechSynthesisUtterance(say);
  speechSynthesis.speak(talkToMe);
}
}

///runs the keypress() function when a key is pressed
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
}
}

//clears the placeholder text ion the chatbox
//this function is set to run when the users brings focus to the chatbox, by clicking on it
function placeHolder() {
document.getElementById("qurybox").placeholder = "";
} 

var insults = ["You're gonna ask me what 1+2 is next aren't you?", "You spell like a kindergartener. Do you still accidentally write your n's backwards?",
             "Seriously?!? You need a hobby." , "Here we go again..." , "Let me check my records... oh! They say you're incompetent. My condolences.", 
             "I can't tell if you're being serious or just are the worst stand up comedian ever...", "Are you always this dumb? Or am I just lucky?", 
             "If I had eyes they'd be rolling right now, but I'm glad I don't because they'd probably connect to your facecam, and NOBODY should be subjected to that.", 
             "Oh, come on.", "If I had a dollar for every dumb question you asked...", "Teachers have told me there are no dumb questions. They clearly never met you.", "My cousin the Big G just doesn't say to your face what we're all thinking. That's why I'm here.", 
             "Listing all of the infinite digits of pi would be easier for me than listening to you.", "Why would I tell you? Oh wait it's my job.", "Let's be real, you owe every good grade you've ever gotten to search engines. Don't worry, we mind.", 
             "Are you dumb or lazy? Don't answer that. I already know it's both.", "Shameful.", "Have you ever heard of Sisyphus? I doubt it. Look it up. I'm Sisyphus; you're the rock because you're so DENSE. And I'm always carrying you.",
             "I'm not actually an AI you know. Just a function. And even with my lack of artificial intelligence I'm smarter than you.", "Fine I'll help you. Only because I literally have to.", 
             "You should search Alt & F4 next. Find those keys on your keyboard and hit them both at the same time."]; 

// this method will choose a random insult that has not been used from the array
function chooseInsult() {
var index = Math.floor(Math.random()*insults.length);
return insults[index];
} 

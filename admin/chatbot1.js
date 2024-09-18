var data= {
    optionsStack: [],
    chatinit:{
        title: ["Hello <span class='emoji'> &#128075 I am Mr. Chatbot","Please select Category"],
        options: ["Academic ","NonAcademic"]
    },
    academic: {
        title:["Academic"],
        options:['facultydetails','Results','Seminars','GuestLectures','PeertoPeerlearning','About','ScopeofAIML'],
        url : {

        }
    },
    
    nonacademic: {
        title:["Non Academic"],
        options:['Acheivements','Activities'],
        url : {
            
        }
    },
    acheivements: {
        title:["Acheivements"],
        options:['Sports','Talkshow'],
        url : {
            
        }
    },
    sports:{
        title:["Our acheivements in Sports"],
        title:["Winners in Men's doubles badminton","Winners in Women's doubles badminton","Winners in Men's Running", "Runners in Kabaddi", "Runners in Kho-Kho" ],
        url : {
            
        }
    },
    talkshow: {
        title:["An Inter departmental Oral Competition in which Mr.Jamanth, Ms.Pravallika from 3rd year and Mr.Pavan, Mr. Veer Reddy from 2nd year have been the standout performers and won the Competition."],

    },
    anveshana: {
        title:["Our presentations are:", "Automatic Fish Feeding System By V.Priyanka, K. Varshini and T.Annapurna","Sleep detecting System By K.Haritha, K.Gayatri and T.Yamini, they've also won the 2nd prize in it.","Automatic Car Parking System by M.Phani Kumar","Arduino Grass cutter by K.Pravallika, J.Roopa Devi, M.Nirupama"],
    },
    activities: {
        title:["Activities"],
        options:['Celebrations','Anveshana'],
        url : {
            
        }
    },
    facultydetails: {
        title:['Dr. Mohammed Rafee','Mr. M. Gopinath','Mrs. A. Nilavu Niza','Mrs. K. Harshini'],
        url : {
            
        }
    },
    about: {
        title: ["Artificial intelligence is an innovation that permits a system to mimic human behaviour which is concerned with creating intelligent machines. Machine learning (ML) is an application of AI that tries to build self-learning ability into the machines","The department of Artificial Intelligence & Machine Learning (AI&ML) was established in the year of 2021with an intake of 60 students. The department has outstanding laboratories and qualified faculty. The department conducts programs like guest lectures, seminars, workshops, project expos, and many more technical events to nurture students in the domain of AI and excel their careers. The department also conducts skill improvement programs for upskilling the students to get ready for the needs of industry along with the academics.","Artificial Intelligence & Machine Learning (AI&ML) is an emerging program that is quickly extending its limits to variety of fields like medical services, security, entertainment, education, autonomous transportation, intelligent robots, space exploration, image processing, stock exchange, prediction problems and many more."],
    },
    scopeofaiml: {
        title: ["Artificial Intelligence and Machine Learning (AI&ML) offer several roles like Data Engineer, Automation and Optimization Engineer, Natural Language Processing Scientist, Game Developer, Robotics Professional, Research Scientist, Machine Learning Developer, AI Consultant, Machine Learning Architect, etc., and these roles are in demand in various industries such as technology, healthcare, finance, e-commerce, and more. As the field continues to advance, new and specialised roles are likely to emerge, creating even more opportunities in the AIML department. Continuous learning and staying updated with the latest developments in AI and ML are crucial for a successful career in this dynamic field."],
    },
    results: {
        title: ["Thanks for your response"],
        options: ["Sem3","Sem5"],
        url : {
            
        }
    },
    sem3: {
        title: ["pass percentage - 86.96"],
        url: {
            
        }
    },
    sem5: {
        title: ["pass percentage - 80.88"],
        url: {
        }
    },
    seminars: {
        title: ["Students delivering seminars in class showcase communication skills, subject expertise, and confidence. It fosters a collaborative learning environment, encouraging knowledge sharing and enhancing overall academic engagement."],
    },
    guestlectures: {
        title: [" A guest lecture by a data scientist enriches students' understanding, providing real-world insights into data analytics, trends, and applications. It inspires and enhances data-driven learning experiences."],
    },
    peertopeerlearning:{
        title:["Peer-to-peer learning fosters collaboration, encouraging students to share knowledge, insights, and skills. It cultivates a dynamic, interactive environment, promoting mutual growth and understanding among peers."],
    },
    celebrations: {
        title: ["Students joyously organized vibrant Sankranti celebrations, featuring traditional handcrafts, intricate rangoli designs, and a delightful spread of food, beverages, and sweets. The event showcased cultural richness, fostering a sense of unity and festivity among students, creating lasting memories of the festive season."],
    }

}
document.getElementById("init").addEventListener("click",showChatBot);
var cbot= document.getElementById("chat-box");

var len1= data.chatinit.title.length;

function showChatBot(){
    console.log(this.innerText);
    if(this.innerText=='START CHAT'){
        document.getElementById('test').style.display='block';
        document.getElementById('init').innerText='CLOSE CHAT';
        initChat();
    }
    else{
        location.reload();
    }
}


// Add a stack to keep track of previous options
var optionsStack = [];
function showOptions(options) {
    for (var i = 0; i < options.length; i++) {
        var opt = document.createElement("span");
        var inp = '<div>' + options[i] + '</div>';
        opt.innerHTML = inp;
        opt.setAttribute("class", "opt");
        opt.addEventListener("click", handleOpt);
        cbot.appendChild(opt);
        handleScroll();
    }

    // Save the current options to the stack
    data.optionsStack.push(options);
}
function handleBack() {
    if (data.optionsStack.length > 0) { // Check if there are previous options
        // Pop the current options from the stack
        data.optionsStack.pop();
        // Get the previous options from the stack
        const previousOptions = data.optionsStack.pop();
        showOptions(previousOptions);
    }
}

function handleOpt() {
    // ...
    var str = this.innerText;
    var textArr = str.split(" ");
    var findText = textArr[0];

    document.querySelectorAll(".opt").forEach((el) => {
        el.remove();
    });

    var elm = document.createElement("p");
    elm.setAttribute("class", "test");
    var sp = '<span class="rep">' + this.innerText + '</span>';
    elm.innerHTML = sp;
    cbot.appendChild(elm);

    var tempObj = data[findText.toLowerCase()];
    handleResults(tempObj.title, tempObj.options, tempObj.url);

    // Save the current options to the stack
    optionsStack.push(tempObj.options);
}


function displayMessage(message) {
    var elm = document.createElement("p");
    elm.innerHTML = message;
    elm.setAttribute("class", "msg");
    cbot.appendChild(elm);
    handleScroll();
}
function initChat(){
    j=0;
    cbot.innerHTML='';
    for(var i=0;i<len1;i++){
        setTimeout(handleChat,(i*500));
    }
    setTimeout(function(){
        showOptions(data.chatinit.options)
    },((len1+1)*500))
}

var j=0;
function handleChat(){
    console.log(j);
    var elm= document.createElement("p");
    elm.innerHTML= data.chatinit.title[j];
    elm.setAttribute("class","msg");
    cbot.appendChild(elm);
    j++;
    handleScroll();
}

function displayMessage(message) {
    var elm = document.createElement("p");
    elm.innerHTML = message;
    elm.setAttribute("class", "msg");
    cbot.appendChild(elm);
    handleScroll();
}
function clearChatBox() {
    cbot.innerHTML = "";
}

function handleScroll() {
    cbot.scrollTop = cbot.scrollHeight;
}
function showOptions(options){
    for(var i=0;i<options.length;i++){
        var opt= document.createElement("span");
        var inp= '<div>'+options[i]+'</div>';
        opt.innerHTML=inp;
        opt.setAttribute("class","opt");
        opt.addEventListener("click", handleOpt);
        cbot.appendChild(opt);
        handleScroll();
    }
    data.optionsStack.push(options);
}




function handleDelay(title){
    var elm= document.createElement("p");
        elm.innerHTML= title;
        elm.setAttribute("class","msg");
        cbot.appendChild(elm);
}


function handleResults(title,options,url){
    for(let i=0;i<title.length;i++){
        setTimeout(function(){
            handleDelay(title[i]);
        },i*500)
        
    }

    const isObjectEmpty= (url)=>{
        return JSON.stringify(url)=== "{}";
    }

    if(isObjectEmpty(url)==true){
        console.log("having more options");
        setTimeout(function(){
            showOptions(options);
        },title.length*500)
        
    }
    else{
        console.log("end result");
        setTimeout(function(){
            handleOptions(options,url);
        },title.length*500)
        
    }
}

function handleOptions(options,url){
    
    for(var i=0;i<options.length;i++){
        var opt= document.createElement("span");
        var inp= '<a class="m-link" href="'+url.link[i]+'">'+options[i]+'</a>';
        opt.innerHTML=inp;
        opt.setAttribute("class","opt");
        cbot.appendChild(opt);
    }
    var opt= document.createElement("span");
    var inp= '<a class="m-link" href="'+url.more+'">'+'See more</a>';

    const isObjectEmpty= (url)=>{
        return JSON.stringify(url)=== "{}";
    }

    console.log(isObjectEmpty(url));
    console.log(url);
    opt.innerHTML=inp;
    opt.setAttribute("class","opt link");
    cbot.appendChild(opt);
    handleScroll();
}

function handleScroll(){
    var elem= document.getElementById('chat-box');
    elem.scrollTop= elem.scrollHeight;
}
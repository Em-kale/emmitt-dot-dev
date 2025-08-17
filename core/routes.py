from core import app
from flask import render_template, session


@app.route("/", methods=["GET", "POST"])
def home():
    session["project-subitems-opened"] = "closed"
    return render_template("index.html")


@app.route("/about-me", methods=["POST"])
def aboutMeContent():
    response = """
    <div class="about-me-container">
            <h3 class="about-me-title">
                <span hx-target="#home-container" hx-post="/main-list"
                hx-swap="innerHTML" class="crumb">
                &larr; back()</span> | about me
            </h3>
            <p class="about-me-content">
            <img class="headshot" src="static/images/headshot.jpg"/>
            Professionaly, I am a software engineering alum of Carleton university who has spent the last couple years focusing on cloud-native web development and AI applications for the defence sector, while working in the public service. During this time, I've operated across the entire stack, and beyond it into devops, project management, and team leadership, developing a knack for building quickly within very tight organizational constraints along the way. 
            <br/>
            <br/>
            Before that, I spent some energy in the web3 space, jumping from hackathon to hackathon, doing okay in a few of them even, while testing the capabilities of the arising technology and my own caffeine tolerance. And yet before that, I was a child creating blogs with drupal, forex trading bots, reinforcement learning experiments, and minecraft server hosting platforms with my Dad. 
            <br/>
            <br/>
            Now, alongside my continued work in the public service, I am focused on what I have always been focused on: understanding how things work. As a developer, my primary motivation has always been and continues to be -- perhaps selfishly -- satisfying my own curiosity. I am diving deep on operating systems, networks, computer, and software architecture, discovering a renewed love for cutting through the abstractions, and fighting against entropy, something I think software development could use some more of right now.
            </p>
    </div>
    """
    return response


@app.route("/main-list", methods=["POST"])
def mainList():
    response = """
        <div class="list-container">
            <div class="function-div">
            <details>
                <summary>
                    <p class="list-item"><span class="comment"># links to my personal projects</span></p>
                    <p class="list-item">
                            <span class="function-definition">def</span>
                            <span class="function-name">get_project_links</span><span class="bracket">():</span> 
                    </p>
                </summary>
                <div class="sub-list-1">
                        <!--<p class="list-item">return "Graph Traversal Visualizer"</p> -->
                    <p class="list-item">
                        <a class="link" href="https://github.com/Em-kale/carleton-mail-delivery-robot" target="_blank">
                                <span class="return">return</span><span class="string"> "Autonomous Mail Delivery"</span>
                        </a>
                    </p>
                    <p class="list-item">
                        <a class="link" href="https://github.com/Em-kale/proof" target="_blank">
                            <span class="return">return</span> <span class="string">"Proof"</span>
                        </a>
                    </p>
                    <p class="list-item">
                        <a class="link" href="https://github.com/Em-kale/graph-validator-generator" target="_blank">
                            <span class="return">return</span><span class="string"> 
                                "Near Staking Web Crawler"
                            </span>
                        </a>
                    </p>
                    <p class="list-item"><span class="return">return</span> <span class="string">"This Site"</span></p>
                </div>
            </details>
            </div>
            <div class="function-div">
            <details>
                <summary>
                    <p class="list-item"><span class="comment"># check out my 'social media'</span></p>
                    <p class="list-item">
                        <span class="function-definition">def</span>
                        <span class="function-name">get_socials</span><span class="bracket">():</span>
                    </p>
                </summary>
                <div class="sub-list-1">
                    <p class="list-item">
                        <a class="link" href="https://github.com/Em-kale" target="_blank">
                            <span class="return">return</span><span class="string"> "Github"</span>
                        </a>
                    </p>
                    <p class="list-item">
                        <a class="link" href="https://www.linkedin.com/in/emmittl" target="_blank">
                            <span class="return">return</span><span class="string"> "LinkedIn"</span>
                        </a>
                    </p>
                </div>
            </details>
            </div>
            <div class="function-div">
            <p class="list-item"><span class="comment"># read more about me</span></p>
            <p class="list-item" hx-target="#home-container" hx-post="/about-me" hx-swap="innerHTML settle:1s">
                    <span class="function-definition">def</span>
                    <span class="function-name">get_about</span><span class="bracket">():</span>
            </p>
         <!--       <p class="list-item">
                   Blog 
    </p> -->
                </div>
            </div> 
    """
    return response


@app.route("/social-list", methods=["POST"])
def socialItems():
    response = """
    <div class="sub-list-1">
        <p class="list-item">
            <a class="link" href="https://github.com/Em-kale" target="_blank">
                Github
            </a>
        </p>
        <p class="list-item">
            <a class="link" href="www.linkedin.com/in/emmittl" target="_blank">
                Linkedin
            </a>
        </p>
    </div>
    """
    return response, 200

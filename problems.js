// import { electron } from "webpack";
// import { ExternalModule } from "webpack";
import { Component, createElement, Underline, TextBox, Answer, Button } from "./framework.js"

const QUESTIONS = Symbol("questions")

export class Problem extends Component {// ques={question_array} ans={answer_array} this two is very important ques is inevitable
    constructor(...Children) {
        super();
        this.attributes = Object.create(null)
        this.attributes.ans = []
        this.attributes.ques = []
        this.questions = []
        this.handler = new Problem_handler()
        
    }

    render() {
        this.root = document.createElement("div")

        // if (this.attributes.id) this.root.id = this.attributes.id
        // if (this.attributes.class) this.root.className = this.attributes.class
        if (this.attributes.id) {
            this.add_id()}
        if (this.attributes.class) {
            // this.root.className = this.attributes.class
            this.add_classes()}

        else this.root.className = "paper"
        this.root.style.fontSize = "x-large"
        this.root.style.border = "1px solid blue" // 边框颜色
        this.root.style.width = "1400px"
        this.root.style.margin = "0 auto"

        let problem_index = 0; let curr_count; let a; let u
        this.root.appendChild(document.createTextNode(""))
        let reset_but = document.createElement("reset")
        let dispaly_ans_but = document.createElement("button")
        // let questions = []
        // let qs_count = 0

        reset_but.appendChild(document.createTextNode("Reset"))
        dispaly_ans_but.appendChild(document.createTextNode("Answer"))

        let count = 0;
        for (let que of this.attributes.ques) {
            count += 1
            if (que === "#qs") {
                curr_count = String(problem_index)
                if (problem_index > this.attributes.ans.length) {
                    a = 0
                    alert("wrong question")
                }
                else a = this.attributes.ans[problem_index].ans
                // console.log(a,a.length,a.type)
                if (this.attributes.ans[problem_index].type === "UnderLine") u = <Underline class={this.root.className + " ans_type " + String(problem_index)} ans={a}></Underline>
                else if (this.attributes.ans[problem_index].type === "TextBox") u = <TextBox class={this.root.className + " ans_type " + String(problem_index)} ans={a}></TextBox>
                else u = <Underline class={this.root.className + " ans_type " + String(problem_index)} ans={a}></Underline>;
                this.questions.push(u)
                if (a.type === "TextBox") this.root.appendChild(document.createElement("br"))
                u.mountTo(this.root)
                let s = <Answer class={this.root.className + " ans ans" + String(count - 1)} ans={this.attributes.ans[problem_index].ans}></Answer>
                s.mountTo(this.root)
                let butt = <Display_button class={this.root.className + " butt butt" + String(count - 1)} parent={this.root}></Display_button>
                butt.mountTo(this.root)

                problem_index += 1
            }
            else this.root.appendChild(document.createTextNode(que))
        }
        this.root.appendChild(document.createElement("br"))

        let show_all_button = <Show_all_button></Show_all_button>
        show_all_button.mountTo(this.root)
        let hide_all_button = <Hide_all_button></Hide_all_button>
        hide_all_button.mountTo(this.root)

        let reset_all_button = <Reset_all_button></Reset_all_button>
        reset_all_button.mountTo(this.root)



        return this.root
    }
        
    mountTo(parent) {
        parent.appendChild(this.render())
    }

    // showall(){
    //     this.handler.showall(this.root)
    // }
}

export class Problem_handler{
    constructor(){

    }

    showall(element) {
        let spans = element.getElementsByTagName("span")
        for (let s of spans) {
            if (s.style.backgroundColor === "black") s.style.backgroundColor = "pink"
        }
    }
}

// ...................................... button and onclick .....................................................................

export class Onclicks{// in problem blocks； just for questions in one problem
    display_ans(element, className){
        // let parent = this.parentNode
        let spans = element.getElementsByTagName("span")
        let regExp =   /ans[0-9]+/g
        for (let s of spans) {
            let ClassNumber = s.className.match(regExp)[0]
            ClassNumber = ClassNumber.slice(3, ClassNumber.length)
            if (ClassNumber && ClassNumber === className) {
                if (s.style.backgroundColor === "pink") s.style.backgroundColor = "black"
                else if (s.style.backgroundColor === "black") s.style.backgroundColor = "pink"
            }
        }
    }

    display_allans(element){
        // let parent = this.parentNode
        // if(typeof e == "event") parent 
        // console.log(typeof e)
        let spans = element.getElementsByTagName("span")
        for (let s of spans) {
                if (s.style.backgroundColor === "black") s.style.backgroundColor = "pink"
        }
    }

    hide_allans(element) {
        // let parent = this.parentNode
        let spans = element.getElementsByTagName("span")
        for (let s of spans) {
                if (s.style.backgroundColor === "pink") s.style.backgroundColor = "black"
        }
    }

    reset_all(element){
        let inputs = element.getElementsByTagName("input")
        for(let input of inputs){
            input.value = ''
        }
    }
}

class Display_button extends Button{
    constructor(){
        super()
        this.onclick = () => {
            let parent = this.root.parentNode
            let regExp =   /butt[0-9]+/g
            let className = this.root.className.match(regExp)[0]
            className = className.slice(4, className.length)
            new Onclicks().display_ans(parent, className)
        }
        this.text = "Show/Hide"
    }
}

class Show_all_button extends Button{

    constructor(){
    super()
    this.onclick = (e) => {
        let parent = this.root.parentNode
        new Onclicks().display_allans(parent)
    } 
    this.text = "Display All"
    }
}

class Reset_all_button extends Button{
    constructor(){
        super()
        this.onclick = (e) => {
            let parent = this.root.parentNode
            new Onclicks().reset_all(parent)
        } 
        this.text = "Reset All"
        }
}

class Hide_all_button extends Button{

    constructor(){
    super()
    this.onclick = (e) => {
        let parent = this.root.parentNode
        new Onclicks().hide_allans(parent)}
    this.text = "Hide All"
    }
}

// ...................................... button and onclick 上上上上上上上上上上上上上上上上上上上上上上上上上上上上上上上上上上上上上上上上上上上

import { Problem, Onclicks } from "./problems.js"
import { Component, createElement } from "./framework.js"

export class Paper extends Component {// 开头必须大写 
    constructor() {
        super();
        this.attributes = Object.create(null) // 必须有 this.attributes.problems 才可以生成，单独生成一个
        this.activated_problems = null // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        this.problems_handler = new Onclicks()

        this.root = document.createElement('div')
        this.problems = []
    }

    render() {
        this.problem_num = 0
        if (this.attributes.problems) this.problem_num = this.attributes.problems.length

        this.root.style.width = "1400px"
        this.root.style.border = "1px solid black"
        this.root.style.margin = "0 auto" // 居中
        this.root.tabIndex = "-1"

        let problem_index = 0; let question_index = 0; let problems = this.problems

        let dispaly_all = document.createElement("button")
        dispaly_all.appendChild(document.createTextNode("display all"))
        dispaly_all.onclick = (e) => {
            problem_index = 0; question_index = 0
            this.show_all_answers()
        }
        this.root.appendChild(dispaly_all)

        let Hide_all = document.createElement("button")
        Hide_all.appendChild(document.createTextNode("hide all"))
        Hide_all.onclick = (e) => {
            problem_index = 0; question_index = 0
            this.hide_all_answers()
        }
        this.root.appendChild(Hide_all)

        let reset_all = document.createElement("button")
        reset_all.appendChild(document.createTextNode("reset all"))
        reset_all.onclick = (e) =>{
            problem_index = 0; question_index = 0
            this.hide_all_answers()
            this.reset_all_answers()
        }
        this.root.appendChild(reset_all)

        if (this.attributes.problems === undefined) {// 如果没有problem 就返回一个空的 
            this.root.style.height = "100px"
            return this.root
        }
        else {
            let problem_index; let p; let content; let question_array; let answer_array = []; let curr;
            if (this.attributes.class) this.root.className = this.attributes.class
            if (this.attributes.id) this.root.id = this.attributes.id
            for (let i of this.attributes.problems) {
                problem_index = i[0].problem_index
                content = i[1].content
                question_array = []; answer_array = [];
                for (let ii = 0; ii < content.length; ii++) {
                    curr = content[ii];
                    if (curr.type === "string") {
                        question_array.push(curr.string)
                    }
                    else if (curr.type === "question") {
                        question_array.push("#qs")
                        answer_array.push({ type: curr.question.type, ans: curr.question.answer })
                    }
                    else continue
                }

                p = <Problem ques={question_array} ans={answer_array} class={problem_index} ></Problem> // class 可以这么写 // class = {"paper1-problem-" + problem_index}
                p.mountTo(this.root)
                this.problems.push(p)
                console.log(problem_index, question_array, answer_array)
            }
        }
        // ----------------------------------- 这里应该变成一个类似 animation 之类可开关的动作, 可以通过一个按钮或者什么东西开启或者停止这个监听----------------------------------------------------
        // let problem_index = 0; let question_index = 0; let problems = this.problems
        this.root.addEventListener("keyup", event => {
            //--------------------------------------------------------------------------------------------------
            if (event.key === "Enter" && event.altKey) show_next_answer(event)
        })

        let current_show = null;

        let show_next_answer = (event) => {
            let curr_problem = problems[problem_index]
            if (question_index < curr_problem.attributes.ans.length) {
                let s = curr_problem.root.getElementsByTagName('span')[question_index]
                s.style.backgroundColor = "pink"
            }
            question_index += 1
            if (question_index >= problems[problem_index].attributes.ans.length) {
                question_index = 0
                problem_index = (problem_index + 1) % problems.length
            }
            // 自动跳转到下一个问题
            if (question_index < problems[problem_index].questions.length) {
                let q = problems[problem_index].questions[question_index]
                q.root.focus();
            }
        }


        // -----------------------------------------------------------------------------------------------------------------------------------------
        return this.root
    }
    show_all_answers(){
            for(let p of this.problems){
                this.problems_handler.display_allans(p.root)
            }

        }
    
    hide_all_answers() {
        for(let p of this.problems){
            this.problems_handler.hide_allans(p.root)
        }
    }

    reset_all_answers(){
        for(let p of this.problems){
            this.problems_handler.reset_all(p.root)
        }
    }
}
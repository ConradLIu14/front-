import { Component, createElement, Sign_workspace } from "./framework.js"

// handler。。。。。 把control 的部分全部写成handler


export class Submit extends Component {
    constructor() {
        super()
        this.attributes = new Object(null) // addr; port; method; count; target; class must be set block
        // this.iframe = document.createElement("iframe")
        this.root = document.createElement("form")
        this.root.method = "Post" // !!!!!!!!!!! post 传送比较好一点。textarea 中的东西会过去。
        this.root.enctype = "text/plain" // !!!!!!!!!!!!!!!!!!!!!!!!!!!
        this.button = document.createElement("button")
        this.button.style.height = "20px"
        this.button.style.width = "80px"
        this.button.appendChild(document.createTextNode("submit"))

        this.parse_button = document.createElement("button")
        this.parse_button.style.height = "20px"
        this.parse_button.style.width = "80px"
        this.parse_button.appendChild(document.createTextNode("preview"))

        this.textarea = document.createElement("textarea")
        this.textarea.name = "submit_text"
        // this.textarea.style.display = "none"
        this.root.appendChild(this.textarea)
    }

    render() {
        this.root.action = this.attributes.addr + String(this.attributes.port)
        let submit_button = this.button
        if (this.attributes.method) this.root = this.attributes.method
        let submit_name
        if (this.attributes.target) submit_name = this.attributes.target
        else submit_name = "submitForm0"

        // this.iframe.name = submit_name
        this.root.target = this.attributes.target

        let submit_onclick = () => {
            console.log(this.root)
            console.log(this.textarea.textContent.toString())
            let text_submit = this.textarea.textContent.toString()
            let parse = this.parse(text_submit)
            this.textarea.innerHTML = ''
            this.textarea.appendChild(document.createTextNode(JSON.stringify(parse)))

            this.root.submit()
            // this.textarea.innerHTML = ''
            setTimeout(() => {
                this.textarea.innerHTML = ''
            }, 20);
        }

        let parse_onclick = () => {
            let text_content = this.textarea.textContent.toString()
            let parse = this.parse(text_content)
            let paper = <Paper problems={[parse]} class={"parse"}></Paper> 
            // ------------------------------------

            // ---------------------------------------
            // console.log("parse", [parse])
            let preview_parent = document.getElementsByClassName("preview_target")[0]
            preview_parent.focus()
            // paper.mountTo(this.root.parentNode)
            preview_parent.innerHTML = ''
            paper.mountTo(preview_parent)
        }

        submit_button.onclick = submit_onclick
        this.parse_button.onclick = parse_onclick
        this.root.appendChild(submit_button)
        this.root.appendChild(this.parse_button)

        return this.root
    }

    parse(text_parse) {
        let curr_str = ''
        let res = []
        let splits = []
        let state = state0_readhead
        function state0_readhead (c) {
            if(c === "#") {
                state = state1_readstring 
                res.push({problem_index:curr_str}, {content:[]})
                curr_str = ''
            }
            else if(c === "\n"){
                
            }
            else curr_str += c
        }
    
        function state1_readstring (c) {
            if(c === "#") {
                state = stat2_read_sign
            }
            else curr_str += c
        }
    
        function stat2_read_sign(c){ // ### first # represent read targ; seconde * represent read confirm 
            if(c === "*"){
                state = state3_readtage
                
                splits.push(curr_str)
                res[1].content.push({type: "string", string: curr_str})
                curr_str = '#'
            }
            else {
                state = state1_readstring
                curr_str += "#"
                curr_str += c
            }
        }
    
        function state3_readtage(c) {
            if(c === "("){
                state = state4_readproblem
                splits.push(curr_str)
                if(curr_str === "#qs1:"){
                    res[1].content.push({type: "question", question:{
                        type: "underline",
                        answer:''
                    }})
                }
                // else if(curr_str === "#qs2:")
                curr_str = ''
                
            }
            else{
                curr_str += c
            }
        }
    
        function state4_readproblem(c) {
            if(c === ")"){
                state = state5_readTagEndComfirm
            }
            else{
                curr_str += c
            }
        }
    
        function state5_readTagEndComfirm(c){
            if(c === "*"){
                state = state6_readtagend
                res[1].content[res[1].content.length - 1].question.answer = curr_str
                splits.push(curr_str)
                curr_str = "*"
            }
            else{
                curr_str += ")"
                curr_str += c
                state = state4_readproblem
            }
        }
    
        function state6_readtagend(c) {
            // let splits = 
            if(c === "#"){
                splits.push(curr_str)
                curr_str = ''
                state = state1_readstring
            }
            else {
                curr_str += c
            }
        }

        for(let c of text_parse){
            state(c)
        }
        // splits.push(res)
        res[1].content.push({type: "string", string: curr_str})
        // console.log("res", res)
        // console.log("splits", splits)
        return res    
    }
}





export class Dispaly_handler {
    constructor() {
        this.iframe = document.createElement("iframe")
        this.div_preview = document.createElement("div")
        this.div_preview.tabIndex = 0

        this.display_box = document.createElement("div")
        this.display_box.classList.add("display_box")
        this.iframe.classList.add("submit_target")// in parse.css
        this.div_preview.classList.add("preview_target")
        

        this.iframe_submit_target = "iframe_target"
        this.div_preview_target = "preview_target"
        this.butt_box = document.createElement("div")
        this.butt_box.classList.add("butt_box")
        this.butts = []
        this.dispaly_state = 0
        this.preview_state = 0

        
    }

    start(parent, iframe_submit_target, preview_target ) {
        if (!arguments[1]) parent = document.body
        if (!arguments[2]) this.iframe_submit_target = iframe_submit_target
        if (!arguments[3]) this.div_preview_target = preview_target

        this.iframe.name = iframe_submit_target
        let size_toggle = () => {
            console.log(this.dispaly_state)
            if (this.dispaly_state === 0) {
                this.iframe.style.height = "500px"
                // this.iframe.style.width = "1500px"
                // this.iframe.style.zIndex = "10px"
                this.dispaly_state = 1
            }
            else {
                this.iframe.style.height = ""
                // this.iframe.style.width = ""
                // this.iframe.style.zIndex = ""
                this.dispaly_state = 0
            }
        }

        let preview_size_toggle = () => {
            if (this.preview_state === 0) {
                this.div_preview.style.height = "1000px"
                this.div_preview.style.width = "1500px"
                this.div_preview.style.position = "fixed"
                this.div_preview.style.top = "0px"
                this.div_preview.style.right = "0px"
                this.div_preview.style.zIndex = "20px"

                document.body.appendChild(this.div_preview)
                this.preview_state = 1
                this.div_preview.focus()
            }
            else {
                this.div_preview.style.height = ""
                this.div_preview.style.width = ""
                this.div_preview.style.position = ''
                this.div_preview.style.top =''
                this.div_preview.style.right = ""
                this.div_preview.style.zIndex = ''
                this.display_box.appendChild(this.div_preview)
                this.preview_state = 0
            }
        }

        let preview_onfocuse = () => {
            let curr = document.getElementsByClassName("view-lines")[0]
            let codes = []
            for(let i = curr.childNodes.length - 1; i >=0; i--){
                let line = curr.childNodes[i].textContent
                if(line[line.length - 1] != ";") line += ";"
                codes.push(line)
            }
            console.log(codes)
            // if(this.preview_state === 0){
            //     preview_size_toggle()
            // }
        }

        // this.div_preview.onblur = preview_onblur
        this.div_preview.onfocus = preview_onfocuse

        


        parent.appendChild(this.display_box)
        parent.appendChild(this.butt_box)
        // this.display_box.appendChild(this.iframe)
        parent.appendChild(this.iframe)
        this.display_box.appendChild(this.div_preview)

        let display_butt = document.createElement("button")
        display_butt.classList.add("iframe_button")
        display_butt.onclick = size_toggle
        display_butt.appendChild(document.createTextNode("iframe"))

        let preview_butt = document.createElement("button")
        preview_butt.classList.add("iframe_button")
        preview_butt.appendChild(document.createTextNode("preview"))
        preview_butt.onclick = preview_size_toggle



        this.add_button(preview_butt)
        this.add_button(display_butt)
        // this.butt_box.appendChild(display_butt)
        console.log(this.butts)
        for (let butt of this.butts) {
            this.butt_box.appendChild(butt)
        }
    }

    add_button(butt) {
        this.butts.push(butt)
        this.butt_box.appendChild(butt)
    }
}

// let ifream_handler = new Iframe_dispaly_handler() 
// ifream_handler.start()

// ............................................................................
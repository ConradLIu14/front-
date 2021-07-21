let tmpl = `<div class="newslist">
    <div class="img" v-if="info.showImage"><img src="{{image}}"/></div>
    <div class="date" v-if="info.showDate">{{info.name}}</div>
    <div class="img">{{info.name}}</div>
</div>`;

// render(tmpl, {
// 	image: "some img", 
//     info: {showImage: true, showDate:false, name: "aaa"}
// })

// 首先y用有限状态机方法 解析tmpl
let parent_end = Symbol("Root Parent End")
let state = state1_init
let curr_string = ''
let curr_attr = ''
let root 
let parent 
let curr_node 
let tags_stack = []
function state1_init(c){
    if(c === "<") state = state2_1_readStartTag
}

function state2_readTag(c){
    if(c === " ") return 
    else if(c === "/") state = state2_2readEndTag
    else {state = state2_1_readStartTag
    curr_string += c
    }
}

function state2_1_readStartTag(c){
    if(c === " " ) {
        curr_node = {type:"", attrs:{}, children:[], parent : parent}
        tags_stack.push({start:curr_string, parent:curr_node})
        state = state3_1_readAttrsLeft
        
        curr_node.type = curr_string
        if(!root) {
            root = curr_node
            parent = root
        
        }
        else {
        }
        curr_string = ''
    }
    else if(c === ">"){
        tags_stack.push({start:curr_string, parent:curr_node})
        curr_node = {type:"", attrs:{}, children:[], parent : parent}
        curr_node.type = curr_string
        curr_node.parent = parent
        // parent.children.push(curr_node)
        state = state4_Children
        curr_string = ''
    }
    else if(c === "/"){
        let tag = tags_stack.pop()
        tag.end = tag.start
        console.log(tag)
        
        state = state4_Children
    }
    else{
        curr_string += c
    }
}

function state2_2readEndTag(c){
    if(c === ">"){
        state = state4_Children
        let tag = tags_stack.pop()
        tag.end = curr_string
        console.log(tag)
        curr_string = ''
    }
    else{
        curr_string += c
    }
}

function state3_1_readAttrsLeft(c){
    if(c === " " || c === "=") {
        state = state3_2_readAttrsMid
        curr_node.attrs[curr_string] = ''
        curr_attr = curr_string
        curr_string = ''
    }
    else if(c === "/"){
        let tag = tags_stack.pop()
        tag.end = tag.start
        console.log(tag)
        // if(tag) parent.children.push(curr_node) !!!!!!!!!!!!!!!!!!!
        state = state4_Children
    }
    else if(c === ">"){
        state = state4_Children
        curr_string = ''
    }
    else{
        curr_string += c
    }
}

function state3_2_readAttrsMid(c){
    if(c === "'" || c === '"')  state = state3_2_readAttrsright
    else {return
        }
}

function state3_2_readAttrsright(c){
    if(c === "'" || c === '"') {
        state = state3_1_readAttrsLeft
    curr_node.attrs[curr_attr] = curr_string
        curr_string = ''
    }
    else {
        curr_string += c
    }
}

function state4_Children(c) {
    if(c === "<") {
        state = state2_readTag
        if(curr_string){
            // curr_node.children.push({string:curr_string}) // 在这个场景先不考虑 string
            curr_string = ''
        }
        curr_string = ''
    }
    
    
    else{
        curr_string += c
    }

}

let try1 = `<div class="newslist"><img src="{{image}}"/></div>`
let try2 = ``
for(let c of try1){
    state(c)
}

console.log(JSON.stringify(root),state,  curr_attr === '')

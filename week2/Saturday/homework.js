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
let parent = parent_end
let curr_node 
let tags_stack = [] //  {type:"div", parent: curr_node} 
let attribute_parser = /[.]/g

function fetch_vif(value, data){
    let attr


    attr =  value.split(attribute_parser)

    // if(!data[value]) return value
    let res = data
    for(let i of attr){
        res = res[i]
    }
    return res
}

function fetch_value(value, data){
    if(value[0] === '{'){
        let attrs = value.slice(2,value.length -2).split(attribute_parser)
        let curr = data
        for(let i of attrs){
            curr = curr[i]
        }
        return curr
    }
    else{
        return value
    }
}

function generate_DOM(root, data){

    let travse = (node, data) => {
        if(node.tagName === 'string'){
            let value = fetch_value(node.value, data)
            return {type:node.tagName, value: value}
        }

        let attrs = {}
        for(let i in node.attrs){
            let attr_value = node.attrs[i]
            if(i === 'v-if'){
                attr_value = node.attrs['v-if']
                let is_true = fetch_vif(attr_value, data)
                if(is_true === false) return 
            }else{
                // let value = node.attrs[i]
                // if(node.attrs[i][0] === "{"){
                //     value = fetch_value(value, data)
                // }
                let value = fetch_value(node.attrs[i], data)
                attrs[i] = value
            }
        }

        let res = {type:node.tagName, attrs:attrs, children:[]}
        console.log('res', res)

        if(node.children.length > 0){
            for(let the_node of node.children){
                let curr = travse(the_node, data)
                if(curr) res.children.push(curr)
            }
        }

        return res 
    }

    return travse(root,data)

}

function emit(token){
    console.log("emit", token)
    if(token.type === "startTag"){
        curr_node = {tagName:token.value, attrs:{}, children:[]}
        
        if(!root) root = curr_node
        if(tags_stack.length > 0){
            let parent = tags_stack[tags_stack.length - 1].parent
            parent.children.push(curr_node)
        }
        tags_stack.push({type:curr_node.type, parent:curr_node})
    }
    else if(token.type === "attrLeft"){
        curr_node.attrs[token.value] = ''
        curr_attr = token.value
    }
    else if(token.type === "attrRight"){
        curr_node.attrs[curr_attr] = token.value
    }
    else if(token.type === "endTag"){
        tags_stack.pop()
    }
    else if(token.type = 'string'){
        curr_node.children.push({tagName:'string', value:token.value})
    }
}

function state1_init(c){
    if(c === "<") state = state2_1_readStartTag
}

function state2_readTag(c){
    if(c === "/"){
        state = state2_2readEndTag
    }
    else{
        curr_string = c
        state = state2_1_readStartTag
    }
}

function state2_1_readStartTag(c){
    if(c === " " ) {
        state = state3_1_readAttrsLeft
        let token = {type:"startTag", value: curr_string}
        emit(token)
        curr_string = ''
    }
    else if(c === ">"){
        // tags_stack.push({start:curr_string, parent:parent})
        // curr_node = {type:"", attrs:{}, children:[]}
        // curr_node.type = curr_string

        state = state4_Children
        // parent = curr_node
        emit(curr_string)
        curr_string = ''
    }
    else if(c === "/"){
        
        state = state4_Children
        emit(curr_string)
        curr_string = ''
    }
    else{
        curr_string += c
    }
}

function state2_2readEndTag(c){
    if(c === ">"){
        state = state4_Children
        let token = {type:"endTag", value:curr_string }
        emit(token)
        curr_string = ''
    }
    else{
        curr_string += c
    }
}

function state2_3selfclosingTag(c){
    if(c === ">") state = state4_Children

}

function state3_1_readAttrsLeft(c){
    if(c === "=") {
        state = state3_2_readAttrsMid
        let token = {type:"attrLeft", value:curr_string}
        emit(token)
        curr_string = ''
    }
    else if(c === " "){
        return 
    }
    else if(c === "/"){
        state = state2_3selfclosingTag
        if(curr_string) emit(curr_string)
        curr_string = ''
    }
    else if(c === ">"){
        state = state4_Children
        if(curr_string) emit(curr_string)
        curr_string = ''
    }
    else{
        curr_string += c
    }
}

function state3_2_readAttrsMid(c){
    if(c === "'" || c === '"')  state = state3_3_readAttrsright
    else {
        return
        }
}

function state3_3_readAttrsright(c){
    if(c === "'" || c === '"') {
        state = state3_1_readAttrsLeft
    // curr_node.attrs[curr_attr] = curr_string
    //     curr_string = ''
    token = {type:"attrRight", value: curr_string}
    emit(token)
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
            let token = {type:'string', value:curr_string}
            emit(token) // TextNode
        }  
        curr_string = ''
    }
    else{
        curr_string += c
    }
}

let try1 = `<div class="newslist"><img src="{{image}}"/></div>`
let try2 = `<div class="img" v-if="info.showImage"><img src="{{image}}"/><img src="{{image}}"/></div>`


console.log(JSON.stringify(root),state,  curr_attr === '')
console.log(root)

let a = {image: "some img", info: {showImage: true, showDate:false, name: "aaa"}}

function render(tmpl, a){
    for(let c of tmpl){
        state(c)
    }
    console.log(JSON.stringify(root))
}

render(tmpl)

let string1 = 'info.showImage'
let string2 = '{{image}}'
// console.log(string1.split(attribute_parser))

let dom = generate_DOM(root, a)
console.log("DOM", JSON.stringify(dom))

function generate(dom){

    let traves = (node) =>{
        if(node.type === 'string') return document.createTextNode(node.value)
        let element = document.createElement(node.type)
        for(let i in node.attrs){
            element.setAttribute(i, node.attrs[i])
        }
        if(node.children.length > 0){
            for(let i of node.children){
                let child = traves(i)
                element.appendChild(child)
            }
        }
        return element
    }

    return traves(dom)
}

let res = generate(dom)
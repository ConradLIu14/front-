import { Component, createElement, Sign_workspace } from "./framework.js"
import {Submit,Dispaly_handler} from "./parse.js"

let target_name = "iframe_target"
let dispaly = new Dispaly_handler()
dispaly.start(document.body, target_name)


export {problems} 
let problems = [
    [
        {
            "problem_index": "S1 window 对象"
        },
        {
            "content": [
                {
                    "type": "string",
                    "string": "S1 window 对象"
                },
                {
                    "type": "string",
                    "string": ""
                }
            ]
        }
    ],
    [
        {
            "problem_index": "p1"
        },
        {
            "content": [
                {
                    "type": "string",
                    "string": "p1. BOM的核心是window对象，表示浏览器的实例。window对象在浏览器中有两重身份，一个是 "
                },
                {
                    "type": "question",
                    "question": {
                        "answer": "(ECMAScript中的Global对象) ",
                        "type": "UnderLine"
                    }
                },
                {
                    "type": "string",
                    "string": "，另一个就是 "
                },
                {
                    "type": "question",
                    "question": {
                        "answer": "(浏览器窗口的JavaScript接口)",
                        "type": "UnderLine"
                    }
                },
                {
                    "type": "string",
                    "string": " 。这意味着 "
                },
                {
                    "type": "question",
                    "question": {
                        "answer": " (网页中定义的所有对象、变量和函数都以window作为其Global对象，都可以访问其上定义的parseInt()等全局方法。)",
                        "type": "UnderLine"
                    }
                },
                {
                    "type": "string",
                    "string": "通过"
                },
                {
                    "type": "question",
                    "question": {
                        "answer": "(var)",
                        "type": "UnderLine"
                    }
                },
                {
                    "type": "string",
                    "string": "声明的所有全局变量和函数都会变成window对象的属性和方法, 然而"
                },
                {
                    "type": "question",
                    "question": {
                        "answer": "(使用let或const替代var)",
                        "type": "UnderLine"
                    }
                },
                {
                    "type": "string",
                    "string": "则不会比如："
                },
                {
                    "type": "question",
                    "question": {
                        "answer": "()",
                        "type": "UnderLine"
                    }
                },
                {
                    "type": "string",
                    "string": ""
                }
            ]
        }
    ],
    [
        {
            "problem_index": "p2"
        },
        {
            "content": [
                {
                    "type": "string",
                    "string": "p2. top对象始终指向 "
                },
                {
                    "type": "question",
                    "question": {
                        "answer": "(最上层窗口)",
                        "type": "UnderLine"
                    }
                },
                {
                    "type": "string",
                    "string": "，即浏览器窗口本身。而parent对象则"
                },
                {
                    "type": "question",
                    "question": {
                        "answer": "(始终指向当前窗口的父窗口)",
                        "type": "UnderLine"
                    }
                },
                {
                    "type": "string",
                    "string": "。如果当前窗口是最上层窗口，则"
                },
                {
                    "type": "question",
                    "question": {
                        "answer": "(parent等于top（都等于window）",
                        "type": "UnderLine"
                    }
                },
                {
                    "type": "string",
                    "string": "。还有一个self对象，它是"
                },
                {
                    "type": "question",
                    "question": {
                        "answer": "(终极window属性)",
                        "type": "UnderLine"
                    }
                },
                {
                    "type": "string",
                    "string": "，始终会指向"
                },
                {
                    "type": "question",
                    "question": {
                        "answer": "(window)",
                        "type": "UnderLine"
                    }
                },
                {
                    "type": "string",
                    "string": "。这些属性都是window对象的属性"
                }
            ]
        }
    ],
    [
        {
            "problem_index": "p3"
        },
        {
            "content": [
                {
                    "type": "string",
                    "string": "p3. window对象的位置可以通过不同的属性和方法来确定。现代浏览器提供了qs:(screenLeft)"
                },
                {
                    "type": "question",
                    "question": {
                        "answer": "(screenTop)",
                        "type": "UnderLine"
                    }
                },
                {
                    "type": "string",
                    "string": "属性，用于表示窗口相对于屏幕左侧和顶部的位置 ，返回值的单位是"
                },
                {
                    "type": "question",
                    "question": {
                        "answer": " (CSS像素) ",
                        "type": "UnderLine"
                    }
                },
                {
                    "type": "string",
                    "string": "。可以使用"
                },
                {
                    "type": "question",
                    "question": {
                        "answer": "(moveTo())和",
                        "type": "UnderLine"
                    }
                },
                {
                    "type": "string",
                    "string": ":(moveBy())"
                },
                {
                    "type": "question",
                    "question": {
                        "answer": "(moveBy())",
                        "type": "UnderLine"
                    }
                },
                {
                    "type": "string",
                    "string": "方法移动窗口。这两个方法都接收两个参数，其中"
                },
                {
                    "type": "question",
                    "question": {
                        "answer": "(moveTo())",
                        "type": "UnderLine"
                    }
                },
                {
                    "type": "string",
                    "string": "接收要移动到的新位置的绝对坐标 和 ；而qs:(moveBy())"
                },
                {
                    "type": "question",
                    "question": {
                        "answer": "(moveBy())",
                        "type": "UnderLine"
                    }
                },
                {
                    "type": "string",
                    "string": "则接收相对当前位置在两个方向上移动的像素数。"
                }
            ]
        }
    ],
    [
        {
            "problem_index": "p4"
        },
        {
            "content": [
                {
                    "type": "string",
                    "string": "p4. CSS像素是Web开发中使用的统一像素单位。这个单位的背后其实是一个角度：0.0213°。如果屏幕距离人眼是一臂长，则以这个角度计算的CSS像素大小约为1/96英寸。这样定义像素大小是为了在不同设备上统一标准。比如，低分辨率平板设备上12像素（CSS像素）的文字应该与高清4K屏幕下12像素（CSS像素）的文字具有相同大小。这就带来了一个问题，不同像素密度的屏幕下就会有不同的缩放系数，以便把物理像素（屏幕实际的分辨率）转换为CSS像素（浏览器报告的虚拟分辨率）。举个例子，手机屏幕的物理分辨率可能是1920×1080，但因为其像素可能非常小，所以浏览器就需要将其分辨率降为较低的逻辑分辨率，比如640×320。这个物理像素与CSS像素之间的转换比率由window.devicePixelRatio属性提供。对于分辨率从1920×1080转换为640×320的设备，window.devicePixelRatio的值就是3。这样一来，12像素（CSS像素）的文字实际上就会用36像素的物理像素来显示。window.devicePixelRatio实际上与每英寸像素数（DPI，dots per inch）是对应的。DPI表示单位像素密度，而window.devicePixelRatio表示物理像素与逻辑像素之间的缩放系数。"
                },
                {
                    "type": "string",
                    "string": ""
                }
            ]
        }
    ],
    [
        {
            "problem_index": "p5"
        },
        {
            "content": [
                {
                    "type": "string",
                    "string": "p5. 在不同浏览器中确定浏览器窗口大小没有想象中那么容易。所有现代浏览器都支持4个属性："
                },
                {
                    "type": "question",
                    "question": {
                        "answer": "(innerWidth、innerHeight、outerWidth和outerHeight) ",
                        "type": "UnderLine"
                    }
                },
                {
                    "type": "string",
                    "string": "。outerWidth和outerHeight返回 "
                },
                {
                    "type": "question",
                    "question": {
                        "answer": "(浏览器窗口自身的大小)",
                        "type": "UnderLine"
                    }
                },
                {
                    "type": "string",
                    "string": "（不管是在最外层window上使用，还是在窗格<frame>中使用）。innerWidth和innerHeight返回 "
                },
                {
                    "type": "question",
                    "question": {
                        "answer": "(浏览器窗口中页面视口的大小（不包含浏览器边框和工具栏）。)",
                        "type": "UnderLine"
                    }
                },
                {
                    "type": "string",
                    "string": ""
                },
                {
                    "type": "question",
                    "question": {
                        "answer": "(document.documentElement.clientWidth和document.documentElement.clientHeight)",
                        "type": "UnderLine"
                    }
                },
                {
                    "type": "string",
                    "string": " 返回页面视口的宽度和高度。浏览器窗口自身的精确尺寸不好确定，但可以确定页面视口的大小，可以使用"
                },
                {
                    "type": "question",
                    "question": {
                        "answer": "(resizeTo()和resizeBy())",
                        "type": "UnderLine"
                    }
                },
                {
                    "type": "string",
                    "string": " 方法调整窗口大小。这两个方法都接收两个参数，resizeTo()接收新的宽度和高度值，而resizeBy()接收宽度和高度各要缩放多少。与移动窗口的方法一样，缩放窗口的方法可能会被浏览器禁用，而且在某些浏览器中默认是禁用的。同样，缩放窗口的方法只能应用到 "
                },
                {
                    "type": "question",
                    "question": {
                        "answer": "(最上层的window对象。)",
                        "type": "UnderLine"
                    }
                },
                {
                    "type": "string",
                    "string": ""
                }
            ]
        }
    ],
    [
        {
            "problem_index": "p6"
        },
        {
            "content": [
                {
                    "type": "string",
                    "string": "p6. 浏览器窗口尺寸通常无法满足完整显示整个页面，为此用户可以通过滚动在有限的视口中查看文档。度量文档相对于视口滚动距离的属性有两对，返回相等的值："
                },
                {
                    "type": "question",
                    "question": {
                        "answer": " (window.pageXoffset/window.scrollX)",
                        "type": "UnderLine"
                    }
                },
                {
                    "type": "string",
                    "string": "和 "
                },
                {
                    "type": "question",
                    "question": {
                        "answer": "(window.pageYoffset/window.scrollY)",
                        "type": "UnderLine"
                    }
                },
                {
                    "type": "string",
                    "string": "可以使用"
                },
                {
                    "type": "question",
                    "question": {
                        "answer": "(scroll())",
                        "type": "UnderLine"
                    }
                },
                {
                    "type": "string",
                    "string": "、qs:(scrollTo())"
                },
                {
                    "type": "question",
                    "question": {
                        "answer": "(scrollTo())",
                        "type": "UnderLine"
                    }
                },
                {
                    "type": "string",
                    "string": "和"
                },
                {
                    "type": "question",
                    "question": {
                        "answer": "(scrollBy())",
                        "type": "UnderLine"
                    }
                },
                {
                    "type": "string",
                    "string": "方法滚动页面。这3个方法都接收表示相对视口距离的 和 坐标，这两个参数在前两个方法中表示要"
                },
                {
                    "type": "question",
                    "question": {
                        "answer": "(滚动到的坐标)",
                        "type": "UnderLine"
                    }
                },
                {
                    "type": "string",
                    "string": "，在最后一个方法中表示"
                },
                {
                    "type": "question",
                    "question": {
                        "answer": "(滚动的距离)",
                        "type": "UnderLine"
                    }
                },
                {
                    "type": "string",
                    "string": "。这几个方法也都接收一个"
                },
                {
                    "type": "question",
                    "question": {
                        "answer": "(ScrollToOptions)",
                        "type": "UnderLine"
                    }
                },
                {
                    "type": "string",
                    "string": "字典，除了提供偏移值，还可以通过"
                },
                {
                    "type": "question",
                    "question": {
                        "answer": "(behavior)",
                        "type": "UnderLine"
                    }
                },
                {
                    "type": "string",
                    "string": " 属性告诉浏览器是否平滑滚动。"
                }
            ]
        }
    ],
    [
        {
            "problem_index": "p7"
        },
        {
            "content": [
                {
                    "type": "string",
                    "string": "p7. window.open()方法可以用于"
                },
                {
                    "type": "question",
                    "question": {
                        "answer": "( 导航到指定URL )",
                        "type": "UnderLine"
                    }
                },
                {
                    "type": "string",
                    "string": "，也可以用于"
                },
                {
                    "type": "question",
                    "question": {
                        "answer": "( 打开新浏览 器窗口 )",
                        "type": "UnderLine"
                    }
                },
                {
                    "type": "string",
                    "string": "。这个方法接收4个参数："
                },
                {
                    "type": "question",
                    "question": {
                        "answer": "( 要加载的URL )",
                        "type": "UnderLine"
                    }
                },
                {
                    "type": "string",
                    "string": "、"
                },
                {
                    "type": "question",
                    "question": {
                        "answer": "( 目标窗口 )",
                        "type": "UnderLine"
                    }
                },
                {
                    "type": "string",
                    "string": "、"
                },
                {
                    "type": "question",
                    "question": {
                        "answer": "( 特性字符 串 )",
                        "type": "UnderLine"
                    }
                },
                {
                    "type": "string",
                    "string": "和"
                },
                {
                    "type": "question",
                    "question": {
                        "answer": "( 表示新窗口在浏览器历史记录中是否替代当前加载页面的布尔值 )",
                        "type": "UnderLine"
                    }
                },
                {
                    "type": "string",
                    "string": "。 通常，调用这个方法时只传 前3个参数，最后一个参数只有在"
                },
                {
                    "type": "question",
                    "question": {
                        "answer": "( 不打开新 窗口时才会使用 )",
                        "type": "UnderLine"
                    }
                },
                {
                    "type": "string",
                    "string": "。 如果"
                },
                {
                    "type": "question",
                    "question": {
                        "answer": "( window.open()的第二个参数是一个已经存在的窗口或窗格 （frame）的名字 )",
                        "type": "UnderLine"
                    }
                },
                {
                    "type": "string",
                    "string": "，则会在对应的窗口或窗格中打开URL。下面是一个 例子："
                },
                {
                    "type": "question",
                    "question": {
                        "answer": "(   )",
                        "type": "UnderLine"
                    }
                },
                {
                    "type": "string",
                    "string": " "
                }
            ]
        }
    ],
    [
        {
            "problem_index": "p8"
        },
        {
            "content": [
                {
                    "type": "string",
                    "string": "p8. "
                },
                {
                    "type": "string",
                    "string": ""
                }
            ]
        }
    ]
]
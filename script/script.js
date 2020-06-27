'use strict';

function DomElement (selector, height, width, bg, frontSize) {
    this.selector  = selector;
    this.height    = height;
    this.width     = width;
    this.bg        = bg;
    this.frontSize = frontSize;
    
}

DomElement.prototype.domCreate = function () {
    let style = document.createElement('style');
    style.type = 'text/css';

    style.innerHTML =`${this.selector} { 
    height: ${this.height};
    width:  ${this.width};
    background: ${this.bg};
    font-size: ${this.frontSize};
    `;

    document.getElementsByTagName('head')[0].appendChild(style);
    
    let 
    selectorDop = this.selector.slice(1),
    docEl;

    if (this.selector.indexOf('.') !== -1) {
        docEl = document.createElement('div');
        docEl.className = selectorDop;
    }else if (this.selector.indexOf('#') !== -1){
        docEl = document.createElement('p');
        docEl.setAttribute('id', selectorDop);
    }

    docEl.textContent =  prompt('text');
    document.body.append(docEl);

};

let div = new DomElement('.black','100px','100px','#00FA9A', '50px');
let p = new DomElement('#black','50px','30px','#008080', '30px');



div.domCreate();
p.domCreate();




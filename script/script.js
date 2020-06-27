function DomElement (selector, height, width, bg, frontSize) {
    this.selector  = selector;
    this.height    = height;
    this.width     = width;
    this.bg        = bg;
    this.frontSize = frontSize;
    
}

DomElement.prototype.domCreate = function () {
    let 
    selectorDop = this.selector.slice(1),
    docEl;

    if (this.selector.indexOf('.') !== -1){
        docEl = document.createElement('div');
        docEl.className = selectorDop;
    }else if (this.selector.indexOf('#') !== -1){
        docEl = document.createElement('p');
        docEl.setAttribute('id', selectorDop);
    }
    
    docEl.style.cssText = `
    height: ${this.height};
    width:  ${this.width};
    background: ${this.bg};
    font-size: ${this.frontSize};
    `;

    docEl.textContent = prompt('text');

    document.body.append(docEl);
};

let domEl = new DomElement('.blue','100px','100px','blue', '50px');
let p = new DomElement('#red','50px','50px','red', '25px');

domEl.domCreate();
p.domCreate();



function DomElement (selector, height, width, bg, frontSize) {
    this.selector  = selector;
    this.height    = height;
    this.width     = width;
    this.bg        = bg;
    this.frontSize = frontSize;
    
}

DomElement.prototype.domCreate = function () {
    let 
    docEl = document.createElement('dasd');

    if (this.selector.indexOf('.') !== -1){
        docEl.classList.add(this.selector);
    }else if (this.selector.indexOf('#') !== -1){
        docEl.setAttribute('id', this.selector);
    }
    
    docEl.style.cssText = `
    height: ${this.height};
    width:  ${this.width};
    background: ${this.bg};
    font-size: ${this.frontSize};
    position: absolute;
    `;

    docEl.textContent = '123';

    document.body.append(docEl);
};

let domEl = new DomElement('#black','100px','100px','blue', '50px');
domEl.domCreate();





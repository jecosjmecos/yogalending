class Options{
    constructor(height, width, bg, fontSize, textAlign){
        this.height = height;
        this.width = width;
        this.bg = bg;
        this.fontSize = fontSize;
        this.textAlign = textAlign;
    }
    newElement(){
        let div = document.createElement('div');
        document.body.appendChild(div);

        let stylesEl = `height: ${this.height}px; width: ${this.width}px; background: ${this.bg}; font-size: ${this.fontSize}px; text-align: ${this.textAlign};`;
        div.style.cssText = stylesEl;
    }
}

let newEl = new Options(200, 300, 'green', 18, 'center');

newEl.newElement();

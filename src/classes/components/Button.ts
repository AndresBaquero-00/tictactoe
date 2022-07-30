
export class Button {

    private button!: HTMLDivElement;

    constructor(opts: any) {
        this.button = document.createElement('div');
        this.button.classList.add('button', opts.className);
        this.button.innerText = opts.desc;
        this.button.onclick = opts.onClick;
    }

    public getButton(): HTMLDivElement {
        return this.button;
    }
    
}
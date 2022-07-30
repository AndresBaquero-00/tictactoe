import { Button } from "./Button";

export class Modal {
    private modal!: HTMLDivElement;
    private actions!: HTMLDivElement;
    private app!: HTMLDivElement;

    constructor(opts: any) {
        this.app = document.querySelector('#app') as HTMLDivElement;
        this.modal = document.createElement('div');

        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');

        if (opts.player) {
            const title = document.createElement('p');
            title.innerText = `${ opts.player } WINS!`;
            modalContent.append(title);
            const label = document.createElement('label');
            const img = document.createElement('img');
            const span = document.createElement('span');

            img.src = opts.playerImg;
            span.innerText = opts.desc;
            label.append(img, span);
            label.classList.add(opts.player);
            modalContent.append(label);
        } else {
            const label = document.createElement('label');
            const span = document.createElement('span');
            span.innerText = opts.desc;
            label.append(span);
            modalContent.append(label);
        }

        this.actions = document.createElement('div');
        this.actions.classList.add('actions');
        modalContent.append(this.actions);
        this.modal.append(modalContent);
        this.modal.classList.add('modal');
        this.app.append(this.modal);
    }

    public addActions(...actions: Button[]) {
        this.actions.append(...actions.map( btn => btn.getButton() ));
    }

    public present(): void {
        setTimeout(() => this.modal.classList.add('present'), 400);
    }

    public dismiss(): void {
        this.modal.ontransitionend = () => this.app.removeChild(this.modal);
        this.modal.classList.remove('present');
    }
}
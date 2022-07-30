import { Observer } from './Observer';
import { Triqui } from '../lib';

export class BoardObserver extends Observer {

    public refresh(subject: Triqui): void {
        if (subject === this.subject) {
            this.component.setValues(...subject.getBoard());
        }
    }
}
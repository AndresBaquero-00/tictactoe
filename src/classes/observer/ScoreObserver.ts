
import { Triqui } from '../lib';
import { Observer } from './Observer';

export class ScoreObserver extends Observer {

    public refresh(subject: Triqui): void {
        if (subject === this.subject) {
            this.component.setValues(...subject.getScores().map(score => `${ score }`));
        }
    }
}
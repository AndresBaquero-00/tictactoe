import { ComponentBuilder } from '../builder';
import { Triqui } from '../lib';
import { BoardObserver } from './BoardObserver';
import { HeaderObserver } from './HeaderObserver';
import { Observer } from './Observer';
import { ScoreObserver } from './ScoreObserver';

export class ObserverFactory {
    
    // Factory Method
    public static getObserver(type: string, component: ComponentBuilder, subject: Triqui): Observer {
        if (type === 'header') {
            return new HeaderObserver(component, subject);
        } else if (type === 'board') {
            return new BoardObserver(component, subject);
        } else {
            return new ScoreObserver(component, subject);
        }
    }
}
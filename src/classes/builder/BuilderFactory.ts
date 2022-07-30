import { ComponentBuilder } from './ComponentBuilder';

import { BoardBuilder } from './BoardBuilder';
import { HeaderBuilder } from './HeaderBuilder';
import { ScoreBuilder } from './ScoreBuilder';

export class BuilderFactory {
    
    // Factory Method
    public static getBuilder(type: string): ComponentBuilder {
        if (type === 'header') {
            return new HeaderBuilder();
        } else if (type === 'board') {
            return new BoardBuilder();
        } else {
            return new ScoreBuilder();
        }
    }
}
import { Observer } from './Observer';

export interface Observable {
    notify(): void;
    register(obs: Observer): void;
}
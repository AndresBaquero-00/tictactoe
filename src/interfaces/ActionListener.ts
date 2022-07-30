import { ActionEvent } from "./ActionEvent";

export interface ActionListener {
    actionPerformed(e: ActionEvent): void;
}
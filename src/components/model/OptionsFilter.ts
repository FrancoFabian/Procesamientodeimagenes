import { OptBasic } from "./OpBasic";
import { OpEdition } from "./OpEdicion";
import { OpMatematicas } from "./OpMatematicas";
import { OpImgCom } from "./OpImgCom";
interface CanvasItem {
    canvasId: string;
    filtro: Function; // Replace 'Function' with a more specific type if possible
    widthC: number;
    heightC: number;
    nameFilter: string;
}

interface Setting {
    nameFilter: string;
    filtro: Function; // Replace 'Function' with a more specific type if possible
    rangeSettings: RangeSetting[];
}

interface SettingTypeSpecial {
    nameFilter: string;
    filtro: Function; // Replace 'Function' with a more specific type if possible
    rangeSettings: RangeSetting[];
}

interface RangeSetting {
    id: string;
    nombre: string;
    range: number;
    defaultVal: number;
    min: number;
    step: string;
    wTitle?: string; // Optional field
}
export interface OptionObject {
    title: string;
    canvasI: (CanvasItem | null)[];
    Settings: (Setting | null | undefined)[];
    SettingsTypeSpecial: (SettingTypeSpecial | null)[];
    SettingsHyper: any[]; // Replace 'any' with a more specific type if needed
    SettingsImage: any[]; // Replace 'any' with a more specific type if needed
}
export const optionsObject:OptionObject[] = [
    OptBasic,
    OpEdition,
    OpMatematicas,
    OpImgCom
]
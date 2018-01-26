export interface imageProperties {
    basepath: String;
    files : Array<fileProperty>;
    path: String;
}

interface fileProperty {
    name: String;
    size: String
}
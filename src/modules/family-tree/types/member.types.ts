export interface Member {
    id: string;
    name: string;
    avatar?: string;
    sex: string;
    dob: string;
    dod?: string | null;
    relationship?: string;
    spouses?: string[] | null;
    parents?: string[] | null;
    children?: string[] | null;
    siblings?: string[] | null;
    isSpouse?: boolean,
    isSibling?: boolean,
    isParent?: boolean,
}

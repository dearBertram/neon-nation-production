export interface PoemMetadata {
    language: string;
    tags: string[];
}

export interface Poem {
    uid: string;
    title: string;
    theme: string;
    lines: string[];
    poemMetadata: PoemMetadata;
}

export interface Section {
    uid: string;
    name: string;
    description: string;
    poems: Poem[];
}

export interface Collection {
    uid: string;
    name: string;
    subHeading: string;
    description: string;
    publishedYear: number;
    genre: string;
    sections: Section[];
}

export interface PoetDocument {
    poet: {
        uid: string;
        name: string;
        birthYear: number;
        deathYear: string;
        nationality: string;
        bio: string;
        collections: Collection[];
    };
}
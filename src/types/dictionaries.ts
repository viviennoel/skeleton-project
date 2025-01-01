interface MetaHeader {
    link: string;
    label: string;
}

interface HeaderLink {
    link: string;
    label: string;
    links?: HeaderLink[]; // optional nested links
}

export interface Slice {
    type: string;
    src?: string;
    alt?: string;
}

interface PageInfo {
    link: string;
    label: string;
    title: string;
    slices?: Slice[]; // only relevant for the 'home' page
}

interface Header {
    metaHeader: MetaHeader[];
    header: HeaderLink[];
}

interface Pages {
    contact: PageInfo;
    about: PageInfo;
    home: PageInfo;
}

export interface WebsiteData {
    compagnyName: string;
    logoUrl: string;
    seoTags: string[];
    header: Header;
    pages: Pages;
}


export interface CareerDetails {
    _id: string;
    jobTitle: string;
    workArrangement: string;
    aboutRole: string;
    keyResponsibilities: { title: string; _id: string }[];
    requiredSkills: string[];
    benefits: { title: string; _id: string }[];
    link: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
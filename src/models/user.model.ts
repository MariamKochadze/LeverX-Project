export interface Manager {
    id: string;
    first_name: string;
    last_name: string;
}

export interface DateOfBirth {
    year: number;
    month: number;
    day: number;
}

export interface Visa {
    issuing_country: string;
    type: string;
    start_date: number;
    end_date: number;
}

export interface User {
    id: string;
    isRemoteWork: boolean;
    user_avatar: string;
    first_name: string;
    last_name: string;
    first_native_name: string;
    last_native_name: string;
    middle_native_name?: string;
    department: string;
    building: string;
    room: string;
    date_birth: DateOfBirth;
    desk_number: number;
    manager: Manager;
    phone: string;
    email: string;
    skype: string;
    cnumber: string;
    citizenship: string;
    visa: Visa[];
    role: Role;
    password: string;
}

export interface EditUser {
    img: { src: string; alt: string };
    name: string;
    surname: string;
    role: Role;
}

export enum Role {
    EMPLOYEE = 1,
    HR = 2,
    ADMIN = 3,
}

export interface FieldData {
    icon: string;
    label: string;
    value: string | number;
    key: string;
}

export interface SectionData {
    header: string;
    fields: FieldData[];
}

export interface EditableData {
    first_name: string;
    last_name: string;
    first_native_name: string;
    middle_native_name: string;
    last_native_name: string;
    department: string;
    building: string;
    room: string;
    desk_number: string;
    phone: string;
    email: string;
    skype: string;
    cnumber: string;
}

export interface UserFormData {
    name?: string;
    email?: string;
    phone?: string;
    skype?: string;
    building?: string;
    room?: string;
    department?: string;
}

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
    _id: string;
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
  }
  
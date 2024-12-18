import { createContext, ReactNode, useContext, useState } from "react";
import { User } from "../models/user.model";

interface EditContextProps{
    isEditMode:boolean;
    userData: User|undefined;
    toggleEditMode: () => void;
    updateUserData: (updatedData: Partial<User>)=> void;
}

export const EditContext = createContext<EditContextProps|undefined>(undefined);
interface EditProviderProps {
  children: ReactNode; 
}

export const EditProvider: React.FC<EditProviderProps> = ({children}) => {
  const[isEditMode,setIsEditMode]= useState(false);
  const[userData,setUserData]= useState<User>();


  const toggleEditMode = () => setIsEditMode((prev)=>!prev);
  const updateUserData = (updatedData: Partial<User>) => {
    setUserData((prev)=>({...prev,updatedData}as User))
  }
  return(
    <EditContext.Provider value={{isEditMode,userData,toggleEditMode,updateUserData}}>
        {children}
    </EditContext.Provider>
  )
}

export const useEditContext = () => {
    const context = useContext(EditContext);
    if (!context) {
      throw new Error("useEditContext must be used within an EditProvider");
    }
    return context;
  };
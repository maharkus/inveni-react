import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

interface FloorContextProps {
  currentFloor: number;
  setCurrentFloor: Dispatch<SetStateAction<number>>;
}

const FloorContext = createContext<FloorContextProps | undefined>(undefined);

interface FloorProviderProps {
  children: ReactNode;
}

export const FloorProvider: React.FC<FloorProviderProps> = ({ children }) => {
  const [currentFloor, setCurrentFloor] = useState(0);

  return (
    <FloorContext.Provider value={{ currentFloor, setCurrentFloor }}>
      {children}
    </FloorContext.Provider>
  );
};

export const useFloor = () => {
  return useContext(FloorContext);
};
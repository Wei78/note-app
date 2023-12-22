import { HTMLAttributes, DetailedHTMLProps } from 'react';

export interface NoteItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  customStringProp?: string;
  category?: string; 
  description?: string; 
  name?: string;
  createdTime?: string;
  icon?: string;
  id?: any;
  archived?: any;
  onDelete: (id: string) => void;
  
}

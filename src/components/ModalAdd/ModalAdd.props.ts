import { HTMLAttributes, DetailedHTMLProps } from 'react';

export interface ModalAddProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>  {
    handleClose: () => void;
    openModal?: any; 
 }
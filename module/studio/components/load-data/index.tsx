import { BsDatabase } from 'react-icons/bs'
import { useState } from 'react';
import { Form } from './form';

export const LoadData = () => {

    const [open, setOpen] = useState(false);

    return (
        <>
            <button onClick={() => setOpen(!open)} className='cursor-pointer! btn btn-primary btn-sm absolute right-5 top-5'>Cargar Datos
                <BsDatabase />
            </button>

            <div onClick={(e) => {
                setOpen(false);
            }} className={`w-full flex items-center justify-center h-full fixed top-0 left-0 bg-black/20 z-50 ${open ? 'block' : 'hidden'}`}>
                <div onClick={(e) => {
                    e.stopPropagation();
                }}>
                    <Form />
                </div>
            </div>
        </>
    )
}

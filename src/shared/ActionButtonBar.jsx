import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlassWater, faUtensils, faBed, faGamepad } from '@fortawesome/free-solid-svg-icons';


export default function ActionButtonBar(){
    return(
        <div className='w-full bg-slate-400 py-4'>
            <div className=' w-1/2 mx-auto flex justify-between'>
                <button 
                    className='action-button'
                    onClick={() => console.log('Button clicked!')}
                >
                    <FontAwesomeIcon icon={faGlassWater} className='mx-2'/>
                    Water
                </button>
                <button 
                    className='action-button'
                    onClick={() => console.log('Button clicked!')}
                >
                    <FontAwesomeIcon icon={faUtensils} className='mx-2'/>
                    Feed
                </button>
                <button 
                    className='action-button'
                    onClick={() => console.log('Button clicked!')}
                >
                    <FontAwesomeIcon icon={faBed}className='mx-2'/>
                    Sleep
                </button>
                <button 
                    className='action-button'
                    onClick={() => console.log('Button clicked!')}
                >
                    <FontAwesomeIcon icon={faGamepad} className='mx-2' />
                    Play
                </button>
            </div>
        </div>
    )
}
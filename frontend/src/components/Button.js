import React from 'react'

export default function Button({ ...props }) {
    return (
        <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" {...props}>
            {props.children}
        </button>
    )
}

import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';


export default function Dropzone(props) {
    const [files, setFiles] = useState([]);
    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/*': []
        },
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        }
    });

    const thumbs = files.map((file, index) => (
        <div className=" inline-flex rounded-[2px] border border-[#eaeaea] mb-2 mr-2 w-24 h-24 p-1 box-border" key={file.name}>
            <div className="flex min-w-0 overflow-hidden">
                <img
                    alt={`${file}-${index}`}
                    src={file.preview}
                    className="block w-auto h-full"
                    // Revoke data uri after image is loaded
                    onLoad={() => { URL.revokeObjectURL(file.preview) }}
                />
            </div>
        </div>
    ));

    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    return (
        <section className="flex flex-col my-4">
            <div {...getRootProps({ className: 'group cursor-pointer hover:border-blue-300 transition-all duration-300 ease-in border border-dashed border-2 flex justify-center items-center w-full py-10 px-8 ' })}>
                <input {...getInputProps()} />
                <p className="text-md group-hover:text-blue-400 transition-all duration-300 delay-100 ">Drag 'n' drop some files here, or click to select files</p>
            </div>
            <aside className="flex flex-row flex-wrap mt-4">
                {thumbs}
            </aside>
        </section>
    );
}

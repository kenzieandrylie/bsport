const BtnLink = ({children, href}) => {
    return (
        <div className='inline-flex items-center px-4 py-2 bg-sky-500 border border-transparent font-semibold text-xs text-white uppercase tracking-widest hover:bg-sky-600 active:bg-sky-900 transition ease-in-out duration-150'>
            {children}
        </div>
    )
}

export default BtnLink;

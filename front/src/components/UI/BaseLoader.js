import favicon from '../../../public/favicon.ico'
export default function BaseLoader(){
    return <>
        <div className="loader">
            <img src={favicon} alt="" />
        </div>
    </>
}
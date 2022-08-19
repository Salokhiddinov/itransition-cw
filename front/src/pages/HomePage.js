export default function HomePage(){
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    return (
        <div>
        <h1>Welcome, {currentUser.name}</h1>
        </div>
    )
}
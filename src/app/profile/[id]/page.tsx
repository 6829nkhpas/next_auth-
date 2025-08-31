export default function userProfile({params}: {params: {id: string}}) {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1>Profile</h1>
            <p className="text-2xl text-center font-bold text-blue-500">Profile ID: {params.id}</p>
        </div>
    )
}
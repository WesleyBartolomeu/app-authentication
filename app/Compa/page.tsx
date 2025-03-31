import SignOutButton from '../components/SignOutButton';
import NavSideBar from '../components/NavSideBar';

export default function Photos() { 
    return (
        <main className="min-h-screen bg-gray-800 text-white relative">
            <NavSideBar />
             <div className="container mx-auto px-4 py-4">
                <div className="flex flex-col items-center mb-6">
                <h1 className="text-4xl font-bold mb-4">Photos</h1>
                </div>
            </div> 
        </main>
    )
}
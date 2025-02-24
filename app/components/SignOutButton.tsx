export default function SignOutButton() { 
    return (
        <form action="/auth/signout" method="post">
            <button 
            type="submit"
            className='bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
                Sair
            </button>
        </form>
    )
 }
 
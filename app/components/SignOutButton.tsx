import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SignOutButton() { 
    return (
        <form action="/auth/signout" method="post">
            <div className='bg-red-600 hover:bg-red-700 text-white font-bold mt-2 px-4 py-2  rounded focus:outline-none focus:shadow-outline'>
                <FontAwesomeIcon icon={faArrowRightFromBracket} className="h-5 w-5 pr-2"  />
                <button 
                className=""
                type="submit">
                    Deslogar
                </button>
            </div>
        </form>
    )
 }
 
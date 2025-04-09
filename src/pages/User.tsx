import { Link, useParams } from 'react-router-dom'
import avatar from '../assets/avatar.svg'

function User() {
    const {username} = useParams()
  return (
    <div className="w-screen h-screen mx-auto flex flex-col justify-center items-center">
        <div className="w-full sm:w-2xl md:w-3xl lg:w-7xl h-full flex flex-col justify-start items-start p-6 space-y-6 pb-30 bg-[#f9f9f9]">
            <div className=' flex flex-col items-start m-0 '>
                <img className=' w-[150px] mb-3' src={avatar} alt="#" />
                <p className=' font-semibold text-2xl translate-x-2'>Name</p>
                <p className=' font-normal text-md translate-x-2'>About Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa, voluptas earum vel iste necessitatibus excepturi consequatur numquam modi doloribus cupiditate autem eaque dolorem voluptates dicta eius, consequuntur nostrum molestiae sint.</p>   
            </div>
            <br />
            <div id="repositories">
                <div  className="border p-4 rounded-xl">
                <a href="#" target="_blank" rel="noopener noreferrer">
                    <p className="cursor-pointer text-[#111111] text-lg hover:underline">Link</p>
                </a>
                    <p className="text-sm text-muted-foreground">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora quisquam nostrum a, sint esse, maxime quae dolorem harum cum adipisci reprehenderit laudantium odit dolorum consequuntur labore. Vero cumque dolores minus.</p>
                </div>
            </div>
        </div>
      </div>
  )
}

export default User
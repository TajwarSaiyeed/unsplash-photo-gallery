import Image from "next/image";
import Link from "next/link";
import { BiSolidLike } from "react-icons/bi";
import { FaExpandArrowsAlt } from "react-icons/fa";

type CardProps = {
  name: string;
  alt_description: string;
  description: string;
  urls: {
    regular: string;
  };
  user: {
    name: string;
    profile_image: {
      medium: string;
    };
  };
  likes: number;
  id: string;
};

const Card: React.FC<CardProps> = ({
  alt_description,
  description,
  urls,
  user,
  likes,
  id,
}) => {
  return (
    <div className="rounded-xl group relative shadow-card hover:shadow-cardhover card border-[4px] border-slate-50">
      <Link
        href={`/${id}`}
        className="text-black z-[5] hidden group-hover:block transition border-black p-2 bg-white rounded-full absolute top-[10px] right-[10px]"
      >
        <FaExpandArrowsAlt className="text-black w-6 h-6" />
      </Link>
      <div className=" aspect-square">
        <Image
          src={urls.regular}
          alt={alt_description}
          layout="fill"
          objectFit="cover"
          className="rounded-xl h-auto"
          loading="lazy"
        />
      </div>

      <div className="group-hover:flex flex-col transition max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md">
        <p className="text-white text-sm overflow-y-auto">{description}</p>
        <div className="flex justify-between gap-2 items-center mt-5">
          <div className="flex gap-2 items-center">
            <div className="w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-xs font-bold relative">
              <Image
                src={user.profile_image.medium}
                alt={user.name}
                fill
                className="rounded-full w-6 h-6"
              />
            </div>
            <p className="text-white text-xs">{user.name}</p>
          </div>
          <div className="flex items-center gap-x-2">
            <button className="bg-blue-600 text-xs items-center font-bold flex gap-2 px-2 py-1 border-blue-500 border-[1px] text-white rounded-md">
              <BiSolidLike className="text-white w-4 h-4" /> {likes}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

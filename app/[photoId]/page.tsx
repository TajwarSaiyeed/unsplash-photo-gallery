import { GetPhotoData } from "@/utils";
import Image from "next/image";
import { BiSolidLike } from "react-icons/bi";
import { BsInstagram, BsTwitter } from "react-icons/bs";
import { AiOutlineDownload } from "react-icons/ai";
import Link from "next/link";

const SinglePhotoPage = async ({
  params,
}: {
  params: {
    photoId: string;
  };
}) => {
  const photoData = await GetPhotoData(params.photoId);

  return (
    <div className="flex justify-center items-center flex-col py-10 bg-slate-50 min-h-screen w-full">
      <div className="max-w-[900px] w-full h-[400px] relative">
        <Image
          src={photoData?.urls?.regular}
          alt={photoData?.alt_description}
          fill
          className="rounded-xl h-[400px] w-[600px] object-cover"
          loading="lazy"
        />
      </div>
      <div className="my-5 w-full max-w-[900px] p-5 border rounded-lg flex items-center">
        <div className="flex items-center gap-2  w-full">
          <div className="w-12 h-12 rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-xs font-bold relative">
            <Image
              src={photoData?.user?.profile_image?.medium}
              alt={photoData?.user?.name}
              fill
              className="rounded-full w-10 h-10"
            />
          </div>
          <div className="flex flex-col gap items-start">
            <p className="capitalize">{photoData?.user?.name}</p>
            <p className="italic text-xs">@{photoData?.user?.username}</p>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold flex items-center gap-x-2">
            <AiOutlineDownload className="text-blue-500 w-6 h-6" />
            {photoData?.downloads}
          </p>
          <p className="text-sm font-semibold flex items-center gap-x-2">
            <BiSolidLike className="text-blue-500 w-6 h-6" />
            {photoData?.likes}
          </p>
        </div>
      </div>
      {photoData?.description && (
        <div className="mb-5 w-full max-w-[900px] p-5 border rounded-lg flex items-center relative">
          <span className="bg-blue-200 px-2 absolute -top-2 rounded-md left-2">
            Descripton
          </span>
          <p>{photoData?.description}</p>
        </div>
      )}
      {(photoData?.user?.twitter_username ||
        photoData?.user?.instagram_username) && (
        <div className="mb-5 w-full gap-x-3 max-w-[900px] p-5 border rounded-lg flex items-center relative">
          {photoData?.user?.instagram_username && (
            <a
              href={`https://www.instagram.com/${photoData?.user?.instagram_username}`}
              className="flex items-center"
              target={"_blank"}
            >
              <BsInstagram />
              <span className="italic text-xs text-slate-500 font-bold">
                /{photoData?.user?.instagram_username}
              </span>
            </a>
          )}
          {photoData?.user?.twitter_username && (
            <a
              className="flex items-center"
              target={"_blank"}
              href={`https://twitter.com/${photoData?.user?.twitter_username}`}
            >
              <BsTwitter />
              <span className="italic text-xs text-slate-500 font-bold">
                /{photoData?.user?.twitter_username}
              </span>
            </a>
          )}
        </div>
      )}
      <div className="flex-wrap w-[900px] relative p-2 pt-4 border rounded-lg flex items-center gap-2 justify-start">
        <span className="bg-red-200 text-xs px-2 absolute -top-2 rounded-md left-2">
          Related Tags
        </span>
        {photoData?.tags?.map((tag: any, _: number) => (
          <Link
            className="px-2 py-2 text-xs border rounded-md"
            href={`/?query=${tag?.title}`}
            key={_}
          >
            {tag.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SinglePhotoPage;

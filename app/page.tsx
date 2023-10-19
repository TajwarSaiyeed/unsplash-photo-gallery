"use client";
import { useEffect, useState, useRef } from "react";
import Card from "@/components/card";
import Loader from "@/components/loader";
import SearchField from "@/components/search-field";
import { useSearchParams } from "next/navigation";

const RenderCards = ({ data, title }: { data: any; title: string }) => {
  if (data?.length > 0) {
    return data?.map((image: any, _: number) => (
      <Card key={image.id + _} {...image} id={image.id} />
    ));
  }

  return (
    <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">{title}</h2>
  );
};

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState<any>([]);
  const [searchText, setSearchText] = useState("");
  const [pageNo, setPageNo] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadmoreLoading, setLoadmoreLoading] = useState(false);
  const observer = useRef<IntersectionObserver>();
  const searchParams = useSearchParams();

  const query = searchParams.get("query");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (pageNo === 1) setLoading(true);
        if (pageNo > 1) setLoadmoreLoading(true);

        if (query) {
          setSearchText(query);
          setHasMore(false);
          const res = await fetch(
            `https://api.unsplash.com/search/photos?page=${pageNo}&query=${query}`,
            {
              headers: {
                Authorization: `Client-ID ${process.env.NEXT_PUBLIC_APP_UNSPLASH_ACCESSKEY}`,
              },
            }
          );

          const data = await res.json();

          return setAllPosts(data.results);
        }

        const res = await fetch(
          `https://api.unsplash.com/photos?page=${pageNo}&query=${query}`,
          {
            headers: {
              Authorization: `Client-ID ${process.env.NEXT_PUBLIC_APP_UNSPLASH_ACCESSKEY}`,
            },
          }
        );

        if (!res.ok) throw new Error("Something went wrong");

        const data = await res.json();

        if (pageNo === 1) setAllPosts(data);
        setSearchText("");

        setAllPosts((prevPosts: any) => {
          if (data.length === 0) {
            setHasMore(false);
            return prevPosts;
          }

          setHasMore(true);

          return [...prevPosts, ...data];
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
        setLoadmoreLoading(false);
      }
    };

    fetchPosts();
  }, [pageNo, query]);

  useEffect(() => {
    if (observer.current) observer?.current?.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting && hasMore) {
        setPageNo((prevPageNo) => prevPageNo + 1);
        setLoadmoreLoading(true);
      }
    });

    if (allPosts.length > 0) {
      observer?.current?.observe(document.querySelector("#bottom")!);
    }

    return () => {
      if (observer?.current) observer?.current?.disconnect();
    };
  }, [allPosts, hasMore]);

  return (
    <section className="max-w-7xl px-5 mx-auto py-5">
      <div>
        <h1 className="font-extrabold text-[32px] text-[#222328]">
          Photo Gallery
        </h1>
        <p className="mt-2 max-w-[500px] text-[#666e75] text-[16px]">
          This is a simple photo gallery app built with Next.js and Unsplash
          API.
        </p>
      </div>

      <div className="mt-16">
        <SearchField />
      </div>

      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-[#666e75] text-xl mb-3">
                Showing results for{" "}
                <span className="text-[#222328]">{searchText}</span>
              </h2>
            )}
            <div className="grid lg:grid-cols-4 gap-2 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1">
              <RenderCards data={allPosts} title="All Photos" />
            </div>
            <div id="bottom" />
            {!loading && allPosts.length > 0 && !hasMore && (
              <p className="text-center text-gray-500 text-sm mt-4">
                No more photos to show.
              </p>
            )}
          </>
        )}
      </div>
      {loadmoreLoading && (
        <div className="flex justify-center items-center my-10">
          <Loader />
        </div>
      )}
    </section>
  );
};

export default Home;

import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { NavLink } from "react-router-dom";
import UseVideoList from "../hook/useVideoList";
import Video from "./Video";
export default function Videos() {
  const [page, setPage] = useState(1);
  const { loding, error, videos, hasMore } = UseVideoList(page);
  return (
    <div>
      {videos.length > 0 && (
        <InfiniteScroll
          dataLength={videos.length}
          hasMore={hasMore}
          next={() => setPage(page + 8)}
          loader={<h1>Loding...........</h1>}
        >
          {" "}
          {videos.map((video, index) =>
            video.noq > 0 ? (
              <NavLink
                to={`/Quize/${video.youtubeID}`}
                state={{ videoTitle: video.title }}
                key={index}
              >
                <Video
                  title={video.title}
                  id={video.youtubeID}
                  noq={video.noq}
                />
              </NavLink>
            ) : (
              <Video
                title={video.title}
                id={video.youtubeID}
                noq={video.noq}
                key={index}
              />
            )
          )}
        </InfiniteScroll>
      )}
      {!loding && videos.length === 0 && <h1>No data found!</h1>}
      {error && <h1>There was a error!</h1>}
      {loding && (
        <h1
          style={{
            color: "blue",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          loding..............
        </h1>
      )}
    </div>
  );
}

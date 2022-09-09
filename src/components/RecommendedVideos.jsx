import { SimpleGrid } from "@chakra-ui/react";
import VideoPin from "./VideoPin";

function RecommendedVideos({ feeds }) {
  return (
    <SimpleGrid
      minChildWidth="300px"
      spacing="40px"
      width="full"
      autoColumns={"max-content"}
      px="2"
      overflowX={"hidden"}
    >
      {feeds &&
        feeds.map((data) => (
          <VideoPin key={data.id} maxWidth={420} height="80px" data={data} />
        ))}
    </SimpleGrid>
  );
}

export default RecommendedVideos;

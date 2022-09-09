import { Flex, Image } from "@chakra-ui/react";
import { getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { firebaseApp } from "../firebase-config";
import { getUserInfo, userUploadedVideo } from "../utils/fetchData";
import Spinner from "./Spinner";
import RecommendedVideos from "./RecommendedVideos";

const avatar =
  "https://img4.thuthuatphanmem.vn/uploads/2020/07/05/hinh-anh-background-mau-xanh-diem-sang_034912879.jpg";

function Userprofile() {
  const { userId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [feeds, setFeeds] = useState(null);

  const fireStoreDb = getFirestore(firebaseApp);

  useEffect(() => {
    setIsLoading(true);
    if (userId) {
      getUserInfo(fireStoreDb, userId).then((user) => {
        setUserInfo(user);
      });
      userUploadedVideo(fireStoreDb, userId).then((feed) => setFeeds(feed));
      setIsLoading(false);
    }
  }, []);

  if (isLoading) return <Spinner />;

  return (
    <Flex
      alignItems={"center"}
      justifyContent={"center"}
      width="full"
      height="auto"
      p={2}
      direction="column"
    >
      <Flex
        alignItems={"center"}
        justifyContent={"center"}
        width="full"
        direction="column"
        position={"relative"}
      >
        <Image
          src={avatar}
          height={"320px"}
          width="full"
          objectFit={"cover"}
          borderRadius={"md"}
        />

        <Image
          src={userInfo?.photoURL}
          objectFit={"cover"}
          width="120px"
          height="120px"
          border="2px"
          borderColor={"gray.100"}
          rounded="full"
          shadow={"lg"}
          mt="-16"
        />
      </Flex>

      {feeds && (
        <Flex direction={"column"} width="full" my={6}>
          <RecommendedVideos feeds={feeds} />
        </Flex>
      )}
    </Flex>
  );
}

export default Userprofile;

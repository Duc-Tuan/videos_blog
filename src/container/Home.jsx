import { Flex } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";

import { Category, Create, Feed, NavBar, Search, UserProfile, VideoPinDetail } from "../components";
import { categories } from "../data";


function Home({ user }) {
  return (
    <>
      <NavBar user={user} />

      <Flex width={"100vw"}>
        <Flex
          direction={"column"}
          justifyContent="start"
          alignItems={"center"}
          width="5%"
        >
          {categories &&
            categories.map((data) => <Category key={data.id} data={data} />)}
        </Flex>

        <Flex
          width={"95%"}
          px={4}
          justifyContent="center"
          alignItems={'center'}
        >
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/category/:categoryId" element={<Feed />} />
            <Route path="/category" element={<Category />} />
            <Route path="/videoDetail/:videoId" element={<VideoPinDetail />} />
            <Route path="/search" element={<Search />} />
            <Route path="/create" element={<Create />} />
            <Route path="/UserDetail/:userId" element={<UserProfile />} />
          </Routes>
        </Flex>
      </Flex>
    </>
  );
}

export default Home;

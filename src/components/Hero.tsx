import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import styled from "styled-components";
import "react-circular-progressbar/dist/styles.css";
import { useChatStore } from "../stores/chat";
import { useUserDataStore } from "../stores/userData";
import { useMemo } from "react";
import { useAuthStore } from "../stores/auth";
import { PET_0, PET_1 } from "../image_urls";

const ContentContainer = styled.div<{
  $messageCount: number;
  $isPending: boolean;
}>`
  display: flex;
  justify-content: center;

  @keyframes floatUpDown {
    0% {
      top: 0px;
    }
    50% {
      top: -20px;
    }
    100% {
      top: 0px;
    }
  }

  .progress-bar-container {
    margin: 10px;
    width: ${(props) => (props.$messageCount === 0 ? "350px" : "175px")};
    transition: width 0.5s;
  }

  img {
    height: 60%;
    filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.5));
    transition: height 0.5s;
    position: relative;
    animation: ${(props) =>
      props.$isPending ? "floatUpDown 1s infinite" : "none"};
  }

  .logo {
    font-size: ${(props) => (props.$messageCount === 0 ? "1.25rem" : "1rem")};
    transition: font-size 0.5s;
  }
`;

export function Hero() {
  const chatStore = useChatStore();
  const authStore = useAuthStore();
  const userDataStore = useUserDataStore();

  const imageUrl = useMemo(() => {
    if (!authStore.isLoggedIn) return null;
    if (userDataStore.startupData == null) return null;

    return (authStore.user.pet_choice === 0 ? PET_0 : PET_1).gif(
      userDataStore.startupData.image
    );
  }, [authStore.isLoggedIn, userDataStore.startupData, authStore.user?.pet_choice]);

  return (
    <div>
      <ContentContainer
        className="box"
        $messageCount={chatStore.messages.length}
        $isPending={chatStore.isPending}
      >
        <div className="progress-bar-container">
          <CircularProgressbarWithChildren
            value={userDataStore.startupData?.final_score ?? 0}
            maxValue={100}
          >
            {imageUrl != null && <img src={imageUrl} alt="tomygothi" />}
            <b className="logo">
              {userDataStore.startupData != null 
                ? userDataStore.startupData?.final_score + "%"
                : "..."}
            </b>
          </CircularProgressbarWithChildren>
        </div>
      </ContentContainer>
    </div>
  );
}

import { Composition } from "remotion";
import { LemonCourse } from "./LemonCourse";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="LemonCourse" component={LemonCourse} width={1920} height={1080} fps={30} durationInFrames={1146}/>
    </>
  );
};

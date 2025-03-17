import { Fragment } from "react/jsx-runtime";
import Icon from "../Icon";
import CommentDetail from "./CommentDetail";

export default function Comment() {
  return (
    <Fragment>
      <div className="w-full h-fit bg-transparent flex items-start gap-3">
        <Icon size={"lg"} />
        <div className="h-fit w-full text-black">
          <CommentDetail />
        </div>
      </div>
    </Fragment>
  );
}

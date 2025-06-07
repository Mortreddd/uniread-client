import withBadge from "@/components/withBadge";
import { Button } from "../common/form/Button";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import Popover from "@/components/Popover";
import { useNavigate } from "react-router-dom";

export default function MessageButton() {
  const unreadMessages = ["Hello"];
  const navigate = useNavigate();
  const ButtonWithBadge = withBadge(Button, {
    variant: "danger",
    position: "topRight",
    badgeClassName: "rounded-full text-sm",
  });

  const MessageButton = unreadMessages.length > 0 ? ButtonWithBadge : Button;

  function handleMessageButtonClick() {
    navigate("/conversations");
  }
  return (
    <MessageButton
      onClick={handleMessageButtonClick}
      variant={"light"}
      size={"custom"}
      className={"rounded-full p-3"}
    >
      <ChatBubbleLeftRightIcon className={"size-5"} />
      <Popover position={"top"}>
        <h3 className="text-xs font-sans text-black">Messages</h3>
      </Popover>
    </MessageButton>
  );
}

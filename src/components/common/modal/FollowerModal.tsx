import { Follow } from "@/types/Follow";
import { forwardRef, Ref } from "react";
import Modal, { ModalRef } from "./Modal";
import { Button } from "../form/Button";

interface FollowModalProps {
  followers?: Follow[];
}
// TODO: remove the @ts-ignore comment before deploying the application
// @ts-ignore
function FollowerModal({ followers }: FollowModalProps, ref: Ref<ModalRef>) {
  return (
    <Modal ref={ref}>
      <div className="w-full h-fit">
        <h1 className="text-2xl text-center my-4">Followers</h1>
        <div className="flex flex-col items-start w-full divide-y-2 overflow-y-auto">
          <div className="bg-gray-100 rounded px-4 py-2 w-full">
            <div className="flex flex-1 items-center justify-between">
              <div className="w-full space-y-2">
                <h1 className="text-lg font-bold">Full Name</h1>
                <h1 className="font-semibold">@Username</h1>
              </div>
              <Button
                variant={"primary"}
                size={"md"}
                className="flex items-center gap-2 px-3 rounded py-2"
              >
                <span>Follow</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default forwardRef(FollowerModal);
